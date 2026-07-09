import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { randomBytes } from 'crypto';
import connectDB from '../config/db.js';
import AdminUser from '../models/AdminUser.js';
import PageSection from '../models/PageSection.js';
import Course from '../models/Course.js';
import Event from '../models/Event.js';
import Blog from '../models/Blog.js';
import Mentor from '../models/Mentor.js';
import Testimonial from '../models/Testimonial.js';
import FAQ from '../models/FAQ.js';
import WebsiteSetting from '../models/WebsiteSetting.js';

dotenv.config();

const image = (name) => `https://images.unsplash.com/${name}?auto=format&fit=crop&w=1400&q=80`;

const runSeed = async () => {
  await connectDB();

  await Promise.all([
    AdminUser.deleteMany({}),
    PageSection.deleteMany({}),
    Course.deleteMany({}),
    Event.deleteMany({}),
    Blog.deleteMany({}),
    Mentor.deleteMany({}),
    Testimonial.deleteMany({}),
    FAQ.deleteMany({}),
    WebsiteSetting.deleteMany({})
  ]);

  const seedAdminName = process.env.SEED_ADMIN_NAME || 'Super Admin';
  const seedAdminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
  const generatedAdminPassword = randomBytes(12).toString('base64url');
  const seedAdminPassword = process.env.SEED_ADMIN_PASSWORD || generatedAdminPassword;

  const admin = await AdminUser.create({
    name: seedAdminName,
    email: seedAdminEmail,
    password: seedAdminPassword,
    role: 'superAdmin'
  });

  const mentors = await Mentor.insertMany([
    {
      name: 'Ananya Sharma',
      designation: 'Senior Data Science Mentor',
      imageUrl: image('photo-1494790108377-be9c29b29330'),
      bio: 'Guides learners through analytics, Python, and applied machine learning projects.',
      experience: '9+ years',
      skills: ['Python', 'Machine Learning', 'Analytics'],
      linkedInUrl: 'https://linkedin.com',
      order: 1
    },
    {
      name: 'Rahul Mehta',
      designation: 'Full-Stack Engineering Lead',
      imageUrl: image('photo-1500648767791-00dcc994a43e'),
      bio: 'Builds production web apps and mentors students on modern JavaScript architecture.',
      experience: '11+ years',
      skills: ['React', 'Node.js', 'MongoDB'],
      linkedInUrl: 'https://linkedin.com',
      order: 2
    },
    {
      name: 'Meera Iyer',
      designation: 'Product Design and UX Mentor',
      imageUrl: image('photo-1580489944761-15a19d654956'),
      bio: 'Helps learners design clean user flows, usable interfaces, and research-backed product experiences.',
      experience: '8+ years',
      skills: ['UX Research', 'Figma', 'Design Systems'],
      linkedInUrl: 'https://linkedin.com',
      order: 3
    },
    {
      name: 'Karan Malhotra',
      designation: 'Cloud and DevOps Coach',
      imageUrl: image('photo-1506794778202-cad84cf45f1d'),
      bio: 'Teaches deployment, CI/CD, cloud fundamentals, and production readiness for junior engineers.',
      experience: '10+ years',
      skills: ['AWS', 'Docker', 'CI/CD'],
      linkedInUrl: 'https://linkedin.com',
      order: 4
    }
  ]);

  await Course.insertMany([
    {
      title: 'Full-Stack Web Development',
      shortDescription: 'Build and deploy modern React, Node, Express, and MongoDB applications.',
      fullDescription: '<p>A project-focused program covering frontend foundations, backend APIs, authentication, databases, deployment, and portfolio preparation.</p>',
      category: 'Development',
      duration: '20 weeks',
      level: 'Beginner',
      price: 799,
      discountPrice: 599,
      imageUrl: image('photo-1516321318423-f06f85e504b3'),
      curriculumModules: [
        { title: 'Frontend Foundations', lessons: ['HTML/CSS refresh', 'React components', 'Routing'] },
        { title: 'Backend APIs', lessons: ['Express structure', 'MongoDB models', 'JWT auth'] }
      ],
      skillsCovered: ['React', 'Node.js', 'Express', 'MongoDB', 'Deployment'],
      instructor: mentors[1]._id,
      status: 'published',
      featured: true,
      order: 1
    },
    {
      title: 'Data Analytics Career Track',
      shortDescription: 'Learn Excel, SQL, Python, dashboards, and business analytics workflows.',
      fullDescription: '<p>Move from raw data to decisions with practical analytics labs, case studies, and interview-ready projects.</p>',
      category: 'Data',
      duration: '16 weeks',
      level: 'Beginner',
      price: 699,
      discountPrice: 499,
      imageUrl: image('photo-1551288049-bebda4e38f71'),
      curriculumModules: [
        { title: 'Analytics Core', lessons: ['SQL queries', 'Python notebooks', 'Visualization'] },
        { title: 'Business Projects', lessons: ['Cohort analysis', 'Sales dashboard', 'Presentation'] }
      ],
      skillsCovered: ['SQL', 'Python', 'Power BI', 'Statistics'],
      instructor: mentors[0]._id,
      status: 'published',
      featured: true,
      order: 2
    },
    {
      title: 'UI/UX Design Bootcamp',
      shortDescription: 'Learn product thinking, wireframes, usability, Figma workflows, and portfolio case studies.',
      fullDescription: '<p>A hands-on design program where learners research user problems, design complete product flows, test ideas, and present polished case studies.</p>',
      category: 'Design',
      duration: '14 weeks',
      level: 'Beginner',
      price: 649,
      discountPrice: 449,
      imageUrl: image('photo-1581291518857-4e27b48ff24e'),
      curriculumModules: [
        { title: 'Design Foundations', lessons: ['User research', 'Information architecture', 'Wireframing'] },
        { title: 'Portfolio Projects', lessons: ['Mobile app case study', 'SaaS dashboard', 'Design critique'] }
      ],
      skillsCovered: ['Figma', 'UX Research', 'Prototyping', 'Usability Testing'],
      instructor: mentors[2]._id,
      status: 'published',
      featured: true,
      order: 3
    },
    {
      title: 'Cloud Deployment Essentials',
      shortDescription: 'Deploy web apps with Docker, CI/CD pipelines, monitoring, and cloud hosting basics.',
      fullDescription: '<p>Designed for developers who want to understand production deployment, environment variables, container basics, and operational hygiene.</p>',
      category: 'Cloud',
      duration: '10 weeks',
      level: 'Intermediate',
      price: 599,
      discountPrice: 399,
      imageUrl: image('photo-1451187580459-43490279c0fa'),
      curriculumModules: [
        { title: 'Deployment Basics', lessons: ['Linux server setup', 'Environment configuration', 'Reverse proxy'] },
        { title: 'Automation', lessons: ['Docker images', 'GitHub Actions', 'Monitoring checklist'] }
      ],
      skillsCovered: ['Docker', 'CI/CD', 'Cloud Hosting', 'Monitoring'],
      instructor: mentors[3]._id,
      status: 'published',
      featured: false,
      order: 4
    },
    {
      title: 'Digital Marketing Mastery',
      shortDescription: 'Plan campaigns across SEO, paid ads, content, email, analytics, and conversion funnels.',
      fullDescription: '<p>A practical marketing program for learners who want to run measurable campaigns. Students build keyword plans, landing page briefs, ad structures, email sequences, and reporting dashboards.</p><p>The course focuses on business outcomes, not vanity metrics, so learners understand acquisition, retention, and campaign optimization.</p>',
      category: 'Marketing',
      duration: '12 weeks',
      level: 'Beginner',
      price: 549,
      discountPrice: 349,
      imageUrl: image('photo-1460925895917-afdab827c52f'),
      curriculumModules: [
        { title: 'Marketing Foundations', lessons: ['Customer personas', 'Offer positioning', 'Channel strategy'] },
        { title: 'Campaign Execution', lessons: ['SEO planning', 'Paid ad structure', 'Email automation'] },
        { title: 'Analytics and Optimization', lessons: ['UTM tracking', 'Funnel metrics', 'Weekly reporting'] }
      ],
      skillsCovered: ['SEO', 'Google Ads', 'Content Strategy', 'Email Marketing', 'Analytics'],
      instructor: mentors[2]._id,
      status: 'published',
      featured: true,
      order: 5
    },
    {
      title: 'Python Programming for Beginners',
      shortDescription: 'Learn Python fundamentals, problem solving, APIs, files, automation, and mini projects.',
      fullDescription: '<p>This beginner-friendly Python course helps learners move from syntax to useful programs. Students practice variables, functions, data structures, file handling, API usage, and simple automation scripts.</p><p>By the end, learners complete a set of mini projects that can be used as a base for analytics, backend, and automation paths.</p>',
      category: 'Programming',
      duration: '8 weeks',
      level: 'Beginner',
      price: 399,
      discountPrice: 249,
      imageUrl: image('photo-1526379095098-d400fd0bf935'),
      curriculumModules: [
        { title: 'Python Core', lessons: ['Variables and types', 'Control flow', 'Functions'] },
        { title: 'Working with Data', lessons: ['Lists and dictionaries', 'Files and CSVs', 'Error handling'] },
        { title: 'Mini Projects', lessons: ['API fetcher', 'Expense tracker', 'Automation scripts'] }
      ],
      skillsCovered: ['Python', 'Problem Solving', 'APIs', 'Automation', 'File Handling'],
      instructor: mentors[0]._id,
      status: 'published',
      featured: false,
      order: 6
    },
    {
      title: 'Machine Learning Foundations',
      shortDescription: 'Understand supervised learning, model evaluation, feature engineering, and practical ML workflows.',
      fullDescription: '<p>A hands-on machine learning course for learners who already know basic Python. Students learn how to prepare datasets, train models, evaluate performance, avoid leakage, and explain results clearly.</p><p>The final project includes a complete notebook, model summary, and presentation for a business audience.</p>',
      category: 'Data',
      duration: '18 weeks',
      level: 'Intermediate',
      price: 899,
      discountPrice: 649,
      imageUrl: image('photo-1555949963-aa79dcee981c'),
      curriculumModules: [
        { title: 'ML Workflow', lessons: ['Data preparation', 'Train/test split', 'Feature engineering'] },
        { title: 'Models and Metrics', lessons: ['Regression', 'Classification', 'Model evaluation'] },
        { title: 'Applied Project', lessons: ['Experiment tracking', 'Model explanation', 'Business presentation'] }
      ],
      skillsCovered: ['Machine Learning', 'Scikit-learn', 'Feature Engineering', 'Model Evaluation', 'Python'],
      instructor: mentors[0]._id,
      status: 'published',
      featured: true,
      order: 7
    },
    {
      title: 'Mobile App Development with React Native',
      shortDescription: 'Build cross-platform mobile apps with React Native, navigation, APIs, storage, and deployment basics.',
      fullDescription: '<p>This course teaches learners how to build mobile apps using React Native and modern JavaScript. Students create reusable screens, connect APIs, manage forms, persist data, and prepare apps for release.</p><p>The capstone project is a complete mobile app with authentication-style flows, list screens, detail screens, and polished UI states.</p>',
      category: 'Development',
      duration: '16 weeks',
      level: 'Intermediate',
      price: 799,
      discountPrice: 549,
      imageUrl: image('photo-1512941937669-90a1b58e7e9c'),
      curriculumModules: [
        { title: 'React Native Basics', lessons: ['Components and styling', 'Navigation', 'Device-friendly layouts'] },
        { title: 'Data and State', lessons: ['API calls', 'Forms', 'Local storage'] },
        { title: 'Release Readiness', lessons: ['Performance basics', 'Testing checklist', 'Build preparation'] }
      ],
      skillsCovered: ['React Native', 'Mobile UI', 'API Integration', 'Navigation', 'App Deployment'],
      instructor: mentors[1]._id,
      status: 'published',
      featured: false,
      order: 8
    },
    {
      title: 'Cybersecurity Fundamentals',
      shortDescription: 'Learn security basics, web vulnerabilities, safe authentication practices, and defensive thinking.',
      fullDescription: '<p>A foundational cybersecurity course for developers, IT students, and beginners who want to understand common risks. Learners study authentication, access control, OWASP basics, secure configuration, and incident response habits.</p><p>The course uses practical labs to show how vulnerabilities happen and how to prevent them in real projects.</p>',
      category: 'Security',
      duration: '12 weeks',
      level: 'Beginner',
      price: 599,
      discountPrice: 399,
      imageUrl: image('photo-1563986768494-4dee2763ff3f'),
      curriculumModules: [
        { title: 'Security Basics', lessons: ['Threat modeling', 'Authentication basics', 'Access control'] },
        { title: 'Web Security', lessons: ['OWASP overview', 'Input validation', 'Session safety'] },
        { title: 'Defense and Response', lessons: ['Logging', 'Security checklist', 'Incident basics'] }
      ],
      skillsCovered: ['OWASP', 'Secure Coding', 'Authentication', 'Risk Assessment', 'Incident Response'],
      instructor: mentors[3]._id,
      status: 'published',
      featured: false,
      order: 9
    },
    {
      title: 'Business English and Interview Communication',
      shortDescription: 'Improve professional communication, resume storytelling, interviews, presentations, and workplace writing.',
      fullDescription: '<p>This communication-focused course helps students and early professionals speak clearly in interviews, explain projects, write better emails, and present ideas with confidence.</p><p>Learners practice mock interviews, project walkthroughs, group discussions, and concise workplace writing.</p>',
      category: 'Career Skills',
      duration: '6 weeks',
      level: 'Beginner',
      price: 299,
      discountPrice: 199,
      imageUrl: image('photo-1551836022-d5d88e9218df'),
      curriculumModules: [
        { title: 'Professional Communication', lessons: ['Clear introductions', 'Email writing', 'Meeting etiquette'] },
        { title: 'Interview Practice', lessons: ['Tell me about yourself', 'Project explanations', 'Behavioral answers'] },
        { title: 'Presentation Skills', lessons: ['Story structure', 'Slide walkthroughs', 'Feedback sessions'] }
      ],
      skillsCovered: ['Interview Skills', 'Business English', 'Presentation', 'Resume Storytelling', 'Workplace Writing'],
      instructor: mentors[2]._id,
      status: 'published',
      featured: false,
      order: 10
    }
  ]);

  await Event.insertMany([
    {
      title: 'Live Career Roadmap Webinar',
      description: 'A free session on choosing a practical learning path for tech careers.',
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      time: '7:00 PM IST',
      location: 'Online',
      onlineLink: 'https://meet.google.com',
      imageUrl: image('photo-1517048676732-d65bc937f952'),
      registrationLink: '/contact',
      status: 'upcoming',
      featured: true
    },
    {
      title: 'Portfolio Review Clinic',
      description: 'Bring one project and get live feedback on positioning, README quality, screenshots, and demo flow.',
      date: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000),
      time: '6:30 PM IST',
      location: 'Online',
      onlineLink: 'https://meet.google.com',
      imageUrl: image('photo-1556761175-b413da4baf72'),
      registrationLink: '/contact',
      status: 'upcoming',
      featured: true
    },
    {
      title: 'Data Dashboard Workshop',
      description: 'A practical workshop on building dashboards that communicate metrics clearly to business teams.',
      date: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000),
      time: '11:00 AM IST',
      location: 'EduNova Learning Studio',
      imageUrl: image('photo-1460925895917-afdab827c52f'),
      registrationLink: '/contact',
      status: 'upcoming',
      featured: false
    }
  ]);

  await Blog.insertMany([
    {
      title: 'How to Build a Portfolio That Gets Interviews',
      featuredImage: image('photo-1497366754035-f200968a6e72'),
      category: 'Career',
      author: 'EduNova Team',
      shortExcerpt: 'A practical guide to building projects that show real job readiness.',
      fullContent: '<h2>Start with outcomes</h2><p>Your portfolio should prove that you can solve business problems, explain tradeoffs, and ship working software.</p>',
      seoTitle: 'Build a Tech Portfolio That Gets Interviews',
      seoDescription: 'Project portfolio tips for students and early-career developers.',
      status: 'published',
      isVisible: true
    },
    {
      title: 'What Makes a Beginner Course Actually Useful',
      featuredImage: image('photo-1523240795612-9a054b0db644'),
      category: 'Learning',
      author: 'EduNova Team',
      shortExcerpt: 'The difference between watching lessons and building capability comes down to practice design.',
      fullContent: '<h2>Useful courses create feedback loops</h2><p>Good beginner programs combine clear explanations, small wins, realistic assignments, and mentor feedback.</p>',
      seoTitle: 'What Makes a Beginner Course Useful',
      seoDescription: 'How practical courses help beginners build real capability.',
      status: 'published',
      isVisible: true
    },
    {
      title: 'How to Choose Between Web Development and Data Analytics',
      featuredImage: image('photo-1551836022-d5d88e9218df'),
      category: 'Career',
      author: 'Career Desk',
      shortExcerpt: 'A simple comparison of daily work, skills, projects, and hiring signals.',
      fullContent: '<h2>Start with the work you enjoy</h2><p>Web development rewards product building and interface thinking. Data analytics rewards curiosity, business context, and communication.</p>',
      seoTitle: 'Web Development vs Data Analytics',
      seoDescription: 'Choose the right tech learning path based on strengths and goals.',
      status: 'published',
      isVisible: true
    }
  ]);

  await Testimonial.insertMany([
    {
      studentName: 'Priya Nair',
      studentImage: image('photo-1544005313-94ddf0286df2'),
      courseName: 'Full-Stack Web Development',
      rating: 5,
      reviewText: 'The mentoring and project reviews made the course feel close to real engineering work.',
      companyName: 'Product Studio',
      status: 'active',
      order: 1
    },
    {
      studentName: 'Amit Verma',
      studentImage: image('photo-1507003211169-0a1dd7228f2d'),
      courseName: 'Data Analytics Career Track',
      rating: 5,
      reviewText: 'I finally understood how to turn messy data into a clear business story.',
      companyName: 'Insight Labs',
      status: 'active',
      order: 2
    },
    {
      studentName: 'Sneha Kapoor',
      studentImage: image('photo-1534528741775-53994a69daeb'),
      courseName: 'UI/UX Design Bootcamp',
      rating: 5,
      reviewText: 'The case-study reviews helped me turn rough ideas into a portfolio I could confidently present.',
      companyName: 'Design Partner',
      status: 'active',
      order: 3
    },
    {
      studentName: 'Nikhil Rao',
      studentImage: image('photo-1507591064344-4c6ce005b128'),
      courseName: 'Cloud Deployment Essentials',
      rating: 4,
      reviewText: 'I can now deploy my projects properly and explain the production setup in interviews.',
      companyName: 'CloudOps Team',
      status: 'active',
      order: 4
    }
  ]);

  await FAQ.insertMany([
    { question: 'Are the courses live or recorded?', answer: 'Most programs combine live mentor sessions, recorded lessons, assignments, and project reviews.', order: 1 },
    { question: 'Do students receive placement support?', answer: 'Yes. Career tracks include resume reviews, mock interviews, portfolio feedback, and hiring partner introductions.', order: 2 },
    { question: 'Can I edit website content without coding?', answer: 'Yes. This CMS lets admins manage sections, courses, blogs, events, media, FAQs, and leads.', order: 3 },
    { question: 'Do I need prior coding experience?', answer: 'Beginner tracks start from fundamentals. Intermediate tracks clearly mention prerequisites on the course page.', order: 4 },
    { question: 'Will I build real projects?', answer: 'Yes. Every career track includes portfolio projects, review cycles, and presentation guidance.', order: 5 },
    { question: 'Can companies or colleges request custom programs?', answer: 'Yes. Use the contact form and mention the audience, goals, timeline, and preferred delivery mode.', order: 6 }
  ]);

  await PageSection.insertMany([
    {
      pageName: 'home',
      sectionType: 'hero',
      title: 'Build job-ready tech skills with mentor-led programs',
      subtitle: 'Live classes, real projects, and career support for learners who want practical outcomes.',
      description: 'Choose structured courses in web development, data analytics, and digital careers.',
      imageUrl: image('photo-1522202176988-66273c2fd55f'),
      buttonText: 'Explore Courses',
      buttonLink: '/courses',
      order: 1,
      cards: [
        { title: 'Live Mentors', description: 'Weekly guidance' },
        { title: 'Real Projects', description: 'Portfolio-ready work' },
        { title: 'Career Support', description: 'Interview preparation' }
      ]
    },
    {
      pageName: 'home',
      sectionType: 'courseGrid',
      title: 'Popular career-focused courses',
      subtitle: 'Explore 10 practical programs across development, data, design, marketing, cloud, security, and career skills.',
      order: 2
    },
    {
      pageName: 'home',
      sectionType: 'featureCards',
      title: 'Why choose EduNova',
      subtitle: 'A practical learning system for serious learners.',
      order: 3,
      cards: [
        { title: 'Project-first curriculum', description: 'Every module ends with work you can demonstrate.' },
        { title: 'Mentor feedback', description: 'Get actionable review instead of generic lectures.' },
        { title: 'Career preparation', description: 'Practice interviews, resumes, and presentation skills.' }
      ]
    },
    {
      pageName: 'home',
      sectionType: 'statistics',
      title: 'Learning outcomes',
      subtitle: 'Designed for measurable progress.',
      order: 4,
      cards: [
        { title: '4.8/5', description: 'Average learner rating' },
        { title: '10', description: 'Career-focused courses' },
        { title: '1200+', description: 'Learners trained' },
        { title: '35+', description: 'Hiring partners' }
      ]
    },
    { pageName: 'home', sectionType: 'mentorGrid', title: 'Learn from experienced mentors', order: 5 },
    { pageName: 'home', sectionType: 'eventGrid', title: 'Upcoming events', order: 6 },
    { pageName: 'home', sectionType: 'testimonials', title: 'Student outcomes', order: 7 },
    { pageName: 'home', sectionType: 'faq', title: 'Frequently asked questions', order: 8 },
    {
      pageName: 'home',
      sectionType: 'cta',
      title: 'Not sure which course fits?',
      subtitle: 'Book a free consultation and get a practical learning roadmap.',
      buttonText: 'Talk to an Advisor',
      buttonLink: '/contact',
      order: 9
    },
    {
      pageName: 'about',
      sectionType: 'textImage',
      title: 'We help learners move from tutorials to real capability',
      description: 'EduNova is built for students and working professionals who need structured learning, practical projects, and accountability.',
      imageUrl: image('photo-1552664730-d307ca884978'),
      order: 1
    },
    {
      pageName: 'about',
      sectionType: 'featureCards',
      title: 'How our learning model works',
      subtitle: 'Clear structure, mentor accountability, and practical output.',
      order: 2,
      cards: [
        { title: 'Weekly milestones', description: 'Learners know exactly what to complete and why it matters.' },
        { title: 'Review sessions', description: 'Mentors review projects, explain gaps, and help improve execution.' },
        { title: 'Career packaging', description: 'Students learn how to present projects, resumes, and interviews.' }
      ]
    },
    {
      pageName: 'about',
      sectionType: 'statistics',
      title: 'Built for measurable progress',
      subtitle: 'Numbers that admin users can edit from the CMS.',
      order: 3,
      cards: [
        { title: '92%', description: 'Course completion rate across mentor-led tracks' },
        { title: '18', description: 'Average portfolio review comments per learner' },
        { title: '6 weeks', description: 'Average time to complete first portfolio project' }
      ]
    },
    {
      pageName: 'contact',
      sectionType: 'cta',
      title: 'Talk to an EduNova advisor',
      subtitle: 'Share your goals and we will suggest a practical course path.',
      buttonText: 'Send enquiry',
      buttonLink: '/contact',
      order: 1
    }
  ]);

  await WebsiteSetting.create({
    siteName: 'EduNova',
    contactEmail: 'hello@edunova.example',
    contactPhone: '+91 98765 43210',
    address: 'Bengaluru, India',
    navLinks: [
      { label: 'Home', href: '/', order: 1 },
      { label: 'About', href: '/about', order: 2 },
      { label: 'Courses', href: '/courses', order: 3 },
      { label: 'Events', href: '/events', order: 4 },
      { label: 'Blog', href: '/blog', order: 5 },
      { label: 'Mentors', href: '/mentors', order: 6 },
      { label: 'Contact', href: '/contact', order: 7 }
    ],
    ctaText: 'Book Consultation',
    ctaLink: '/contact',
    footerText: 'Practical EdTech programs for job-ready skills.'
  });

  console.log('Seed complete.');
  console.log(`Seed admin email: ${seedAdminEmail}`);
  if (process.env.SEED_ADMIN_PASSWORD) {
    console.log('Seed admin password: loaded from SEED_ADMIN_PASSWORD.');
  } else {
    console.log(`Generated seed admin password: ${generatedAdminPassword}`);
  }
  console.log('Change the seed admin password after first login. Leaving default passwords in production is how humans create disasters and then call them "incidents."');
  console.log(`Admin created by ${admin.email}`);
  await mongoose.connection.close();
};

runSeed().catch(async (error) => {
  console.error(error);
  await mongoose.connection.close();
  process.exit(1);
});
