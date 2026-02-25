import React from "react";
import { NavLink } from "react-router-dom";
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box
} from "@mui/material";
import type { MenuItem } from "../../../config/menuConfig";

interface SidebarItemProps {
    item: MenuItem;
    isExpanded: boolean;
    isActive: boolean;
    onItemClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    item,
    isExpanded,
    isActive,
    onItemClick
}) => {
    return (
        <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
                component={NavLink}
                to={item.path}
                onClick={onItemClick}
                sx={{
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
                </Box>
            </ListItemButton>
        </ListItem>
    );
};

export default SidebarItem;
