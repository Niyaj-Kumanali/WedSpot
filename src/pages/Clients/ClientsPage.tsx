<<<<<<< HEAD
import { useMemo, useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
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
    IconButton,
    TextField,
    InputAdornment,
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
    Avatar,
    alpha,
    useTheme,
    Button
} from '@mui/material';
import {
<<<<<<< HEAD
=======
    Search as SearchIcon,
    Message as MessageIcon,
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
    Phone as PhoneIcon,
    Email as EmailIcon,
    MoreVert as MoreVertIcon
} from '@mui/icons-material';
<<<<<<< HEAD
import { useMaterialReactTable } from 'material-react-table';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import TableComponent from '../../components/TableComponent/TableComponent';
import { TableBottomToolbar, TableHeaderToolbar } from '../../components/TableComponent/TableProps';
=======
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)

// Mock data for clients
const mockClients = [
    { id: 'C001', name: 'Amitabh Bachchan', email: 'amitabh@legend.com', phone: '+91 99999 00001', activity: 'Viewed Venue "Royal Palace"', status: 'Active' },
    { id: 'C002', name: 'Shah Rukh Khan', email: 'srk@king.com', phone: '+91 99999 00002', activity: 'Booked Photographer "Capture Moments"', status: 'Active' },
    { id: 'C003', name: 'Deepika Padukone', email: 'deepika@star.com', phone: '+91 99999 00003', activity: 'Inquired about "Floral Dreams"', status: 'New' },
    { id: 'C004', name: 'Ranbir Kapoor', email: 'ranbir@actor.com', phone: '+91 99999 00004', activity: 'Updated Profile', status: 'Inactive' },
];

const ClientsPage = () => {
    const theme = useTheme();
<<<<<<< HEAD

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Client Name',
                Cell: ({ row }: any) => {
                    const client = row.original;
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1), color: 'secondary.main', fontWeight: 700 }}>
                                {client.name.charAt(0)}
                            </Avatar>
                            <Box>
                                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{client.name}</Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>ID: {client.id}</Typography>
                            </Box>
                        </Box>
                    );
                }
            },
            {
                id: 'contact',
                accessorFn: (row: any) => `${row.email} ${row.phone}`,
                header: 'Contact Info',
                Cell: ({ row }: any) => {
                    const client = row.original;
                    return (
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EmailIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                <Typography variant="caption" sx={{ fontWeight: 600 }}>{client.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PhoneIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                <Typography variant="caption" sx={{ fontWeight: 600 }}>{client.phone}</Typography>
                            </Box>
                        </Box>
                    );
                }
            },
            {
                accessorKey: 'activity',
                header: 'Recent Activity',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'text.secondary' }}>{cell.getValue() as string}</Typography>
                )
            },
            {
                accessorKey: 'status',
                header: 'Status',
                Cell: ({ cell }: any) => {
                    const status = cell.getValue() as string;
                    return (
                        <Typography
                            variant="caption"
                            sx={{
                                fontWeight: 900,
                                color: status === 'Active' ? 'success.main' : status === 'New' ? 'info.main' : 'text.disabled',
                                textTransform: 'uppercase',
                                fontSize: '0.65rem'
                            }}
                        >
                            {status}
                        </Typography>
                    );
                }
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
                            <MoreVertIcon fontSize="small" />
                        </IconButton>
                    </Box>
                )
            }
        ],
        [theme]
    );

    const [globalFilter, setGlobalFilter] = useState('');
    const [showGlobalFilter, setShowGlobalFilter] = useState(false);

    const table = useMaterialReactTable({
        muiTopToolbarProps: { sx: { p: '14px' } },
        columns,
        data: mockClients,
        enableColumnActions: false,
        enableColumnFilters: true,
        enableSorting: true,
        enablePagination: true,
        enableRowSelection: true,
        enableGlobalFilter: true,
        onGlobalFilterChange: setGlobalFilter,
        onShowGlobalFilterChange: setShowGlobalFilter,
        initialState: {
            pagination: { pageSize: 10, pageIndex: 0 },
        },
        state: {
            globalFilter,
            showGlobalFilter,
        },
        muiTablePaperProps: {
            elevation: 0,
            sx: {
                borderRadius: '0',
                border: 'none',
            },
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
                Client Management
            </Typography>
            <DashboardCard sx={{ mt: 3, p: 0, overflow: 'hidden' }}>
                <Box sx={{ p: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, borderBottom: `1px solid ${theme.dashboard?.glassBorder || alpha(theme.palette.divider, 0.1)}` }}>
                    <Button variant="contained" size="small" sx={{ borderRadius: '10px' }}>Add New Client</Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TableHeaderToolbar 
                            table={table} 
                            isSmall 
                            ExcelData={{
                                data: mockClients,
                                fileName: 'Clients_Export'
                            }}
                        />
                    </Box>
                </Box>

                <TableComponent table={table} />
                <TableBottomToolbar table={table} />
=======
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
            <DashboardHeader
                title="Clients Directory"
                subtitle="Manage and support all registered clients on the platform."
                tag="Support"
            />

            <DashboardCard>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, gap: 2, flexWrap: 'wrap' }}>
                    <TextField
                        placeholder="Search clients..."
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
                    <Button variant="contained" size="small" sx={{ borderRadius: '10px' }}>Add New Client</Button>
                </Box>

                <TableContainer component={Paper} elevation={0} sx={{ bgcolor: 'transparent' }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                                <TableCell sx={{ fontWeight: 800 }}>Client Name</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Contact Info</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Recent Activity</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 800 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockClients.map((client) => (
                                <TableRow key={client.id} sx={{ '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) } }}>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1), color: 'secondary.main', fontWeight: 700 }}>
                                                {client.name.charAt(0)}
                                            </Avatar>
                                            <Box>
                                                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{client.name}</Typography>
                                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>ID: {client.id}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <EmailIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                                <Typography variant="caption" sx={{ fontWeight: 600 }}>{client.email}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <PhoneIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                                <Typography variant="caption" sx={{ fontWeight: 600 }}>{client.phone}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'text.secondary' }}>{client.activity}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontWeight: 800,
                                                color: client.status === 'Active' ? 'success.main' : client.status === 'New' ? 'info.main' : 'text.disabled'
                                            }}
                                        >
                                            {client.status.toUpperCase()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                            <IconButton size="small" color="primary"><MessageIcon fontSize="small" /></IconButton>
                                            <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
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

export default ClientsPage;
