import type { SxProps, Theme } from "@mui/material";

export const inputFieldSx: SxProps<Theme> = {
    borderRadius: 3
};

export const captionSx: SxProps<Theme> = {
    fontWeight: 700,
    color: 'text.secondary',
    ml: 0.5,
    mb: 1,
    display: 'block'
};

export const saveButtonSx: SxProps<Theme> = {
    borderRadius: 3, 
    px: 6, 
    py: 1.5, 
    fontWeight: 800 
};
