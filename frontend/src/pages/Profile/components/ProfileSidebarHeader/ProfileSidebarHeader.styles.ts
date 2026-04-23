import { 
    Avatar, 
    Button, 
    styled, 
    alpha 
} from "@mui/material";

export const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: 140,
    height: 140,
    fontSize: '3rem',
    fontWeight: 800,
    background: theme.palette.background.paper,
    color: theme.palette.primary.main,
    border: `8px solid ${theme.palette.background.paper}`,
    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.3)',
    borderRadius: 6
}));

export const LogoutButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    borderRadius: theme.spacing(1.5),
    fontWeight: 700,
    color: theme.palette.error.main,
    borderColor: alpha(theme.palette.error.main, 0.3),
    '&:hover': {
        backgroundColor: alpha(theme.palette.error.main, 0.05),
        borderColor: theme.palette.error.main,
    },
}));

export const InfoIconWrapper = styled('div')<{ $color: string }>(({ theme, $color }) => ({
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    backgroundColor: alpha($color, 0.1),
    color: $color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));
