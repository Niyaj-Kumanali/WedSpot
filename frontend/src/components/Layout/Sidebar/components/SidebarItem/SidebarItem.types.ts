import type { MenuItem } from "@/config/menuConfig";

export interface SidebarItemProps {
    item: MenuItem;
    isExpanded: boolean;
    isActive: boolean;
    onItemClick: () => void;
}
