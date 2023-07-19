import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Table } from "../components/Table";
import { useQuery } from "@apollo/client";
import { GET_ALL_PATIENTS } from "../queries/patientQueries";
import PeopleIcon from '@mui/icons-material/People';
import { IconWrapper } from "../components/IconWrapper";
import { ModalComponent } from "../components/Modal";
import { PatientForm } from "../components/PatientForm";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import CircularProgress from '@mui/material/CircularProgress';

const Dashboard = () => {
    const [openAddPatientModal, setOpenAddPatientModal] = useState(false);
    const { loading, data } = useQuery(GET_ALL_PATIENTS);

    const handleCloseAddPatientModal = () => setOpenAddPatientModal(false);

    return (
        <>
            <Box display="flex" flexDirection="column" sx={{ width: "100%", p: 4 }}>
                <Box display="flex" alignItems="center">
                    <IconWrapper>
                        <PeopleIcon fontSize="large" />
                    </IconWrapper>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        Patients
                    </Typography>
                </Box>
                <Box>
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                    >
                        <Button
                            variant="contained"
                            onClick={() => setOpenAddPatientModal(true)}
                        >
                            Add Patient
                        </Button>
                    </Box>
                    <Table data={data?.getAllPatients} loading={loading} />
                </Box>
            </Box>
            <ModalComponent open={openAddPatientModal} close={() => handleCloseAddPatientModal()}>
                <PatientForm type="add" close={() => handleCloseAddPatientModal()} />
            </ModalComponent>
        </>
    );
}

export default withAuthenticationRequired(Dashboard, {
    onRedirecting: () => <CircularProgress />
});