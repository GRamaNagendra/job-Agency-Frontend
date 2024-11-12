import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        

            <footer>
                <div className="footer-content">
                    <div className="footer-column">
                        <h4>Company Information</h4>
                        <p>&copy; 2024 [Company Name]. All rights reserved.</p>
                        <p>Address: 1234 Main St, Anytown, USA</p>
                        <p>Phone: (123) 456-7890</p>
                        <p>Email: <a href="mailto:info@company.com">info@company.com</a></p>
                    </div>

                    <div className="footer-column">
                        <h4>Quick Links</h4>
                        <p><a href="#">Home</a></p>
                        <p><a href="#">About Us</a></p>
                        <p><a href="#">Services</a></p>
                        <p><a href="#">Contact</a></p>
                        <p><a href="#">Privacy Policy</a></p>
                        <p><a href="#">Terms of Service</a></p>
                    </div>

                    <div className="footer-column">
                        <h4>Follow Us</h4>
                        <p>
                            <a href="#">Twitter</a> |
                            <a href="#">LinkedIn</a> |
                            <a href="#">Facebook</a>
                        </p>
                    </div>

                    <div className="footer-column">
                        <h4>Contact Us</h4>
                        <p>For inquiries, please reach out to us via email or phone.</p>
                        <p>We strive to respond to all inquiries within 24 hours.</p>
                    </div>

                    <div className="footer-column">
                        <h4>Legal</h4>
                        <p>This site is operated by [Company Name].</p>
                        <p>All content and materials are protected by copyright law.</p>
                        <p>We reserve the right to make changes to this site at any time.</p>
                        <p>Please review our policies for more information.</p>
                        <p>Thank you for visiting our website!</p>
                    </div>
                </div>
            </footer>
       
    );
};

export default Footer;
