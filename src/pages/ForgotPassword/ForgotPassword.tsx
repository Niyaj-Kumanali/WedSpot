<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useEffect, useRef, type JSX } from "react";
import { Mail, ArrowRight, CheckCircle, ArrowLeft, Key } from "lucide-react";
=======
import React, { useState, useEffect, useRef, type JSX } from "react";
import { Mail, Lock, ArrowRight, CheckCircle, ArrowLeft, Eye, EyeOff, Key } from "lucide-react";
>>>>>>> 0a0ae5b (Implement initial application structure, core UI components, pages, routing, and authentication.)
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
<<<<<<< HEAD
  Stack,
=======
  InputAdornment,
  Stack,
  CircularProgress,
>>>>>>> 0a0ae5b (Implement initial application structure, core UI components, pages, routing, and authentication.)
  Paper,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Fade,
} from "@mui/material";
<<<<<<< HEAD
import InputField from "../../components/Form/InputField";
import PasswordField from "../../components/Form/PasswordField";
import FormButton from "../../components/Form/FormButton";
import { gsap } from "gsap";
import Logo from "../../components/Logo/Logo";
import { AUTH_SERVICE } from "../../api/services/auth";
import { isValidEmail, isValidPassword, isMatching, isValidOtp } from "../../utils/validation";

const ForgotPasswordPage: React.FC = (): JSX.Element => {
  const [step, setStep] = useState(0); // 0: Email, 1: OTP, 2: New Password
=======
import React, { useState } from "react";
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import "./ForgotPassword.scss";
import Logo from "../../components/Logo/Logo";
import { AUTH_SERVICE } from "../../api/services/auth";

const ForgotPasswordPage: React.FC = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
=======
import { gsap } from "gsap";
import Logo from "../../components/Logo/Logo";
import { AUTH_SERVICE } from "../../api/services/auth";

const ForgotPasswordPage: React.FC = (): JSX.Element => {
  const [step, setStep] = useState(0); // 0: Email, 1: OTP, 2: New Password
>>>>>>> 0a0ae5b (Implement initial application structure, core UI components, pages, routing, and authentication.)
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0a0ae5b (Implement initial application structure, core UI components, pages, routing, and authentication.)
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const steps = ["Email", "Verify", "Reset"];

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [step]);

<<<<<<< HEAD
=======
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
=======
>>>>>>> 0a0ae5b (Implement initial application structure, core UI components, pages, routing, and authentication.)
  // Step 1: Send OTP to email
  const handleSendOtp = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }
