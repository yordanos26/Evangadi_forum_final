// Header.js
import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faHome, faSignInAlt, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons'; // Icons

const Header = ({ isLoggedIn, handleLogout }) => {
   const [isMenuOpen, setMenuOpen] = useState(false);
   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout();
    navigate("/login");
  };
   const toggleMobileMenu = () => {
     setMobileMenuOpen(!isMobileMenuOpen);
   };

  return (
    <>
    <header className={styles.headerContainer}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="Evangadi logo" />
        </Link>
      </div>
      {/* Desktop Navigation */}
      <nav className={styles.nav}>
        <ul className={styles.navLinks}>
          <li className={styles.navLinkItem}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.navLinkItem}>
            <Link to="/how-it-works">How it works</Link>
          </li>
          {isLoggedIn ? (
            <li className={styles.navLinkItem}>
              <button className={styles.logoutButton} onClick={onLogoutClick}>
                Log Out
              </button>
            </li>
          ) : (
            
            <li className={styles.navLinkItem}>
              <button className={styles.signInButton}>
                {" "}
                <Link to="/login" className="signInLink">
                  Sign In
                </Link>
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* Mobile Menu Icon */}
      <div className={styles.mobileMenuIcon} onClick={toggleMobileMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileDropdown}>
          <ul>
            <li onClick={() => setMobileMenuOpen(false)}>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
            </li>
            <li onClick={() => setMobileMenuOpen(false)}>
              <Link to="/how-it-works">
                <FontAwesomeIcon icon={faHome} /> How it works
              </Link>
            </li>
            {isLoggedIn ? (
              <li
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogoutClick();
                }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
              </li>
            ) : (
              <li onClick={() => setMobileMenuOpen(false)}>
                <Link to="/login">
                  <FontAwesomeIcon icon={faSignInAlt} /> Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>

    </>
  );
};

export default Header;
