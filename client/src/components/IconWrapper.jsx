import { Box } from "@mui/material";

export const IconWrapper = ({ margin, padding, width, height, onClick, children }) => (
    <Box
        display="flex"
        m={margin}
        p={padding ?? 2}
        width={width}
        height={height}
        justifyContent="center"
        alignItems="center"
        onClick={onClick}
        sx={{ cursor: "pointer" }}
    >
        {children}
    </Box>
)