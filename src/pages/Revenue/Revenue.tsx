import {
    Box,
    Typography,
    Grid,
    alpha,
    useTheme,
    LinearProgress,
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    AttachMoney as MoneyIcon,
    ArrowUpward as ArrowUpIcon,
    AccountBalance as BankIcon,
    Savings as SavingsIcon
} from '@mui/icons-material';
<<<<<<< HEAD
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
import Chart from 'react-apexcharts';
=======
import DashboardHeader from '../../components/Dashboard/DashboardHeader/DashboardHeader';
import DashboardCard from '../../components/Dashboard/DashboardCard/DashboardCard';
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)

const Revenue = () => {
    const theme = useTheme();

<<<<<<< HEAD
    const chartOptions: any = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
            fontFamily: theme.typography.fontFamily,
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 6,
                columnWidth: '60%',
                distributed: false,
                dataLabels: { position: 'top' },
            }
        },
        dataLabels: { enabled: false },
        stroke: { show: true, width: 2, colors: ['transparent'] },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: {
                    colors: theme.palette.text.secondary,
                    fontWeight: 600,
                    fontSize: '10px'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: theme.palette.text.secondary,
                    fontWeight: 600,
                    fontSize: '10px'
                },
                formatter: (val: number) => `₹${val}L`
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.5,
                gradientToColors: [theme.palette.secondary.main],
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0.3,
                stops: [0, 100]
            }
        },
        grid: {
            borderColor: alpha(theme.palette.divider, 0.1),
            strokeDashArray: 4,
            yaxis: { lines: { show: true } }
        },
        tooltip: {
            theme: theme.palette.mode,
            y: {
                formatter: (val: number) => `₹${val.toLocaleString()},00,000`
            }
        },
        colors: [theme.palette.primary.main]
    };

    const chartSeries = [{
        name: 'Revenue',
        data: [30, 45, 60, 40, 70, 85, 95, 80, 75, 90, 100, 110]
    }];

=======
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
    const financeStats = [
        { label: 'Platform Revenue', value: '₹52,14,000', change: '+22%', icon: <MoneyIcon />, color: '#22c55e' },
        { label: 'Booking Fees', value: '₹12,45,000', change: '+18.5%', icon: <TrendingUpIcon />, color: '#7c3aed' },
        { label: 'Pending Payouts', value: '₹8,30,000', change: '12 Vendors', icon: <BankIcon />, color: '#f59e0b' },
        { label: 'Net Profit', value: '₹31,40,000', change: '+14%', icon: <SavingsIcon />, color: '#0ea5e9' },
    ];

    return (
<<<<<<< HEAD
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
                Revenue Analytics
            </Typography>
            <Grid container spacing={3} sx={{ mt: 1, mb: 2 }}>
=======
        <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
            <DashboardHeader
                title="Revenue & Analytics"
                subtitle="Detailed financial overview of the WedsPot platform performance."
                tag="Financials"
            />

            <Grid container spacing={3} sx={{ mb: 4 }}>
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
                {financeStats.map((stat, index) => (
                    <Grid item xs={12} sm={6} lg={3} key={index}>
                        <DashboardCard>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                                    <Typography sx={{ fontWeight: 800, fontSize: '1.5rem', color: stat.color }}>
                                        {stat.value}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 800, color: 'success.main', display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '11px' }}>
=======
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block' }}>
                                        {stat.label}
                                    </Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
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

            <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
<<<<<<< HEAD
                    <DashboardCard sx={{ height: 420 }}>
                        <Typography sx={{ fontWeight: 900, mb: 2, color: 'text.primary', fontSize: '14px' }}>Revenue Trend (Annual)</Typography>
                        <Box sx={{ height: 320, width: '100%', mt: 1 }}>
                            <Chart
                                options={chartOptions}
                                series={chartSeries}
                                type="bar"
                                height="100%"
                            />
=======
                    <DashboardCard sx={{ height: 400 }}>
                        <Typography sx={{ fontWeight: 800, mb: 4 }}>Revenue Trend (Annual)</Typography>
                        <Box sx={{ height: 300, display: 'flex', alignItems: 'flex-end', gap: 1.5, px: 2 }}>
                            {[30, 45, 60, 40, 70, 85, 95, 80, 75, 90, 100, 110].map((h, i) => (
                                <Box key={i} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{
                                        width: '100%',
                                        height: `${(h / 110) * 100}%`,
                                        bgcolor: alpha(theme.palette.primary.main, 0.15),
                                        borderRadius: '6px 6px 0 0',
                                        transition: '0.3s',
                                        '&:hover': { bgcolor: 'primary.main' }
                                    }} />
                                    <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 700, color: 'text.secondary' }}>
                                        {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                                    </Typography>
                                </Box>
                            ))}
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
                        </Box>
                    </DashboardCard>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <DashboardCard sx={{ height: 400 }}>
<<<<<<< HEAD
                        <Typography sx={{ fontWeight: 900, mb: 4, color: 'text.primary', fontSize: '14px' }}>Revenue Sources</Typography>
=======
                        <Typography sx={{ fontWeight: 800, mb: 4 }}>Revenue Sources</Typography>
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {[
                                { name: 'Subscription Fees', value: 35, color: '#7c3aed' },
                                { name: 'Booking Commission', value: 45, color: '#22c55e' },
                                { name: 'Featured Listings', value: 15, color: '#0ea5e9' },
                                { name: 'Ads/Promotions', value: 5, color: '#f59e0b' }
                            ].map((src, i) => (
                                <Box key={i}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
<<<<<<< HEAD
                                        <Typography sx={{ fontWeight: 800, fontSize: '11px', color: 'text.primary' }}>{src.name}</Typography>
                                        <Typography sx={{ fontWeight: 800, fontSize: '11px', color: 'text.secondary' }}>{src.value}%</Typography>
=======
                                        <Typography variant="caption" sx={{ fontWeight: 700 }}>{src.name}</Typography>
                                        <Typography variant="caption" sx={{ fontWeight: 700 }}>{src.value}%</Typography>
>>>>>>> b2dcd0e (Initialize dashboard layout with sidebar, routing, and core management pages for various functionalities.)
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={src.value}
                                        sx={{
                                            height: 10,
                                            borderRadius: 5,
                                            bgcolor: alpha(src.color, 0.1),
                                            '& .MuiLinearProgress-bar': { bgcolor: src.color, borderRadius: 5 }
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </DashboardCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Revenue;
