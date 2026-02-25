import React from "react";
import { NavLink } from "react-router-dom";
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
<<<<<<< HEAD
    Box,
    styled
=======
    Box
>>>>>>> f39772a (centralizing the auth logic and moving the api call to api folder)
} from "@mui/material";
import type { MenuItem } from "../../../config/menuConfig";

interface SidebarItemProps {
    item: MenuItem;
    isExpanded: boolean;
    isActive: boolean;
    onItemClick: () => void;
}

<<<<<<< HEAD
const StyledListItemButton = styled(ListItemButton)<{ component?: React.ElementType; to?: string }>(({ theme }) => ({
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
        '& .sidebar-item-underline::after': {
            transform: 'scaleX(1)',
        }
    },
    '&.active': {
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
        '& .MuiListItemIcon-root': {
            color: theme.palette.primary.main,
        },
        '& .sidebar-item-underline::after': {
            transform: 'scaleX(1)',
        }
    }
}));

const UnderlineWrapper = styled(Box)<{ $isActive: boolean; $isExpanded: boolean }>(({ theme, $isActive, $isExpanded }) => ({
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

=======
>>>>>>> f39772a (centralizing the auth logic and moving the api call to api folder)
const SidebarItem: React.FC<SidebarItemProps> = ({
    item,
    isExpanded,
    isActive,
    onItemClick
}) => {
    return (
<<<<<<< HEAD
        <ListItem disablePadding sx={{ mb: 0.5 }}>
            <StyledListItemButton
=======
        <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
>>>>>>> f39772a (centralizing the auth logic and moving the api call to api folder)
                component={NavLink}
                to={item.path}
                onClick={onItemClick}
                sx={{
<<<<<<< HEAD
                    justifyContent: isExpanded ? 'initial' : 'center',
                    color: isActive ? 'primary.main' : 'text.secondary',
                }}
            >
                <UnderlineWrapper
                    className="sidebar-item-underline"
                    $isActive={isActive}
                    $isExpanded={isExpanded}
=======
                    borderRadius: 0,
                    py: 1,
                    minHeight: 48,
                    justifyContent: isExpanded ? 'initial' : 'center',
                    px: 2.5,
                    bgcolor: 'transparent',
                    color: isActive ? 'primary.main' : 'text.secondary',
                    transition: 'color 0.2s',
                    '&:hover': {
                        bgcolor: 'transparent',
                        color: 'primary.main',
                        '& .MuiListItemIcon-root': { color: 'primary.main' },
                        '& .sidebar-item-underline::after': {
                            transform: 'scaleX(1)',
                        }
                    },
                    '&.active': {
                        bgcolor: 'transparent',
                        color: 'primary.main',
                        '& .MuiListItemIcon-root': { color: 'primary.main' },
                        '& .sidebar-item-underline::after': {
                            transform: 'scaleX(1)',
                        }
                    }
                }}
            >
                <Box
                    className="sidebar-item-underline"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: isExpanded ? 2 : 0,
                        pb: 0.75,
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '2px',
                            bgcolor: 'primary.main',
                            transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                            transformOrigin: 'left',
                            transition: 'transform 0.3s ease-in-out',
                        }
                    }}
>>>>>>> f39772a (centralizing the auth logic and moving the api call to api folder)
                >
                    <ListItemIcon sx={{
                        minWidth: 0,
                        justifyContent: 'center',
                        color: isActive ? 'primary.main' : 'inherit',
                        transition: 'color 0.2s'
                    }}>
                        {item.icon}
                    </ListItemIcon>
                    {isExpanded && (
                        <ListItemText
                            primary={item.text}
                            sx={{ m: 0 }}
                            primaryTypographyProps={{
                                fontSize: '0.9rem',
                                fontWeight: isActive ? 700 : 600,
                                letterSpacing: '0.01em',
                                whiteSpace: 'nowrap'
                            }}
                        />
                    )}
<<<<<<< HEAD
                </UnderlineWrapper>
            </StyledListItemButton>
=======
                </Box>
            </ListItemButton>
>>>>>>> f39772a (centralizing the auth logic and moving the api call to api folder)
        </ListItem>
    );
};

export default SidebarItem;
