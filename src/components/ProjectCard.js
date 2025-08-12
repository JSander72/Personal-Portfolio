// src/components/ProjectCard.js
import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, description, imgUrl, link }) => {
  const content = (
    <div className="proj-imgbx">
      <img src={imgUrl} alt={title} />
      <div className="proj-txtx">
        <h4>{title}</h4>
        <span>{description}</span>
      </div>
    </div>
  );

  return (
    <Col size={12} sm={6} md={4}>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
          aria-label={`Open ${title} in new tab`}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </Col>
  );
};
