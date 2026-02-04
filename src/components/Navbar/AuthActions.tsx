import { Link } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import { type JSX } from "react";

interface AuthActionsProps {
  isAuthenticated: boolean;
  role: string | null;
  onLogout: () => void;
}

const AuthActions = ({ isAuthenticated, role, onLogout }: AuthActionsProps): JSX.Element => {
  return (
    <div className="navbar-right">
      {isAuthenticated ? (
        <>
          <Typography variant="body2" sx={{ marginRight: 2, fontWeight: 600, color: 'var(--text)' }}>
            {role ? `Role: ${role}` : null}
          </Typography>
          <Button
            variant="text"
            sx={{ fontWeight: 600 }}
            onClick={onLogout}
          >
            Logout
          </Button>
        </>
      ) : (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="text"
            sx={{ fontWeight: 600 }}
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            className="nav-action-btn"
            component={Link}
            to="/register"
            sx={{
              background: 'linear-gradient(90deg, #9b86ff 0%, #7c3aed 60%)',
              color: '#fff',
              textTransform: 'none',
              borderRadius: '10px',
              fontWeight: 600,
              px: 3
            }}
          >
            Get Started
          </Button>
        </Box>
      )}
    </div>
  );
};

export default AuthActions;
