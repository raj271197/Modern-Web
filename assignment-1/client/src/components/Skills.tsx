import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';

interface SkillCategory {
  category: string;
  skills: string[];
}

interface SkillsData {
  technical: SkillCategory[];
  soft: string[];
}

interface SkillsProps {
  data: SkillsData | null;
}

const Skills: React.FC<SkillsProps> = ({ data }) => {
  if (!data) return null;

  return (
    <section className="skills-section">
      <h2 className="section-title mb-4 text-primary fw-bold">
        <i className="bi bi-gear me-2"></i>
        Skills & Expertise
      </h2>
      
      <Row>
        <Col lg={8} className="mb-4">
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="p-4">
              <Card.Title className="h4 text-secondary mb-3">
                <i className="bi bi-code-slash me-2"></i>
                Technical Skills
              </Card.Title>
              
              {data.technical.map((category, index) => (
                <div key={index} className="mb-4">
                  <h6 className="text-dark mb-2 fw-semibold">{category.category}</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <Badge 
                        key={idx} 
                        bg="primary" 
                        className="px-3 py-2"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4} className="mb-4">
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="p-4">
              <Card.Title className="h4 text-secondary mb-3">
                <i className="bi bi-people me-2"></i>
                Soft Skills
              </Card.Title>
              
              <div className="d-flex flex-column gap-2">
                {data.soft.map((skill, index) => (
                  <div key={index} className="d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <span className="text-muted">{skill}</span>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default Skills;
