<<<<<<< HEAD
import React, { createContext, useState, useContext } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
=======
import React, { createContext, useState, useEffect, useContext } from 'react';
>>>>>>> d720bde (Pushing the project to the repo)

interface DashboardContextType {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
    openSidebar: () => void;
    isMobile: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

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
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);

            if(!mobile) {
                setSidebarOpen(false);
            }

    };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, []);

    const value: DashboardContextType = {
    sidebarOpen,
    isMobile,
    openSidebar: () => setSidebarOpen(true),
    closeSidebar: () => setSidebarOpen(false),
    toggleSidebar: () => setSidebarOpen(p => !p),
  };

    return (
        <DashboardContext.Provider value = {value}>
>>>>>>> d720bde (Pushing the project to the repo)
            {children}
        </DashboardContext.Provider>
    );

};

export const useDashboard = (): DashboardContextType => {
    const context = useContext(DashboardContext);
<<<<<<< HEAD
    if (!context) {
=======
    if(!context) {
>>>>>>> d720bde (Pushing the project to the repo)
        throw new Error('useDashboard must be used within a DashboardProvider');
    }

    return context;
}