import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';

interface CertificationItem {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  validUntil: string;
}

interface CertificationsProps {
  data: CertificationItem[];
}

const Certifications: React.FC<CertificationsProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="certifications-section">
      <h2 className="section-title mb-4 text-primary fw-bold">
        <i className="bi bi-patch-check me-2"></i>
        Certifications
      </h2>
      
      <Row>
        {data.map((certification) => (
          <Col lg={4} md={6} key={certification.id} className="mb-4">
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="p-4 text-center">
                <div className="mb-3">
                  <i className="bi bi-award text-warning" style={{ fontSize: '2rem' }}></i>
                </div>
                
                <Card.Title className="h5 text-dark mb-2">
                  {certification.name}
                </Card.Title>
                
                <Card.Subtitle className="h6 text-primary mb-3">
                  {certification.issuer}
                </Card.Subtitle>
                
                <div className="mb-3">
                  <Badge bg="success" className="mb-2 d-block">
                    Issued: {certification.date}
                  </Badge>
                  <Badge bg="secondary" className="d-block">
                    Valid Until: {certification.validUntil}
                  </Badge>
                </div>
                
                <small className="text-muted">
                  <strong>Credential ID:</strong> {certification.credentialId}
                </small>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default Certifications;
