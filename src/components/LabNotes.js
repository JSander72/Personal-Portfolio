import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";

export const LabNotes = () => {
  const labs = [
    {
      id: "001",
      title: "Configuring DHCP Scope",
      objective: "Configure DHCP server to automatically assign IP addresses within defined subnet.",
      environment: [
        "Windows Server 2019",
        "Domain Controller",
        "Internal Virtual Network",
      ],
      stepsPerformed: [
        "Installed DHCP role via Server Manager",
        "Authorized DHCP server in Active Directory",
        "Created new IPv4 scope",
        "Defined IP range",
        "Configured subnet mask",
        "Added default gateway",
        "Configured DNS server address",
        "Activated scope",
      ],
      validation: [
        "Verified lease assignment using ipconfig /all",
        "Confirmed correct DNS server assignment",
      ],
      lessonsLearned:
        "A server must have a static IP before DHCP role configuration to prevent address reassignment conflicts.",
    },
    {
      id: "002",
      title: "Mapping Network Drives via Group Policy",
      objective: "Automatically map department shared folders at login.",
      environment: [
        "Created shared folder with NTFS permissions",
        "Created GPO linked to appropriate OU",
        "Configured Drive Maps in User Configuration",
        "Applied security filtering",
      ],
      stepsPerformed: [
        "Created shared folder with NTFS permissions",
        "Created GPO linked to appropriate OU",
        "Configured Drive Maps in User Configuration",
        "Applied security filtering",
      ],
      validation: [
        "Logged into domain client",
        "Verified mapped drives present",
        "Ran gpresult /r to confirm policy application",
      ],
      lessonsLearned:
        "This creates documentation credibility. Hiring managers love structured thinking.",
    },
  ];

  return (
    <section className="lab-notes" id="labnotes">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Lab Notes</h2>
                  <p>
                    This is where you differentiate yourself. Your lab-notes page should look like
                    structured documentation. Use this template for each entry:
                  </p>

                  <div className="lab-entries">
                    {labs.map((lab) => (
                      <div key={lab.id} className="lab-entry">
                        <h3 className="lab-title">
                          Lab {lab.id} – {lab.title}
                        </h3>

                        <div className="lab-section">
                          <h4 className="lab-section-title">Objective</h4>
                          <p>{lab.objective}</p>
                        </div>

                        <div className="lab-section">
                          <h4 className="lab-section-title">Environment</h4>
                          <ul>
                            {lab.environment.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="lab-section">
                          <h4 className="lab-section-title">Steps Performed</h4>
                          <ol>
                            {lab.stepsPerformed.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ol>
                        </div>

                        <div className="lab-section">
                          <h4 className="lab-section-title">Validation</h4>
                          <ul>
                            {lab.validation.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="lab-section">
                          <h4 className="lab-section-title">Lessons Learned</h4>
                          <p>{lab.lessonsLearned}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
