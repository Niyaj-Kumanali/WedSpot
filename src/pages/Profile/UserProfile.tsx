import React, { useState } from "react";
import { 
  User, 
  Shield, 
  Settings, 
  Bell, 
  Lock, 
  ExternalLink,
  ChevronRight,
  Mail,
  Phone,
  ArrowRight,
  Eye,
  EyeOff,
  Trash2,
  AlertTriangle
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { getInitials } from "../../utils/userUtils";
import "../../styles/DashboardStyles.css";

const UserProfile: React.FC = () => {
  const { role, userName } = useAuth();
  const [activeTab, setActiveTab] = useState<'general' | 'security'>('general');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="profile-page">
      {/* Premium Header Card - Stats Removed for Industry Standard Cleanliness */}
      <div className="profile-header-card-premium animate-fadeInUp">
        <div className="profile-banner-premium">
          <div className="banner-glass-overlay"></div>
        </div>
        <div className="profile-header-content-premium">
          <div className="profile-avatar-premium-wrapper">
            <div className="profile-avatar-premium">
              {getInitials(userName || role)}
            </div>
            <div className="avatar-badge-online"></div>
          </div>
          <div className="profile-main-info-premium">
            <h1 className="profile-name-xl">{userName || role}</h1>
            <div className="profile-status-wrapper">
              <div className="role-badge-premium">
                <Shield size={16} />
                {role} Level
              </div>
            </div>
          </div>
          <div>
            <button className="btn-primary flex-center-gap-sm">
              View Analytics
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="premium-bento-grid">
        {/* Navigation - Left */}
        <div className="glass-card bento-card span-small stagger-1">
          <h3 className="premium-section-title">
            <Settings size={24} className="premium-title-icon" />
            Control Center
          </h3>
          <div className="premium-nav-container">
            <div 
              className={`premium-nav-item ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              <div className="flex-center-gap-sm">
                <User size={18} />
                <span>General Profile</span>
              </div>
              <ChevronRight size={16} />
            </div>
            <div 
              className={`premium-nav-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <div className="flex-center-gap-sm">
                <Lock size={18} />
                <span>Security Matrix</span>
              </div>
              <ChevronRight size={16} />
            </div>
            <div className="premium-nav-item">
              <div className="flex-center-gap-sm">
                <Bell size={18} />
                <span>Alert Protocols</span>
              </div>
              <ChevronRight size={16} />
            </div>
            <div className="premium-nav-item">
              <div className="flex-center-gap-sm">
                <ExternalLink size={18} />
                <span>API Connections</span>
              </div>
              <ChevronRight size={16} />
            </div>
          </div>
        </div>

        {/* Content Area - Right */}
        <div className="glass-card bento-card span-large stagger-2">
          {activeTab === 'general' ? (
            <div className="animate-fadeInRight">
              <h3 className="premium-section-title">
                <User size={24} className="premium-title-icon" />
                Account Details
              </h3>
              <div className="premium-form-group">
                <div className="premium-info-grid">
                  <div className="premium-input-container">
                    <label className="premium-input-label">Full Name</label>
                    <div className="premium-input-wrapper">
                      <User className="premium-input-icon" size={18} />
                      <input type="text" className="premium-input" defaultValue={userName || ""} placeholder="Your Name" />
                    </div>
                  </div>
                  <div className="premium-input-container">
                    <label className="premium-input-label">Email Node</label>
                    <div className="premium-input-wrapper">
                      <Mail className="premium-input-icon" size={18} />
                      <input type="email" className="premium-input" defaultValue="admin@weddingcraft.com" placeholder="Email Address" />
                    </div>
                  </div>
                  <div className="premium-input-container">
                    <label className="premium-input-label">Contact Line</label>
                    <div className="premium-input-wrapper">
                      <Phone className="premium-input-icon" size={18} />
                      <input type="tel" className="premium-input" defaultValue="+91 98765 43210" placeholder="Phone Number" />
                    </div>
                  </div>
                  <div className="premium-input-container">
                    <label className="premium-input-label">Operation Base</label>
                    <div className="premium-input-wrapper">
                      <Settings className="premium-input-icon" size={18} />
                      <input type="text" className="premium-input" defaultValue="Mumbai, India" placeholder="Location" />
                    </div>
                  </div>
                </div>
                <div className="flex-end-center mt-1">
                  <button className="btn-primary">Sync Updates</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-fadeInRight">
              <h3 className="premium-section-title">
                <Lock size={24} className="premium-title-icon" />
                Credential Management
              </h3>
              <div className="premium-form-group">
                <div className="premium-input-container">
                  <label className="premium-input-label">Current Authentication Code</label>
                  <div className="premium-input-wrapper">
                    <Lock className="premium-input-icon" size={18} />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="premium-input" 
                      placeholder="••••••••••••" 
                    />
                    <div className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={18} color="var(--dash-text-muted)" /> : <Eye size={18} color="var(--dash-text-muted)" />}
                    </div>
                  </div>
                </div>
                <div className="premium-info-grid">
                  <div className="premium-input-container">
                    <label className="premium-input-label">New Password Node</label>
                    <div className="premium-input-wrapper">
                      <Shield className="premium-input-icon" size={18} />
                      <input type="password" className="premium-input" placeholder="Min 12 characters" />
                    </div>
                  </div>
                  <div className="premium-input-container">
                    <label className="premium-input-label">Confirm New Node</label>
                    <div className="premium-input-wrapper">
                      <Shield className="premium-input-icon" size={18} />
                      <input type="password" className="premium-input" placeholder="Repeat password" />
                    </div>
                  </div>
                </div>
                <div className="flex-end-center mt-1">
                  <button className="btn-primary">Update Security Ledger</button>
                </div>
              </div>
            </div>
          )}

          {/* Industry Standard Danger Zone */}
          <div className="danger-zone-card stagger-3 mt-3">
            <div className="danger-zone-header">
              <h4 className="danger-zone-title">
                <AlertTriangle size={20} />
                Danger Protocol Area
              </h4>
              <p className="danger-zone-text">The following actions are destructive and cannot be reversed. Please proceed with absolute caution.</p>
            </div>
            <div className="danger-action-list">
              <div className="danger-action-item">
                <div className="danger-item-info">
                  <span className="danger-item-title">Wipe Local Instance</span>
                  <span className="danger-item-desc">Clear all cached operational data and history logs.</span>
                </div>
                <button className="btn-danger-outline">Clear Cache</button>
              </div>
              <div className="danger-action-item">
                <div className="danger-item-info">
                  <span className="danger-item-title">Terminate Account Ledger</span>
                  <span className="danger-item-desc">Permanently delete your profile and all associated event nodes.</span>
                </div>
                <button className="btn-danger-outline flex-center-gap-sm">
                  <Trash2 size={16} />
                  Terminate Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
