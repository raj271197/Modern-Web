import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface HeaderProps {
  data: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
  } | null;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  if (!data) return null;

  return (
    <header className="bg-primary text-white py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={8}>
            <h1 className="display-4 fw-bold mb-2">{data.name}</h1>
            <h2 className="h3 mb-3 text-light">{data.title}</h2>
            <p className="lead mb-0">{data.location}</p>
          </Col>
          <Col md={4} className="text-md-end">
            <div className="contact-info">
              <p className="mb-1">
                <i className="bi bi-envelope me-2"></i>
                <a href={`mailto:${data.email}`} className="text-white text-decoration-none">
                  {data.email}
                </a>
              </p>
              <p className="mb-1">
                <i className="bi bi-telephone me-2"></i>
                <a href={`tel:${data.phone}`} className="text-white text-decoration-none">
                  {data.phone}
                </a>
              </p>
              <p className="mb-1">
                <i className="bi bi-linkedin me-2"></i>
                <a 
                  href={`https://${data.linkedin}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                >
                  LinkedIn
                </a>
              </p>
              <p className="mb-1">
                <i className="bi bi-github me-2"></i>
                <a 
                  href={`https://${data.github}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                >
                  GitHub
                </a>
              </p>
              <p className="mb-0">
                <i className="bi bi-globe me-2"></i>
                <a 
                  href={`https://${data.portfolio}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                >
                  Portfolio
                </a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
