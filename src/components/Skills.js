import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import arrow1 from "../assets/img/arrow1.svg";
import arrow2 from "../assets/img/arrow2.svg";
import colorSharp from "../assets/img/color-sharp.png";

export const Skills = () => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const skillBuckets = [
    {
      title: "Systems Administration",
      img: meter1,
      alt: "Skill meter showing strong proficiency in systems administration",
    },
    {
      title: "Networking & Infrastructure",
      img: meter3,
      alt: "Skill meter showing strong proficiency in networking and infrastructure",
    },
    {
      title: "Support & Troubleshooting",
      img: meter2,
      alt: "Skill meter showing strong proficiency in support and troubleshooting",
    },
    {
      title: "Virtualization & Cloud",
      img: meter1,
      alt: "Skill meter showing strong proficiency in virtualization and cloud",
    },
    {
      title: "Mobile Device Support",
      img: meter2,
      alt: "Skill meter showing strong proficiency in mobile device IT support",
    },
  ];

const lists = {
  "Systems Administration": [
    "Windows Server 2019",
    "Active Directory (AD)",
    "Group Policy (GPO)",
    "User & Group Management",
    "NTFS Permissions",
    "File & Print Services",
    "Domain Services",
  ],

  Networking: [
    "TCP/IP",
    "DNS (Domain Name System)",
    "DHCP (Dynamic Host Configuration Protocol)",
    "IP Addressing & Subnetting",
    "IP Reservations",
    "Routers & Switches",
    "Network Troubleshooting",
  ],

  Virtualization: [
    "VMware",
    "Hyper-V",
    "VirtualBox",
    "OVA Deployment",
    "NAT vs Bridged Networking",
  ],

  "Operating Systems": [
    "Windows 10/11",
    "Windows Server",
    "Linux (CLI Administration)",
    "MacOS",
  ],

  Security: [
    "Endpoint Protection",
    "Firewall Configuration",
    "Access Control",
    "Least Privilege Model",
    "Basic Security Hardening",
  ],

  "Support & Operations": [
    "Tier 1 / Tier 2 Troubleshooting",
    "SLA (Service Level Agreements)",
    "Incident Documentation",
    "Root Cause Analysis",
    "Hardware Troubleshooting",
    "BIOS/UEFI Configuration",
  ],

  Development: [
    "Python",
    "JavaScript",
    "Flask",
    "Django",
    "SQL",
    "REST API Integration",
  ],

  Databases: [
    "PostgreSQL",
    "MySQL",
    "SQLite",
  ],

  "Tools & Platforms": [
    "Git/GitHub",
    "Postman",
    "VS Code",
    "WSL",
    "AWS (learning)",
    "GCP (learning)",
  ],

  "Mobile Device Support": [
    
    "iOS Management & Configuration",
    "Android Management & Configuration",
    "Microsoft Intune",
    "Apple Device Management",
    "Device Enrollment & Provisioning",
    "Mobile Security & Compliance",
    "App Distribution & Management",
    "Mobile Email Configuration",
    "Mobile VPN Setup",
    "Samsung Knox",
    "Device Diagnostics & Troubleshooting",
  ],
};


  const LeftArrow = ({ onClick }) => (
    <button
      aria-label="Previous"
      className="custom-arrow left"
      onClick={onClick}
      type="button"
    >
      <img src={arrow1} alt="" />
    </button>
  );

  const RightArrow = ({ onClick }) => (
    <button
      aria-label="Next"
      className="custom-arrow right"
      onClick={onClick}
      type="button"
    >
      <img src={arrow2} alt="" />
    </button>
  );

  return (
    <section className="skill" id="skills" aria-labelledby="skills-heading">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx">
              <h2 id="skills-heading">Skills</h2>

              {/* Skill chips for quick scanning */}
              <div className="skills-grid" role="list">
                {Object.entries(lists).map(([group, items]) => (
                  <div className="skills-group" key={group}>
                    <h3 className="skills-group-title">{group}</h3>
                    <ul className="skills-chips" aria-label={group}>
                      {items.map((item) => (
                        <li className="chip" key={item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Visual carousel */}
              <Carousel
                responsive={responsive}
                infinite
                draggable
                swipeable
                customLeftArrow={<LeftArrow />}
                customRightArrow={<RightArrow />}
                containerClass="skill-slider"
                itemClass="skill-slide"
                aria-label="Skill highlights"
              >
                {skillBuckets.map(({ title, img, alt }) => (
                  <div className="item" key={title}>
                    <img src={img} alt={alt} loading="lazy" />
                    <h5>{title}</h5>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      <img
        className="background-image-left"
        src={colorSharp}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
    </section>
  );
};
