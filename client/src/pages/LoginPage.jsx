import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import { Theme } from "../theme";

export const LoginPage = () => {
    const { loginWithRedirect, user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate("/dashboard")
    }, [isAuthenticated])

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            backgroundColor={Theme.color.company}
            sx={{
                height: "100%"
            }}
        >
            <Box    
                component="img"
                alt="Finni Health"
                src="https://bookface-images.s3.amazonaws.com/logos/7037f5bd211a9cd0582dc06e2a8858da10f4fc1d.png"
                sx={{
                    borderRadius: 10,
                    width: "200px",
                    cursor: "pointer"
                }}
                onClick={() => loginWithRedirect()}
            />
        </Box>
    )
}