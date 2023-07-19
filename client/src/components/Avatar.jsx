import React from "react";
import { Avatar } from "@mui/material";
import { stringToColor } from "./utils/stringToColor";

const stringAvatar = (name) => (
    {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    }
);

export const AvatarComponent = ({ name }) => (
    <Avatar {...stringAvatar(name)} />
);