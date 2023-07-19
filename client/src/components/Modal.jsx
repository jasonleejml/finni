import React from "react";
import { Dialog, Box } from "@mui/material";

const style = {
    width: 600,
    boxShadow: 24,
    p: 2,
    borderRadius: 2,
  };

export const ModalComponent = ({ open, close, children }) => {

    return (
        <Dialog open={open} onClose={close} maxWidth="lg" scroll="paper">
            <Box sx={{ ...style }}>
                {children}
            </Box>
        </Dialog>
    )
}