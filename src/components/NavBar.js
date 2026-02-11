import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import saas2 from '../assets/img/saas2.png';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import { HashLink } from 'react-router-hash-link';
import { BrowserRouter as Router } from "react-router-dom";

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);

    // Observe footer
    const footer = document.querySelector(".footer");
    if (footer) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setFooterVisible(entry.isIntersecting);
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(footer);
      return () => {
        window.removeEventListener("scroll", onScroll);
        observer.disconnect();
      };
    }
  }, []);

  const onUpdateActiveLink = (value) => setActiveLink(value);

  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <img
              src={saas2}
              alt="Logo"
              className={`navbar-logo ${footerVisible ? "fade-out" : ""}`}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                href="#home"
                className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'}
                onClick={() => onUpdateActiveLink('home')}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#skills"
                className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'}
                onClick={() => onUpdateActiveLink('skills')}
              >
                Skills
              </Nav.Link>
              <Nav.Link
                href="#projects"
                className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'}
                onClick={() => onUpdateActiveLink('projects')}
              >
                Projects
              </Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="https://www.linkedin.com/in/sandersasaservice"><img src={navIcon1} alt="" /></a>
                <a href="https://www.facebook.com/jamesearlsanders"><img src={navIcon2} alt="" /></a>
                <a href="https://www.instagram.com/earlsandersceo/"><img src={navIcon3} alt="" /></a>
              </div>
              <HashLink to='#connect'>
                <button className="vvd"><span>Let’s Connect</span></button>
              </HashLink>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  );
};
