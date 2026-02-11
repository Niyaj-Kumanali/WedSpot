import React, { useState } from "react";
import { Mail, Phone, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import "./SignUp.scss";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo/Logo";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      console.log("Register:", { email, password });
    }, 1500);
  };

  return (
    <div className="signup-page auth-page">
      <div className="auth-container">
        <div className="auth-logo">
          <Logo />
        </div>

        {/* <div className="auth-header">
          <h2>Create Account</h2>
        </div> */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="input-icon" size={18} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <div className="input-wrapper">
              <input
                type="tel"
                className="form-input"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Phone className="input-icon" size={18} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="input-icon" size={18} />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-input"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Lock className="input-icon" size={18} />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="auth-error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <span className="loading-spinner"></span>
            ) : (
              <>
                Create Account
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="auth-switch">
            Already have an account? <Link to="/login">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
