import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaClinicMedical, FaBars, FaTimes } from 'react-icons/fa';
import { MdEmail, MdHealthAndSafety } from 'react-icons/md';
import { getDoc, doc } from "firebase/firestore";
import { db } from '../../firebase';

const styles = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .app-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  nav {
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    height: 64px;
    flex-shrink: 0;
    position: relative;
    z-index: 10;
  }

  .nav-container {
    height: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    font-weight: 700;
    color: #2563eb;
    text-decoration: none;
    padding-top: 20px;
  }

  .logo svg {
    margin-right: 8px;
  }

  .desktop-nav {
    display: none;
  }

  .desktop-nav a {
    color: #374151;
    text-decoration: none;
    margin-left: 24px;
    font-weight: 500;
    transition: color 0.2s;
    font-size: 0.9375rem;
  }

  .desktop-nav a:hover {
    color: #2563eb;
  }

  .mobile-menu-button {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
  }

  .mobile-menu {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background-color: white;
    padding: 16px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    z-index: 10;
  }

  .mobile-menu a {
    color: #374151;
    text-decoration: none;
    padding: 12px 0;
    font-weight: 500;
    transition: color 0.2s;
  }

  .mobile-menu a:hover {
    color: #2563eb;
  }

  .main-content {
    flex: 1;
    display: flex;
    overflow: hidden;
    height: calc(100vh - 64px); /* Subtract nav height */
  }

  .hero-section {
    background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex: 1;
    overflow: hidden;
    padding: 32px;
  }

  .hero-content {
    max-width: 500px;
    width: 100%;
  }

  .hero-icon {
    margin-bottom: 24px;
  }

  .hero-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 16px;
    line-height: 1.2;
  }

  .hero-subtitle {
    font-size: 1.125rem;
    opacity: 0.9;
    margin-bottom: 32px;
    line-height: 1.5;
  }

  .stats-container {
    display: none;
  }

  .login-section {
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    overflow: auto;
    padding: 32px;
  }

  .login-form-container {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }

  .login-header {
    text-align: center;
    margin-bottom: 32px;
  }

  .login-title {
    font-size: 1.875rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 8px;
  }

  .login-subtitle {
    color: #6b7280;
    font-size: 0.9375rem;
    
  }

  .login-form {
    // display: flex;
    // flex-direction: column;
    // gap: 24px;
    
  }

  .input-group {
    position: relative;
    margin: 18px 0;
  }

.input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    font-size: 1rem;
    display: flex; /* Ensures content stays centered */
    align-items: center; /* Perfect vertical alignment */
}

