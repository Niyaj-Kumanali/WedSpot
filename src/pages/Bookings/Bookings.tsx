<<<<<<< HEAD
import { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Button,
    alpha,
    useTheme,
    useMediaQuery
=======
import { useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    Button,
    Avatar,
    alpha,
    useTheme,
    Grid,
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
} from '@mui/material';
import {
    CalendarMonth as CalendarIcon,
    List as ListIcon,
<<<<<<< HEAD
    MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/Auth/useAuth';
import { useMaterialReactTable } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import TableComponent from '../../components/TableComponent/TableComponent';
import { TableBottomToolbar, TableHeaderToolbar } from '../../components/TableComponent/TableProps';
import PremiumCalendar from '../../components/Calendar/PremiumCalendar';
=======
    MoreVert as MoreVertIcon,
    Event as EventIcon,
    LocationOn as LocationIcon,
    Person as PersonIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)

// Mock data for bookings
const mockBookings = [
    { id: 'BK-5001', title: 'Sharma & Varma Wedding', client: 'Priya Sharma', vendor: 'Royal Banquet Hall', date: '2025-02-15', amount: '₹1,50,000', status: 'Confirmed' },
    { id: 'BK-5002', title: 'Engagement Ceremony', client: 'Rahul Varma', vendor: 'Capture Moments', date: '2025-03-02', amount: '₹45,000', status: 'Pending Payment' },
    { id: 'BK-5003', title: 'Corporate Annual Meet', client: 'Tech Corp', vendor: 'Gourmet Treats', date: '2025-01-20', amount: '₹80,000', status: 'Completed' },
    { id: 'BK-5004', title: 'Birthday Bash', client: 'Anita Roy', vendor: 'Elite Sounds', date: '2025-04-10', amount: '₹25,000', status: 'Confirmed' },
];

const BookingsPage = () => {
    const theme = useTheme();
<<<<<<< HEAD
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
=======
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
    const { role } = useAuth();
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

    const currentRole = role?.toLowerCase() || 'client';

<<<<<<< HEAD
    const handleDateClick = (_date: any) => {
        if (currentRole === 'client') {
            navigate('/client/vendors');
        }
    };

=======
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'confirmed': return 'success';
            case 'pending payment': return 'warning';
            case 'completed': return 'info';
            default: return 'default';
        }
    };

