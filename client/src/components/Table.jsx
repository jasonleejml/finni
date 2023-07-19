import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography, IconButton } from "@mui/material";
import { addressFormat } from "./utils/addressFormat";
import { nameFormat } from "./utils/nameFormat";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalComponent } from "./Modal";
import { ViewPatientModal } from "./ViewPatientModal"
import { AvatarComponent } from "./Avatar";
import { convertTimestampToUTC } from "./utils/convertTimestampToUTC";
import { DELETE_PATIENT } from "../mutations/patientMutations";
import { useMutation } from "@apollo/client";
import { GET_ALL_PATIENTS } from "../queries/patientQueries";
import { toast } from "react-toastify";

const renderHeader = (params) => (
    <Typography sx={{ fontWeight: 'bold' }}>{params}</Typography>
);

export const Table = ({ data, loading }) => {
    const [openViewPatientModal, setOpenViewPatientModal] = useState(false);
    const [targetPatientID, setTargetPatientID] = useState("");

    const [deletePatient] = useMutation(DELETE_PATIENT, {
        onCompleted: () => toast.success("Deleted the patient successfully!"),
        refetchQueries: [{ query: GET_ALL_PATIENTS }]
    })

    const handlePatientModal = (id) => {
        setTargetPatientID(id);
        setOpenViewPatientModal(true);
    };
    const handleCloseViewPatientModal = () => setOpenViewPatientModal(false);

    const columns = [
        {
            field: "Avatar",
            headerName: "",
            renderCell: ({ row: { firstName, lastName } }) => {
                const fullName = nameFormat({ firstName, lastName })
                return (
                    <AvatarComponent name={fullName} />
                )
            }
        },
        {
            field: "firstName",
            headerName: "First Name",
            flex: 0.5,
            renderHeader: () => {
                return renderHeader('First Name');
            }
        },
        {
            field: "middleName",
            headerName: "Middle Name",
            flex: 0.5,
            renderHeader: () => {
                return renderHeader('Middle Name');
            }
        },
        {
            field: "lastName",
            headerName: "Last Name",
            flex: 0.5,
            renderHeader: () => {
                return renderHeader('Last Name');
            }
        },
        {
            field: "dob",
            headerName: "Date of Birth",
            flex: 0.5,
            renderHeader: () => {
                return renderHeader('Date of Birth');
            },
            valueGetter: (params) => {
                return convertTimestampToUTC({
                    timestamp: params.value,
                    format: "MMMM D, YYYY",
                })
            },
        },
        {
            field: "address",
            headerName: "Address",
            flex: 1,
            renderHeader: () => {
                return renderHeader('Address');
            },
            valueGetter: (params) => {
                const primaryAddress = params.value[0];
                return addressFormat(primaryAddress)
            }
        },
        {
            field: "address.city",
            headerName: "City",
            flex: 0.3,
            renderHeader: () => {
                return renderHeader('City');
            },
            valueGetter: ({ row: { address } }) => {
                const primaryAddress = address[0];
                return primaryAddress.city
            }
        },
        {
            field: "address.state",
            headerName: "State",
            flex: 0.25,
            renderHeader: () => {
                return renderHeader('State');
            },
            valueGetter: ({ row: { address } }) => {
                const primaryAddress = address[0];
                return primaryAddress.state
            }
        },
        {
            field: "address.zip",
            headerName: "Zip",
            flex: 0.25,
            renderHeader: () => {
                return renderHeader('Zip');
            },
            valueGetter: ({ row: { address } }) => {
                const primaryAddress = address[0];
                return primaryAddress.zip
            }
        },
        {
            headerName: "Actions",
            flex: 0.5,
            renderHeader: () => {
                return renderHeader('Actions');
            },
            renderCell: ({ row }) => (
                <Box>
                    <IconButton
                        onClick={() => handlePatientModal(row.id)}
                    >
                        <MedicalInformationIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => deletePatient({
                            variables: {
                                id: row.id,
                            }
                        })}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            )
        }
    ]

    return (
        <Box sx={{
            "& .MuiDataGrid-root": {
                border: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
                fontWeight: "bold",
                backgroundColor: "#f4cfb4",
                borderBottom: "none",
            }
        }}>
            <DataGrid
                rows={data ?? []}
                columns={columns}
                loading={loading}
                components={{ Toolbar: GridToolbar }}
                style={{ height: "75vh"}}
            />
            <ModalComponent open={openViewPatientModal} close={() => handleCloseViewPatientModal()}>
                <ViewPatientModal patientID={targetPatientID} />
            </ModalComponent>
        </Box>
    )
}