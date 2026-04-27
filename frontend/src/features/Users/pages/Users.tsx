import { useMemo, useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Button,
    useTheme,
    alpha
} from '@mui/material';
import { useMaterialReactTable } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '@/features/dashboard/components/DashboardCard/DashboardCard';
import { TableComponent, TableBottomToolbar, TableHeaderToolbar } from '@/components/UI/Table';
import { USER_SERVICE } from '../../user/api/user.api';
import { useQuery } from '@tanstack/react-query';
import { EyeIcon } from 'lucide-react';
import { useUser } from '../../user/context/useUser';

const UsersPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { user } = useUser();

    const { data: users } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await USER_SERVICE.getAllUsers();
            if (response.ok) {
                console.log(response?.data)
                return (response?.data || []).filter((u) => u.email !== user?.email) || [];
            }
            return [];
        }
    });

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
                Cell: ({ row }: any) => {
                    const user = row.original;
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 2 }}>
                            <Box>
                                <Typography sx={{ fontSize: '13px', fontWeight: 800, color: 'text.primary' }}>{user.name}</Typography>
                            </Box>
                        </Box>
                    );
                }
            },
            {
                accessorKey: 'email',
                header: 'Email',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '12px', color: 'text.secondary', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        {cell.getValue() as string}
                    </Typography>
                )
            },
            {
                accessorKey: 'phoneNumber',
                header: 'Phone Number',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '12px', color: 'text.secondary', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        {cell.getValue() as string}
                    </Typography>
                )
            },
            {
                accessorKey: 'address',
                header: 'Address',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '12px', color: 'text.secondary', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        {cell.getValue() as string}
                    </Typography>
                )
            },
            {
                accessorKey: 'role',
                header: 'Role',
                muiTableHeadCellProps: { align: 'center' as const },
                muiTableBodyCellProps: { align: 'center' as const },
                Cell: ({ cell }: any) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-start' }}>
                        <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'text.primary' }}>{cell.getValue() as string}</Typography>
                    </Box>
                )
            },
            {
                accessorKey: 'actions',
                header: 'Actions',
                size: 80,
                enableColumnFilter: false,
                enableSorting: false,
                Cell: ({ row }: any) => (
                    <Box>
                        <IconButton
                            onClick={() => navigate(`${row.original.id}`)}
                            sx={{ color: theme.palette.primary.main }}
                            size="small"
                        >
                            <EyeIcon fontSize="small" />
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
        data: users || [],
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
            <DashboardCard sx={{ mt: 1, p: 0, overflow: 'hidden' }}>
                <Box sx={{
                    p: '14px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2,
                    borderBottom: `1px solid ${theme.dashboard?.glassBorder || alpha(theme.palette.divider, 0.1)}`
                }}>
                    <TableHeaderToolbar
                        HeaderText="User Management"
                        table={table}
                        isSmall
                        ExcelData={{
                            data: users,
                            fileName: 'Users_Export'
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
                                Add
                            </Button>
                        }
                    />
                </Box>

                <TableComponent table={table} />
                <TableBottomToolbar table={table} />
            </DashboardCard>
        </Box>
    );
};

export default UsersPage;
