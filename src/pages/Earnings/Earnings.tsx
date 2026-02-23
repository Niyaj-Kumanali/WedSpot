<<<<<<< HEAD
import { useMemo, useState } from 'react';
=======
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
import {
    Box,
    Typography,
    Grid,
    alpha,
    useTheme,
<<<<<<< HEAD
    useMediaQuery,
    IconButton
} from '@mui/material';
import {
    MoreVert as MoreIcon,
    Wallet as WalletIcon,
    TrendingUp as TrendingUpIcon,
    AccountBalance as BankIcon,
    ArrowUpward as ArrowUpIcon
} from '@mui/icons-material';
import { useMaterialReactTable } from 'material-react-table';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import TableComponent from '../../components/TableComponent/TableComponent';
import { TableBottomToolbar, TableHeaderToolbar } from '../../components/TableComponent/TableProps';

const stats = [
    { label: 'Total Earnings', value: '₹4,85,000', change: '+15%', icon: <WalletIcon />, color: '#7c3aed' },
    { label: 'Pending Payouts', value: '₹52,000', change: '3 Pending', icon: <TrendingUpIcon />, color: '#f59e0b' },
    { label: 'Next Payout', value: '₹28,500', change: 'Jan 30', icon: <BankIcon />, color: '#0ea5e9' },
];

const transactions = [
    { id: 'TXN-901', client: 'Priya Sharma', event: 'Wedding Venue', amount: '₹1,20,000', status: 'Paid', date: '2025-01-15' },
    { id: 'TXN-902', client: 'Rahul Varma', event: 'Engagement', amount: '₹35,000', status: 'Pending', date: '2025-01-18' },
    { id: 'TXN-903', client: 'Anita Roy', event: 'Birthday Decor', amount: '₹15,000', status: 'Processing', date: '2025-01-19' },
];

const EarningsPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Transaction ID',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontWeight: 600, fontSize: '11px', color: 'text.secondary' }}>{cell.getValue() as string}</Typography>
                )
            },
            {
                accessorKey: 'client',
                header: 'Client',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontWeight: 800, fontSize: '13px', color: 'text.primary' }}>{cell.getValue() as string}</Typography>
                )
            },
            {
                accessorKey: 'event',
                header: 'Event',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '11px' }}>{cell.getValue() as string}</Typography>
                )
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '13px', fontWeight: 800, color: 'text.primary' }}>{cell.getValue() as string}</Typography>
                )
            },
            {
                accessorKey: 'date',
                header: 'Date',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '11px' }}>{cell.getValue() as string}</Typography>
                )
            },
            {
                accessorKey: 'status',
                header: 'Status',
                Cell: ({ cell }: any) => (
                    <Typography 
                        sx={{ 
                            fontWeight: 900, 
                            color: `${theme.palette[cell.getValue() === 'Paid' ? 'success' : cell.getValue() === 'Pending' ? 'warning' : 'info'].main}`, 
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
        [theme]
    );

    const [globalFilter, setGlobalFilter] = useState('');
    const [showGlobalFilter, setShowGlobalFilter] = useState(false);

    const table = useMaterialReactTable({
        muiTopToolbarProps: { sx: { p: '14px' } },
        columns,
        data: transactions,
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
                event: !isMobile,
                date: !isMobile,
            }
        },
    });

    return (
        <Box sx={{ p: 0, maxWidth: 1600, margin: '0 auto' }}>
            <Typography 
                variant="h4" 
                sx={{ 
                    mb: 2, 
                    background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                }}
            >
                Earnings & Payouts
            </Typography>
            <Grid container spacing={3} sx={{ mt: 1, mb: 2 }}>
=======
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
} from '@mui/material';
import {
    Wallet as WalletIcon,
    TrendingUp as TrendingUpIcon,
    AccountBalance as BankIcon,
    Download as DownloadIcon,
    Visibility as ViewIcon,
    ArrowUpward as ArrowUpIcon
} from '@mui/icons-material';
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';

const EarningsPage = () => {
    const theme = useTheme();

    const stats = [
        { label: 'Total Earnings', value: '₹4,85,000', change: '+15%', icon: <WalletIcon />, color: '#7c3aed' },
        { label: 'Pending Payouts', value: '₹52,000', change: '3 Pending', icon: <TrendingUpIcon />, color: '#f59e0b' },
        { label: 'Next Payout', value: '₹28,500', change: 'Jan 30', icon: <BankIcon />, color: '#0ea5e9' },
    ];

    const transactions = [
        { id: 'TXN-901', client: 'Priya Sharma', event: 'Wedding Venue', amount: '₹1,20,000', status: 'Paid', date: '2025-01-15' },
        { id: 'TXN-902', client: 'Rahul Varma', event: 'Engagement', amount: '₹35,000', status: 'Pending', date: '2025-01-18' },
        { id: 'TXN-903', client: 'Anita Roy', event: 'Birthday Decor', amount: '₹15,000', status: 'Processing', date: '2025-01-19' },
    ];

    return (
        <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
            <DashboardHeader
                title="Earnings & Finances"
                subtitle="Track your revenue, manage payouts, and view transaction history."
                tag="Financials"
            />

            <Grid container spacing={3} sx={{ mb: 4 }}>
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <DashboardCard>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                                <Box sx={{
                                    p: 1.5,
                                    borderRadius: 3,
                                    bgcolor: alpha(stat.color, 0.1),
                                    color: stat.color,
                                    display: 'flex'
                                }}>
                                    {stat.icon}
                                </Box>
                                <Box>
<<<<<<< HEAD
                                    <Typography sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', fontSize: '11px' }}>
                                        {stat.label}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 800, mt: 0.5, fontSize: '1.5rem', color: stat.color }}>
                                        {stat.value}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 800, color: 'success.main', display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '11px' }}>
