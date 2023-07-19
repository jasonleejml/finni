import React from "react";
import { Box, Typography } from "@mui/material";

export const NotFound = () => (
    <Box display="flex" flexDirection="column" sx={{ p: 4 }}>
        <Box display="flex" alignItems="center">
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Page Not Found!
            </Typography>
        </Box>
    </Box>
);