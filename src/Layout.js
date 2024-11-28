import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faTachometerAlt,
    faBriefcase,
    faUserCircle,
    faBell,
    faBars,
    faInfoCircle,
    faEnvelope,
    faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import Footer from './Home/Footer';

function Layout() {
    const [isMobile, setIsMobile] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    // Scroll to top on route change
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    // Fetch user data
    React.useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/profile', {
                    withCredentials: true,
                });
                setUser(response.data);
            } catch (err) {
                console.error('Failed to fetch user data', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/logout', {}, { withCredentials: true });
            setUser(null);
            navigate('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    const isActive = (path) => location.pathname === path;

    // Auto logout on session timeout
    React.useEffect(() => {
        let timeout;
        const startTimeout = () => {
            timeout = setTimeout(() => {
                handleLogout();
            }, 30 * 60 * 1000); // 30 minutes
        };

        startTimeout();

        const resetTimeout = () => {
            clearTimeout(timeout);
            startTimeout();
        };

        window.addEventListener('mousemove', resetTimeout);
        window.addEventListener('keydown', resetTimeout);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener('mousemove', resetTimeout);
            window.removeEventListener('keydown', resetTimeout);
        };
    }, []);

    return (
        <>
            <Navbar expand="lg" className="navbar-custom sticky-top">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
                        Risk's365
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav">
                        <span className="navbar-toggler-icon">
                            <FontAwesomeIcon icon={faBars} />
                        </span>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className={isMobile ? 'ms-auto mb-2 mb-lg-0' : 'me-auto mb-2 mb-lg-0'}>
                            <Nav.Link
                                as={Link}
                                to="/home"
                                className={`nav-link-custom ${isActive('/home') ? 'active' : ''}`}
                            >
                                <FontAwesomeIcon icon={faHome} className="nav-icon" /> Home
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/job-postings"
                                className={`nav-link-custom ${isActive('/job-postings') ? 'active' : ''}`}
                            >
                                <FontAwesomeIcon icon={faBriefcase} className="nav-icon" /> Job Postings
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/about"
                                className={`nav-link-custom ${isActive('/about') ? 'active' : ''}`}
                            >
                                <FontAwesomeIcon icon={faInfoCircle} className="nav-icon" /> About Us
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/contact"
                                className={`nav-link-custom ${isActive('/contact') ? 'active' : ''}`}
                            >
                                <FontAwesomeIcon icon={faEnvelope} className="nav-icon" /> Contact Us
                            </Nav.Link>
                            <NavDropdown title={<span>More</span>} id="basic-nav-dropdown" className="nav-link-custom">
                                <NavDropdown.Item as={Link} to="/profile">
                                    <FontAwesomeIcon icon={faUserCircle} className="nav-icon" /> Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/admin">
                                    <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" /> Admin Dashboard
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" /> Sign Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav className="ms-auto mb-2 mb-lg-0">
                            {isLoading ? (
                                <Nav.Link className="nav-link-custom" disabled>
                                    Loading...
                                </Nav.Link>
                            ) : user ? (
                                <>
                                    <Nav.Link as={Link} to="/notifications" className="nav-link-custom">
                                        <FontAwesomeIcon icon={faBell} className="nav-icon" /> Notifications
                                    </Nav.Link>
                                    <Link to="/profile">
                                        <img
                                            src={user.profilePicture || 'path/to/default/profile-pic.png'}
                                            alt="Profile"
                                            className="navbar-profile-pic"
                                            onError={(e) => (e.target.src = 'path/to/default/profile-pic.png')}
                                        />
                                    </Link>
                                </>
                            ) : (
                                <Nav.Link as={Link} to="/login" className="nav-link-custom">
                                    Login
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="content">
                <Outlet />
                <Footer />
            </div>
        </>
    );
}

export default Layout;
