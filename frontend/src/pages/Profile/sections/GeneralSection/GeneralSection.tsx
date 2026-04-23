import React, { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    TextField,
    InputAdornment,
    Button,
    CircularProgress,
} from "@mui/material";
import {
    Person as PersonIcon,
    Mail as MailIcon,
    Phone as PhoneIcon,
    Language as GlobeIcon,
    Check as CheckIcon,
} from "@mui/icons-material";
import type { GeneralSectionProps } from "./GeneralSection.types";
import { inputFieldSx, captionSx, saveButtonSx } from "./GeneralSection.styles";

const GeneralSection: React.FC<GeneralSectionProps> = ({ user, loading, onSave }) => {
    const [name, setName] = useState(user?.name || "");
    const [phone, setPhone] = useState(user?.phoneNumber || "");
    const [location, setLocation] = useState(user?.location || "");
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    // Sync state when user data loads
    React.useEffect(() => {
        if (user) {
            setName(user.name || "");
            setPhone(user.phoneNumber || "");
            setLocation(user.location || "");
        }
    }, [user]);

    const handleSave = async () => {
        setSaving(true);
        setSaved(false);
        try {
            await onSave({ name, phoneNumber: phone, location });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            console.error("Save failed", error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Personal Information</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>Update your basic information and contact details.</Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={captionSx}>FULL NAME</Typography>
                    <TextField
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter full name"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PersonIcon fontSize="small" /></InputAdornment>,
                            sx: inputFieldSx
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={captionSx}>EMAIL ADDRESS</Typography>
                    <TextField
                        fullWidth
                        value={user?.email || ""}
                        disabled
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><MailIcon fontSize="small" /></InputAdornment>,
                            sx: inputFieldSx
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={captionSx}>PHONE NUMBER</Typography>
                    <TextField
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter phone number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PhoneIcon fontSize="small" /></InputAdornment>,
                            sx: inputFieldSx
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={captionSx}>LOCATION</Typography>
                    <TextField
                        fullWidth
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter location"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><GlobeIcon fontSize="small" /></InputAdornment>,
                            sx: inputFieldSx
                        }}
                    />
                </Grid>
            </Grid>
            <Box sx={{ mt: 5, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleSave}
                    disabled={saving}
                    startIcon={saved ? <CheckIcon /> : undefined}
                    sx={saveButtonSx}
                >
                    {saving ? <CircularProgress size={24} color="inherit" /> : saved ? "Saved!" : "Save Changes"}
                </Button>
            </Box>
        </Box>
    );
};

export default GeneralSection;
