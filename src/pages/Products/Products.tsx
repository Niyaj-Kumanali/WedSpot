<<<<<<< HEAD
import React, { useState, useMemo, useEffect } from 'react';
import { 
    Box, 
    Typography, 
    Grid, 
    Container, 
    useTheme, 
    alpha,
    Button,
    Skeleton,
    Pagination,
    InputAdornment,
    TextField
} from '@mui/material';
import { 
    Search as SearchIcon, 
    Verified as VerifiedIcon,
    FilterList as FilterIcon
} from '@mui/icons-material';
import VendorCard from '../../components/Vendors/VendorCard';
import type { Vendor } from '../../Types/vendor';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_VENDORS } from '../../constants/mockVendors';

const ALL_VENDORS = MOCK_VENDORS;

const ITEMS_PER_PAGE = 6;

const mockProducts: Vendor[] = ALL_VENDORS;

const ProductsPage: React.FC = () => {
    const theme = useTheme();
    
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return mockProducts.filter((product: Vendor) => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSearch;
        });
    }, [searchQuery]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = useMemo(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredProducts, page]);

    useEffect(() => {
        setPage(1);
    }, [searchQuery]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setIsLoading(true);
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setIsLoading(false), 400);
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 10 }}>
            {/* Premium Header Section */}
            <Box sx={{ 
                bgcolor: 'background.paper', 
                pt: 8, 
                pb: 6, 
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`
            }}>
                <Container maxWidth="xl">
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography 
                            variant="h1" 
                            sx={{ 
                                fontWeight: 900, 
                                fontSize: { xs: '2.1rem', md: '3.5rem' }, 
                                mb: 2, 
                                letterSpacing: '-0.04em',
                                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Marketplace Products
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 600, maxWidth: '700px', mx: 'auto', lineHeight: 1.6 }}>
                            Curated elite services for extraordinary wedding events.
                        </Typography>
                    </Box>

                    {/* Search Bar */}
                    <Box sx={{ 
                        maxWidth: 600,
                        mx: 'auto',
                        px: 3,
                        py: 2.5,
                        bgcolor: alpha(theme.palette.background.paper, 0.4),
                        backdropFilter: 'blur(10px)',
                        borderRadius: 5,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    }}>
                        <TextField
                            fullWidth
                            placeholder="Find your elite service partner..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: '52px',
                                    borderRadius: '16px',
                                    bgcolor: 'background.paper',
                                    fontWeight: 600,
                                    '&:hover fieldset': { borderColor: alpha(theme.palette.primary.main, 0.5) },
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: 'text.disabled' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <VerifiedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                                            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary' }}>Elite Only</Typography>
                                        </Box>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{ mt: 4 }}>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: '-0.02em', fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                        Elite Collections
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled' }}>
                            {filteredProducts.length} Results
                        </Typography>
                        <Button startIcon={<FilterIcon />} sx={{ fontWeight: 800, textTransform: 'none', color: 'text.secondary' }}>Filter</Button>
                    </Box>
                </Box>

                <Grid container spacing={4} component={motion.div} layout>
                    <AnimatePresence mode="popLayout">
                        {isLoading ? (
                            Array.from(new Array(6)).map((_, index) => (
                                <Grid item xs={12} sm={6} lg={4} xl={3} key={`skeleton-${index}`}>
                                    <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 4 }} />
                                    <Box sx={{ pt: 2 }}>
                                        <Skeleton width="60%" height={32} />
                                        <Skeleton width="40%" height={24} />
                                    </Box>
                                </Grid>
                            ))
                        ) : paginatedProducts.length > 0 ? (
                            paginatedProducts.map((product: Vendor) => (
                                <Grid 
                                    item 
                                    xs={12} 
                                    sm={6} 
                                    lg={4} 
                                    xl={3}
                                    key={product.id}
                                    component={motion.div}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    layout
                                >
                                    <VendorCard vendor={product} />
                                </Grid>
                            ))
                        ) : (
                            <Box sx={{ width: '100%', py: 10, textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ color: 'text.disabled', fontWeight: 700 }}>
                                    No elite services match your search.
                                </Typography>
                            </Box>
                        )}
                    </AnimatePresence>
                </Grid>

                {/* Pagination Section */}
                {totalPages > 1 && (
                    <Box sx={{ 
                        mt: 4, 
                        display: 'flex', 
                        justifyContent: 'center',
                        '& .MuiPagination-ul': { gap: 1 },
                        '& .MuiPaginationItem-root': {
                            borderRadius: '12px',
                            fontWeight: 800,
                            fontSize: '0.9rem',
                            transition: 'all 0.3s ease',
                            '&.Mui-selected': {
                                bgcolor: 'primary.main',
                                color: 'white',
                                boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                }
                            },
                            '&:hover': {
                                bgcolor: alpha(theme.palette.primary.main, 0.08),
                                transform: 'translateY(-2px)'
                            }
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
            </Container>
=======
import {
    Box,
    Typography,
    Grid,
    CardMedia,
    Button,
    Rating,
    Chip,
    IconButton
} from '@mui/material';
import {
    Favorite as FavoriteIcon,
    ShoppingCart as CartIcon
} from '@mui/icons-material';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';

interface Product {
    id: string;
    name: string;
    category: string;
    price: string;
    rating: number;
    reviews: number;
    image: string;
}

const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Royal Heritage Banquet',
        category: 'Venue',
        price: '₹2,50,000 / day',
        rating: 4.8,
        reviews: 124,
        image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: '2',
        name: 'Elite Catering Protocol',
        category: 'Catering',
        price: '₹1,500 / plate',
        rating: 4.9,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: '3',
        name: 'Cinematic Visuals (4K)',
        category: 'Photography',
        price: '₹1,20,000 / event',
        rating: 4.7,
        reviews: 56,
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: '4',
        name: 'Floral Design AI',
        category: 'Decor',
        price: '₹85,000 / theme',
        rating: 4.9,
        reviews: 210,
        image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800'
    },
];

const ProductsPage = () => {
    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <DashboardHeader
                title="Solutions Catalog"
                subtitle="Explore premium services and assets for your wedding protocol"
            />

            <Grid container spacing={3} sx={{ mt: 1 }}>
                {mockProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <DashboardCard sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            <Box sx={{ position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.image}
                                    alt={product.name}
                                />
                                <Chip
                                    label={product.category}
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 12,
                                        right: 12,
                                        bgcolor: 'rgba(255,255,255,0.9)',
                                        backdropFilter: 'blur(4px)',
                                        fontWeight: 800,
                                        color: 'primary.main',
                                        borderRadius: 1.5
                                    }}
                                />
                            </Box>

                            <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1.2 }}>
                                        {product.name}
                                    </Typography>
                                    <IconButton size="small" sx={{ color: 'error.light', p: 0.5 }}>
                                        <FavoriteIcon fontSize="small" />
                                    </IconButton>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
                                    <Rating value={product.rating} precision={0.1} size="small" readOnly />
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                        ({product.reviews})
                                    </Typography>
                                </Box>

                                <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 800, mb: 2 }}>
                                    {product.price}
                                </Typography>

                                <Box sx={{ mt: 'auto', display: 'flex', gap: 1 }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        size="small"
                                        startIcon={<CartIcon />}
                                        sx={{
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            bgcolor: 'primary.main',
                                            boxShadow: 'none',
                                            '&:hover': { bgcolor: 'primary.dark', boxShadow: 'none' }
                                        }}
                                    >
                                        Quick Book
                                    </Button>
                                </Box>
                            </Box>
                        </DashboardCard>
                    </Grid>
                ))}
            </Grid>
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
        </Box>
    );
};

export default ProductsPage;
