<<<<<<< HEAD
import { useMemo, useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Button,
    alpha,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    MoreVert as MoreIcon
} from '@mui/icons-material';
import { useMaterialReactTable } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth/useAuth';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import TableComponent from '../../components/TableComponent/TableComponent';
import { TableBottomToolbar, TableHeaderToolbar } from '../../components/TableComponent/TableProps';
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
    TextField,
    InputAdornment,
    Button,
    alpha,
    useTheme,
    Tabs,
    Tab
} from '@mui/material';
import {
    Search as SearchIcon,
    Message as MessageIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    Info as InfoIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)

// Mock data for requests
const mockRequests = [
    { id: 'RQ-101', subject: 'Wedding Venue Inquiry', sender: 'Priya Sharma', category: 'Venue', date: '2024-12-20', status: 'Pending', type: 'Inquiry' },
    { id: 'RQ-102', subject: 'Photography Package', sender: 'Rahul Varma', category: 'Photography', date: '2024-12-21', status: 'In Discussion', type: 'Inquiry' },
    { id: 'RQ-103', subject: 'Custom Floral Decor', sender: 'Anita Roy', category: 'Decoration', date: '2024-12-22', status: 'Accepted', type: 'Booking' },
    { id: 'RQ-104', subject: 'Catering for 200 Guests', sender: 'Suresh Raina', category: 'Catering', date: '2024-12-23', status: 'Pending', type: 'Inquiry' },
    { id: 'RQ-105', subject: 'DJ & Sound Setup', sender: 'Vikram Singh', category: 'Music', date: '2024-12-24', status: 'Rejected', type: 'Booking' },
];

const RequestsPage = () => {
    const theme = useTheme();
<<<<<<< HEAD
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { role } = useAuth();
=======
    const { role } = useAuth();
    const [tabValue, setTabValue] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)

    const currentRole = role?.toLowerCase() || 'client';

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'warning';
            case 'in discussion': return 'info';
            case 'accepted': return 'success';
            case 'rejected': return 'error';
            default: return 'default';
        }
    };

