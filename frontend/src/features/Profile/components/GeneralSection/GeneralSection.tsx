import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    TextField,
    InputAdornment,
    Button,
    CircularProgress,
    Alert,
} from "@mui/material";
import {
    Person as PersonIcon,
    Mail as MailIcon,
    Phone as PhoneIcon,
    Language as GlobeIcon,
    Check as CheckIcon,
} from "@mui/icons-material";
import type { GeneralSectionProps } from "../../types/GeneralSection.types";
import { inputFieldSx, captionSx, saveButtonSx } from "./GeneralSection.styles";
import { useUser } from "@/features/user/context/useUser";
import type { User } from "@/features/auth";

const GeneralSection: React.FC<GeneralSectionProps> = ({ loading, onSave }) => {
    const { user } = useUser();
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState<User>(user!);

    useEffect(() => {
        if (user) {
            setForm(user);
        }
    }, [user]);

    const handleChange = (field: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        if (error) setError(null); // clear error on change
    };

    const handleSave = async () => {
        if (!user) return;

        setError(null);
        setSaving(true);
        setSaved(false);

        try {
            await onSave({ ...user, ...form });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to save profile changes.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                Personal Information
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                Update your basic information and contact details.
            </Typography>

            {error && (
                <Alert
                    severity="error"
                    onClose={() => setError(null)}
                    sx={{ mb: 3, borderRadius: 2 }}
                >
                    {error}
                </Alert>
            )}

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={captionSx}>FULL NAME</Typography>
                    <TextField
                        fullWidth
                        value={form.name}
                        onChange={handleChange("name")}
                        placeholder="Enter full name"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon fontSize="small" />
                                </InputAdornment>
                            ),
                            sx: inputFieldSx,
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={captionSx}>EMAIL ADDRESS</Typography>
                    <TextField
                        fullWidth
                        value={form.email}
                        disabled
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MailIcon fontSize="small" />
                                </InputAdornment>
                            ),
                            sx: inputFieldSx,
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={captionSx}>PHONE NUMBER</Typography>
                    <TextField
                        fullWidth
                        value={form.phoneNumber}
                        onChange={handleChange("phoneNumber")}
                        placeholder="Enter phone number"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIcon fontSize="small" />
                                </InputAdornment>
                            ),
                            sx: inputFieldSx,
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={captionSx}>ADDRESS</Typography>
                    <TextField
                        fullWidth
                        value={form.address}
                        onChange={handleChange("address")}
                        placeholder="Enter address"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <GlobeIcon fontSize="small" />
                                </InputAdornment>
                            ),
                            sx: inputFieldSx,
                        }}
                    />
                </Grid>
            </Grid>

            <Box sx={{ mt: 5, display: "flex", justifyContent: "flex-end" }}>
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleSave}
                    disabled={saving || !user}
                    startIcon={saved ? <CheckIcon /> : undefined}
                    sx={saveButtonSx}
                >
                    {saving ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : saved ? (
                        "Saved!"
                    ) : (
                        "Save Changes"
                    )}
                </Button>
            </Box>
        </Box>
    );
};

export default GeneralSection;