<<<<<<< HEAD
<<<<<<< HEAD
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
=======
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
=======
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
>>>>>>> 0a0ae5b (Implement initial application structure, core UI components, pages, routing, and authentication.)

    setLoading(true);
    setError("");
    setSuccess("");

    try {
<<<<<<< HEAD
<<<<<<< HEAD
      const response = await AUTH_SERVICE.forgotPassword({ email });
      if (response.ok) {
        setSuccess("OTP sent to your email successfully!");
        setTimeout(() => {
          setStep(1);
=======

=======
>>>>>>> 0a0ae5b (Implement initial application structure, core UI components, pages, routing, and authentication.)
      const response = await AUTH_SERVICE.forgotPassword({ email });
      if (response.ok) {
        setSuccess("OTP sent to your email successfully!");
        setTimeout(() => {
<<<<<<< HEAD
          setStep(2);
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
=======
          setStep(1);
>>>>>>> 0a0ae5b (Implement initial application structure, core UI components, pages, routing, and authentication.)
          setSuccess("");
        }, 1500);
      } else {
        setError(response.error || "Failed to send OTP");
      }
<<<<<<< HEAD
<<<<<<< HEAD
    } catch {
=======
    } catch (err) {
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
=======
    } catch {
>>>>>>> f39772a (centralizing the auth logic and moving the api call to api folder)
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
<<<<<<< HEAD
    if (!isValidOtp(otp)) {
=======
    if (!otp || otp.length !== 6) {
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
<<<<<<< HEAD
<<<<<<< HEAD
      const response = await AUTH_SERVICE.verifyOtp({ email, otp });
      if (response.ok) {
        setSuccess("OTP verified successfully!");
        setTimeout(() => {
          setStep(2);
=======
      const response = await AUTH_SERVICE.verifyOtp({ email, otp })

      if (response.ok) {
        setSuccess("OTP verified successfully!");
        setTimeout(() => {
          setStep(3);
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
=======
      const response = await AUTH_SERVICE.verifyOtp({ email, otp });
      if (response.ok) {
        setSuccess("OTP verified successfully!");
        setTimeout(() => {
          setStep(2);
>>>>>>> 0a0ae5b (Implement initial application structure, core UI components, pages, routing, and authentication.)
          setSuccess("");
        }, 1500);
      } else {
        setError(response.error || "Invalid OTP");
      }
<<<<<<< HEAD
<<<<<<< HEAD
    } catch {
=======
    } catch (err) {
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
=======
    } catch {
>>>>>>> f39772a (centralizing the auth logic and moving the api call to api folder)
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

<<<<<<< HEAD
<<<<<<< HEAD
    if (!isValidPassword(newPassword)) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (!isMatching(newPassword, confirmPassword)) {
=======
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
=======
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
>>>>>>> 0a0ae5b (Implement initial application structure, core UI components, pages, routing, and authentication.)
      return;
    }

    if (newPassword !== confirmPassword) {
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
<<<<<<< HEAD
<<<<<<< HEAD
      const response = await AUTH_SERVICE.resetPassword({ email, password: newPassword });
      if (response.ok) {
        setSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
=======
      const response = await AUTH_SERVICE.resetPassword({ email, password: newPassword })

      if (response.ok) {
        setSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          // Redirect to login page
          window.location.href = "/login";
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
=======
      const response = await AUTH_SERVICE.resetPassword({ email, password: newPassword });
      if (response.ok) {
        setSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
>>>>>>> 0a0ae5b (Implement initial application structure, core UI components, pages, routing, and authentication.)
        }, 2000);
      } else {
        setError(response.error || "Failed to reset password");
      }
<<<<<<< HEAD
<<<<<<< HEAD
    } catch {
=======
    } catch (err) {
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
=======
    } catch {
>>>>>>> f39772a (centralizing the auth logic and moving the api call to api folder)
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setError("");
    setSuccess("");
<<<<<<< HEAD
<<<<<<< HEAD
    if (step > 0) setStep(step - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <Fade in={step === 0}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "#1e293b", fontFamily: "'Inter', sans-serif" }}>
                Forgot Password?
              </Typography>
              <Typography sx={{ color: "#64748b", mb: 4, fontSize: "0.95rem" }}>
                Enter your email address to receive a 6-digit verification code.
              </Typography>

              <Stack spacing={3}>
                <InputField
                  label="Email Address"
                  placeholder="Ex: yourname@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  icon={<Mail size={18} color="#94a3b8" />}
                />

                <FormButton
                  onClick={handleSendOtp}
                  loading={loading}
                  icon={<ArrowRight size={20} />}
                >
                  Send Code
                </FormButton>
              </Stack>
            </Box>
          </Fade>
        );
      case 1:
        return (
          <Fade in={step === 1}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "#1e293b", fontFamily: "'Inter', sans-serif" }}>
                Verify Code
              </Typography>
              <Typography sx={{ color: "#64748b", mb: 4, fontSize: "0.95rem" }}>
                A 6-digit code has been sent to <strong>{email}</strong>.
              </Typography>

              <Stack spacing={3}>
                <Box>
                  <Typography component="label" sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}>
                    OTP Code
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="000 000"
                    value={otp}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                      if (error) setError("");
                    }}
                    variant="outlined"
                    size="small"
                    inputProps={{ style: { textAlign: "center", letterSpacing: "8px", fontWeight: 700, fontSize: "1.25rem" } }}
                    InputProps={{
                      sx: { borderRadius: "10px", bgcolor: "#f8fafc" },
                    }}
                  />
                </Box>

                <FormButton
                  onClick={handleVerifyOtp}
                  loading={loading}
                  icon={<ArrowRight size={20} />}
                >
                  Verify OTP
                </FormButton>

                <Typography sx={{ textAlign: "center", fontSize: "0.875rem", color: "#64748b" }}>
                  Didn't receive the code?{" "}
                  <Button variant="text" onClick={handleSendOtp} sx={{ color: "#7c3aed", fontWeight: 600, textTransform: "none", p: 0 }}>
                    Resend
                  </Button>
                </Typography>
              </Stack>
            </Box>
          </Fade>
        );
      case 2:
        return (
          <Fade in={step === 2}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "#1e293b", fontFamily: "'Inter', sans-serif" }}>
                Reset Password
              </Typography>
              <Typography sx={{ color: "#64748b", mb: 4, fontSize: "0.95rem" }}>
                Create a new strong password for your account.
              </Typography>

              <Stack spacing={2.5}>
                <PasswordField
                  label="New Password"
                  placeholder="Min. 6 characters"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (error) setError("");
                  }}
                />

                <PasswordField
                  label="Confirm Password"
                  placeholder="Repeat new password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (error) setError("");
                  }}
                />

                <FormButton
                  onClick={handleResetPassword}
                  loading={loading}
                  icon={<Key size={20} />}
                  sx={{ mt: 1 }}
                >
                  Update Password
                </FormButton>
              </Stack>
            </Box>
          </Fade>
        );
      default:
        return null;