.form-input {
    width: 100%;
    padding: 12px 16px 12px 44px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 0.9375rem;
    background-color: #f9fafb;
    transition: all 0.2s;
    height: 48px;
    text-indent: 25px; /* Moves placeholder text slightly right */
    color: #3b82f6;
}

  .form-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .password-toggle {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 1rem;
  }

  .remember-forgot {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .remember-me {
    display: flex;
    align-items: center;
    
  }

  .remember-me input {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }

  .remember-me label {
    font-size: 0.875rem;
    color: #374151;
  }

  .forgot-password {
    color: #2563eb;
    font-weight: 500;
    text-decoration: none;
    font-size: 0.875rem;
  }

  .forgot-password:hover {
    text-decoration: underline;
  }

  .login-button {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background-color: #2563eb;
    color: white;
    font-weight: 600;
    font-size: 0.9375rem;
    cursor: pointer;
    transition: background-color 0.2s;
    height: 40px;
  }

  .login-button:hover {
    background-color: #1d4ed8;
  }

  .login-button:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }

  .spinner {
    animation: spin 1s linear infinite;
    width: 20px;
    height: 20px;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .divider {
    display: flex;
    align-items: center;
    margin: 18px 0;
  }

  .divider-line {
    flex-grow: 1;
    height: 1px;
    background-color: #e5e7eb;
  }

  .divider-text {
    padding: 0 16px;
    color: #6b7280;
    font-size: 0.875rem;
  }

  .social-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .social-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    background-color: white;
    color: #374151;
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
    height: 30px; 
  }

  .social-button:hover {
    background-color: #f9fafb;
  }

  .social-button svg {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }

  .signup-link {
    text-align: center;
    margin-top: 22px;
    color: #6b7280;
    font-size: 0.875rem;
  }

  .signup-link a {
    color: #2563eb;
    font-weight: 500;
    text-decoration: none;
  }

  .signup-link a:hover {
    text-decoration: underline;
  }

  @media (min-width: 768px) {
    .desktop-nav {
      display: flex;
    }

    .mobile-menu-button {
      display: none;
    }

    .stats-container {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-top: 32px;
    }

    .stat-box {
      background-color: rgba(255, 255, 255, 0.2);
      padding: 16px;
      border-radius: 8px;
      min-width: 96px;
    }

    .stat-number {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .stat-label {
      font-size: 0.75rem;
    }

    .login-section {
      padding: 32px;
    }
  }

  @media (max-height: 700px) {
    .hero-section, .login-section {
      padding: 24px;
    }

    .hero-title {
      font-size: 1.75rem;
      margin-bottom: 12px;
    }

    .hero-subtitle {
      font-size: 1rem;
      margin-bottom: 24px;
    }

    .login-title {
      font-size: 1.5rem;
    }

    .login-form {
      gap: 16px;
    }
  }

  @media (max-width: 767px) {
    .main-content {
      flex-direction: column;
      height: calc(100vh - 64px);
    }

    .hero-section {
      display: none;
    }

    .login-section {
      padding: 24px;
      justify-content: center;
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();




  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);
  try {
    // Step 1: Sign in the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;



    // Step 2: Check if the user is blocked in Firestore
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

if (userDocSnap.exists() && userDocSnap.data().role === "admin") {
  navigate("/test"); // Admin panel
}
else{

    if (userDocSnap.exists() && userDocSnap.data().blocked === true) {
      console.log("Blocked user detected");
      alert("You have been blocked by the admin from accessing this app.");
      return; // Stop navigation
    }

    // Step 3: Navigate to home page if not blocked
    navigate("/Home_page");
  }
  } catch (error) {
    console.error("Login error:", error);
    const errorMessage =
      error.code === "auth/wrong-password"
        ? "Incorrect password. Please try again."
        : error.code === "auth/user-not-found"
        ? "No account found with this email."
        : "Login failed. Please check your credentials.";
    alert(errorMessage);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="app-container">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      {/* Navigation Bar */}
      <nav>
        <div className="nav-container">
          <Link to="/" className="logo">
            <MdHealthAndSafety />
            SympticAi
          </Link>
          
          <div className="desktop-nav">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/doctors">Doctors</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          
          <button 
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link to="/doctors" onClick={() => setMobileMenuOpen(false)}>Doctors</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {/* Hero Section (Hidden on mobile) */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-icon">
              <FaClinicMedical size={48} />
            </div>
            <h2 className="hero-title">Compassionate Care When You Need It Most</h2>
            <p className="hero-subtitle">
              Access to top medical professionals 24/7. Your health is our highest priority.
            </p>
            <div className="stats-container">
              <div className="stat-box">
                <div className="stat-number">100+</div>
                <div className="stat-label">Certified Doctors</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Availability</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Patients Helped</div>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="login-section">
          <div className="login-form-container">
            <div className="login-header">
              <h1 className="login-title">Welcome Back</h1>
              <p className="login-subtitle">Sign in to access your health dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              <div className="input-group">
                <div className="input-icon">
                  <MdEmail />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email Address"
                  className="form-input"
                />
              </div>

              <div className="input-group">
                <div className="input-icon">
                  <FaLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="form-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="remember-forgot">
                <div className="remember-me">
                  <input type="checkbox" id="remember-me" />
                  <label htmlFor="remember-me">Remember me</label>
                </div>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="login-button"
              >
                {loading ? (
                  <svg className="spinner" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/>
                    <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"/>
                  </svg>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* <div className="divider">
              <div className="divider-line"></div>
              <div className="divider-text">Or continue with</div>
              <div className="divider-line"></div>
            </div> */}

            {/* <div className="social-buttons">
              <button type="button" className="social-button">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </button>
              <button type="button" className="social-button">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </button>
            </div> */}

            <div className="signup-link">
              Don't have an account?{' '}
              <Link to="/signup">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}