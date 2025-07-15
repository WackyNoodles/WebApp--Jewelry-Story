import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import fbIcon from './fb.png'; // Adjust the path as necessary
import instaIcon from './insta.png'; // Adjust the path as necessary
import twitterIcon from './x.png'; // Adjust the path as necessary
import './Footer.css'; // Ensure you have the corresponding CSS file

const Footer = () => {
  return (
    <footer className="bg-custom text-light py-5">
      <Container>
        <Row>
          <Col md={12} className="text-center">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Phone: 0300 1234567</li>
              <li>Email: info@grace.com</li>
            </ul>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="auto">
            <a href="/">
              <img src={fbIcon} alt="Facebook" className="social-icon" />
            </a>
          </Col>
          <Col md="auto">
            <a href="/">
              <img src={twitterIcon} alt="Twitter" className="social-icon" />
            </a>
          </Col>
          <Col md="auto">
            <a href="/">
              <img src={instaIcon} alt="Instagram" className="social-icon" />
            </a>
          </Col>
        </Row>
        <hr className="mt-4" />
        <Row>
          <Col md={12}>
            <p className="text-center">
              &copy; {new Date().getFullYear()} Grace. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
