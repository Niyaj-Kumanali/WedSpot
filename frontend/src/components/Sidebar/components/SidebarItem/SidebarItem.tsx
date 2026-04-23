import React from "react";
import { NavLink } from "react-router-dom";
import {
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import type { SidebarItemProps } from "./SidebarItem.types";
import { StyledListItemButton, UnderlineWrapper } from "./SidebarItem.styles";

const SidebarItem: React.FC<SidebarItemProps> = ({
    item,
    isExpanded,
    isActive,
    onItemClick
}) => {
    return (
        <ListItem disablePadding sx={{ mb: 0.5 }}>
            <StyledListItemButton
                component={NavLink}
                to={item.path}
                onClick={onItemClick}
                sx={{
                    justifyContent: isExpanded ? 'initial' : 'center',
                    color: isActive ? 'primary.main' : 'text.secondary',
                }}
            >
                <UnderlineWrapper
                    className="sidebar-item-underline"
                    $isActive={isActive}
                    $isExpanded={isExpanded}
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
                </UnderlineWrapper>
            </StyledListItemButton>
        </ListItem>
    );
};

export default SidebarItem;
