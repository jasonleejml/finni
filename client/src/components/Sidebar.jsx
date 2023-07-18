import React from "react";
import { useNavigate } from "react-router-dom"
import { Box, Avatar } from "@mui/material";
import { IconWrapper } from "./IconWrapper";
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Theme } from "../theme";

export const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <Box 
            display="flex" 
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            height="100%"
            width="100px"
            backgroundColor={Theme.color.company}
        >
            <Box display="flex" flexDirection="column" width="100%" alignItems="center">
                <Avatar alt="Finni Health" src="logo.png" sx={{ p: 2, width: "80px", height: "80px", borderRadius: "20px" }}/>
                <IconWrapper onClick={() => navigate("/")}>
                    <PeopleIcon fontSize="large"/>
                </IconWrapper>
                <IconWrapper onClick={() => navigate("/settings")}>
                    <SettingsIcon fontSize="large"/>
                </IconWrapper>
            </Box>
            <IconWrapper onClick={() => console.log('bye')}>
                <LogoutIcon fontSize="large"/>
            </IconWrapper>
        </Box>
    )
}