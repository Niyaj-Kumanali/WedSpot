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
    MoreVert as MoreVertIcon,
    Email as EmailIcon,
    Phone as PhoneIcon
} from '@mui/icons-material';
import { useMaterialReactTable } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
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
    Avatar,
    alpha,
    useTheme
} from '@mui/material';
import {
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Email as EmailIcon,
    Phone as PhoneIcon
} from '@mui/icons-material';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)

// Mock data for staff
const mockStaff = [
    { id: 'S001', name: 'Alia Bhatt', role: 'Wedding Coordinator', status: 'Available', email: 'alia@coordinator.com', phone: '+91 99999 00010' },
    { id: 'S002', name: 'Ranbir Kapoor', role: 'Support Specialist', status: 'Busy', email: 'ranbir@support.com', phone: '+91 99999 00011' },
    { id: 'S003', name: 'Katrina Kaif', role: 'Venue Liaison', status: 'On Leave', email: 'katrina@liaison.com', phone: '+91 99999 00012' },
    { id: 'S004', name: 'Vicky Kaushal', role: 'Vendor Relations', status: 'Available', email: 'vicky@relations.com', phone: '+91 99999 00013' },
];

const Staff = () => {
    const theme = useTheme();
<<<<<<< HEAD
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
=======
    const [searchTerm, setSearchTerm] = useState('');
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'available': return 'success';
            case 'busy': return 'error';
            case 'on leave': return 'warning';
            default: return 'default';
        }
    };

<<<<<<< HEAD
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Staff ID',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontWeight: 700, fontSize: '12px', color: 'text.secondary' }}>{cell.getValue() as string}</Typography>
                )
            },
            {
                accessorKey: 'name',
                header: 'Staff Name',
                Cell: ({ row }: any) => {
                    const member = row.original;
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box>
                                <Typography sx={{ fontWeight: 800, fontSize: '13px', color: 'text.primary' }}>{member.name}</Typography>
                            </Box>
                        </Box>
                    );
                }
            },
            {
                accessorKey: 'role',
                header: 'Role',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontWeight: 600, fontSize: '12px', color: 'text.primary' }}>{cell.getValue() as string}</Typography>
                )
            },
            {
                id: 'contact',
                header: 'Contact Info',
                accessorFn: (row: any) => `${row.email} ${row.phone}`,
                Cell: ({ row }: any) => {
                    const member = row.original;
                    return (
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EmailIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                                <Typography sx={{ fontWeight: 600, fontSize: '11px', color: 'text.secondary' }}>{member.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PhoneIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                                <Typography sx={{ fontWeight: 600, fontSize: '11px', color: 'text.secondary' }}>{member.phone}</Typography>
                            </Box>
                        </Box>
                    );
                }
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
        data: mockStaff,
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
                contact: !isMobile,
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
                Staff Management
            </Typography>

            <DashboardCard sx={{ mt: 1, p: 0, overflow: 'hidden' }}>
                <Box sx={{ 
                    p: '14px', 
                    display: 'flex', 
                    justifyContent: { xs: 'center', sm: 'flex-end' }, 
                    alignItems: 'center', 
                    flexWrap: 'wrap', 
                    gap: 2, 
                    borderBottom: `1px solid ${theme.dashboard?.glassBorder || alpha(theme.palette.divider, 0.1)}` 
                }}>
                    <TableHeaderToolbar 
                        table={table} 
                        isSmall 
                        ExcelData={{
                            data: mockStaff,
                            fileName: 'Staff_Export'
                        }}
                        actionButton={
                            <Button 
                                variant="contained" 
                                size="small" 
                                onClick={() => navigate('add')}
                                sx={{ 
                                    borderRadius: '10px', 
                                    bgcolor: theme.palette.primary.main,
                                    height: '32px',
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    px: 2
                                }}
                            >
                                Add Staff
                            </Button>
                        }
                    />
                </Box>

                <TableComponent table={table} />
                <TableBottomToolbar table={table} />
=======
    return (
        <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
            <DashboardHeader
                title="My Team (Staff)"
                subtitle="Manage and coordinate with your team of support staff and wedding experts."
                tag="Management"
            />

            <DashboardCard>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, gap: 2, flexWrap: 'wrap' }}>
                    <TextField
                        placeholder="Search staff members..."
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
                    <Button variant="contained" size="small" sx={{ borderRadius: '10px' }}>Add Staff Member</Button>
                </Box>

                <TableContainer component={Paper} elevation={0} sx={{ bgcolor: 'transparent' }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                                <TableCell sx={{ fontWeight: 800 }}>Staff Name</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Role</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Contact Info</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 800 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockStaff.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((member) => (
                                <TableRow key={member.id} sx={{ '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) } }}>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.main, fontWeight: 700 }}>
                                                {member.name.charAt(0)}
                                            </Avatar>
                                            <Box>
                                                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{member.name}</Typography>
                                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>ID: {member.id}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>{member.role}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <EmailIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                                                <Typography variant="caption" sx={{ fontWeight: 600 }}>{member.email}</Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <PhoneIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                                                <Typography variant="caption" sx={{ fontWeight: 600 }}>{member.phone}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={member.status}
                                            size="small"
                                            color={getStatusColor(member.status) as any}
                                            sx={{ fontWeight: 800, fontSize: '0.7rem' }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                                            <IconButton size="small" color="primary"><EditIcon fontSize="small" /></IconButton>
                                            <IconButton size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
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

export default Staff;
