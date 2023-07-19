import { Box, TextField, Typography, Select, MenuItem } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const TextTypeField = ({ label, isRequired = false, field, placeholder }) => (
    <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="body2">{label}</Typography>
        <TextField
            required={isRequired}
            placeholder={placeholder}
            {...field}
        />
    </Box>
);


const DateTypeField = ({ label, field }) => (
    <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="body2">{label}</Typography>
        <DatePicker
            required
            {...field}
        />
    </Box>
);

const SelectTypeField = ({ label, isRequired, field, options }) => (
    <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="body2">{label}</Typography>
        <Select
            required={isRequired}
            {...field}
        >
            {options?.map((option) => (
                <MenuItem value={option}>
                    {option}
                </MenuItem>
            ))}
        </Select>
    </Box>
);


export const ConstraintField = ({ label, isRequired, field, placeholder, type, options }) => {
    switch (type) {
        case "string":
            return TextTypeField({ label, isRequired, field, placeholder });
        case "date":
            return DateTypeField({ label, field });
        case "select":
            return SelectTypeField({ label, isRequired, field, options })
        default:
            return null;
    }
}