import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

interface OverviewProps {
  data: {
    name: string;
    title: string;
    summary: string;
    objective: string;
  } | null;
}

const Overview: React.FC<OverviewProps> = ({ data }) => {
  if (!data) return null;

  return (
    <section className="overview-section">
      <h2 className="section-title mb-4 text-primary fw-bold">Professional Overview</h2>
      
      <Row>
        <Col lg={6} className="mb-4">
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="p-4">
              <Card.Title className="h4 text-secondary mb-3">
                <i className="bi bi-person-circle me-2"></i>
                Professional Summary
              </Card.Title>
              <Card.Text className="text-muted lh-lg">
                {data.summary}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={6} className="mb-4">
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="p-4">
              <Card.Title className="h4 text-secondary mb-3">
                <i className="bi bi-target me-2"></i>
                Career Objective
              </Card.Title>
              <Card.Text className="text-muted lh-lg">
                {data.objective}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default Overview;
