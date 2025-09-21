import { useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { useForm, ValidationError } from "@formspree/react";

export const Contact = () => {
  // Use your Formspree form ID
  const [state, handleSubmit] = useForm("xgvnwkww");
  const formRef = useRef(null);

  // Reset the form after a successful submit
  useEffect(() => {
    if (state.succeeded && formRef.current) {
      formRef.current.reset();
    }
  }, [state.succeeded]);

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <img
                  className={isVisible ? "animate__animated animate__zoomIn" : ""}
                  src={contactImg}
                  alt="Contact illustration"
                />
              )}
            </TrackVisibility>
          </Col>

          <Col xs={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Get In Touch</h2>

                  <form ref={formRef} onSubmit={handleSubmit}>
                    <Row>
                      <Col xs={12} sm={6} className="px-1">
                        <input type="text" name="firstName" placeholder="First Name" />
                      </Col>
                      <Col xs={12} sm={6} className="px-1">
                        <input type="text" name="lastName" placeholder="Last Name" />
                      </Col>

                      <Col xs={12} className="px-1">
                        <input type="email" name="email" placeholder="Email Address" required />
                        <ValidationError prefix="Email" field="email" errors={state.errors} />
                      </Col>

                      {/* Removed phone field to match Formspree default */}

                      <Col xs={12} className="px-1">
                        <textarea name="message" rows="6" placeholder="Message" required></textarea>
                        <ValidationError prefix="Message" field="message" errors={state.errors} />
                      </Col>

                      {/* Honeypot to reduce spam (optional) */}
                      <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />

                      {/* Optional custom subject for emails you receive */}
                      <input type="hidden" name="_subject" value="New message from Personal Portfolio contact form" />

                      <Col xs={12} className="px-1">
                        <button type="submit" disabled={state.submitting}>
                          <span>{state.submitting ? "Sending..." : "Send"}</span>
                        </button>
                      </Col>

                      {state.succeeded && (
                        <Col>
                          <p className="success">Message sent successfully.</p>
                        </Col>
                      )}
                      {state.errors?.length > 0 && !state.submitting && !state.succeeded && (
                        <Col>
                          <p className="danger">Something went wrong, please try again.</p>
                        </Col>
                      )}
                    </Row>
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
