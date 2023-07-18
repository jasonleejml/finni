import React from "react";
import { Box, Typography } from "@mui/material";
import { Table } from "../components/Table";
import { useQuery } from "@apollo/client";
import { GET_ALL_PATIENTS } from "../queries/patient";
import PeopleIcon from '@mui/icons-material/People';
import { IconWrapper } from "../components/IconWrapper";

export const Dashboard = () => {
    const { loading, error, data } = useQuery(GET_ALL_PATIENTS);

    return (
        <Box display="flex" flexDirection="column" sx={{ p: 2 }}>
            <Box display="flex" alignItems="center">
                <IconWrapper>
                    <PeopleIcon fontSize="large"/>
                </IconWrapper>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  Patients
                </Typography>
            </Box>
            <Table data={data?.getAllPatients}/>
        </Box>
    )
}