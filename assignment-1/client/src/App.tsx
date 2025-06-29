import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import Header from './components/Header';
import Overview from './components/Overview';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import './App.css';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [overviewData, setOverviewData] = useState(null);
  const [experienceData, setExperienceData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [skillsData, setSkillsData] = useState(null);
  const [certificationsData, setCertificationsData] = useState([]);

  const API_BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [overviewRes, experienceRes, educationRes, skillsRes, certificationsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/getOverview`),
        fetch(`${API_BASE_URL}/getExp`),
        fetch(`${API_BASE_URL}/getEdu`),
        fetch(`${API_BASE_URL}/getSkills`),
        fetch(`${API_BASE_URL}/getCertifications`)
      ]);

      if (!overviewRes.ok || !experienceRes.ok || !educationRes.ok || !skillsRes.ok || !certificationsRes.ok) {
        throw new Error('Failed to fetch data from server');
      }

      const [overview, experience, education, skills, certifications] = await Promise.all([
        overviewRes.json() as Promise<ApiResponse<any>>,
        experienceRes.json() as Promise<ApiResponse<any[]>>,
        educationRes.json() as Promise<ApiResponse<any[]>>,
        skillsRes.json() as Promise<ApiResponse<any>>,
        certificationsRes.json() as Promise<ApiResponse<any[]>>
      ]);

      setOverviewData(overview.data);
      setExperienceData(experience.data);
      setEducationData(education.data);
      setSkillsData(skills.data);
      setCertificationsData(certifications.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="text-center">
          <Spinner animation="border" role="status" className="mb-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>Loading resume data...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Resume</Alert.Heading>
          <p>{error}</p>
          <button className="btn btn-outline-danger" onClick={fetchAllData}>
            Try Again
          </button>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="App">
      <Header data={overviewData} />

      <Container className="my-5">
        <Row>
          <Col>
            <Overview data={overviewData} />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Experience data={experienceData} />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Education data={educationData} />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Skills data={skillsData} />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Certifications data={certificationsData} />
          </Col>
        </Row>
      </Container>

      <footer className="bg-dark text-light text-center py-3 mt-5">
        <Container>
          <p className="mb-0">&copy; 2024 {overviewData?.name || 'Alex Johnson'}. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
}

export default App;
