import React from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Typography } from "@mui/material";
import { IconWrapper } from "../components/IconWrapper";

export const Settings = () => (
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