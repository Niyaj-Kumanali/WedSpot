import React, { useState, useEffect, useCallback } from "react";
import {
    Box,
    Grid,
    Fade
} from "@mui/material";
import { useAuth } from "@/features/auth";
import { useUser } from "@/features/user";
import { USER_SERVICE, type UserProfile } from "@/features/user/api/user.api";
import DashboardCard from "@/features/dashboard/components/DashboardCard/DashboardCard";

// Import reorganized components from final locations
import ProfileSidebarHeader from "./components/ProfileSidebarHeader";
import ProfileTopNav from "./ProfileTopNav";
import GeneralSection from "./sections/GeneralSection";
import SecuritySection from "./sections/SecuritySection";
import NotificationsSection from "./sections/NotificationsSection";

const Profile: React.FC = () => {
    const { userId } = useAuth();
    const { user: currentUser, setUser: updateGlobalUser } = useUser();
    const [activeTab, setActiveTab] = useState(0);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = useCallback(async () => {
        if (!userId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const response = await USER_SERVICE.getProfile(Number(userId));
            if (response.ok && response.data) {
                // Determine if data is the user object directly or nested
                const rawData = (response.data as any).data || response.data;

                // Safely map properties in case of serialization inconsistencies
                const normalizedProfile: UserProfile = {
                    id: rawData.id || rawData.Id,
                    name: rawData.name || rawData.Name || "",
                    email: rawData.email || rawData.Email || "",
                    role: rawData.role || rawData.Role || "",
                    phoneNumber: rawData.phoneNumber || rawData.PhoneNumber || "",
                    location: rawData.location || rawData.Location || ""
                };

                setProfile(normalizedProfile);

                // Only sync context if it's currently empty to avoid re-render loops
                if (!currentUser?.name || currentUser.name === "") {
                    updateGlobalUser({
                        ...normalizedProfile,
                        id: normalizedProfile.id.toString()
                    });
                }
            }
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        } finally {
            setLoading(false);
        }
    }, [userId]); // Removed currentUser from dependencies to break the loop

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const handleSave = async (data: { name: string; phoneNumber: string; location: string }) => {
        const effectiveId = userId || currentUser?.id;
        if (!effectiveId) return;

        const response = await USER_SERVICE.updateProfile(Number(effectiveId), {
            name: data.name,
            email: profile?.email || currentUser?.email || "",
            phoneNumber: data.phoneNumber,
            location: data.location,
        });

        if (response.ok && response.data) {
            setProfile(response.data);
            // Keep user context in sync
            updateGlobalUser({
                id: effectiveId,
                name: response.data.name,
                email: response.data.email,
                role: response.data.role,
                phoneNumber: response.data.phoneNumber,
                location: response.data.location
            });
        }
    };

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ p: { xs: 2, md: 2 }, maxWidth: 1400, margin: '0 auto', animation: 'fadeIn 0.6s ease-out' }}>
            <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
                {/* Left Column: Full-Height Profile Overview */}
                <Grid item xs={12} md={4} lg={3.5}>
                    <ProfileSidebarHeader
                        userName={profile?.name || currentUser?.name || null}
                        role={profile?.role || currentUser?.role || null}
                        email={profile?.email || currentUser?.email || null}
                        location={profile?.location || currentUser?.location || null}
                    />
                </Grid>

                {/* Right Column: Content Area with Unified Navigation */}
                <Grid item xs={12} md={8} lg={8.5}>
                    <DashboardCard noPadding sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 550 }}>
                        {/* Integrated Top Navigation */}
                        <Box sx={{ px: 1, pt: 1, borderBottom: 1, borderColor: 'divider' }}>
                            <ProfileTopNav activeTab={activeTab} onTabChange={handleTabChange} />
                        </Box>

                        {/* Content Display Area */}
                        <Box sx={{ p: 4, flexGrow: 1 }}>
                            <Fade in={activeTab === 0} timeout={1000}>
                                <Box hidden={activeTab !== 0}>
                                    <GeneralSection user={profile} loading={loading} onSave={handleSave} />
                                </Box>
                            </Fade>
                            <Fade in={activeTab === 1} timeout={1000}>
                                <Box hidden={activeTab !== 1}>
                                    <SecuritySection />
                                </Box>
                            </Fade>
                            <Fade in={activeTab === 2} timeout={1000}>
                                <Box hidden={activeTab !== 2}>
                                    <NotificationsSection />
                                </Box>
                            </Fade>
                        </Box>
                    </DashboardCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;
