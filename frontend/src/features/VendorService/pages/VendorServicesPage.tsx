import React, { useState, useMemo, useCallback } from 'react';
import {
    Box, Typography, Grid, Container, useTheme, alpha,
    InputAdornment, TextField, Button, Skeleton, IconButton, Pagination,
    Drawer, Divider, Slider, RadioGroup, FormControlLabel, Radio, Badge,
    Dialog,
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import {
    Search as SearchIcon, FilterList as FilterIcon,
    Close as CloseIcon, Add as AddIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceManageCard from '@/features/VendorService/components/ServiceManageCard';
import type { VendorService, VendorCategory } from '@/features/vendors/types/vendor';
import { useNavigate } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { VENDOR_SERVICE } from '../api/vendor.api';
import { useUser } from '@/features/user';
import { useSnackbar } from '@/contexts/SnackbarContext';
import CategoryNavigation from '@/features/vendors/components/CategoryNavigation';

const CATEGORIES: VendorCategory[] = [
    { id: 'floral', name: 'Floral Decoration', icon: '🌸', description: 'Artisanal floral designs for every theme' },
    { id: 'coordination', name: 'Wedding Coordination', icon: '📋', description: 'Seamless planning and on-day execution' },
    { id: 'photography', name: 'Cinematic Photoshoot', icon: '📸', description: 'Visual storytelling at its finest' },
    { id: 'makeup', name: 'Luxury Makeup Artist', icon: '💄', description: 'Premium bridal and party beauty services' },
    { id: 'invitations', name: 'Elegant Invitations', icon: '✉️', description: 'Custom-designed stationery and invites' },
    { id: 'catering', name: 'Premium Catering', icon: '🍽️', description: 'Gourmet culinary experiences' },
];

type SortOption = 'price_asc' | 'price_desc' | 'rating_desc' | 'newest' | 'most_reviews';

interface FilterState {
    sort: SortOption;
    priceRange: [number, number];
    location: string;
}

const DEFAULT_FILTERS: FilterState = {
    sort: 'newest',
    priceRange: [0, 500000],
    location: '',
};

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating_desc', label: 'Rating: High to Low' },
    { value: 'most_reviews', label: 'Most Reviews' },
];

const ITEMS_PER_PAGE = 6;


const VendorServicesPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { user } = useUser();
    const { success, error } = useSnackbar();
    const queryClient = useQueryClient();

    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
    const [pendingFilters, setPendingFilters] = useState<FilterState>(DEFAULT_FILTERS);

    const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

    React.useEffect(() => {
        setPage(1);
    }, [activeCategory, searchQuery, filters]);

    const { data: allServices = [], isLoading } = useQuery({
        queryKey: ['vendor-services', user?.id],
        queryFn: () => VENDOR_SERVICE.getVendorServices(Number(user!.id)),
        enabled: !!user?.id,
        select: (response) => response.data ?? [],
    });

    const filteredAndSorted = useMemo(() => {
        let result = allServices.filter((service: VendorService) => {
            const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
            const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPrice = service.price >= filters.priceRange[0] && service.price <= filters.priceRange[1];
            const matchesLocation = !filters.location ||
                service.location.toLowerCase().includes(filters.location.toLowerCase());
            return matchesCategory && matchesSearch && matchesPrice && matchesLocation;
        });

        // ✅ Use service.price (number) consistently — no string arithmetic
        switch (filters.sort) {
            case 'price_asc': result = [...result].sort((a, b) => a.price - b.price); break;
            case 'price_desc': result = [...result].sort((a, b) => b.price - a.price); break;
            case 'rating_desc': result = [...result].sort((a, b) => b.rating - a.rating); break;
            case 'most_reviews': result = [...result].sort((a, b) => b.ratingCount - a.ratingCount); break;
            case 'newest':
            default: break;
        }

        return result;
    }, [allServices, activeCategory, searchQuery, filters]);

    const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);
    const paginatedServices = useMemo(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        return filteredAndSorted.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredAndSorted, page]);

    // Count active filters for badge
    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (filters.sort !== DEFAULT_FILTERS.sort) count++;
        if (filters.priceRange[0] !== DEFAULT_FILTERS.priceRange[0] ||
            filters.priceRange[1] !== DEFAULT_FILTERS.priceRange[1]) count++;
        if (filters.location) count++;
        return count;
    }, [filters]);

    const handlePageChange = useCallback((_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleCategoryChange = useCallback((id: string) => setActiveCategory(id), []);
    const handleEdit = useCallback((service: VendorService) => navigate(`/vendor/services/edit/${service.id}`), [navigate]);

    const { mutate, isPending } = useMutation({
        mutationFn: (serviceId: number) => VENDOR_SERVICE.delete(serviceId),
        onSuccess: (response) => {
            success(response.message ?? 'Service deleted successfully');
            // ✅ Invalidate the query so the list refetches automatically
            queryClient.invalidateQueries({ queryKey: ['vendor-services', user?.id] });
            setDeleteTarget(null);
        },
        onError: (err: any) => {
            const errorMessage =
                err?.response?.data?.message ||
                err?.message ||
                'Failed to delete service.';
            error(errorMessage);
        },
    });


    const handleDeleteClick = useCallback((serviceId: number) => {
        setDeleteTarget(serviceId);
    }, []);

    const handleDeleteConfirm = () => {
        if (deleteTarget !== null) {
            mutate(deleteTarget); // ✅ don't clear here — clear in onSuccess
        }
    }

    const handleDeleteCancel = () => {
        setDeleteTarget(null);
    };

    const openDrawer = () => {
        setPendingFilters(filters); // sync pending with current on open
        setDrawerOpen(true);
    };

    const applyFilters = () => {
        setFilters(pendingFilters);
        setDrawerOpen(false);
    };

    const resetFilters = () => {
        setPendingFilters(DEFAULT_FILTERS);
        setFilters(DEFAULT_FILTERS);
    };

    const activeCategoryName = CATEGORIES.find(s => s.id === activeCategory)?.name;

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 10 }}>

            {/* Header */}
            <Box sx={{
                bgcolor: 'background.default',
                pt: 1, pb: 1,
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}>
                <Container maxWidth="xl">
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: 2, px: 1, py: 1, borderRadius: 1,
                    }}>
                        <TextField
                            placeholder="Find your Services"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{
                                width: { xs: '100%', md: 320 },
                                '& .MuiOutlinedInput-root': {
                                    height: '50px', borderRadius: 2,
                                    bgcolor: alpha(theme.palette.background.paper, 0.8),
                                    backdropFilter: 'blur(12px)',
                                    fontWeight: 700, fontSize: '0.85rem',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                    '& fieldset': { border: 'none' },
                                    '&:hover': {
                                        bgcolor: alpha(theme.palette.background.paper, 1),
                                        boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.08)}`,
                                        transform: 'translateY(-1px)'
                                    },
                                    '&.Mui-focused': {
                                        bgcolor: alpha(theme.palette.background.paper, 1),
                                        boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.12)}`,
                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                    }
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" sx={{ mr: 1.5 }}>
                                        <Box sx={{ p: 0.8, display: 'flex', borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.08) }}>
                                            <SearchIcon sx={{ color: 'primary.main', fontSize: 22 }} />
                                        </Box>
                                    </InputAdornment>
                                ),
                                endAdornment: searchQuery && (
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="small"
                                            onClick={() => setSearchQuery('')}
                                            sx={{
                                                bgcolor: alpha(theme.palette.divider, 0.05),
                                                '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.1), color: 'error.main' }
                                            }}
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <IconButton
                            onClick={() => navigate('/vendor/services/add')}
                            sx={{
                                height: 50, width: 50, borderRadius: 2,
                                bgcolor: 'primary.main', color: 'white', flexShrink: 0,
                                boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
                                '&:hover': { bgcolor: 'primary.dark' }
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Box>
                </Container>
            </Box>

            <Box sx={{ mt: 0, bgcolor: 'background.default', pt: 1, pb: 1 }}>
                <CategoryNavigation
                    categories={CATEGORIES}
                    activeCategoryId={activeCategory}
                    onCategoryChange={handleCategoryChange}
                />

                <Box>
                    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.02em' }}>
                            {activeCategory === 'all' ? 'My Services' : `Services in ${activeCategoryName}`}
                        </Typography>

                        <Badge badgeContent={activeFilterCount} color="primary">
                            <Button
                                startIcon={<FilterIcon />}
                                onClick={openDrawer}
                                variant={activeFilterCount > 0 ? 'contained' : 'outlined'}
                                sx={{
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    borderRadius: '10px',
                                    color: activeFilterCount > 0 ? 'white' : 'text.secondary',
                                    borderColor: alpha(theme.palette.divider, 0.3),
                                }}
                            >
                                Sort & Filter
                            </Button>
                        </Badge>
                    </Box>

                    <Grid container spacing={4} component={motion.div} layout>
                        <AnimatePresence mode="popLayout">
                            {isLoading ? (
                                Array.from({ length: 6 }).map((_, index) => (
                                    <Grid item xs={12} sm={6} lg={4} key={`skeleton-${index}`}>
                                        <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 4 }} />
                                        <Box sx={{ pt: 2 }}>
                                            <Skeleton width="60%" height={32} />
                                            <Skeleton width="40%" height={24} />
                                        </Box>
                                    </Grid>
                                ))
                            ) : paginatedServices.length > 0 ? (
                                paginatedServices.map((service: VendorService) => (
                                    <Grid
                                        item xs={12} sm={6} lg={4}
                                        key={service.id.toString()}
                                        component={motion.div}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        layout
                                    >
                                        <ServiceManageCard
                                            service={service}
                                            onDelete={() => handleDeleteClick(Number(service.id))}
                                            onEdit={handleEdit}
                                        />
                                    </Grid>
                                ))
                            ) : (
                                <Box sx={{ width: '100%', py: 10, textAlign: 'center' }}>
                                    <Typography variant="h6" sx={{ color: 'text.disabled', fontWeight: 700 }}>
                                        No services found matching your current filters.
                                    </Typography>
                                </Box>
                            )}
                        </AnimatePresence>
                    </Grid>

                    {totalPages > 1 && (
                        <Box sx={{
                            mt: 8, display: 'flex', justifyContent: 'center',
                            '& .MuiPagination-ul': { gap: 1 },
                            '& .MuiPaginationItem-root': {
                                borderRadius: '12px', fontWeight: 800, fontSize: '0.9rem',
                                transition: 'all 0.3s ease',
                                '&.Mui-selected': {
                                    bgcolor: 'primary.main', color: 'white',
                                    boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                                    '&:hover': { bgcolor: 'primary.dark' }
                                },
                                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08), transform: 'translateY(-2px)' }
                            }
                        }}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                size="large"
                                color="primary"
                                shape="rounded"
                            />
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Sort & Filter Drawer */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: {
                        width: { xs: '100%', sm: 380 },
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        borderRadius: { sm: '20px 0 0 20px' },
                    }
                }}
            >
                {/* Drawer Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>Sort & Filter</Typography>
                    <IconButton
                        onClick={() => setDrawerOpen(false)}
                        sx={{ bgcolor: alpha(theme.palette.divider, 0.06), borderRadius: '10px' }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>

                <Divider />

                {/* Sort */}
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem', color: 'text.secondary' }}>
                        Sort By
                    </Typography>
                    <RadioGroup
                        value={pendingFilters.sort}
                        onChange={(e) => setPendingFilters(prev => ({ ...prev, sort: e.target.value as SortOption }))}
                    >
                        {SORT_OPTIONS.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio size="small" />}
                                label={
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        {option.label}
                                    </Typography>
                                }
                                sx={{
                                    mb: 0.5,
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: '10px',
                                    border: `1px solid ${pendingFilters.sort === option.value
                                        ? alpha(theme.palette.primary.main, 0.3)
                                        : 'transparent'}`,
                                    bgcolor: pendingFilters.sort === option.value
                                        ? alpha(theme.palette.primary.main, 0.05)
                                        : 'transparent',
                                    transition: 'all 0.2s ease',
                                }}
                            />
                        ))}
                    </RadioGroup>
                </Box>

                <Divider />

                {/* Price Range */}
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem', color: 'text.secondary' }}>
                        Price Range
                    </Typography>
                    <Box sx={{ px: 1 }}>
                        <Slider
                            value={pendingFilters.priceRange}
                            onChange={(_, value) => setPendingFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                            min={0}
                            max={500000}
                            step={5000}
                            valueLabelDisplay="auto"
                            valueLabelFormat={(v) => `₹${(v / 1000).toFixed(0)}k`}
                            sx={{
                                '& .MuiSlider-thumb': { borderRadius: '8px', width: 20, height: 20 },
                                '& .MuiSlider-valueLabel': { borderRadius: '8px', fontWeight: 700 },
                            }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                                ₹{(pendingFilters.priceRange[0] / 1000).toFixed(0)}k
                            </Typography>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                                ₹{(pendingFilters.priceRange[1] / 1000).toFixed(0)}k
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider />

                {/* Location */}
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem', color: 'text.secondary' }}>
                        Location
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="e.g. Mumbai, Delhi..."
                        value={pendingFilters.location}
                        onChange={(e) => setPendingFilters(prev => ({ ...prev, location: e.target.value }))}
                        InputProps={{ sx: { borderRadius: '10px', bgcolor: alpha(theme.palette.divider, 0.04) } }}
                    />
                </Box>

                {/* Drawer Actions — pushed to bottom */}
                <Box sx={{ mt: 'auto', display: 'flex', gap: 1.5 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={resetFilters}
                        sx={{
                            borderRadius: '12px', textTransform: 'none', fontWeight: 700,
                            height: 44, borderColor: alpha(theme.palette.divider, 0.3),
                            color: 'text.secondary',
                            '&:hover': { bgcolor: alpha(theme.palette.divider, 0.06) }
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={applyFilters}
                        sx={{
                            borderRadius: '12px', textTransform: 'none', fontWeight: 800,
                            height: 44,
                            boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
                        }}
                    >
                        Apply Filters
                    </Button>
                </Box>
            </Drawer>
            <Dialog
                open={deleteTarget !== null}
                onClose={handleDeleteCancel}
                PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
            >
                <DialogTitle sx={{ fontWeight: 700 }}>Delete Service?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This will permanently delete the service and cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
                    <Button
                        onClick={handleDeleteCancel}
                        variant="outlined"
                        disabled={isPending}
                        sx={{ borderRadius: '10px', textTransform: 'none' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        variant="contained"
                        color="error"
                        disabled={isPending}
                        sx={{ borderRadius: '10px', textTransform: 'none', minWidth: 80 }}
                    >
                        {isPending ? <CircularProgress size={18} color="inherit" /> : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>

    );
};

export default VendorServicesPage;