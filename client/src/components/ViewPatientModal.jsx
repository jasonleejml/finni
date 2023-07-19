import React, { useMemo, useState } from "react";
import { Box, Typography, Divider, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_PATIENTS, GET_PATIENT } from "../queries/patientQueries";
import { AvatarComponent } from "./Avatar";
import { nameFormat } from "./utils/nameFormat";
import { convertTimestampToUTC } from "./utils/convertTimestampToUTC";
import { ModalComponent } from "./Modal";
import { PatientForm } from "./PatientForm";
import moment from "moment";
import { UPDATE_PATIENT } from "../mutations/patientMutations";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';

const initialRequiredFields = [
    {
        name: "firstName",
        label: "First Name",
    },
    {
        name: "middleName",
        label: "Middle Name",
    },
    {
        name: "lastName",
        label: "Last Name",
    },
    {
        name: "dob",
        label: "Date of Birth",
    }
];

const addressFields = [
    {
        name: "street1",
        label: "Address Line 1",
    },
    {
        name: "street2",
        label: "Address Line 2",
    },
    {
        name: "city",
        label: "City",
    },
    {
        name: "state",
        label: "State",
    },
    {
        name: "zip",
        label: "Zip Code",
    },
]

export const ViewPatientModal = ({ patientID }) => {
    const [openEditPatientModal, setOpenEditPatientModal] = useState(false);

    const { loading, data } = useQuery(GET_PATIENT, {
        variables: { id: patientID },
    });

    const [updatePatient] = useMutation(UPDATE_PATIENT, {
        onCompleted: () => {
            setOpenEditPatientModal(false);
            toast.success("Updated the patient successfully!")
        },
        refetchQueries: [{ query: GET_PATIENT, variables: { id: patientID } }, { query: GET_ALL_PATIENTS }]
    })

    const patientData = data?.getPatient;
    const firstLastName = nameFormat({
        firstName: patientData?.firstName,
        lastName: patientData?.lastName,
    })
    const fullName = nameFormat({
        firstName: patientData?.firstName,
        middleName: patientData?.middleName,
        lastName: patientData?.lastName,
    });

    const renderInitialRequiredFields = useMemo(() => (
        <Box
            display="flex"
            flexDirection="column"
            gap={2}
            mb={2}
        >
            {initialRequiredFields.map((field, index) => {
                let value;

                if (field.name === "dob") {
                    value = convertTimestampToUTC({
                        timestamp: patientData?.dob,
                        format: "MMMM D, YYYY",
                    });
                } else {
                    value = patientData && patientData[field.name]
                }

                return (
                    <Box
                        key={`${field.label}-${index}`}
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gridTemplateRows: "auto"
                        }}
                    >
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{field.label}</Typography>
                        <Typography variant="body1">{value}</Typography>
                    </Box>
                )
            })}
        </Box>
    ), [patientData])

    const renderAddressFields = useMemo(() => (
        patientData?.address.map((address, index) => (
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                mb={2}
            >
                <Divider />
                {addressFields.map((field, i) => (
                    <Box
                        key={`${field.label}-${i}`}
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gridTemplateRows: "auto"
                        }}
                    >
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{field.label}</Typography>
                        <Typography variant="body1">{patientData && patientData?.address[index][field.name]}</Typography>
                    </Box>
                ))}
            </Box>
        ))
    ), [patientData])

    const renderAdditionalFields = useMemo(() => (
        <Box
            display="flex"
            flexDirection="column"
            gap={2}
            mb={2}
        >
            {patientData?.additionalFields.length !== 0 && (<Divider />)}
            {patientData?.additionalFields.map((field, index) => (
                <Box
                    key={`${field.title}-${index}`}
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gridTemplateRows: "auto"
                    }}
                >
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{field.title}</Typography>
                    <Typography variant="body1">{patientData?.additionalFields[index].value}</Typography>
                </Box>
            ))}
        </Box>
    ), [patientData])

    const handleCloseEditPatientModal = () => {
        setOpenEditPatientModal(false);
    };

    return (
        loading ? (
            <Box
                display="flex"
                justifyContent="center"
            >
                <CircularProgress />
            </Box>
        ) : (
            <Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    p={1}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        gap={2}
                    >
                        <AvatarComponent name={firstLastName} />
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{fullName}</Typography>
                    </Box>
                    <IconButton onClick={() => setOpenEditPatientModal(true)}><EditIcon /></IconButton>
                </Box>
                <Divider />
                <Box
                    sx={{
                        padding: 2,
                    }}
                >
                    {renderInitialRequiredFields}
                    {renderAddressFields}
                    {renderAdditionalFields}
                </Box>
                <ModalComponent open={openEditPatientModal} close={() => handleCloseEditPatientModal()}>
                    <PatientForm
                        type="edit"
                        close={() => handleCloseEditPatientModal()}
                        defaultValues={{
                            firstName: patientData?.firstName,
                            middleName: patientData?.middleName,
                            lastName: patientData?.lastName,
                            dob: moment(new Date(parseInt(patientData?.dob))).utc(),
                            address: patientData?.address,
                            additionalFields: patientData?.additionalFields
                        }}
                        patientID={patientID}
                        update={updatePatient}
                    />
                </ModalComponent>
            </Box>
        )
    )
}