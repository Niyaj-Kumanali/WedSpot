import { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    MenuItem,
    TextField,
    useTheme,
    FormControlLabel,
    Switch,
    Breadcrumbs,
    Link
} from '@mui/material';
import {
    NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DashboardCard from '../../../dashboard/components/DashboardCard/DashboardCard';
import InputField from '../../../../components/UI/Form/InputField';
import FormButton from '../../../../components/UI/Button/FormButton';
import { useSnackbar } from '../../../../contexts/SnackbarContext';

// Validation Schema
const schema = yup.object().shape({
    name: yup.string().required('Full Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    role: yup.string().required('Role is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    status: yup.boolean().default(true),
});

const roles = ['Admin', 'Manager', 'Staff', 'Vendor', 'Client'];

const AddUser = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { success } = useSnackbar();
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            role: '',
            password: '',
            status: true,
        },
    });

    const onSubmit = async (data: any) => {
        setLoading(true);
        console.log('Submitting User Data:', data);
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        setLoading(false);
        success('User added successfully!');
        navigate('/admin/users');
    };

    return (
        <Box sx={{ p: 0 }}>
            {/* Header: Title on Left, Breadcrumbs on Right */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Typography 
                    variant="h4" 
                    sx={{ 
                        fontWeight: 800, 
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Add User
                </Typography>

                <Breadcrumbs 
                    separator={<NavigateNextIcon fontSize="small" />} 
                    aria-label="breadcrumb"
                >
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/admin/users"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/admin/users');
                        }}
                        sx={{ fontSize: '0.85rem', fontWeight: 500 }}
                    >
                        Users
                    </Link>
                    <Typography color="text.primary" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
                        Add User
                    </Typography>
                </Breadcrumbs>
            </Box>

            <DashboardCard sx={{ p: 2 }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container spacing={2}>
                        {/* User Information Section title */}
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                                Personal Details
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        label="Full Name *"
                                        placeholder="Enter user's full name"
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                        InputProps={{ sx: { height: '42px' } }}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        label="Email Address *"
                                        placeholder="example@wedspot.com"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        InputProps={{ sx: { height: '42px' } }}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Box>
                                <Typography
                                    component="label"
                                    sx={{
                                        fontSize: "0.875rem",
                                        fontWeight: 600,
                                        color: "#334155",
                                        mb: 0.75,
                                        display: "block",
                                        fontFamily: "'Inter', sans-serif",
                                    }}
                                >
                                    Role *
                                </Typography>
                                <Controller
                                    name="role"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            select
                                            fullWidth
                                            size="small"
                                            error={!!errors.role}
                                            helperText={errors.role?.message}
                                            InputProps={{
                                                sx: { 
                                                    borderRadius: '10px',
                                                    height: '42px',
                                                    bgcolor: '#f8fafc'
                                                }
                                            }}
                                        >
                                            {roles.map((role) => (
                                                <MenuItem key={role} value={role}>
                                                    {role}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        label="Set Password *"
                                        type="password"
                                        placeholder="Min 6 characters"
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        InputProps={{ sx: { height: '42px' } }}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'flex-end', pb: '1px' }}>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            control={
                                                <Switch 
                                                    {...field} 
                                                    checked={field.value} 
                                                    color="primary" 
                                                />
                                            }
                                            label={
                                                <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                                                    Active Status
                                                </Typography>
                                            }
                                        />
                                    )}
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                <FormButton
                                    variant="outlined"
                                    onClick={() => navigate('/admin/users')}
                                    sx={{ 
                                        width: 'auto', 
                                        minWidth: '100px',
                                        px: 3,
                                        height: '40px',
                                        fontSize: '0.9rem',
                                        py: 0,
                                        background: 'transparent',
                                        color: 'text.secondary',
                                        borderColor: '#e2e8f0',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            background: '#f1f5f9',
                                            borderColor: '#cbd5e1',
                                            transform: 'none'
                                        }
                                    }}
                                >
                                    Cancel
                                </FormButton>
                                <FormButton
                                    type="submit"
                                    loading={loading}
                                    sx={{ 
                                        width: 'auto', 
                                        minWidth: '100px',
                                        px: 4, 
                                        height: '40px', 
                                        fontSize: '0.9rem',
                                        py: 0
                                    }}
                                >
                                    Save
                                </FormButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </DashboardCard>
        </Box>
    );
};

export default AddUser;
