<<<<<<< HEAD
<<<<<<< HEAD
import React, { createContext, useState, useContext } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
=======
import React, { createContext, useState, useEffect, useContext } from 'react';
>>>>>>> d720bde (Pushing the project to the repo)
=======
import React, { createContext, useState, useContext } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
>>>>>>> 6c56909 (dashboard converted to MUI and corrected sidebar and navbar)

interface DashboardContextType {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
    openSidebar: () => void;
    isMobile: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

<<<<<<< HEAD
<<<<<<< HEAD
export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const value: DashboardContextType = {
        sidebarOpen,
        isMobile,
        openSidebar: () => setSidebarOpen(true),
        closeSidebar: () => setSidebarOpen(false),
        toggleSidebar: () => setSidebarOpen(p => !p),
    };

    return (
        <DashboardContext.Provider value={value}>
=======
export const DashboardProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
=======
export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
>>>>>>> 6c56909 (dashboard converted to MUI and corrected sidebar and navbar)
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const value: DashboardContextType = {
        sidebarOpen,
        isMobile,
        openSidebar: () => setSidebarOpen(true),
        closeSidebar: () => setSidebarOpen(false),
        toggleSidebar: () => setSidebarOpen(p => !p),
    };

    return (
<<<<<<< HEAD
        <DashboardContext.Provider value = {value}>
>>>>>>> d720bde (Pushing the project to the repo)
=======
        <DashboardContext.Provider value={value}>
>>>>>>> 6c56909 (dashboard converted to MUI and corrected sidebar and navbar)
            {children}
        </DashboardContext.Provider>
    );

};

export const useDashboard = (): DashboardContextType => {
    const context = useContext(DashboardContext);
<<<<<<< HEAD
<<<<<<< HEAD
    if (!context) {
=======
    if(!context) {
>>>>>>> d720bde (Pushing the project to the repo)
=======
    if (!context) {
>>>>>>> 6c56909 (dashboard converted to MUI and corrected sidebar and navbar)
        throw new Error('useDashboard must be used within a DashboardProvider');
    }

    return context;
}