=======
    if (step > 1) setStep(step - 1);
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action();
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
=======
    if (step > 0) setStep(step - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <Fade in={step === 0}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "#1e293b", fontFamily: "'Inter', sans-serif" }}>
                Forgot Password?
              </Typography>
              <Typography sx={{ color: "#64748b", mb: 4, fontSize: "0.95rem" }}>
                Enter your email address to receive a 6-digit verification code.
              </Typography>

              <Stack spacing={3}>
                <Box>
                  <Typography component="label" sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}>
                    Email Address
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Ex: yourname@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail size={18} color="#94a3b8" />
                        </InputAdornment>
                      ),
                      sx: { borderRadius: "10px", bgcolor: "#f8fafc" },
                    }}
                  />
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSendOtp}
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    bgcolor: "#7c3aed",
                    boxShadow: "0 4px 12px rgba(124, 58, 237, 0.25)",
                    "&:hover": { bgcolor: "#6d28d9" },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : (
                    <Stack direction="row" alignItems="center" gap={1}>
                      Send Code <ArrowRight size={20} />
                    </Stack>
                  )}
                </Button>
              </Stack>
            </Box>
          </Fade>
        );
      case 1:
        return (
          <Fade in={step === 1}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "#1e293b", fontFamily: "'Inter', sans-serif" }}>
                Verify Code
              </Typography>
              <Typography sx={{ color: "#64748b", mb: 4, fontSize: "0.95rem" }}>
                A 6-digit code has been sent to <strong>{email}</strong>.
              </Typography>

              <Stack spacing={3}>
                <Box>
                  <Typography component="label" sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}>
                    OTP Code
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="000 000"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                      if (error) setError("");
                    }}
                    variant="outlined"
                    size="small"
                    inputProps={{ style: { textAlign: "center", letterSpacing: "8px", fontWeight: 700, fontSize: "1.25rem" } }}
                    InputProps={{
                      sx: { borderRadius: "10px", bgcolor: "#f8fafc" },
                    }}
                  />
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    bgcolor: "#7c3aed",
                    boxShadow: "0 4px 12px rgba(124, 58, 237, 0.25)",
                    "&:hover": { bgcolor: "#6d28d9" },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : (
                    <Stack direction="row" alignItems="center" gap={1}>
                      Verify OTP <ArrowRight size={20} />
                    </Stack>
                  )}
                </Button>

                <Typography sx={{ textAlign: "center", fontSize: "0.875rem", color: "#64748b" }}>
                  Didn't receive the code?{" "}
                  <Button variant="text" onClick={handleSendOtp} sx={{ color: "#7c3aed", fontWeight: 600, textTransform: "none", p: 0 }}>
                    Resend
                  </Button>
                </Typography>
              </Stack>
            </Box>
          </Fade>
        );
      case 2:
        return (
          <Fade in={step === 2}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "#1e293b", fontFamily: "'Inter', sans-serif" }}>
                Reset Password
              </Typography>
              <Typography sx={{ color: "#64748b", mb: 4, fontSize: "0.95rem" }}>
                Create a new strong password for your account.
              </Typography>

              <Stack spacing={2.5}>
                <Box>
                  <Typography component="label" sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}>
                    New Password
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Min. 6 characters"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (error) setError("");
                    }}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock size={18} color="#94a3b8" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: { borderRadius: "10px", bgcolor: "#f8fafc" },
                    }}
                  />
                </Box>

                <Box>
                  <Typography component="label" sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#334155", mb: 0.5, display: "block" }}>
                    Confirm Password
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Repeat new password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (error) setError("");
                    }}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock size={18} color="#94a3b8" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" size="small">
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: { borderRadius: "10px", bgcolor: "#f8fafc" },
                    }}
                  />
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleResetPassword}
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    mt: 1,
                    borderRadius: "10px",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    bgcolor: "#7c3aed",
                    boxShadow: "0 4px 12px rgba(124, 58, 237, 0.25)",
                    "&:hover": { bgcolor: "#6d28d9" },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : (
                    <Stack direction="row" alignItems="center" gap={1}>
                      Update Password <Key size={20} />
                    </Stack>
                  )}
                </Button>
              </Stack>
            </Box>
          </Fade>
        );
      default:
        return null;
