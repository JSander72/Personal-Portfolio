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
  const toRotate = useMemo(() => [ "Software Engineer", "IT Support Specialist", "System Administrator" ], []);
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
                <span className="tagline">Welcome!</span>
                <h1>{`Hi! I'm James, your`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "IT Support Specialist", "Software Engineer", "System Adminstrator",  ]'><span className="wrap">{text}</span></span></h1>
                  <p>
                  I’m a Software Engineer with a strong foundation in IT support and infrastructure, focused on building reliable systems end to end—from the code that powers applications to the environments that keep them running. My background spans backend development, API design, and mobile/web applications, along with hands-on experience in hardware troubleshooting, operating systems, networking, and virtualization.
                  </p>

                  <p>
                  I’ve designed and deployed full-stack applications using Python, Django, React, and SQL, while developing the operational mindset needed to support users, diagnose issues, and maintain system stability. Comfortable working across Windows and Linux environments, I bring a practical, support first approach to technology prioritizing uptime, usability, and long-term maintainability.
                  </p>

                  <p>
                  With experience in Agile teams, RESTful architectures, and cloud fundamentals, I translate complex technical problems into clear, actionable solutions. I’m currently expanding my expertise in enterprise IT support, cloud platforms, and infrastructure operations to further strengthen my ability to build scalable, dependable systems.
                  </p>

                  <p>
                  <b>Sanders As A Service</b> delivers full-stack software engineering and IT support with a focus on performance, scalability, and reliability. I specialize in creating secure, user centered web and mobile applications using modern frameworks like Django and React, backed by robust databases and clean, testable code. From API design and deployment to debugging and authentication flows, I take a disciplined, Agile based approach to development.
                  </p>

                  <p>
                  On the infrastructure side, I bring hands-on experience in PC maintenance, networking, virtualization, and system diagnostics ensuring that the systems behind your software are just as reliable as the code itself. Whether building from scratch or supporting existing environments, I bridge software engineering with real world IT operations to deliver seamless, end-to-end technical solutions.
                  </p>


                  {/* <button onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25} /></button> */}
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
