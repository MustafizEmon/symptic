import React, { useState, useEffect } from 'react';
import { FaUser, FaUserMd, FaArrowRight, FaClinicMedical, FaLock, FaEye, FaEyeSlash, FaBars, FaTimes } from 'react-icons/fa';
import { MdHealthAndSafety, MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';


export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('patient');
  const [linkedIn, setLinkedIn] = useState('');
  const [Cv, setCv] = useState('');
  const [medicalReg, setMedicalReg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordPattern.test(password)) {
      alert("Password must be at least 6 characters and include at least one uppercase letter, one lowercase letter, and one number.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        fullName,
        phone,
        country,
        role,
        status: role === 'doctor' ? 'pending' : 'approved',
        ...(role === 'doctor' && { 
          linkedIn, 
          Cv,
          medicalReg,
          appliedAt: new Date().toISOString() 
        })
      });

      window.location.href = role === 'patient' ? '/login' : '/';
    } catch (error) {
      alert(error.message);
    }
  };

  // Base styles
  const styles = {
    appContainer: {
      minHeight: '100vh',
      width: '98.8vw',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      overflowX: 'hidden',
      boxSizing: 'border-box',
    },
    nav: {
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      height: '64px',
      flexShrink: 0,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      width: '100%',
    },
    navContainer: {
      height: '100%',
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      boxSizing: 'border-box',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.25rem',
      fontWeight: 700,
      color: '#2563eb',
      textDecoration: 'none',
      zIndex: 1001
    },
    navLinks: {
      display: 'flex',
      gap: '24px',
      alignItems: 'center'
    },
    navLink: {
      color: '#4b5563',
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: '0.9375rem',
      transition: 'color 0.2s',
      '&:hover': {
        color: '#2563eb'
      }
    },
    mobileMenuButton: {
      background: 'none',
      border: 'none',
      color: '#4b5563',
      fontSize: '1.25rem',
      cursor: 'pointer',
      display: 'none',
      zIndex: 1001
    },
    mobileMenu: {
      position: 'fixed',
      top: '64px',
      left: 0,
      right: 0,
      backgroundColor: 'white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      zIndex: 999,
      transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-130%)',
      transition: 'transform 0.3s ease-in-out'
    },
    mainContent: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      minHeight: 'calc(100vh - 64px)',
      marginTop: '64px',
      width: '100%',
      position: 'relative'
    },
    heroSection: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      width: isMobile ? '100%' : '50%',
      padding: isMobile ? '40px 20px' : '0',
      minHeight: isMobile ? '300px' : 'calc(100vh - 64px)',
      position: isMobile ? 'relative' : 'fixed',
      left: isMobile ? 'auto' : 0,
      top: isMobile ? 'auto' : '64px'
    },
    heroContent: {
      maxWidth: '500px',
      width: '100%',
      padding: '32px',
    },
    heroIcon: {
      marginBottom: '24px'
    },
    heroTitle: {
      fontSize: isMobile ? '1.75rem' : '2rem',
      fontWeight: 700,
      marginBottom: '16px',
      lineHeight: 1.2
    },
    heroSubtitle: {
      fontSize: isMobile ? '1rem' : '1.125rem',
      opacity: 0.9,
      marginBottom: '32px',
      lineHeight: 1.5
    },
    statsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
      marginTop: '32px',
      flexWrap: 'wrap'
    },
    statBox: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      padding: '16px',
      borderRadius: '8px',
      minWidth: '96px'
    },
    statNumber: {
      fontSize: '1.5rem',
      fontWeight: 700
    },
    statLabel: {
      fontSize: '0.75rem'
    },
    loginSection: {
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: isMobile ? '100%' : '50%',
      marginLeft: isMobile ? '0' : '50%',
      padding: '40px 0',
      minHeight: isMobile ? 'auto' : 'calc(100vh - 64px)',
      overflowY: 'auto'
    },
    loginFormContainer: {
      width: '100%',
      maxWidth: '450px',
      margin: 'auto',
      padding: '0 24px',
    },
    loginHeader: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    loginTitle: {
      fontSize: isMobile ? '1.5rem' : '1.875rem',
      fontWeight: 700,
      color: '#111827',
      marginBottom: '8px'
    },
    loginSubtitle: {
      color: '#6b7280',
      fontSize: '0.9375rem',
      marginBottom: '24px'
    },
    loginForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      width: '100%'
    },
    inputGroup: {
      position: 'relative',
      marginBottom: '16px',
      width: '100%'
    },
    inputIcon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center'
    },
    formInput: {
      width: '100%',
      padding: '12px 16px 12px 44px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '0.9375rem',
      backgroundColor: '#f9fafb',
      transition: 'all 0.2s',
      height: '48px',
      boxSizing: 'border-box',
      color: '#3b82f6',
    },
    passwordToggle: {
      position: 'absolute',
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      fontSize: '1rem'
    },
    roleToggle: {
      display: 'flex',
      margin: '0 0 24px 0',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      overflow: 'hidden',
      width: '100%'
    },
    toggleButton: {
      flex: 1,
      padding: '12px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontWeight: 500,
      transition: 'all 0.2s',
      fontSize: '0.9375rem'
    },
    activeToggle: {
      background: '#2563eb',
      color: 'white'
    },
    loginButton: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '12px',
      border: 'none',
      borderRadius: '8px',
      backgroundColor: '#2563eb',
      color: 'white',
      fontWeight: 600,
      fontSize: '0.9375rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      height: '48px',
      marginTop: '8px'
    },
    signupLink: {
      textAlign: 'center',
      marginTop: '24px',
      color: '#6b7280',
      fontSize: '0.875rem'
    },
    authLink: {
      color: '#2563eb',
      fontWeight: 500,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    formRow: {
      display: 'flex',
      gap: '16px',
      width: '100%',
      flexDirection: isMobile ? 'column' : 'row'
    },
    halfWidthInput: {
      flex: 1,
      minWidth: 0
    }
  };

  // Mobile-specific style overrides
  if (isMobile) {
    styles.mobileMenuButton.display = 'block';
    styles.navLinks.display = 'none';
  }

  return (
    <div style={styles.appContainer}>
      {/* Fixed Navigation Bar */}
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <Link to="/" style={styles.logo}>
            <MdHealthAndSafety style={{ marginRight: '8px' }} />
            SympticAi
          </Link>
          
          <div style={styles.navLinks}>
            <Link to="/" style={styles.navLink}>Home</Link>
            <Link to="/services" style={styles.navLink}>Services</Link>
            <Link to="/doctors" style={styles.navLink}>Doctors</Link>
            <Link to="/about" style={styles.navLink}>About</Link>
            <Link to="/contact" style={styles.navLink}>Contact</Link>
          </div>
          
          <button 
            style={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        
        {isMobile && (
          <div style={styles.mobileMenu}>
            <Link to="/" style={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/services" style={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link to="/doctors" style={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Doctors</Link>
            <Link to="/about" style={styles.navLink} onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link to="/contact" style={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main style={styles.mainContent}>
        {/* Hero Section - Fixed on desktop, normal on mobile */}
        <section style={styles.heroSection}>
          <div style={styles.heroContent}>
            <div style={styles.heroIcon}>
              <FaClinicMedical size={48} />
            </div>
            <h2 style={styles.heroTitle}>Compassionate Care When You Need It Most</h2>
            <p style={styles.heroSubtitle}>
              Access to top medical professionals 24/7. Your health is our highest priority.
            </p>
            <div style={styles.statsContainer}>
              <div style={styles.statBox}>
                <div style={styles.statNumber}>100+</div>
                <div style={styles.statLabel}>Certified Doctors</div>
              </div>
              <div style={styles.statBox}>
                <div style={styles.statNumber}>24/7</div>
                <div style={styles.statLabel}>Availability</div>
              </div>
              <div style={styles.statBox}>
                <div style={styles.statNumber}>10K+</div>
                <div style={styles.statLabel}>Patients Helped</div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section - Scrollable on desktop, full width on mobile */}
        <section style={styles.loginSection}>
          <div style={styles.loginFormContainer}>
            <div style={styles.loginHeader}>
              <h1 style={styles.loginTitle}>Create Account</h1>
              <p style={styles.loginSubtitle}>Join our health community today</p>
            </div>

            <form onSubmit={handleSignup} style={styles.loginForm}>
              <div style={styles.roleToggle}>
                <button 
                  type="button"
                  style={{
                    ...styles.toggleButton,
                    ...(role === 'patient' && styles.activeToggle)
                  }}
                  onClick={() => setRole('patient')}
                >
                  <FaUser /> Patient
                </button>
                <button 
                  type="button"
                  style={{
                    ...styles.toggleButton,
                    ...(role === 'doctor' && styles.activeToggle)
                  }}
                  onClick={() => setRole('doctor')}
                >
                  <FaUserMd /> Doctor
                </button>
              </div>

              <div style={styles.inputGroup}>
                <div style={styles.inputIcon}>
                  <FaUser />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Full Name"
                  style={styles.formInput}
                />
              </div>

              <div style={styles.inputGroup}>
                <div style={styles.inputIcon}>
                  <MdEmail />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email Address"
                  style={styles.formInput}
                />
              </div>

              <div style={styles.inputGroup}>
                <div style={styles.inputIcon}>
                  <FaLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}"
                  title="Password must be at least 6 characters and include at least one uppercase letter, one lowercase letter, and one number"
                  placeholder="Password"
                  style={styles.formInput}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.passwordToggle}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div style={styles.formRow}>
                <div style={{ ...styles.inputGroup, ...styles.halfWidthInput }}>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, '');
                      setPhone(numericValue);
                    }}
                    required
                    placeholder="Phone"
                    style={styles.formInput}
                  />
                </div>
                <div style={{ ...styles.inputGroup, ...styles.halfWidthInput }}>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^[A-Za-z]*$/.test(value)) {
                        setCountry(value);
                      }
                    }}
                    required
                    placeholder="Country"
                    style={styles.formInput}
                  />
                </div>
              </div>

              {role === 'doctor' && (
                <>
                  <div style={styles.inputGroup}>
                    <input
                      type="text"
                      value={linkedIn}
                      onChange={(e) => setLinkedIn(e.target.value)}
                      required
                      placeholder="LinkedIn Profile URL"
                      style={styles.formInput}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <input
                      type="text"
                      value={medicalReg}
                      onChange={(e) => setMedicalReg(e.target.value)}
                      required
                      placeholder="Medical Registration Number"
                      style={styles.formInput}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <input
                      type="text"
                      value={Cv}
                      onChange={(e) => setCv(e.target.value)}
                      required
                      placeholder="CV URL"
                      style={styles.formInput}
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                style={styles.loginButton}
              >
                Continue <FaArrowRight style={{ marginLeft: '8px' }} />
              </button>
            </form>

            <div style={styles.signupLink}>
              Already have an account?{' '}
              <Link to="/login" style={styles.authLink}>
                Log in
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}