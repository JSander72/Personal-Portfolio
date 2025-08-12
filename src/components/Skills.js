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
      title: "Web Development",
      img: meter1,
      alt: "Skill meter showing strong proficiency in web development",
    },
    {
      title: "Backend Development",
      img: meter3,
      alt: "Skill meter showing strong proficiency in backend development",
    },
    {
      title: "Technical Writing",
      img: meter2,
      alt: "Skill meter showing strong proficiency in technical writing",
    },
    {
      title: "API & Database Design",
      img: meter1,
      alt: "Skill meter showing strong proficiency in API and database design",
    },
  ];

  const lists = {
    Languages: ["Python", "JavaScript", "HTML5", "CSS3", "SQL"],
    "Frameworks & Libraries": [
      "React",
      "Flask",
      "Django",
      "Django REST Framework",
      "SQLAlchemy",
      "Node.js",
      "Bootstrap",
    ],
    Databases: ["PostgreSQL", "MySQL", "SQLite"],
    "Tools & Platforms": [
      "Git/GitHub",
      "Postman",
      "Insomnia",
      "Render",
      "VS Code",
      "WSL",
      "AWS (learning)",
      "GCP (learning)",
    ],
    "Engineering Practices": [
      "Agile/Scrum",
      "RESTful API design",
      "MVC",
      "Debugging",
      "Unit/Integration testing",
      "CI/CD",
      "Responsive design",
      "Version control",
    ],
    "Technical Writing": [
      "O&M manuals",
      "User guides",
      "Style guides",
      "Templates",
      "Peer review",
      "Training materials",
      "KB articles",
      "Process docs",
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
