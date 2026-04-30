import { useCallback, useMemo, useState } from 'react';
import {
    alpha,
    Box,
    Button,
    Chip,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {
    CalendarMonth as CalendarIcon,
    List as ListIcon,
    MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import {
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '@/features/dashboard/components/DashboardCard/DashboardCard';
import { TableBottomToolbar, TableComponent, TableHeaderToolbar } from '@/components/UI/Table';
import { PremiumCalendar } from '@/components/UI/Calendar';
import { useUser } from '@/features/user';
import { BOOKING_SERVICE } from '../api/bookings.api';
import type { Booking, BookingStatus } from '../types/bookings.types';

type ViewMode = 'list' | 'calendar';
type BookingRole = 'client' | 'vendor' | 'admin' | 'manager' | 'staff' | string;
type StatusColor = 'success' | 'warning' | 'error' | 'info' | 'default';

interface CalendarBooking {
    id: string;
    title: string;
    client: string;
    vendor: string;
    date: string;
    amount: string;
    status: string;
}

const BOOKING_QUERY_KEY = 'bookings';

const getBookingQueryKey = (role: BookingRole, userId?: number) => [BOOKING_QUERY_KEY, role, userId] as const;

const formatCurrency = (amount?: number): string => {
    return `\u20B9${(amount ?? 0).toLocaleString('en-IN')}`;
};

const formatDisplayDate = (date?: string): string => {
    if (!date) {
        return 'N/A';
    }

    const parsedDate = new Date(date);
    return Number.isNaN(parsedDate.getTime()) ? 'N/A' : parsedDate.toLocaleDateString();
};

const formatCalendarDate = (date?: string): string => {
    if (!date) {
        return '';
    }

    return date.includes('T') ? date.split('T')[0] : date;
};

const getServiceNames = (booking: Booking): string => {
    return booking.services?.map((service) => service.name).filter(Boolean).join(', ') || 'N/A';
};

const getVendorName = (booking: Booking): string => {
    return booking.services?.[0]?.vendor?.name ?? 'N/A';
};

const getStatusColor = (status?: string): StatusColor => {
    switch (status?.toUpperCase()) {
        case 'CONFIRMED':
            return 'success';
        case 'PENDING':
            return 'warning';
        case 'CANCELLED':
        case 'CANCELED':
            return 'error';
        case 'COMPLETED':
            return 'info';
        default:
            return 'default';
    }
};

const getBookingsByRole = (role: BookingRole, userId?: number) => {
    switch (role.toUpperCase()) {
        case 'CLIENT':
            return BOOKING_SERVICE.getClientBooking(Number(userId));
        case 'VENDOR':
            return BOOKING_SERVICE.getVendorBooking(Number(userId));
        default:
            return BOOKING_SERVICE.getAllBooking();
    }
};

const BookingsPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { user } = useUser();
    const currentRole = (user?.role?.toLowerCase() || 'client') as BookingRole;
    const userId = user?.id ? Number(user.id) : undefined;
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [globalFilter, setGlobalFilter] = useState('');
    const [showGlobalFilter, setShowGlobalFilter] = useState(false);

    const canFetchBookings = currentRole !== 'client' && currentRole !== 'vendor' || userId !== undefined;

    const { data: bookingResponse, isLoading } = useQuery({
        queryKey: getBookingQueryKey(currentRole, userId),
        queryFn: () => getBookingsByRole(currentRole, userId),
        enabled: canFetchBookings,
    });

    const bookings = useMemo(() => bookingResponse?.data ?? [], [bookingResponse?.data]);

    const calendarBookings = useMemo<CalendarBooking[]>(() => (
        bookings.map((booking) => ({
            id: String(booking.id),
            title: getServiceNames(booking),
            client: booking.client?.name ?? 'N/A',
            vendor: getVendorName(booking),
            date: formatCalendarDate(booking.eventDate),
            amount: formatCurrency(booking.totalAmount),
            status: booking.status,
        }))
    ), [bookings]);

    const handleDateClick = useCallback(() => {
        if (currentRole === 'client') {
            navigate('/client/vendors');
        }
    }, [currentRole, navigate]);

    const columns = useMemo<MRT_ColumnDef<Booking>[]>(() => [
        {
            accessorKey: 'id',
            header: 'Booking ID',
            Cell: ({ cell }) => (
                <Typography sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '11px' }}>
                    #{cell.getValue<number>()}
                </Typography>
            ),
        },
        {
            accessorKey: 'client.name',
            header: 'Client',
            Cell: ({ cell }) => (
                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'text.primary' }}>
                    {cell.getValue<string>() ?? 'N/A'}
                </Typography>
            ),
        },
        {
            id: 'services',
            header: 'Services',
            accessorFn: getServiceNames,
            Cell: ({ cell }) => (
                <Typography sx={{ fontSize: '11px', color: 'text.secondary', fontWeight: 500 }}>
                    {cell.getValue<string>()}
                </Typography>
            ),
        },
        {
            accessorKey: 'eventDate',
            header: 'Event Date',
            Cell: ({ cell }) => (
                <Typography sx={{ fontSize: '11px', fontWeight: 700, color: 'text.secondary' }}>
                    {formatDisplayDate(cell.getValue<string>())}
                </Typography>
            ),
        },
        {
            accessorKey: 'eventLocation',
            header: 'Location',
            Cell: ({ cell }) => (
                <Typography sx={{ fontSize: '11px', color: 'text.secondary', fontWeight: 500 }}>
                    {cell.getValue<string>() || 'N/A'}
                </Typography>
            ),
        },
        {
            accessorKey: 'totalAmount',
            header: 'Amount',
            Cell: ({ cell }) => (
                <Typography sx={{ fontWeight: 800, fontSize: '13px', color: 'text.primary' }}>
                    {formatCurrency(cell.getValue<number>())}
                </Typography>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            Cell: ({ cell }) => {
                const status = cell.getValue<BookingStatus>();

                return (
                    <Chip
                        label={status}
                        color={getStatusColor(status)}
                        size="small"
                        variant="outlined"
                        sx={{
                            height: 22,
                            fontSize: '10px',
                            fontWeight: 800,
                            letterSpacing: '0.04em',
                        }}
                    />
                );
            },
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            enableColumnFilter: false,
            enableSorting: false,
            Cell: () => (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton size="small">
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                </Box>
            ),
        },
    ], []);

    const table = useMaterialReactTable({
        muiTopToolbarProps: { sx: { p: '14px' } },
        columns,
        data: bookings,
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
                borderRadius: 0,
                border: 'none',
            },
        },
        state: {
            globalFilter,
            showGlobalFilter,
            isLoading,
            columnVisibility: {
                id: !isMobile,
                eventLocation: !isMobile,
            },
        },
    });

    return (
        <Box sx={{ p: 0, maxWidth: 1600, margin: '0 auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.03em' }}>
                        Bookings Management
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mt: 0.5 }}>
                        Track booking status, schedules, clients, and service value.
                    </Typography>
                </Box>

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
                                data: bookings,
                                fileName: 'Bookings_Report',
                            }}
                        />
                    </Box>
                    <TableComponent table={table} />
                    <TableBottomToolbar table={table} />
                </DashboardCard>
            ) : (
                <PremiumCalendar
                    bookings={calendarBookings}
                    onDateClick={handleDateClick}
                />
            )}
        </Box>
    );
};

export default BookingsPage;