=======
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block' }}>
                                        {stat.label}
                                    </Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'success.main', display: 'flex', alignItems: 'center', gap: 0.5 }}>
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
                                        <ArrowUpIcon sx={{ fontSize: 12 }} /> {stat.change}
                                    </Typography>
                                </Box>
                            </Box>
                        </DashboardCard>
                    </Grid>
                ))}
            </Grid>

<<<<<<< HEAD
            <DashboardCard sx={{ mt: 1, p: 0, overflow: 'hidden' }}>
                <Box sx={{ p: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, borderBottom: `1px solid ${theme.dashboard?.glassBorder || alpha(theme.palette.divider, 0.1)}` }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '13px', color: 'text.primary' }}>Recent Transactions</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TableHeaderToolbar 
                            table={table} 
                            isSmall 
                            ExcelData={{
                                data: transactions,
                                fileName: 'Earnings_Report'
                            }}
                        />
                    </Box>
                </Box>

                <TableComponent table={table} />
                <TableBottomToolbar table={table} />
=======
            <DashboardCard>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography sx={{ fontWeight: 800 }}>Recent Transactions</Typography>
                    <Button startIcon={<DownloadIcon />} variant="outlined" size="small">Download Statement</Button>
                </Box>

                <TableContainer component={Paper} elevation={0} sx={{ bgcolor: 'transparent' }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                                <TableCell sx={{ fontWeight: 800 }}>Transaction ID</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Client & Event</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Amount</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 800 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((txn) => (
                                <TableRow key={txn.id} sx={{ '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) } }}>
                                    <TableCell>
                                        <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: 'text.secondary' }}>{txn.id}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box>
                                            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{txn.client}</Typography>
                                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>{txn.event}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: '0.9rem', fontWeight: 800 }}>{txn.amount}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>{txn.date}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={txn.status}
                                            size="small"
                                            color={txn.status === 'Paid' ? 'success' : txn.status === 'Pending' ? 'warning' : 'info'}
                                            sx={{ fontWeight: 800, fontSize: '0.7rem' }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small"><ViewIcon fontSize="small" /></IconButton>
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
// Mock missing Button
const Button = ({ children, startIcon, sx, variant }: any) => {
    const theme = useTheme();
    return (
        <Box
            component="button"
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 0.75,
                borderRadius: '10px',
                border: variant === 'outlined' ? `1px solid ${theme.palette.divider}` : 'none',
                bgcolor: variant === 'outlined' ? 'transparent' : 'primary.main',
                color: variant === 'outlined' ? 'text.primary' : 'white',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.8rem',
                '&:hover': { bgcolor: variant === 'outlined' ? alpha(theme.palette.text.primary, 0.05) : theme.palette.primary.dark },
                ...sx
            }}
        >
            {startIcon}
            {children}
        </Box>
    );
};

>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
export default EarningsPage;