>>>>>>> 0a0ae5b (Implement initial application structure, core UI components, pages, routing, and authentication.)
    }
  };

  return (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0a0ae5b (Implement initial application structure, core UI components, pages, routing, and authentication.)
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#fcf9ff", // Light wedding-themed tint
        p: 2,
        background: "radial-gradient(circle at top left, #f5f3ff 0%, #ffffff 100%)",
      }}
    >
      <Paper
        ref={containerRef}
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "480px",
          p: { xs: 3, sm: 5 },
          borderRadius: "24px",
          border: "1px solid rgba(124, 58, 237, 0.1)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.03)",
          position: "relative",
          bgcolor: "#ffffff",
        }}
      >
        <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
<<<<<<< HEAD
          <Logo />
        </Box>

        <Stepper activeStep={step} alternativeLabel sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#94a3b8",
                  },
                  "& .MuiStepLabel-label.Mui-active": { color: "#7c3aed" },
                  "& .MuiStepLabel-label.Mui-completed": { color: "#7c3aed" },
                  "& .MuiStepIcon-root": { color: "#f1f5f9" },
                  "& .MuiStepIcon-root.Mui-active": { color: "#7c3aed" },
                  "& .MuiStepIcon-root.Mui-completed": { color: "#7c3aed" },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ position: "relative" }}>
          {step > 0 && (
            <IconButton
              onClick={handleBack}
              sx={{
                position: "absolute",
                top: -12,
                left: -8,
                color: "#64748b",
                "&:hover": { color: "#7c3aed", bgcolor: "rgba(124, 58, 237, 0.05)" },
              }}
              size="small"
            >
              <ArrowLeft size={18} />
            </IconButton>
          )}

          {renderStepContent()}

          {error && (
            <Alert severity="error" sx={{ mt: 3, borderRadius: "10px", fontSize: "0.875rem" }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert
              icon={<CheckCircle size={18} />}
              severity="success"
              sx={{ mt: 3, borderRadius: "10px", fontSize: "0.875rem", bgcolor: "#f0fdf4", color: "#166534" }}
            >
              {success}
            </Alert>
          )}
        </Box>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Typography variant="body2" sx={{ color: "#7c3aed", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}>
              Back to Sign In
            </Typography>
          </Link>
        </Box>
      </Paper>
    </Box>
=======
    <div className="auth-page forgot-password-page">
      <div className="auth-container">
        <div className="auth-logo">
=======
>>>>>>> 0a0ae5b (Implement initial application structure, core UI components, pages, routing, and authentication.)
          <Logo />
        </Box>

        <Stepper activeStep={step} alternativeLabel sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#94a3b8",
                  },
                  "& .MuiStepLabel-label.Mui-active": { color: "#7c3aed" },
                  "& .MuiStepLabel-label.Mui-completed": { color: "#7c3aed" },
                  "& .MuiStepIcon-root": { color: "#f1f5f9" },
                  "& .MuiStepIcon-root.Mui-active": { color: "#7c3aed" },
                  "& .MuiStepIcon-root.Mui-completed": { color: "#7c3aed" },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ position: "relative" }}>
          {step > 0 && (
            <IconButton
              onClick={handleBack}
              sx={{
                position: "absolute",
                top: -12,
                left: -8,
                color: "#64748b",
                "&:hover": { color: "#7c3aed", bgcolor: "rgba(124, 58, 237, 0.05)" },
              }}
              size="small"
            >
              <ArrowLeft size={18} />
            </IconButton>
          )}

          {renderStepContent()}

          {error && (
            <Alert severity="error" sx={{ mt: 3, borderRadius: "10px", fontSize: "0.875rem" }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert
              icon={<CheckCircle size={18} />}
              severity="success"
              sx={{ mt: 3, borderRadius: "10px", fontSize: "0.875rem", bgcolor: "#f0fdf4", color: "#166534" }}
            >
              {success}
            </Alert>
          )}
        </Box>

<<<<<<< HEAD
              {success && (
                <div className="auth-success">
                  <CheckCircle size={18} />
                  <span>{success}</span>
                </div>
              )}

              <button className="submit-btn" onClick={handleSendOtp} disabled={loading}>
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    Send OTP
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <>
            <div className="auth-header">
              <h2>Verify OTP</h2>
              <p>Enter the 6-digit code sent to {email}</p>
            </div>

            <div className="auth-form">
              <div className="form-group">
                <label className="form-label">Verification Code</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    className="form-input otp-input"
                    placeholder="000000"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    onKeyPress={(e) => handleKeyPress(e, handleVerifyOtp)}
                  />
                </div>
              </div>

              <div className="helper-text">
                Didn't receive the code?{' '}
                <span className="resend-link" onClick={handleSendOtp}>
                  Resend OTP
                </span>
              </div>

              {error && (
                <div className="auth-error">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="auth-success">
                  <CheckCircle size={18} />
                  <span>{success}</span>
                </div>
              )}

              <button className="submit-btn" onClick={handleVerifyOtp} disabled={loading}>
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    Verify OTP
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <>
            <div className="auth-header">
              <h2>Reset Password</h2>
              <p>Enter your new password</p>
            </div>

            <div className="auth-form">
              <div className="form-group">
                <label className="form-label">New Password</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <Lock className="input-icon" size={18} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, handleResetPassword)}
                  />
                  <Lock className="input-icon" size={18} />
                </div>
              </div>

              {error && (
                <div className="auth-error">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="auth-success">
                  <CheckCircle size={18} />
                  <span>{success}</span>
                </div>
              )}

              <button className="submit-btn" onClick={handleResetPassword} disabled={loading}>
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    Reset Password
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
=======
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Typography variant="body2" sx={{ color: "#7c3aed", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}>
              Back to Sign In
            </Typography>
          </Link>
        </Box>
      </Paper>
    </Box>
>>>>>>> 0a0ae5b (Implement initial application structure, core UI components, pages, routing, and authentication.)
  );
};

export default ForgotPasswordPage;