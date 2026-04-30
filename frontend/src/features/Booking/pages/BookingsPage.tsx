import { useState, useMemo } from 'react';
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
    CalendarMonth as CalendarIcon,
    List as ListIcon,
    MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { useUser } from '@/features/user';
import { useMaterialReactTable } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import DashboardCard from "@/features/dashboard/components/DashboardCard/DashboardCard";
import { TableComponent, TableBottomToolbar, TableHeaderToolbar } from '@/components/UI/Table';
import { PremiumCalendar } from '@/components/UI/Calendar';
import { BOOKING_SERVICE } from '../api/bookings.api';
import { useQuery } from '@tanstack/react-query';

const BookingsPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { user } = useUser();
    const role = user?.role;
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');


    const currentRole = role?.toLowerCase() || 'client';

    const { data: bookings } = useQuery({
        queryKey: ['bookings'],
        queryFn: () => {

            switch (currentRole?.toUpperCase()) {
                case 'CLIENT':
                    return BOOKING_SERVICE.getClientBooking(Number(user?.id));
                case 'VENDOR':
                    return BOOKING_SERVICE.getVendorBooking(Number(user?.id));
                default:
                    return BOOKING_SERVICE.getAllBooking();
            }
        }
    })


    const handleDateClick = (_date: any) => {
        if (currentRole === 'client') {
            navigate('/client/vendors');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toUpperCase()) {
            case 'CONFIRMED': return 'success';
            case 'PENDING': return 'warning';
            case 'CANCELED': return 'error';
            case 'COMPLETED': return 'info';
            default: return 'default';
        }
    };

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
            // {
            //     accessorKey: 'title',
            //     accessorFn: (row: any) => row.event.name,
            //     header: 'Booking Details',
            //     Cell: ({ row }: any) => {
            //         const booking = row.original;
            //         return (
            //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            //                 <Box>
            //                     <Typography sx={{ fontWeight: 700, fontSize: '13px', color: 'text.primary' }}>{booking.title}</Typography>
            //                 </Box>
            //             </Box>
            //         );
            //     }
            // },
            // {
            //     id: 'clientOrVendorName',
            //     accessorFn: (row: any) => currentRole === 'client' ? row.vendor.name : row.client.name,
            //     header: currentRole.toLocaleLowerCase() === 'client' ? 'Vendor' : 'Client',
            //     Cell: ({ cell }: any) => (
            //         <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'text.primary' }}>
            //             {cell.getValue() as string}
            //         </Typography>
            //     )
            // },
            {
                accessorKey: 'client.name',
                header: 'Client',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'text.primary' }}>
                        {cell.getValue() as string}
                    </Typography>
                )
            },
            {
                id: 'services',
                header: 'Services',
                accessorFn: (row: any) => row.services?.map((s: any) => s.name).join(', '),
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '11px', color: 'text.secondary', fontWeight: 500 }}>
                        {cell.getValue() as string}
                    </Typography>
                )
            },
            {
                accessorKey: 'eventDate',
                header: 'Event Date',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.secondary' }}>
                        {cell.getValue() ? new Date(cell.getValue() as string).toLocaleDateString() : 'N/A'}
                    </Typography>
                )
            },
            {
                accessorKey: 'totalAmount',
                header: 'Amount',
                Cell: ({ cell }: any) => (
                    <Typography sx={{ fontWeight: 800, fontSize: '13px', color: 'text.primary' }}>
                        ₹{cell.getValue()?.toLocaleString() || '0'}
                    </Typography>
                )
            },
            {
                accessorKey: 'status',
                accessorFn: (row: any) => row.status,
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

    console.log("Booking data", bookings?.data, currentRole)

    const [globalFilter, setGlobalFilter] = useState('');
    const [showGlobalFilter, setShowGlobalFilter] = useState(false);

    const table = useMaterialReactTable({
        muiTopToolbarProps: { sx: { p: '14px' } },
        columns,
        data: bookings?.data || [],
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
                                data: bookings?.data || [],
                                fileName: 'Bookings_Report'
                            }}
                        />
                    </Box>
                    <TableComponent table={table} />
                    <TableBottomToolbar table={table} />
                </DashboardCard>
            ) : (
                <PremiumCalendar
                    bookings={(bookings?.data || []) as any}
                    onDateClick={handleDateClick}
                />
            )}
        </Box>
    );
};


export default BookingsPage;
