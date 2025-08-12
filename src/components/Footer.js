// src/components/Footer.js
import { Container, Row, Col } from "react-bootstrap";
import saas2 from "../assets/img/saas2.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          {/* removed MailchimpForm */}
          <Col size={12} sm={6}>
            <img src={saas2} alt="Logo" className="footer-logo"/>
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/james-sanders-40b91647/"><img src={navIcon1} alt="Icon" /></a>
              <a href="https://www.facebook.com/jamesearlsanders"><img src={navIcon2} alt="Icon" /></a>
              <a href="https://www.instagram.com/earlsandersceo/"><img src={navIcon3} alt="Icon" /></a>
            </div>
            <p>Copyright 2025. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