<<<<<<< HEAD
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Booking ID',
                Cell: ({ cell }: any) => (
                    <Typography 
                        sx={{ 
                            color: 'text.secondary', 
                            fontWeight: 600,
                            fontSize: '11px'
                        }}
                    >
                        {cell.getValue() as string}
                    </Typography>
                )
            },
            {
                accessorKey: 'title',
                header: 'Booking Details',
                Cell: ({ row }: any) => {
                    const booking = row.original;
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box>
                            <Typography sx={{ fontWeight: 700, fontSize: '13px', color: 'text.primary' }}>{booking.title}</Typography>
                        </Box>
                        </Box>
                    );
                }
            },
            {
                id: 'clientOrVendor',
                accessorFn: (row: any) => currentRole === 'vendor' ? row.client : row.vendor,
                header: currentRole === 'vendor' ? 'Client' : 'Vendor',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'text.primary' }}>
                        {cell.getValue() as string}
                    </Typography>
                )
            },
            {
                accessorKey: 'date',
                header: 'Date',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.secondary' }}>{cell.getValue() as string}</Typography>
                )
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontWeight: 800, fontSize: '13px', color: 'text.primary' }}>{cell.getValue() as string}</Typography>
                )
            },
            {
                accessorKey: 'status',
                header: 'Status',
                Cell: ({ cell }: any) => (
                    <Typography 
                        sx={{ 
                            fontWeight: 900, 
                            color: `${theme.palette[getStatusColor(cell.getValue() as string) as 'success' | 'warning' | 'error' | 'info'].main}`, 
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}
                    >
                        {cell.getValue() as string}
                    </Typography>
                )
            },
            {
                accessorKey: 'actions',
                header: 'Actions',
                muiTableHeadCellProps: { align: 'center' as const },
                muiTableBodyCellProps: { align: 'center' as const },
                enableColumnFilter: false,
                enableSorting: false,
                Cell: () => (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
                    </Box>
                )
            }
        ],
        [currentRole, theme]
    );

    const [globalFilter, setGlobalFilter] = useState('');
    const [showGlobalFilter, setShowGlobalFilter] = useState(false);

    const table = useMaterialReactTable({
        muiTopToolbarProps: { sx: { p: '14px' } },
        columns,
        data: mockBookings,
        enableColumnActions: false,
        enableColumnFilters: true,
        enableSorting: true,
        enablePagination: true,
        enableRowSelection: true,
        enableGlobalFilter: true,
        onGlobalFilterChange: setGlobalFilter,
        onShowGlobalFilterChange: setShowGlobalFilter,
        muiTablePaperProps: {
            elevation: 0,
            sx: {
                borderRadius: '0',
                border: 'none',
            },
        },
        state: {
            globalFilter,
            showGlobalFilter,
            columnVisibility: {
                id: !isMobile,
                date: !isMobile,
            }
        },
    });

    return (
        <Box sx={{ p: 0, maxWidth: 1600, margin: '0 auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                <Typography 
                    variant="h4" 
                    sx={{ 
                        mb: 2, 
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block'
                    }}
                >
                    Bookings Management
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, width: { xs: '100%', sm: 'auto' }, justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                    <Button
                        startIcon={<ListIcon />}
                        variant={viewMode === 'list' ? 'contained' : 'outlined'}
                        onClick={() => setViewMode('list')}
                        size="small"
                        sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 700 }}
                    >
                        List View
                    </Button>
                    <Button
                        startIcon={<CalendarIcon />}
                        variant={viewMode === 'calendar' ? 'contained' : 'outlined'}
                        onClick={() => setViewMode('calendar')}
                        size="small"
                        sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 700 }}
                    >
                        Calendar
                    </Button>
                </Box>
            </Box>

            {viewMode === 'list' ? (
                <DashboardCard sx={{ p: 0, overflow: 'hidden' }}>
                    <Box sx={{ p: '14px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderBottom: `1px solid ${theme.dashboard?.glassBorder || alpha(theme.palette.divider, 0.1)}` }}>
                        <TableHeaderToolbar 
                            table={table} 
                            isSmall 
                            ExcelData={{
                                data: mockBookings,
                                fileName: 'Bookings_Report'
                            }}
                        />
                    </Box>
                    <TableComponent table={table} />
                    <TableBottomToolbar table={table} />
                </DashboardCard>
            ) : (
                <PremiumCalendar 
                    bookings={mockBookings as any} 
                    onDateClick={handleDateClick}
                />
=======
    return (
        <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
            <DashboardHeader
                title={currentRole === 'client' ? "My Bookings" : "Bookings Management"}
                subtitle="Keep track of all your scheduled events and confirmations."
                tag="Schedule"
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3, gap: 1 }}>
                <Button
                    startIcon={<ListIcon />}
                    variant={viewMode === 'list' ? 'contained' : 'outlined'}
                    onClick={() => setViewMode('list')}
                    size="small"
                >
                    List View
                </Button>
                <Button
                    startIcon={<CalendarIcon />}
                    variant={viewMode === 'calendar' ? 'contained' : 'outlined'}
                    onClick={() => setViewMode('calendar')}
                    size="small"
                >
                    Calendar
                </Button>
            </Box>

            {viewMode === 'list' ? (
                <DashboardCard>
                    <TableContainer component={Paper} elevation={0} sx={{ bgcolor: 'transparent' }}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                                    <TableCell sx={{ fontWeight: 800 }}>Booking Details</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>{currentRole === 'vendor' ? 'Client' : 'Vendor'}</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>Date</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>Amount</TableCell>
                                    <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 800 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mockBookings.map((booking) => (
                                    <TableRow key={booking.id} sx={{ '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) } }}>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
                                                    <EventIcon fontSize="small" />
                                                </Avatar>
                                                <Box>
                                                    <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{booking.title}</Typography>
                                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>{booking.id}</Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
                                                {currentRole === 'vendor' ? booking.client : booking.vendor}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="caption" sx={{ fontWeight: 700 }}>{booking.date}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700 }}>{booking.amount}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={booking.status}
                                                size="small"
                                                color={getStatusColor(booking.status) as any}
                                                sx={{ fontWeight: 800, fontSize: '0.7rem' }}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DashboardCard>
            ) : (
                <Grid container spacing={3}>
                    {[1, 2, 3, 4].map(i => (
                        <Grid item xs={12} md={6} lg={4} key={i}>
                            <DashboardCard sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                                <Box sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: 4,
                                    height: '100%',
                                    bgcolor: theme.palette.primary.main
                                }} />
                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, fontSize: '1rem' }}>
                                    {mockBookings[i - 1]?.title || 'Upcoming Event'}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{mockBookings[i - 1]?.date || 'TBD'}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>Mumbai Palace, Worli</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{mockBookings[i - 1]?.client || 'Guest'}</Typography>
                                </Box>
                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Chip label="Confirmed" size="small" color="success" sx={{ height: 20, fontSize: '0.65rem' }} />
                                    <Button size="small" sx={{ fontSize: '0.7rem', fontWeight: 700 }}>View Details</Button>
                                </Box>
                            </DashboardCard>
                        </Grid>
                    ))}
                </Grid>
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
            )}
        </Box>
    );
};

<<<<<<< HEAD
=======
// Mock missing icon
const LocationOnIcon = ({ sx, ...props }: any) => <LocationIcon sx={sx} {...props} />;

>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
export default BookingsPage;