<<<<<<< HEAD
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Request ID',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '11px', color: 'text.secondary', fontWeight: 600 }}>{cell.getValue() as string}</Typography>
                )
            },
            {
                accessorKey: 'subject',
                header: 'Subject',
                Cell: ({ row }: any) => {
                    const request = row.original;
                    return (
                        <Box>
                            <Typography sx={{ fontSize: '13px', fontWeight: 700, color: 'text.primary' }}>{request.subject}</Typography>
                        </Box>
                    );
                }
            },
            {
                id: 'categoryOrSender',
                accessorFn: (row: any) => currentRole === 'client' ? row.category : row.sender,
                header: currentRole === 'client' ? 'Category' : 'Client Name',
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
                accessorKey: 'type',
                header: 'Type',
                Cell: ({ cell }: any) => (
                    <Typography
                        sx={{
                            fontWeight: 900,
                            color: 'primary.main',
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
                        <IconButton size="small">
                            <MoreIcon fontSize="small" />
                        </IconButton>
                    </Box>
                )
            }
        ],
        [currentRole]
    );

    const filteredRequests = useMemo(() => mockRequests, []);

    const [globalFilter, setGlobalFilter] = useState('');
    const [showGlobalFilter, setShowGlobalFilter] = useState(false);

    const table = useMaterialReactTable({
        muiTopToolbarProps: { sx: { p: '14px' } },
        columns,
        data: filteredRequests,
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
                type: !isMobile,
            }
        },
    });

    return (
        <Box sx={{ p: 0, maxWidth: 1600, margin: '0 auto' }}>
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
                Requests Management
            </Typography>
            <DashboardCard sx={{ mt: 1, p: 0, overflow: 'hidden' }}>
                <Box sx={{ p: '14px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap', gap: 2, borderBottom: `1px solid ${theme.dashboard?.glassBorder || alpha(theme.palette.divider, 0.1)}` }}>
                    <TableHeaderToolbar 
                        table={table} 
                        isSmall 
                        ExcelData={{
                            data: mockRequests,
                            fileName: 'Requests_Export'
                        }}
                        actionButton={
                            currentRole === 'client' && (
                                <Button 
                                    variant="contained" 
                                    size="small" 
                                    onClick={() => navigate('add')}
                                    sx={{ 
                                        borderRadius: '10px',
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        px: 2
                                    }}
                                >
                                    New Request
                                </Button>
                            )
                        }
                    />
                </Box>

                <TableComponent table={table} />
                <TableBottomToolbar table={table} />
=======
    return (
        <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
            <DashboardHeader
                title={currentRole === 'client' ? "My Requests" : "Requests Management"}
                subtitle={currentRole === 'client' ? "Track and manage your service inquiries." : "Review and manage service requests from clients."}
                tag="Communication"
            />

            <DashboardCard>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs
                        value={tabValue}
                        onChange={(_, newValue) => setTabValue(newValue)}
                        sx={{
                            '& .MuiTab-root': { fontWeight: 700, textTransform: 'none', fontSize: '0.95rem' }
                        }}
                    >
                        <Tab label="All Requests" />
                        <Tab label="Inquiries" />
                        <Tab label="Bookings" />
                    </Tabs>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, gap: 2, flexWrap: 'wrap' }}>
                    <TextField
                        placeholder="Search requests..."
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ width: { xs: '100%', sm: 300 } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Button variant="outlined" size="small" sx={{ borderRadius: '10px' }}>Export CSV</Button>
                        {currentRole === 'client' && <Button variant="contained" size="small" sx={{ borderRadius: '10px' }}>New Request</Button>}
                    </Box>
                </Box>

                <TableContainer component={Paper} elevation={0} sx={{ bgcolor: 'transparent' }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                                <TableCell sx={{ fontWeight: 800 }}>ID & Subject</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>{currentRole === 'client' ? 'Category' : 'Client Name'}</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Type</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 800 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockRequests.map((request) => (
                                <TableRow key={request.id} sx={{ '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) } }}>
                                    <TableCell>
                                        <Box>
                                            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{request.subject}</Typography>
                                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>{request.id}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
                                            {currentRole === 'client' ? request.category : request.sender}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>{request.date}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={request.type}
                                            size="small"
                                            variant="outlined"
                                            sx={{ fontWeight: 800, fontSize: '0.65rem', height: 20 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={request.status}
                                            size="small"
                                            color={getStatusColor(request.status) as any}
                                            sx={{ fontWeight: 800, fontSize: '0.7rem' }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                            <Tooltip title="View Details">
                                                <IconButton size="small" color="info"><InfoIcon fontSize="small" /></IconButton>
                                            </Tooltip>
                                            <Tooltip title="Chat">
                                                <IconButton size="small" color="primary"><MessageIcon fontSize="small" /></IconButton>
                                            </Tooltip>
                                            {currentRole !== 'client' && request.status === 'Pending' && (
                                                <>
                                                    <Tooltip title="Accept">
                                                        <IconButton size="small" color="success"><CheckCircleIcon fontSize="small" /></IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Reject">
                                                        <IconButton size="small" color="error"><CancelIcon fontSize="small" /></IconButton>
                                                    </Tooltip>
                                                </>
                                            )}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
            </DashboardCard>
        </Box>
    );
};

<<<<<<< HEAD
=======
// Tooltip wrapper for convenience
const Tooltip = ({ title, children }: { title: string, children: React.ReactElement }) => {
    const [open, setOpen] = useState(false);
    return (
        <Box
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            sx={{ position: 'relative', display: 'inline-flex' }}
        >
            {children}
            {open && (
                <Box sx={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.7rem',
                    zIndex: 10,
                    whiteSpace: 'nowrap',
                    mb: 0.5
                }}>
                    {title}
                </Box>
            )}
        </Box>
    );
};

>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
export default RequestsPage;
