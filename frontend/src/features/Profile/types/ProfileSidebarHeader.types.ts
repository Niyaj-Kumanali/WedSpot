import React from "react";

export interface InfoItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    colorType?: string;
}

export interface ProfileSidebarHeaderProps {
    name: string | null;
    role: string | null;
    email?: string | null;
    address?: string | null;
}
