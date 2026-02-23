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
    Chip,
    IconButton,
    TextField,
    InputAdornment,
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
    useTheme,
    alpha
} from '@mui/material';
import {
<<<<<<< HEAD
    MoreVert as MoreIcon,
=======
    Search as SearchIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
    FilterList as FilterIcon,
    Add as AddIcon,
    Inventory as InventoryIcon
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

interface InventoryItem {
    id: string;
    name: string;
    category: 'decor' | 'catering' | 'technical' | 'safety';
    stock: number;
    unit: string;
    status: 'available' | 'low' | 'out';
    lastUpdated: string;
}

const mockInventory: InventoryItem[] = [
    { id: '1', name: 'Premium Velvet Chair Covers', category: 'decor', stock: 450, unit: 'pcs', status: 'available', lastUpdated: '2024-03-20' },
    { id: '2', name: 'Industrial Smoke Machines', category: 'technical', stock: 12, unit: 'units', status: 'available', lastUpdated: '2024-03-19' },
    { id: '3', name: 'Silk Table Linens (Gold)', category: 'decor', stock: 15, unit: 'pcs', status: 'low', lastUpdated: '2024-03-21' },
    { id: '4', name: 'Emergency Power Backup', category: 'safety', stock: 5, unit: 'units', status: 'available', lastUpdated: '2024-03-15' },
    { id: '5', name: 'Organic Floral Centerpieces', category: 'decor', stock: 0, unit: 'pcs', status: 'out', lastUpdated: '2024-03-22' },
];

const InventoryPage = () => {
    const theme = useTheme();
<<<<<<< HEAD
=======
    const [searchTerm, setSearchTerm] = useState('');
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)

    const getStatusColor = (status: InventoryItem['status']) => {
        switch (status) {
            case 'available': return 'success';
            case 'low': return 'warning';
            case 'out': return 'error';
            default: return 'default';
        }
    };

<<<<<<< HEAD
    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Asset Name',
                Cell: ({ row }: any) => {
                    const item = row.original;
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{
                                p: 1,
                                borderRadius: 2,
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: 'primary.main',
                                display: 'flex'
                            }}>
                                <InventoryIcon fontSize="small" />
                            </Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.name}</Typography>
                        </Box>
                    );
                }
            },
            {
                accessorKey: 'category',
                header: 'Category',
                Cell: ({ cell }: any) => (
                    <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 700, color: 'text.disabled' }}>
                        {cell.getValue() as string}
                    </Typography>
                )
            },
            {
                accessorKey: 'stock',
                header: 'Stock Level',
                Cell: ({ row }: any) => {
                    const item = row.original;
                    return (
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {item.stock} <Typography component="span" variant="caption" sx={{ color: 'text.secondary' }}>{item.unit}</Typography>
                        </Typography>
                    );
                }
            },
            {
                accessorKey: 'status',
                header: 'Status',
                Cell: ({ cell }: any) => (
                    <Typography 
                        variant="caption" 
                        sx={{ 
                            fontWeight: 900, 
                            color: `${theme.palette[getStatusColor(cell.getValue() as any) as 'success' | 'warning' | 'error' | 'info'].main}`, 
                            textTransform: 'uppercase', 
                            fontSize: '0.65rem' 
                        }}
                    >
                        {cell.getValue() as string}
                    </Typography>
                )
            },
            {
                accessorKey: 'lastUpdated',
                header: 'Last Updated',
                Cell: ({ cell }: any) => (
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{cell.getValue() as string}</Typography>
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
        data: mockInventory,
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
                Inventory Management
            </Typography>
            <DashboardCard sx={{ mt: 3, p: 0, overflow: 'hidden' }}>
                <Box sx={{ p: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, borderBottom: `1px solid ${theme.dashboard?.glassBorder || alpha(theme.palette.divider, 0.1)}` }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
=======
    const filteredItems = mockInventory.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <DashboardHeader
                title="Inventory Matrix"
                subtitle="Manage assets and logistics across all wedding protocols"
            />

            <DashboardCard sx={{ mt: 3, p: 0 }}>
                <Box sx={{ p: 2.5, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', borderBottom: `1px solid ${theme.dashboard.glassBorder}` }}>
                    <TextField
                        placeholder="Search assets..."
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            flexGrow: 1,
                            maxWidth: 400,
                            '& .MuiOutlinedInput-root': {
                                bgcolor: alpha(theme.palette.text.primary, 0.03),
                                borderRadius: 3
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" color="disabled" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
                        <IconButton sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', borderRadius: 2 }}>
                            <FilterIcon />
                        </IconButton>
                        <IconButton sx={{ bgcolor: 'secondary.main', color: 'white', borderRadius: 2, '&:hover': { bgcolor: 'secondary.dark' } }}>
                            <AddIcon />
                        </IconButton>
                    </Box>
<<<<<<< HEAD
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TableHeaderToolbar 
                            table={table} 
                            isSmall 
                            ExcelData={{
                                data: mockInventory,
                                fileName: 'Inventory_Export'
                            }}
                        />
                    </Box>
                </Box>

                <TableComponent table={table} />
                <TableBottomToolbar table={table} />
=======
                </Box>

                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Asset Name</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Stock Level</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Last Updated</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700, color: 'text.secondary' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredItems.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) } }}
                                >
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Box sx={{
                                                p: 1,
                                                borderRadius: 2,
                                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                color: 'primary.main',
                                                display: 'flex'
                                            }}>
                                                <InventoryIcon fontSize="small" />
                                            </Box>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.name}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 700, color: 'text.disabled' }}>
                                            {item.category}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                            {item.stock} <Typography component="span" variant="caption" sx={{ color: 'text.secondary' }}>{item.unit}</Typography>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={item.status}
                                            size="small"
                                            color={getStatusColor(item.status)}
                                            sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.65rem' }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{item.lastUpdated}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" sx={{ mr: 0.5, color: 'primary.main' }}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" sx={{ color: 'error.main' }}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
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

export default InventoryPage;
