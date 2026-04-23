import React from "react";

export interface InfoItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    colorType?: string;
}

export interface ProfileSidebarHeaderProps {
    userName: string | null;
    role: string | null;
    email?: string | null;
    location?: string | null;
}
