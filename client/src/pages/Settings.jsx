import React from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Typography } from "@mui/material";
import { IconWrapper } from "../components/IconWrapper";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import CircularProgress from '@mui/material/CircularProgress';

const Settings = () => (
    <Box display="flex" flexDirection="column" sx={{ p: 4 }}>
        <Box display="flex" alignItems="center">
            <IconWrapper>
                <SettingsIcon fontSize="large" />
            </IconWrapper>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Settings
            </Typography>
        </Box>
    </Box>
);

export default withAuthenticationRequired(Settings, {
    onRedirecting: () => <CircularProgress />
});