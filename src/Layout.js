import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTachometerAlt , faBriefcase, faUserCircle, faBell, faBars, faEllipsisH, faInfoCircle, faEnvelope, faCog, faChartLine, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Updated custom CSS for vibrant styles

function Layout() {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
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
                            <Nav.Link as={Link} className="nav-link-custom" to="/home2">
                                <FontAwesomeIcon icon={faHome} className="nav-icon" /> Home
                            </Nav.Link>
                            <Nav.Link as={Link} className="nav-link-custom" to="/job-postings">
                                <FontAwesomeIcon icon={faBriefcase} className="nav-icon" /> Job Postings
                            </Nav.Link>
                            <Nav.Link as={Link} className="nav-link-custom" to="/about">
                                <FontAwesomeIcon icon={faInfoCircle} className="nav-icon" /> About Us
                            </Nav.Link>
                            <Nav.Link as={Link} className="nav-link-custom" to="/contact">
                                <FontAwesomeIcon icon={faEnvelope} className="nav-icon" /> Contact Us
                            </Nav.Link>
                          <NavDropdown title={<span>More</span>} id="basic-nav-dropdown" className="nav-link-custom">
                                <NavDropdown.Item as={Link} to="/profile">
                                    <FontAwesomeIcon icon={faUserCircle} className="nav-icon" /> Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/admin">
                                    <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" /> Admin Dashboard
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/settings">
                                    <FontAwesomeIcon icon={faCog} className="nav-icon" /> Settings
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/reports">
                                    <FontAwesomeIcon icon={faChartLine} className="nav-icon" /> Reports
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/logout">
                                    <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" /> Sign Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav className="ms-auto mb-2 mb-lg-0">
                            <Nav.Link as={Link} to="/notifications" className="nav-link-custom">
                                <FontAwesomeIcon icon={faBell} className="nav-icon" /> Notifications
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Outlet for rendering nested routes */}
            <div className="content">
                <Outlet />
            </div>
        </>
    );
}

export default Layout;
