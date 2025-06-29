const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS for all routes
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Allow both CRA and Vite default ports
    credentials: true
}));

app.use(express.json());

// Sample data for the resume
const educationData = [
    {
        id: 1,
        institution: "University of Technology",
        degree: "Bachelor of Science in Computer Science",
        duration: "2019 - 2023",
        gpa: "3.8/4.0",
        location: "Toronto, ON",
        achievements: [
            "Dean's List for 3 consecutive semesters",
            "President of Computer Science Student Association",
            "Winner of Annual Hackathon 2022"
        ]
    },
    {
        id: 2,
        institution: "Tech Institute",
        degree: "Diploma in Web Development",
        duration: "2018 - 2019",
        gpa: "3.9/4.0",
        location: "Toronto, ON",
        achievements: [
            "Graduated with Honors",
            "Best Final Project Award"
        ]
    }
];

const experienceData = [
    {
        id: 1,
        company: "TechCorp Solutions",
        position: "Full Stack Developer",
        duration: "June 2023 - Present",
        location: "Toronto, ON",
        responsibilities: [
            "Developed and maintained web applications using React and Node.js",
            "Collaborated with cross-functional teams to deliver high-quality software",
            "Implemented responsive designs and optimized application performance",
            "Participated in code reviews and mentored junior developers"
        ],
        technologies: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "CSS3", "HTML5"]
    },
    {
        id: 2,
        company: "StartupXYZ",
        position: "Frontend Developer Intern",
        duration: "May 2022 - August 2022",
        location: "Toronto, ON",
        responsibilities: [
            "Built responsive user interfaces using React and CSS",
            "Worked closely with UX/UI designers to implement pixel-perfect designs",
            "Optimized website performance and improved loading times by 40%",
            "Assisted in migrating legacy code to modern frameworks"
        ],
        technologies: ["React", "JavaScript", "CSS3", "HTML5", "Git", "Figma"]
    },
    {
        id: 3,
        company: "Freelance",
        position: "Web Developer",
        duration: "January 2021 - April 2022",
        location: "Remote",
        responsibilities: [
            "Developed custom websites for small businesses",
            "Provided ongoing maintenance and support",
            "Implemented SEO best practices to improve search rankings",
            "Managed client relationships and project timelines"
        ],
        technologies: ["WordPress", "PHP", "JavaScript", "CSS3", "HTML5", "MySQL"]
    }
];

const overviewData = {
    name: "Raj Patel",
    title: "Full Stack Developer",
    email: "patelrj2711@email.com",
    phone: "(437) 774-7747",
    location: "Toronto, ON, Canada",
    linkedin: "linkedin.com/in/rajpatel",
    github: "github.com/rajpatel2711",
    portfolio: "Rajpatel.dev",
    summary: "Passionate Full Stack Developer with 2+ years of experience in building modern web applications. Proficient in React, Node.js, and various database technologies. Strong problem-solving skills and a commitment to writing clean, maintainable code. Experienced in agile development methodologies and collaborative team environments.",
    objective: "Seeking a challenging role as a Senior Full Stack Developer where I can leverage my technical expertise and leadership skills to build innovative solutions and mentor junior developers."
};

const skillsData = {
    technical: [
        { category: "Frontend", skills: ["React", "Vue.js", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "SASS", "Bootstrap", "Tailwind CSS"] },
        { category: "Backend", skills: ["Node.js", "Express.js", "Python", "Django", "PHP", "RESTful APIs", "GraphQL"] },
        { category: "Database", skills: ["MongoDB", "MySQL", "PostgreSQL", "Redis", "Firebase"] },
        { category: "Tools & Technologies", skills: ["Git", "Docker", "AWS", "Heroku", "Webpack", "Vite", "Jest", "Cypress"] },
        { category: "Design", skills: ["Figma", "Adobe XD", "Photoshop", "Responsive Design", "UI/UX Principles"] }
    ],
    soft: [
        "Problem Solving",
        "Team Leadership",
        "Communication",
        "Project Management",
        "Agile/Scrum",
        "Mentoring",
        "Time Management",
        "Adaptability"
    ]
};

const certificationsData = [
    {
        id: 1,
        name: "AWS Certified Developer - Associate",
        issuer: "Amazon Web Services",
        date: "March 2023",
        credentialId: "AWS-DEV-2023-001",
        validUntil: "March 2026"
    },
    {
        id: 2,
        name: "React Developer Certification",
        issuer: "Meta",
        date: "January 2023",
        credentialId: "META-REACT-2023-001",
        validUntil: "January 2026"
    },
    {
        id: 3,
        name: "Google Analytics Certified",
        issuer: "Google",
        date: "November 2022",
        credentialId: "GA-CERT-2022-001",
        validUntil: "November 2024"
    }
];

// API Endpoints
app.get('/getEdu', (req, res) => {
    try {
        res.json({
            success: true,
            data: educationData,
            message: "Education data retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving education data",
            error: error.message
        });
    }
});

app.get('/getExp', (req, res) => {
    try {
        res.json({
            success: true,
            data: experienceData,
            message: "Experience data retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving experience data",
            error: error.message
        });
    }
});

app.get('/getOverview', (req, res) => {
    try {
        res.json({
            success: true,
            data: overviewData,
            message: "Overview data retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving overview data",
            error: error.message
        });
    }
});

app.get('/getSkills', (req, res) => {
    try {
        res.json({
            success: true,
            data: skillsData,
            message: "Skills data retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving skills data",
            error: error.message
        });
    }
});

app.get('/getCertifications', (req, res) => {
    try {
        res.json({
            success: true,
            data: certificationsData,
            message: "Certifications data retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving certifications data",
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: "Server is running successfully",
        timestamp: new Date().toISOString()
    });
});

// Default route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "Resume API Server is running",
        endpoints: [
            "GET /getEdu - Get education data",
            "GET /getExp - Get experience data", 
            "GET /getOverview - Get overview data",
            "GET /getSkills - Get skills data",
            "GET /getCertifications - Get certifications data",
            "GET /health - Health check"
        ]
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong!",
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint not found"
    });
});

app.listen(PORT, () => {
    console.log(`Resume API Server is running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('- GET /getEdu');
    console.log('- GET /getExp');
    console.log('- GET /getOverview');
    console.log('- GET /getSkills');
    console.log('- GET /getCertifications');
    console.log('- GET /health');
});
