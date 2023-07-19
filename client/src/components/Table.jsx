import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Avatar, Typography } from "@mui/material";
import moment from "moment";
import { stringToColor } from "./utils/stringToColor";
import { addressFormat } from "./utils/addressFormat";

const stringAvatar = (name) => (
    {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    }
);

const renderHeader = (params) => (
    <Typography sx={{ fontWeight: 'bold' }}>{params}</Typography>
);

export const Table = ({ data, loading }) => {
    const columns = [
        {
            field: "Avatar",
            headerName: "",
            renderCell: ({ row: { firstName, lastName } }) => {
                const fullName = `${firstName} ${lastName}`;
                return (
                    <Avatar {...stringAvatar(fullName)}/>
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
                const date = new Date(parseInt(params.value));
                const formattedDate = moment.utc(date).format("MMMM D, YYYY");
                
                return formattedDate;
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
            flex: 0.5,
            renderHeader: () => {
                return renderHeader('City');
            },
            valueGetter: ({ row: { address }}) => {
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
            valueGetter: ({ row: { address }}) => {
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
            valueGetter: ({ row: { address }}) => {
                const primaryAddress = address[0];
                return primaryAddress.zip
            }
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
            />
        </Box>
    )
}