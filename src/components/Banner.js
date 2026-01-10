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
  const toRotate = useMemo(() => [ "Software Engineer", "IT Support Specialist", "System Administration" ], []);
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
                <span className="tagline">Welcome to my Portfolio</span>
                <h1>{`Hi! I'm James your`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "IT Support Specialist", "Software Engineer", "System Adminstration",  ]'><span className="wrap">{text}</span></span></h1>
                  <p>
                  I’m a Software Engineer with a strong foundation in IT support and infrastructure, focused on building reliable systems end to end—from the code that powers applications to the environments that keep them running. My background spans backend development, API design, and mobile/web applications, alongside hands-on experience with hardware troubleshooting, operating systems, networking fundamentals, and virtualization.
                  </p>

                  <p>
                  I’ve designed and deployed full-stack applications using Python, Django, React, and SQL, while also developing the operational mindset needed to support users, diagnose issues, and maintain system stability. Comfortable working across Windows and Linux environments, I bring a practical, support-first approach to technology—prioritizing uptime, clarity, and real-world usability.
                  </p>

                  <p>
                  With experience in Agile teams, RESTful architectures, and cloud fundamentals, I translate complex technical problems into clear solutions for both users and teams. Currently expanding my skills in enterprise IT support, cloud platforms, and infrastructure operations, I aim to bridge software engineering and IT support to deliver systems that are scalable, maintainable, and dependable.
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
