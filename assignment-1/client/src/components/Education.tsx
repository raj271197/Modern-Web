import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';

interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  duration: string;
  gpa: string;
  location: string;
  achievements: string[];
}

interface EducationProps {
  data: EducationItem[];
}

const Education: React.FC<EducationProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="education-section">
      <h2 className="section-title mb-4 text-primary fw-bold">
        <i className="bi bi-mortarboard me-2"></i>
        Education
      </h2>
      
      <Row>
        {data.map((education) => (
          <Col lg={6} key={education.id} className="mb-4">
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <Card.Title className="h5 text-dark mb-1">
                      {education.degree}
                    </Card.Title>
                    <Card.Subtitle className="h6 text-primary mb-2">
                      {education.institution}
                    </Card.Subtitle>
                  </div>
                  <div className="text-end">
                    <Badge bg="secondary" className="mb-1 d-block">
                      {education.duration}
                    </Badge>
                    <small className="text-muted">
                      <i className="bi bi-geo-alt me-1"></i>
                      {education.location}
                    </small>
                  </div>
                </div>

                <div className="mb-3">
                  <Badge bg="success" className="mb-2">
                    GPA: {education.gpa}
                  </Badge>
                </div>

                {education.achievements && education.achievements.length > 0 && (
                  <div>
                    <h6 className="text-secondary mb-2">Achievements:</h6>
                    <ul className="list-unstyled">
                      {education.achievements.map((achievement, idx) => (
                        <li key={idx} className="mb-1 text-muted">
                          <i className="bi bi-award-fill text-warning me-2"></i>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default Education;
