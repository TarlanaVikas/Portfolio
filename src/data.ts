// Edit this file to update content. All facts come from the resume, certificates and GitHub READMEs.
export const profile = {
  name: 'Vikas Tarlana', email: 'tarlanavikas12@gmail.com', phone: '+91 9375003148', resume: '/Vikas-Tarlana-Resume.pdf',
  links: { GitHub: 'https://github.com/TarlanaVikas', LinkedIn: 'https://www.linkedin.com/in/tarlana-vikas/', LeetCode: 'https://leetcode.com/u/Vikas_Tarlana/', Credly: 'https://www.credly.com/users/vikas-tarlana' } as Record<string, string>,
  roles: ['Software Developer', 'Full-Stack Developer', 'AI & ML Enthusiast', 'Computer Science Student', 'Problem Solver'],
  summary: 'Computer Science student with a foundation in full-stack architecture, real-time systems and modern web frameworks. I build with Next.js, React, TypeScript and Firebase, and explore AI-assisted and ML-driven applications.'
}
export type Project = { id: string; title: string; cat: 'AI/ML' | 'Full Stack'; hue: string; blurb: string; problem: string; points: string[]; stack: string[]; repo: string; live?: string; extra?: [string, string] }
export const projects: Project[] = [
  { id: 'janova', title: 'Janova', cat: 'AI/ML', hue: '#c6f432', problem: 'Organizations struggle to reach diverse audiences in the right language and tone.', blurb: 'AI-powered multilingual communication platform for public-awareness campaigns.', points: ['Audience database with segmentation by language, location, occupation and engagement score', 'AI campaign content generation with tone options and translation (e.g. Hindi, Telugu)', 'Campaign scheduling plus channel layer for Email, SMS (Twilio) and WhatsApp Cloud API', 'Analytics views built with Recharts'], stack: ['Python', 'FastAPI', 'React', 'Vite', 'Tailwind CSS', 'SQLAlchemy', 'SQLite', 'Groq', 'JWT'], repo: 'https://github.com/TarlanaVikas/Janova', live: 'https://janova-tau.vercel.app/' },
  { id: 'livegrid', title: 'Live Grid', cat: 'Full Stack', hue: '#e9e2d0', problem: 'Spreadsheets are hard to edit together without conflicts.', blurb: 'Real-time collaborative spreadsheet with live presence.', points: ['Concurrent multi-user editing with live presence indicators', 'In-engine formula parser (SUM, arithmetic, cell references)', 'Export to CSV, TSV, JSON and HTML', 'Firebase Auth (Google and anonymous) with Firestore security rules'], stack: ['Next.js 16', 'React 19', 'TypeScript', 'Firebase', 'Tailwind CSS'], repo: 'https://github.com/TarlanaVikas/Live-Grid', live: 'https://live-grid-omega.vercel.app/' },
  { id: 'skill2hire', title: 'Skill2Hire', cat: 'AI/ML', hue: '#5fb3a1', problem: 'Hiring often overlooks relevant skills hidden in resumes.', blurb: 'Skill-first hiring platform that ranks jobs and applicants by match score.', points: ['PDF resume parsing to extract skills', 'Match scores via TF-IDF vectorization and cosine similarity', 'Candidate and employer portals with application tracking and job management', 'JWT auth, bcrypt hashing, Alembic migrations and automated tests'], stack: ['React', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'scikit-learn'], repo: 'https://github.com/TarlanaVikas/Skill2Hire' },
  { id: 'alumni', title: 'Alumni Connect', cat: 'Full Stack', hue: '#b4363c', problem: 'Universities lack one place connecting students, alumni and administrators.', blurb: 'University alumni management platform with role-based access.', points: ['Alumni, Student and Admin roles with JWT authentication', 'Event management, messaging and donation campaigns', 'Search and discovery, plus an AI assistant interface'], stack: ['React', 'Node.js', 'Vite', 'Tailwind CSS', 'MongoDB'], repo: 'https://github.com/TarlanaVikas/Alumni-Connect', live: 'https://alumniconnect-omega.vercel.app/' },
  { id: 'pulse', title: 'Pulse', cat: 'AI/ML', hue: '#d98a4e', problem: 'Exploring how classical ML models can estimate health-risk likelihood.', blurb: 'Streamlit app predicting Diabetes, Heart Disease and Parkinson\u2019s likelihood.', points: ['Three pre-trained scikit-learn models behind one interface', 'Built from public CSV datasets and notebooks', 'Educational tool only: not a medical diagnosis or advice'], stack: ['Python', 'Streamlit', 'scikit-learn', 'Pandas', 'NumPy'], repo: 'https://github.com/TarlanaVikas/Pulse', live: 'https://pulse-tv.streamlit.app/' }
]
export const education = [
  { school: 'Vellore Institute of Technology, Amaravati', what: 'B.Tech, Computer Science and Engineering (Core)', when: 'Aug 2023 – Jun 2027 (expected)', grade: 'CGPA 9.27' },
  { school: 'Gyanjyot Vidyalaya (GSHSEB), Surat', what: 'Higher Secondary Certificate (Class XII)', when: 'May 2023', grade: '78.1%' },
  { school: 'Gyanjyot Vidyalaya (GSHSEB), Surat', what: 'Secondary School Certificate (Class X)', when: 'May 2021', grade: '92.6%' }
]
export const skills: Record<string, string[]> = {
  Languages: ['Java', 'Python', 'TypeScript', 'JavaScript', 'C', 'SQL', 'R'],
  'Web & Frameworks': ['Next.js', 'React', 'Vite', 'Node.js', 'Express.js', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3'],
  'Data & ML': ['scikit-learn', 'Pandas', 'NumPy', 'OpenCV', 'NLTK', 'Matplotlib', 'Seaborn'],
  'Databases & Realtime': ['PostgreSQL', 'MongoDB', 'MySQL', 'Firebase', 'WebSockets'],
  'Cloud & Tools': ['Oracle Cloud (OCI)', 'Firebase Auth', 'REST APIs', 'Vercel', 'Git', 'GitHub', 'Postman', 'ESLint']
}
export const experience = [
  { org: 'Oeja SwasthSetu', role: 'Web Developer Intern', when: 'Feb 2026 – Mar 2026', doc: '/oeja-swasthsetu-certificate.pdf', points: ['Engineered a role-based healthcare web app with React, Node.js and MongoDB, with dashboards for Doctors, Patients, Partners and Admins', 'Built secure REST APIs and workflows for appointments, patient record retrieval and digital prescriptions', 'Implemented real-time communication modules using WebSockets'], stack: ['React', 'Node.js', 'MongoDB', 'WebSockets'] },
  { org: 'Excelerate × RIT Tiger STRIPES', role: 'AI Powered Data Analysis Remote Internship', when: 'Completed Apr 9, 2026', doc: '/excelerate-certificate.pdf', points: ['Completed the remote internship supported by Rochester Institute of Technology\u2019s Tiger STRIPES Program and powered by Excelerate (Certificate of Achievement)'], stack: [] },
  { org: 'ACM Chapter, VIT-AP', role: 'Member', when: '2024 – 2025', points: ['Coordinated university hackathon operations and participant engagement; contributed to chapter documentation and technical reports'], stack: [] },
  { org: 'CSI Chapter, VIT-AP', role: 'Member', when: '2023 – 2025', points: ['Participated in technical activities and club events'], stack: [] }
]
export const certs = [
  { t: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional', d: 'Expires Oct 31, 2027', img: 'https://images.credly.com/images/5b84c46d-d9d6-47ae-835f-63ea0c813cdc/OCI25GAIOCP_cached_image_20260111-31-eoq72.png', i: 'Oracle' },
  { t: 'Agentic AI Certified Foundations Associate', d: 'Expires Aug 21, 2028', img: 'https://images.credly.com/images/546e70ce-4b7d-450b-8c32-8e331f8ec1bb/AAI26OFA_cached_image_20260821-32-s93u3e.png', i: 'Oracle' },
  { t: 'Oracle Data Platform 2025 Certified Foundations Associate', d: 'Expires Oct 26, 2027', img: 'https://images.credly.com/images/feb04e3a-1b03-4f21-a916-8a3ef7c13383/OCI25DCFAV2_cached_image_20260111-30-8kyac4.png', i: 'Oracle' },
  { t: 'Oracle Cloud Infrastructure 2025 Certified Foundations Associate', d: 'Expires Oct 25, 2027', img: 'https://images.credly.com/images/6a33a9be-e915-4d84-bc92-3bdeea51ad02/OCI25FNDCFAV1_cached_image_20260111-30-ghxb0j.png', i: 'Oracle' },
  { t: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate', d: 'Expires Oct 13, 2027', img: 'https://images.credly.com/images/a549951b-c154-446d-8dfc-81df48070270/OCI25AICFAV1_cached_image_20260111-33-fye4a3.png', i: 'Oracle' },
  { t: 'The Complete Full-Stack Web Development Bootcamp', d: 'Dec 2025 (listed on resume)', i: 'Course certificate' }
]
export const development = { t: 'McKinsey.org Forward Program', d: 'Issued Jun 23, 2026', img: 'https://images.credly.com/images/94f4180f-4139-4529-9cd1-c5ae95b12f5f/blob', i: 'McKinsey.org' }
export const achievements = [
  { t: 'Third Place', s: 'HackZilla Hackathon', n: '' },
  { t: 'SIH 2025', s: 'Participant', n: 'Contributed to project ideation and problem-solving.' },
  { t: 'McKinsey Forward\u201926', s: 'Participant', n: 'Professional development and skill-building program.' }
]
