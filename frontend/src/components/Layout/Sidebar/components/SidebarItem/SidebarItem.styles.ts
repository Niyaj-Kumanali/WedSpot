import {
    ListItemButton,
    Box,
    styled
} from "@mui/material";

export const StyledListItemButton = styled(ListItemButton)<{ component?: React.ElementType; to?: string }>(({ theme }) => ({
    borderRadius: 0,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    minHeight: 48,
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    backgroundColor: 'transparent',
    transition: 'color 0.2s',
    '&:hover': {
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
        '& .MuiListItemIcon-root': {
            color: theme.palette.primary.main,
        },
    },
    '&.active': {
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
        '& .MuiListItemIcon-root': {
            color: theme.palette.primary.main,
        },
    }
}));

export const UnderlineWrapper = styled(Box, {
    shouldForwardProp: (prop) => prop !== '$isActive' && prop !== '$isExpanded',
})<{ $isActive: boolean; $isExpanded: boolean }>(({ theme, $isActive, $isExpanded }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: $isExpanded ? theme.spacing(2) : 0,
    paddingBottom: theme.spacing(0.75),
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '2px',
        backgroundColor: theme.palette.primary.main,
        transform: $isActive ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.3s ease-in-out',
    }
}));
