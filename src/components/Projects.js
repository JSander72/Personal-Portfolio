// src/components/Projects.js
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import grnliteLogo from "../assets/img/Grn_Lite_Logo.png";
import BhaktiImg from "../assets/img/bhakti.png";
import saasImg from "../assets/img/saas1.png"; 
import colorSharp2 from "../assets/img/color-sharp2.png";
import "animate.css";
import TrackVisibility from "react-on-screen";

export const Projects = () => {
  // One featured project per tab
  const projectTab1 = [
    {
      title: "GRNLITE: author & editor collaboration platform",
      description:
        "GRNLITE is a collaborative platform connecting authors, beta readers, and editors. It enables real-time feedback to help authors refine manuscripts, fosters direct author-reader communication for clear expectations, and supports project budgeting to match authors with beta readers that fit their needs. Integrated secure payment systems streamline transactions between authors, beta readers, and editors.",
      imgUrl: grnliteLogo,
      link: "https://grnlite.onrender.com/",
    },
  ];

  const projectTab2 = [
    {
      title: "SaaS (Sanders As a Service)",
      description:
        "SaaS,Llc delivers custom software engineering and technical solutions tailored to your needs. I specialize in developing secure, scalable web applications, building and integrating APIs, and designing efficient databases. With a strong foundation in both backend and frontend technologies, I bridge complex technical challenges with clear, user-friendly results.",
      imgUrl: saasImg,
      link: "https://sandersasaservice.vercel.app/",
    },
  ];

  const projectTab3 = [
    {
      title: "Bhakti Breath Pacer App",
      description:
        "Built with Expo and React Native using TypeScript, Bhakti Wellness delivers a smooth, responsive experience on both iOS and Android from a single codebase. The application emphasizes simplicity, accessibility, and intentional design—making breathwork easy to integrate into daily routines, whether for relaxation, grounding, or energy management.",
      imgUrl: BhaktiImg,
      link: "https://github.com/JSander72/Bhakti_Wellness.git",
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Projects</h2>
                  <p>
                    Built with clean code, clear docs, and a focus on reliability. Click any card to
                    view the repo or demo.
                  </p>

                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav
                      variant="pills"
                      className="nav-pills mb-5 justify-content-center align-items-center"
                      id="pills-tab"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="first">GRNLITE</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">SaaS Llc</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Bhakti App</Nav.Link>
                      </Nav.Item>
                    </Nav>

                    <Tab.Content
                      id="slideInUp"
                      className={isVisible ? "animate__animated animate__slideInUp" : ""}
                    >
                      <Tab.Pane eventKey="first">
                        <Row className="justify-content-center gx-4">
                          {projectTab1.map((project, index) => (
                            <ProjectCard key={`t1-${index}`} {...project} />
                          ))}
                        </Row>
                      </Tab.Pane>

                      <Tab.Pane eventKey="second">
                        <Row className="justify-content-center gx-4">
                          {projectTab2.map((project, index) => (
                            <ProjectCard key={`t2-${index}`} {...project} />
                          ))}
                        </Row>
                      </Tab.Pane>

                      <Tab.Pane eventKey="third">
                        <Row className="justify-content-center gx-4">
                          {projectTab3.map((project, index) => (
                            <ProjectCard key={`t3-${index}`} {...project} />
                          ))}
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>

      <img className="background-image-right" src={colorSharp2} alt="" />
    </section>
  );
};
