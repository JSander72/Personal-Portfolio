import { useState, useEffect, useCallback, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
// import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';


export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(120 - Math.random() * 40);
  // Removed unused 'index' state
  const toRotate = useMemo(() => ["IT Support Specialist", "Systems Administrator", "Infrastructure Engineer"], []);
  const period = 900;

  const tick = useCallback(() => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(160);
    }
  }, [loopNum, isDeleting, text, toRotate, period]);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text, delta, tick]);

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <span className="tagline">James E. Sanders</span>
                  <h1>Hello,<br></br>I am your next... <span className="txt-rotate"><span className="wrap">{text}</span></span></h1>
                  
                  <p>
                    I design, deploy, and support reliable IT environments. From Active Directory domain configuration to virtualization and network troubleshooting, I focus on building stable, secure, and scalable systems that organizations depend on daily.
                  </p>

                  <p>
                    <h3>Core Focus Areas:</h3>                    
                  
                  <ul style={{ marginLeft: "20px", marginBottom: "20px" }}>
                    <li>Windows Server Administration</li>
                    <li>Active Directory (AD – Active Directory)</li>
                    <li>DHCP (Dynamic Host Configuration Protocol) & DNS (Domain Name System)</li>
                    <li>Group Policy (GPO – Group Policy Objects)</li>
                    <li>Virtualization (VMware / Hyper-V)</li>
                    <li>Enterprise Troubleshooting & Tier 1 / Tier 2 Support</li>
                  </ul>
                  </p>

                  <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>Infrastructure Lab Projects:</h3>
                  
                  <h4 style={{ marginTop: "15px", marginBottom: "8px" }}>Enterprise Domain Deployment</h4>
                  <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
                    <li>Built Windows Server 2019 Domain Controller</li>
                    <li>Configured AD, DNS, and DHCP</li>
                    <li>Created Organizational Units (OU)</li>
                    <li>Implemented GPO security policies</li>
                    <li>Domain-joined Windows 10 client</li>
                    <li>Mapped network drives and configured roaming profiles</li>
                  </ul>

                  <h4 style={{ marginBottom: "8px" }}>Virtualization & Network Architecture</h4>
                  <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
                    <li>Deployed OVA images in VMware</li>
                    <li>Configured static IP for server</li>
                    <li>Implemented DHCP scopes & reservations</li>
                    <li>Tested authentication and policy propagation</li>
                  </ul>

                  <h3 style={{ marginBottom: "8px" }}>Troubleshooting Case Studies</h3>
                  <ul style={{ marginLeft: "20px", marginBottom: "20px" }}>
                    <li>Resolved domain join failures</li>
                    <li>Diagnosed DHCP lease conflicts</li>
                    <li>Corrected Group Policy application issues</li>
                    <li>Addressed network profile configuration resets</li>
                  </ul>

                  <h3 style={{ marginBottom: "10px" }}>Certifications & Training:</h3>
                  <ul style={{ marginLeft: "20px", marginBottom: "20px" }}>
                    <li>Google IT Support Professional (Completed January 2026)</li>
                    <li>CompTIA A+ (In Progress)</li>
                    <li>Per Scholas – End User Desktop Support (In Progress)</li>
                    <li>Coding Temple – Software Engineering (Completed February 2025)</li>
                    <li>OSHA 10 Certified (Completed March 2024) </li>
                  </ul>

                  <h3 style={{ marginBottom: "10px" }}>Current Focus</h3>
                  <ul style={{ marginLeft: "20px", marginBottom: "20px" }}>
                    <li>Multi-DC replication lab</li>
                    <li>DHCP failover configuration</li>
                    <li>Security hardening via GPO</li>
                    <li>Home lab expansion using enterprise server hardware</li>
                    <li>Building an IT troubleshooting knowledge base system</li>
                  </ul>




                  {/* <button onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25} /></button> */}
                </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img" />
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
