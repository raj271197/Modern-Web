import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';

interface ExperienceItem {
  id: number;
  company: string;
  position: string;
  duration: string;
  location: string;
  responsibilities: string[];
  technologies: string[];
}

interface ExperienceProps {
  data: ExperienceItem[];
}

const Experience: React.FC<ExperienceProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="experience-section">
      <h2 className="section-title mb-4 text-primary fw-bold">
        <i className="bi bi-briefcase me-2"></i>
        Professional Experience
      </h2>
      
      <Row>
        {data.map((experience, index) => (
          <Col lg={12} key={experience.id} className="mb-4">
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <Card.Title className="h4 text-dark mb-1">
                      {experience.position}
                    </Card.Title>
                    <Card.Subtitle className="h5 text-primary mb-2">
                      {experience.company}
                    </Card.Subtitle>
                  </div>
                  <div className="text-end">
                    <Badge bg="secondary" className="mb-1 d-block">
                      {experience.duration}
                    </Badge>
                    <small className="text-muted">
                      <i className="bi bi-geo-alt me-1"></i>
                      {experience.location}
                    </small>
                  </div>
                </div>

                <div className="mb-3">
                  <h6 className="text-secondary mb-2">Key Responsibilities:</h6>
                  <ul className="list-unstyled">
                    {experience.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="mb-2 text-muted">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h6 className="text-secondary mb-2">Technologies Used:</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {experience.technologies.map((tech, idx) => (
                      <Badge 
                        key={idx} 
                        bg="light" 
                        text="dark" 
                        className="px-3 py-2 border"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default Experience;
