import { useState, useRef } from 'react';
import { ResumeFeatureContent } from '../components/resume-features/ResumeFeatureContent';
import { ProjectRecommendations } from '../components/ProjectRecommendations';
import '../App.css';
import './BackToHome.css';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';

// Define feature types and content
const FEATURES = {
  HOME: 'home',
  ATS: 'ats',
  COVER_LETTER: 'cover-letter',
  ANALYSIS: 'analysis',
  INTERVIEW: 'interview',
  ROADMAP: 'roadmap',
  PROJECTS: 'projects',
  CREATE_RESUME: 'create-resume',
};

// Sample resume data
const sampleResume = {
  original: {
    name: "Priya Sharma",
    title: "Product Manager | UX/UI Enthusiast | Data-Driven Decision Maker",
    contact: "Bangalore, India | priya.sharma@email.com | +91 9876543210 | linkedin.com/in/priyasharma",
    summary: "Results-oriented Product Manager with 5+ years of experience developing innovative digital solutions. Specialized in user-centered design and agile methodologies. Proven track record of increasing user engagement by 45% and reducing churn by 30% through data-driven product enhancements.",
    experience: [
      {
        title: "Senior Product Manager | TechNova Solutions",
        period: "Jan 2022 - Present",
        bullets: [
          "Led cross-functional teams to deliver 4 major product releases, increasing monthly revenue by 28%",
          "Conducted user research and competitive analysis to identify market opportunities",
          "Implemented A/B testing framework that improved conversion rates by 18%"
        ]
      },
      {
        title: "Product Manager | Digital Innovations Inc.",
        period: "May 2019 - Dec 2021",
        bullets: [
          "Managed product roadmap for e-commerce platform serving 500,000+ monthly users",
          "Collaborated with engineering and design teams to improve user experience"
        ]
      }
    ],
    skills: ["Product Strategy", "User Research", "Data Analysis", "Agile/Scrum", "Wireframing", "Prototype Testing"]
  },
  optimized: {
    name: "Priya Sharma",
    title: "Senior Product Manager | User Experience | Data Analytics | Agile Product Development",
    contact: "Bangalore, India | priya.sharma@email.com | +91 9876543210 | linkedin.com/in/priyasharma",
    summary: "Results-driven Product Manager with 6+ years of experience in digital product development and optimization. Expert in user-centered design, product lifecycle management, and agile methodologies. Demonstrated success in increasing user engagement by 45%, reducing churn by 30%, and driving revenue growth through data-driven product strategy and execution.",
    experience: [
      {
        title: "Senior Product Manager | TechNova Solutions",
        period: "Jan 2022 - Present",
        bullets: [
          "Led cross-functional teams (Engineering, Design, Marketing) to deliver 4 major product releases on time and within budget, resulting in 28% increase in monthly recurring revenue",
          "Conducted comprehensive user research and competitive analysis to identify market opportunities, resulting in two new product features that captured 15% additional market share",
          "Implemented robust A/B testing framework and user analytics dashboards that improved conversion rates by 18% and reduced customer acquisition costs by 23%",
          "Established product KPIs and metrics tracking system to monitor product performance and guide strategic decision-making"
        ]
      },
      {
        title: "Product Manager | Digital Innovations Inc.",
        period: "May 2019 - Dec 2021",
        bullets: [
          "Managed complete product roadmap for e-commerce platform serving 500,000+ monthly active users, prioritizing features based on user feedback and business impact",
          "Collaborated with engineering and UX/UI design teams to improve user experience, resulting in 35% improvement in customer satisfaction scores",
          "Introduced agile development processes that reduced time-to-market for new features by 40%",
          "Analyzed user behavior data to identify pain points and optimize user journeys, increasing checkout completion rate by 25%"
        ]
      }
    ],
    skills: ["Product Strategy", "Market Research", "User Research", "Data Analysis", "KPI Tracking", "A/B Testing", "Agile/Scrum", "Product Roadmapping", "Wireframing", "Prototype Testing", "User Journey Mapping", "Product Development"]
  }
};

// ATS improvement suggestions
const improvementSuggestions = [
  {
    title: "Add keywords",
    description: "Include \"Product Development\", \"Market Research\", and \"KPI Tracking\""
  },
  {
    title: "Simplify formatting",
    description: "Remove custom bullet points and tables"
  },
  {
    title: "Quantify achievements",
    description: "Add more metrics to your Digital Innovations experience"
  },
  {
    title: "Optimize file name",
    description: "Rename to \"Priya_Sharma_Product_Manager_Resume.pdf\""
  }
];

// Enhanced suggestions after optimization
const enhancedSuggestions = [
  {
    title: "Added key ATS terms",
    description: "Added \"Product Development\", \"Market Research\", and \"KPI Tracking\" to boost keyword matching"
  },
  {
    title: "Enhanced job descriptions",
    description: "Added metrics and achievements to quantify impact and demonstrate results"
  },
  {
    title: "Expanded skills section",
    description: "Added industry-specific skills to match job requirements"
  },
  {
    title: "Optimized formatting",
    description: "Simplified to ensure ATS compatibility while maintaining readability"
  }
];

// New blank resume template
const blankResumeTemplate = {
  name: "",
  title: "",
  contact: "",
  summary: "",
  experience: [
    {
      title: "",
      period: "",
      bullets: ["", "", ""]
    },
    {
      title: "",
      period: "",
      bullets: ["", ""]
    }
  ],
  skills: []
};

// Job titles for dropdown
const jobTitles = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "UX/UI Designer",
  "Marketing Manager",
  "Project Manager",
  "Financial Analyst",
  "Human Resources Specialist",
  "Sales Representative",
  "Content Writer"
];

function ResumeAI() {
  const [selectedFeature, setSelectedFeature] = useState<string>(FEATURES.HOME);
  const [showResumePreview, setShowResumePreview] = useState<boolean>(false);
  const [atsScore, setAtsScore] = useState<number>(68);
  const [isOptimized, setIsOptimized] = useState<boolean>(false);
  const [currentResume, setCurrentResume] = useState(sampleResume.original);
  const [currentSuggestions, setCurrentSuggestions] = useState(improvementSuggestions);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [newResume, setNewResume] = useState({ ...blankResumeTemplate });
  const [targetJobTitle, setTargetJobTitle] = useState("");
  const [isCreatingResume, setIsCreatingResume] = useState<boolean>(false);
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [resumePreviewUrl, setResumePreviewUrl] = useState<string>("");

  // Refs for the canvas PDF generation
  const resumeRef = useRef<HTMLDivElement>(null);
  
  // Use React Router for navigation
  const navigateToHome = () => {
    window.location.href = '/'; // Will use React Router in the future
  };
  
  // Handle applying AI optimizations
  const handleApplyOptimizations = () => {
    // Simulate processing time for more realistic experience
    setIsDownloading(true);
    setTimeout(() => {
      setAtsScore(88);
      setIsOptimized(true);
      setCurrentResume(sampleResume.optimized);
      setCurrentSuggestions(enhancedSuggestions);
      setIsDownloading(false);
    }, 1500);
  };
  
  // Handle resume download as PDF with the selected template
  const handleDownloadResume = () => {
    setIsDownloading(true);
    
    setTimeout(() => {
      if (resumeRef.current) {
        // Create a PDF representation using HTML2Canvas and jsPDF
        import('html2canvas')
          .then(html2canvas => html2canvas.default(resumeRef.current!))
          .then(canvas => {
            import('jspdf').then(({ default: jsPDF }) => {
              const pdf = new jsPDF('p', 'mm', 'a4');
              const imgData = canvas.toDataURL('image/png');
              const imgWidth = 210; // A4 width in mm
              const imgHeight = (canvas.height * imgWidth) / canvas.width;
              
              // Apply template-specific styling if a template is selected
              if (selectedTemplate) {
                // We could add template-specific headers, footers, or styling here
                if (selectedTemplate === "Professional") {
                  pdf.setDrawColor(50, 50, 50);
                  pdf.setLineWidth(0.5);
                  pdf.line(10, 10, 200, 10); // Top border
                  pdf.line(10, 287, 200, 287); // Bottom border
                } else if (selectedTemplate === "Modern") {
                  pdf.setFillColor(240, 240, 255);
                  pdf.rect(0, 0, 60, 297, 'F'); // Left sidebar background
                } else if (selectedTemplate === "Creative") {
                  pdf.setDrawColor(63, 135, 255);
                  pdf.setLineWidth(5);
                  pdf.line(10, 20, 200, 20); // Thick accent line
                } else if (selectedTemplate === "Executive") {
                  pdf.setFillColor(68, 68, 68);
                  pdf.rect(0, 0, 210, 40, 'F'); // Dark header
                } else if (selectedTemplate === "Minimalist") {
                  // Minimalist has no extra decorations
                } else if (selectedTemplate === "Technical") {
                  pdf.setDrawColor(173, 198, 255);
                  pdf.setLineWidth(2);
                  pdf.line(10, 10, 10, 287); // Left accent line
                } else if (selectedTemplate === "Graduate") {
                  pdf.setDrawColor(0, 0, 0);
                  pdf.setLineWidth(0.3);
                  pdf.rect(10, 10, 190, 277, 'S'); // Simple border
                }
              }
              
              pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
              
              // Use candidate's name for the filename instead of a fixed name
              const candidateName = currentResume.name.split(' ').join('_');
              pdf.save(`${candidateName}_Resume.pdf`);
              
              setIsDownloading(false);
            });
          });
      } else {
        // Fallback to text if the ref is not available for some reason
        alert("PDF generation failed. Please try again.");
        setIsDownloading(false);
      }
    }, 1500);
  };

  // Handle Create New Resume button click
  const handleCreateNewResume = () => {
    setSelectedFeature(FEATURES.CREATE_RESUME);
  };

  // Handle submission of new resume form
  const handleSubmitNewResume = () => {
    setIsCreatingResume(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Create a personalized template using the user's actual name and job title
      const optimizedTemplate = {
        ...sampleResume.optimized,
        name: newResume.name || "Ishita Koradia", // Use the user's name instead of the default
        title: `${targetJobTitle || "Software Engineer"} | User Experience | Data Analytics | Agile Development`,
        // Keep contact information, but show a placeholder
        contact: newResume.contact || "Your Location | your.email@example.com | +91 9876543210 | linkedin.com/in/yourprofile"
      };
      
      setCurrentResume(optimizedTemplate);
      setAtsScore(92); // New resumes get a high score
      setIsOptimized(true);
      setShowResumePreview(true);
      setSelectedFeature(FEATURES.ATS);
      setIsCreatingResume(false);
      
      // Keep the selected template when navigating to the preview
      // This ensures the same template will be used when downloading
    }, 3000);
  };

  // Handle input changes for new resume form
  const handleInputChange = (field: string, value: string) => {
    setNewResume(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Cover letter state and handlers
  const [coverLetterContent, setCoverLetterContent] = useState<string>("");
  const [isCoverLetterGenerated, setIsCoverLetterGenerated] = useState<boolean>(false);
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState<boolean>(false);
  const [jobDescription, setJobDescription] = useState<string>("");
  const coverLetterRef = useRef<HTMLDivElement>(null);
  
  // Resume upload and analysis state
  const [analysisReport, setAnalysisReport] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const analysisReportRef = useRef<HTMLDivElement>(null);

  // Handle resume file upload
  const handleResumeUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUploadedResume(file);
      
      // Create a preview URL for PDF files
      if (file.type === "application/pdf") {
        const fileUrl = URL.createObjectURL(file);
        setResumePreviewUrl(fileUrl);
      } else {
        // For non-PDF files, we'll just display the filename
        setResumePreviewUrl("");
      }
      
      // If in analysis section, automatically start analysis
      if (selectedFeature === FEATURES.ANALYSIS) {
        analyzeResume(file);
      }
    }
  };
  
  // Handle resume analysis
  const analyzeResume = (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis process
    setTimeout(() => {
      // In a real app, we would send the file to a backend API
      // For demo purposes, we're creating a sample analysis report
      setAnalysisReport({
        score: 72,
        strengths: [
          "Good use of action verbs in experience section",
          "Clear contact information",
          "Appropriate length (1 page)"
        ],
        weaknesses: [
          "Missing quantifiable achievements",
          "Skills section lacks specific technical skills",
          "Summary could be more impactful",
          "Some ATS-unfriendly formatting detected"
        ],
        keywordMatch: 65,
        formatScore: 78,
        contentScore: 70,
        recommendations: [
          "Add 2-3 measurable achievements for each role",
          "Expand skills section with industry-specific keywords",
          "Strengthen summary with unique value proposition",
          "Remove tables and complex formatting"
        ]
      });
      
      setIsAnalyzing(false);
    }, 3000);
  };
  
  // Handle downloading analysis report as PDF
  const handleDownloadAnalysisReport = () => {
    setIsDownloading(true);
    
    setTimeout(() => {
      if (analysisReportRef.current) {
        // Create a PDF representation using HTML2Canvas and jsPDF
        import('html2canvas')
          .then(html2canvas => html2canvas.default(analysisReportRef.current!))
          .then(canvas => {
            import('jspdf').then(({ default: jsPDF }) => {
              const pdf = new jsPDF('p', 'mm', 'a4');
              const imgData = canvas.toDataURL('image/png');
              const imgWidth = 210; // A4 width in mm
              const imgHeight = (canvas.height * imgWidth) / canvas.width;
              
              pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
              
              // Use a proper filename for the analysis report
              const fileName = uploadedResume ? 
                `${uploadedResume.name.split('.')[0]}_Analysis_Report.pdf` : 
                'Resume_Analysis_Report.pdf';
              
              pdf.save(fileName);
              setIsDownloading(false);
            });
          });
      } else {
        alert("PDF generation failed. Please try again.");
        setIsDownloading(false);
      }
    }, 1000);
  };
  
  // Generate cover letter
  const handleGenerateCoverLetter = () => {
    if (!jobDescription.trim()) {
      alert("Please enter a job description to generate a tailored cover letter.");
      return;
    }
    
    setIsGeneratingCoverLetter(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // In a real app, we would send the job description and resume to an API
      const sampleCoverLetter = `
[your_date]

Hiring Manager
[Company Name]

Dear Hiring Manager,

I am writing to express my interest in the Product Manager position at [Company Name] as advertised. With over 6 years of experience in digital product development and a proven track record of increasing user engagement by 45% and reducing churn by 30%, I am confident in my ability to make a significant contribution to your team.

The job description highlights the need for expertise in user-centered design, product lifecycle management, and agile methodologies – areas in which I have demonstrated success throughout my career. At TechNova Solutions, I led cross-functional teams to deliver four major product releases that increased monthly recurring revenue by 28%. I also implemented robust A/B testing frameworks that improved conversion rates by 18%.

I was particularly drawn to [Company Name]'s commitment to innovation and user-centric approach, which aligns perfectly with my product philosophy. My experience in conducting comprehensive user research and competitive analysis would enable me to identify market opportunities for your organization, just as I did at my previous position where these efforts resulted in capturing 15% additional market share.

I am excited about the possibility of bringing my skills in product strategy, data analysis, and agile development to [Company Name]. I would welcome the opportunity to discuss how my experience and abilities would benefit your team.

Thank you for considering my application. I look forward to the possibility of working together.

Sincerely,
[your_name]
      `;
      
      setCoverLetterContent(sampleCoverLetter);
      setIsCoverLetterGenerated(true);
      setIsGeneratingCoverLetter(false);
    }, 3000);
  };
  
  // Handle downloading cover letter as PDF
  const handleDownloadCoverLetter = (format: 'pdf' | 'docx') => {
    setIsDownloading(true);
    
    if (format === 'pdf') {
      setTimeout(() => {
        if (coverLetterRef.current) {
          // Create a PDF representation using HTML2Canvas and jsPDF
          import('html2canvas')
            .then(html2canvas => html2canvas.default(coverLetterRef.current!))
            .then(canvas => {
              import('jspdf').then(({ default: jsPDF }) => {
                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = 210; // A4 width in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                pdf.save('Ishita_Koradia_Cover_Letter.pdf');
                setIsDownloading(false);
              });
            });
        } else {
          alert("PDF generation failed. Please try again.");
          setIsDownloading(false);
        }
      }, 1000);
    } else if (format === 'docx') {
      // Generate DOCX using docx library
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: coverLetterContent.split('\n').map(paragraph => 
              new Paragraph({
                children: [new TextRun(paragraph)]
              })
            )
          }
        ]
      });
      
      Packer.toBlob(doc).then(blob => {
        saveAs(blob, 'Ishita_Koradia_Cover_Letter.docx');
        setIsDownloading(false);
      });
    }
  };

  // Interview preparation state and handlers
  const [interviewQuestions, setInterviewQuestions] = useState<any>(null);
  const [isGeneratingInterview, setIsGeneratingInterview] = useState<boolean>(false);
  const [jobTitleForInterview, setJobTitleForInterview] = useState<string>("");
  const [expandedQuestions, setExpandedQuestions] = useState<{ [key: string]: boolean }>({});
  
  // Toggle question expansion to show/hide answers
  const toggleQuestionExpansion = (category: string, index: number) => {
    const questionId = `${category}-${index}`;
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };
  
  // Career roadmap state and handlers
  const [careerRoadmap, setCareerRoadmap] = useState<any>(null);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState<boolean>(false);
  const [currentJobTitle, setCurrentJobTitle] = useState<string>("");
  const roadmapRef = useRef<HTMLDivElement>(null);
  
  // Handle generating interview questions
  const handleGenerateInterviewQuestions = () => {
    if (!jobTitleForInterview.trim()) {
      alert("Please enter a job title to generate relevant interview questions.");
      return;
    }
    
    setIsGeneratingInterview(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // In a real app, we would send the job title and resume to an API
      setInterviewQuestions({
        roleSpecific: [
          "Describe your experience with agile development methodologies.",
          "How do you approach testing and quality assurance in your projects?",
          "Can you explain your process for solving complex technical problems?",
          "What tools and frameworks are you most experienced with?",
          "How do you stay updated with the latest technologies in your field?"
        ],
        behavioral: [
          "Tell me about a time when you had to meet a tight deadline.",
          "Describe a situation where you had to work with a difficult team member.",
          "How do you handle criticism of your work?",
          "Give an example of when you took initiative on a project.",
          "How do you prioritize tasks when you have multiple deadlines?"
        ],
        technical: [
          "Explain the difference between REST and GraphQL APIs.",
          "How would you optimize a slow-performing application?",
          "Describe your approach to data structures and algorithms.",
          "What security considerations do you keep in mind when developing applications?",
          "How do you ensure your code is maintainable and scalable?"
        ],
        suggested: [
          "Your resume mentions experience with [specific technology]. Can you elaborate on a challenging project where you used it?",
          "I see you worked at [previous company]. What was the most valuable lesson you learned there?",
          "You list [skill] on your resume. How have you applied this in your previous roles?",
          "Can you walk me through how you would approach [specific scenario relevant to the job]?",
          "What aspects of [job function] do you find most interesting and why?"
        ]
      });
      
      setIsGeneratingInterview(false);
    }, 3000);
  };
  
  // Handle generating career roadmap
  const handleGenerateCareerRoadmap = () => {
    if (!currentJobTitle.trim() || !targetJobTitle.trim()) {
      alert("Please enter both your current and target job titles.");
      return;
    }
    
    setIsGeneratingRoadmap(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // In a real app, we would send the job titles to an API
      setCareerRoadmap({
        currentRole: currentJobTitle,
        targetRole: targetJobTitle,
        timeEstimate: "2-3 years",
        skillGaps: [
          "Advanced data analytics",
          "Project management certification",
          "Leadership experience",
          "Strategic planning",
          "Industry-specific knowledge"
        ],
        milestones: [
          {
            title: "Short-term (0-6 months)",
            tasks: [
              "Complete a certified project management course",
              "Take on a team leadership role in current position",
              "Develop data analysis skills through online courses",
              "Network with professionals in target role",
              "Create 2-3 portfolio projects demonstrating key skills"
            ]
          },
          {
            title: "Mid-term (6-18 months)",
            tasks: [
              "Obtain relevant industry certification",
              "Seek a role with more responsibility in current field",
              "Contribute to cross-functional projects to build experience",
              "Develop mentorship relationships with senior professionals",
              "Present at industry events or webinars to build visibility"
            ]
          },
          {
            title: "Long-term (18+ months)",
            tasks: [
              "Apply for transitional roles that bridge current and target positions",
              "Complete advanced training specific to target role",
              "Build a portfolio showcasing relevant accomplishments",
              "Develop expertise in emerging industry trends",
              "Target companies with clear advancement paths to your goal"
            ]
          }
        ],
        recommendedResources: [
          "LinkedIn Learning: 'Path to becoming a " + targetJobTitle + "'",
          "Coursera Professional Certificate in related field",
          "Industry-specific conferences and networking events",
          "Professional association membership",
          "Recommended books and thought leaders to follow"
        ]
      });
      
      setIsGeneratingRoadmap(false);
    }, 3000);
  };
  
  // Handle downloading career roadmap as PDF
  const handleDownloadRoadmap = () => {
    setIsDownloading(true);
    
    setTimeout(() => {
      if (roadmapRef.current) {
        // Create a PDF representation using HTML2Canvas and jsPDF
        import('html2canvas')
          .then(html2canvas => html2canvas.default(roadmapRef.current!))
          .then(canvas => {
            import('jspdf').then(({ default: jsPDF }) => {
              const pdf = new jsPDF('p', 'mm', 'a4');
              const imgData = canvas.toDataURL('image/png');
              const imgWidth = 210; // A4 width in mm
              const imgHeight = (canvas.height * imgWidth) / canvas.width;
              
              pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
              pdf.save(`Career_Roadmap_${currentJobTitle}_to_${targetJobTitle}.pdf`.replace(/\s+/g, '_'));
              setIsDownloading(false);
            });
          });
      } else {
        alert("PDF generation failed. Please try again.");
        setIsDownloading(false);
      }
    }, 1000);
  };

  // Project recommendations state and handlers
  const [projectCategory, setProjectCategory] = useState<string>("");
  const [customProjectField, setCustomProjectField] = useState<string>("");
  const [projectIdeas, setProjectIdeas] = useState<any>(null);
  const [isGeneratingProjects, setIsGeneratingProjects] = useState<boolean>(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  // Handle generating project ideas
  const handleGenerateProjectIdeas = (category: string = "") => {
    const fieldToUse = category || customProjectField;
    
    if (!fieldToUse.trim()) {
      alert("Please select a field or enter a custom field for project ideas.");
      return;
    }
    
    setIsGeneratingProjects(true);
    setProjectCategory(fieldToUse);
    
    // Simulate AI processing
    setTimeout(() => {
      // In a real app, we would send the field to an API
      // Generate projects based on the selected field
      const projectsByField: {[key: string]: any} = {
        "Software Development": {
          beginner: [
            {
              title: "Personal Portfolio Website",
              description: "Create a responsive personal portfolio website that showcases your projects, skills, and contact information. Implement responsive design, dark/light mode toggle, and contact form.",
              skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
              timeEstimate: "2-3 weeks",
              resources: ["GitHub Pages for hosting", "MDN Web Docs", "CSS-Tricks"]
            },
            {
              title: "Task Management Application",
              description: "Build a task management app with features like task creation, categorization, priority levels, due dates, and notification reminders.",
              skills: ["Front-end framework (React/Vue)", "State Management", "Local Storage"],
              timeEstimate: "3-4 weeks",
              resources: ["React/Vue documentation", "CodePen examples", "YouTube tutorials"]
            },
            {
              title: "Weather Dashboard",
              description: "Create a weather dashboard that fetches data from a weather API and displays current conditions and forecasts for multiple locations.",
              skills: ["API Integration", "Data Visualization", "Asynchronous JavaScript"],
              timeEstimate: "2 weeks",
              resources: ["OpenWeather API", "Chart.js", "Axios documentation"]
            }
          ],
          intermediate: [
            {
              title: "E-commerce Product Page",
              description: "Build a full-featured e-commerce product page with image gallery, product variations, reviews, cart functionality, and recommended products.",
              skills: ["Advanced CSS/SCSS", "JavaScript", "API Integration", "State Management"],
              timeEstimate: "4-6 weeks",
              resources: ["Stripe API docs", "Commerce.js", "Design systems"]
            },
            {
              title: "Real-time Chat Application",
              description: "Develop a real-time chat application with features like private messaging, group chats, notifications, and message history.",
              skills: ["WebSockets", "Authentication", "Database Integration", "UI/UX Design"],
              timeEstimate: "6-8 weeks",
              resources: ["Socket.io documentation", "Firebase", "Authentication libraries"]
            }
          ],
          advanced: [
            {
              title: "Full-stack Social Network",
              description: "Create a social network platform with user profiles, posts, comments, likes, follows, and notifications. Implement proper authentication and authorization.",
              skills: ["Full-stack Development", "Database Design", "Authentication", "Scalability"],
              timeEstimate: "8-12 weeks",
              resources: ["MERN/MEAN stack tutorials", "AWS/Google Cloud", "Security best practices"]
            },
            {
              title: "AI-Powered Code Assistant",
              description: "Build a code assistant tool that uses AI to suggest code improvements, detect bugs, and provide documentation. Integrate with popular code editors.",
              skills: ["Machine Learning", "NLP", "API Design", "IDE Extensions"],
              timeEstimate: "10-14 weeks",
              resources: ["OpenAI API", "IDE extension documentation", "ML model training"]
            }
          ]
        },
        "Data Analysis": {
          beginner: [
            {
              title: "Sales Data Visualization Dashboard",
              description: "Create a dashboard that visualizes sales data to identify trends, top-performing products, and seasonal patterns.",
              skills: ["Data Cleaning", "Visualization Tools", "Basic Statistics"],
              timeEstimate: "2-3 weeks",
              resources: ["Tableau Public", "Power BI", "Sample datasets"]
            },
            {
              title: "Customer Segmentation Analysis",
              description: "Analyze customer data to identify distinct segments based on purchasing behavior, demographics, and engagement.",
              skills: ["Data Wrangling", "Clustering Algorithms", "Data Visualization"],
              timeEstimate: "3-4 weeks",
              resources: ["Kaggle datasets", "Python data science libraries", "Industry reports"]
            }
          ],
          intermediate: [
            {
              title: "Predictive Sales Forecasting",
              description: "Build a model to predict future sales based on historical data, incorporating seasonality, trends, and external factors.",
              skills: ["Time Series Analysis", "Regression Models", "Feature Engineering"],
              timeEstimate: "5-6 weeks",
              resources: ["Forecasting libraries", "Business intelligence tools", "Statistical methods"]
            },
            {
              title: "Market Basket Analysis",
              description: "Identify patterns in purchase behavior to discover which products are frequently bought together, useful for recommendation systems.",
              skills: ["Association Rule Mining", "Data Processing", "Business Intelligence"],
              timeEstimate: "4-5 weeks",
              resources: ["R/Python libraries", "Retail datasets", "Academic papers"]
            }
          ],
          advanced: [
            {
              title: "Machine Learning for Churn Prediction",
              description: "Develop an ML model to predict customer churn and identify at-risk customers, with an intervention strategy recommendation system.",
              skills: ["Advanced ML Algorithms", "Feature Selection", "Model Deployment", "Business Strategy"],
              timeEstimate: "8-10 weeks",
              resources: ["ML platforms", "Cloud computing services", "Telco customer churn dataset"]
            },
            {
              title: "Natural Language Processing for Product Reviews",
              description: "Apply NLP techniques to analyze product review sentiment, extract key themes, and identify improvement opportunities.",
              skills: ["NLP", "Sentiment Analysis", "Text Mining", "Data Visualization"],
              timeEstimate: "7-9 weeks",
              resources: ["NLTK/spaCy", "Word embeddings", "Review datasets"]
            }
          ]
        },
        "UX/UI Design": {
          beginner: [
            {
              title: "Mobile App Redesign",
              description: "Select an existing app with usability issues and redesign it to improve user experience, information architecture, and visual design.",
              skills: ["User Research", "Wireframing", "Visual Design", "Prototyping"],
              timeEstimate: "3-4 weeks",
              resources: ["Figma/Adobe XD", "Material Design guidelines", "iOS Human Interface Guidelines"]
            },
            {
              title: "Landing Page Optimization",
              description: "Design and test multiple versions of a landing page to optimize for conversions and user engagement.",
              skills: ["Conversion-centered Design", "Visual Hierarchy", "A/B Testing"],
              timeEstimate: "2-3 weeks",
              resources: ["Landing page examples", "Heat mapping tools", "Design principles"]
            }
          ],
          intermediate: [
            {
              title: "Design System Creation",
              description: "Build a comprehensive design system with components, patterns, documentation, and usage guidelines for a fictional product.",
              skills: ["Component Design", "Documentation", "Design Principles", "Consistency"],
              timeEstimate: "6-8 weeks",
              resources: ["Design systems examples", "Style guide tools", "Component libraries"]
            },
            {
              title: "E-commerce User Experience Overhaul",
              description: "Research, design, and test improvements to the complete user journey for an e-commerce platform, from discovery to checkout.",
              skills: ["User Journey Mapping", "Usability Testing", "Interaction Design", "Information Architecture"],
              timeEstimate: "7-9 weeks",
              resources: ["E-commerce UX research", "User testing platforms", "Checkout optimization guides"]
            }
          ],
          advanced: [
            {
              title: "Multi-platform Design Ecosystem",
              description: "Design a cohesive user experience across web, mobile, tablet, and wearable platforms for a digital product.",
              skills: ["Cross-platform Design", "Responsive Design", "Design Strategy", "Advanced Prototyping"],
              timeEstimate: "10-12 weeks",
              resources: ["Multi-device design guidelines", "Advanced prototyping tools", "Case studies"]
            },
            {
              title: "Accessibility-First Application Design",
              description: "Design a fully accessible application that adheres to WCAG standards while maintaining visual appeal and usability for all users.",
              skills: ["Accessibility Standards", "Inclusive Design", "User Testing with Diverse Users", "Assistive Technology"],
              timeEstimate: "8-10 weeks",
              resources: ["WCAG guidelines", "Accessibility testing tools", "Inclusive design toolkits"]
            }
          ]
        },
        "Digital Marketing": {
          beginner: [
            {
              title: "Social Media Marketing Campaign",
              description: "Plan, execute, and analyze a social media campaign for a product or service, including content creation and performance metrics.",
              skills: ["Content Strategy", "Platform Selection", "Analytics", "Visual Content Creation"],
              timeEstimate: "3-4 weeks",
              resources: ["Social media scheduling tools", "Analytics platforms", "Content calendars"]
            },
            {
              title: "Email Marketing Sequence",
              description: "Design and implement an email marketing sequence with lead magnet, welcome series, and conversion-focused emails.",
              skills: ["Email Copywriting", "Automation", "A/B Testing", "List Segmentation"],
              timeEstimate: "2-3 weeks",
              resources: ["Email marketing platforms", "Copywriting guides", "Template examples"]
            }
          ],
          intermediate: [
            {
              title: "SEO Content Strategy",
              description: "Develop a comprehensive SEO content strategy including keyword research, content creation, and on-page optimization.",
              skills: ["Keyword Research", "Content Planning", "On-page SEO", "Analytics"],
              timeEstimate: "6-8 weeks",
              resources: ["SEO tools", "Google Search Console", "Content optimization guides"]
            },
            {
              title: "Multi-channel Marketing Campaign",
              description: "Create and execute a cohesive marketing campaign across multiple channels (social, email, content, paid) with consistent messaging.",
              skills: ["Campaign Planning", "Budget Allocation", "Cross-channel Analytics", "Audience Targeting"],
              timeEstimate: "7-9 weeks",
              resources: ["Marketing automation platforms", "Attribution models", "Campaign management tools"]
            }
          ],
          advanced: [
            {
              title: "Marketing Analytics Dashboard",
              description: "Build a comprehensive marketing analytics dashboard that centralizes data from multiple platforms and provides actionable insights.",
              skills: ["Data Integration", "Visualization", "Metrics Selection", "ROI Calculation"],
              timeEstimate: "8-10 weeks",
              resources: ["Data visualization tools", "API integrations", "Dashboard design principles"]
            },
            {
              title: "Growth Marketing Experiment System",
              description: "Design a system for continuous marketing experimentation, including hypothesis generation, test design, analysis, and implementation.",
              skills: ["Experiment Design", "Statistical Analysis", "Growth Frameworks", "Process Management"],
              timeEstimate: "10-12 weeks",
              resources: ["Growth hacking case studies", "A/B testing platforms", "Statistical analysis tools"]
            }
          ]
        },
        "Project Management": {
          beginner: [
            {
              title: "Event Planning and Execution",
              description: "Plan and manage a virtual or in-person event, from concept to execution, including timeline, budget, and stakeholder management.",
              skills: ["Timeline Management", "Budget Planning", "Stakeholder Communication", "Risk Assessment"],
              timeEstimate: "4-6 weeks",
              resources: ["Project management tools", "Event planning templates", "Budget tracking sheets"]
            },
            {
              title: "Process Documentation and Improvement",
              description: "Document an existing business process, identify inefficiencies, and implement improvements with measurable results.",
              skills: ["Process Mapping", "Documentation", "Efficiency Analysis", "Change Management"],
              timeEstimate: "3-4 weeks",
              resources: ["Process mapping tools", "Documentation templates", "Best practices guides"]
            }
          ],
          intermediate: [
            {
              title: "Agile Team Management Simulation",
              description: "Simulate managing an agile development team through a complete project cycle, handling sprints, backlog, and team dynamics.",
              skills: ["Agile Methodologies", "Sprint Planning", "Team Leadership", "Product Backlog Management"],
              timeEstimate: "6-8 weeks",
              resources: ["Agile project management tools", "Scrum guides", "Team simulation exercises"]
            },
            {
              title: "Cross-functional Product Launch",
              description: "Plan and execute a simulated product launch, coordinating across marketing, development, sales, and customer support teams.",
              skills: ["Cross-team Coordination", "Launch Planning", "Timeline Management", "Communication Planning"],
              timeEstimate: "7-9 weeks",
              resources: ["Product launch playbooks", "Project management methodologies", "RACI matrices"]
            }
          ],
          advanced: [
            {
              title: "Portfolio Management System",
              description: "Develop a system for managing multiple projects as a portfolio, including resource allocation, prioritization, and strategic alignment.",
              skills: ["Resource Management", "Strategic Planning", "Project Selection", "Portfolio Metrics"],
              timeEstimate: "10-12 weeks",
              resources: ["Portfolio management frameworks", "Resource management tools", "Strategic alignment models"]
            },
            {
              title: "Enterprise Project Management Office",
              description: "Design the structure, processes, and tools for an enterprise PMO, including governance, templates, and reporting systems.",
              skills: ["PMO Design", "Governance Frameworks", "Reporting Systems", "Change Management"],
              timeEstimate: "12-16 weeks",
              resources: ["PMO setup guides", "Governance frameworks", "Enterprise tool evaluation"]
            }
          ]
        },
        "Content Creation": {
          beginner: [
            {
              title: "Blog Series Development",
              description: "Research, plan, and create a series of blog posts on a specific topic, including content strategy, SEO optimization, and promotion.",
              skills: ["Content Planning", "SEO Writing", "Editorial Calendar", "Basic HTML"],
              timeEstimate: "3-4 weeks",
              resources: ["Content management systems", "SEO tools", "Writing guides"]
            },
            {
              title: "Video Tutorial Series",
              description: "Create a series of instructional videos on a topic you're knowledgeable about, including planning, recording, editing, and distribution.",
              skills: ["Scriptwriting", "Video Recording", "Basic Editing", "YouTube Optimization"],
              timeEstimate: "4-6 weeks",
              resources: ["Video editing software", "Microphone recommendations", "YouTube creator guides"]
            }
          ],
          intermediate: [
            {
              title: "Content Marketing Case Study",
              description: "Develop a detailed case study about a successful brand or campaign, including research, interviews, data analysis, and visual presentation.",
              skills: ["Research Methods", "Data Visualization", "Storytelling", "Interview Techniques"],
              timeEstimate: "5-7 weeks",
              resources: ["Case study examples", "Data visualization tools", "Interview guides"]
            },
            {
              title: "Podcast Creation and Launch",
              description: "Plan, record, edit, and launch a podcast series, including concept development, guest coordination, and promotion strategy.",
              skills: ["Audio Production", "Interview Skills", "Content Planning", "Distribution Strategy"],
              timeEstimate: "6-8 weeks",
              resources: ["Podcast hosting platforms", "Audio editing software", "Podcast launch playbooks"]
            }
          ],
          advanced: [
            {
              title: "Interactive Digital Publication",
              description: "Create an interactive digital publication combining text, images, videos, and interactive elements on a specialized topic.",
              skills: ["Multimedia Content Creation", "Interactive Design", "Advanced Storytelling", "Digital Publishing"],
              timeEstimate: "8-10 weeks",
              resources: ["Digital publishing platforms", "Interactive content tools", "Multimedia storytelling examples"]
            },
            {
              title: "Multi-format Content Ecosystem",
              description: "Develop a comprehensive content ecosystem around a specific topic, with strategic repurposing across blog, video, social, email, and downloadable formats.",
              skills: ["Content Strategy", "Cross-format Adaptation", "Audience Targeting", "Content Distribution"],
              timeEstimate: "10-12 weeks",
              resources: ["Content repurposing methodologies", "Multi-channel distribution tools", "Content performance analytics"]
            }
          ]
        }
      };
      
      // Default to Software Development if the category isn't found
      const projectData = projectsByField[fieldToUse] || projectsByField["Software Development"];
      
      setProjectIdeas(projectData);
      setIsGeneratingProjects(false);
    }, 3000);
  };
  
  // Handle downloading project ideas as PDF
  const handleDownloadProjectIdeas = () => {
    setIsDownloading(true);
    
    setTimeout(() => {
      if (projectsRef.current) {
        // Create a PDF representation using HTML2Canvas and jsPDF
        import('html2canvas')
          .then(html2canvas => html2canvas.default(projectsRef.current!))
          .then(canvas => {
            import('jspdf').then(({ default: jsPDF }) => {
              const pdf = new jsPDF('p', 'mm', 'a4');
              const imgData = canvas.toDataURL('image/png');
              const imgWidth = 210; // A4 width in mm
              const imgHeight = (canvas.height * imgWidth) / canvas.width;
              
              pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
              pdf.save(`${projectCategory}_Project_Ideas.pdf`.replace(/\s+/g, '_'));
              setIsDownloading(false);
            });
          });
      } else {
        alert("PDF generation failed. Please try again.");
        setIsDownloading(false);
      }
    }, 1000);
  };

  // Template state and handlers
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  // Handle template selection
  const handleSelectTemplate = (templateName: string) => {
    setSelectedTemplate(templateName);
    // In a real implementation, this would apply the template styling to the resume
    
    // For demo purposes, we'll just set some state and proceed to resume creation
    setShowResumePreview(true);
    setAtsScore(85);
    setCurrentResume({...sampleResume.optimized});
  };

  // Function to render specific feature content based on selection
  const renderFeatureContent = () => {
    switch (selectedFeature) {
      case FEATURES.ATS:
        return (
          <ResumeFeatureContent
            title="ATS-Friendly Resume"
            icon="📊"
            description="Create resumes that pass through Applicant Tracking Systems with optimized keywords and formatting."
          >
            <div style={{ marginTop: "20px" }}>
              {!showResumePreview ? (
                <>
                  <h4 style={{ marginBottom: "15px" }}>What is an ATS?</h4>
                  <p style={{ marginBottom: "15px", fontSize: "14px", color: "var(--text-gray)" }}>
                    Applicant Tracking Systems (ATS) are software applications that employers use to manage job applications 
                    and screen resumes. They scan your resume for keywords and qualifications before a human reviews it.
                  </p>
                  
                  <h4 style={{ marginBottom: "15px" }}>How our AI helps:</h4>
                  <ul style={{ marginLeft: "20px", marginBottom: "20px", fontSize: "14px", color: "var(--text-gray)" }}>
                    <li style={{ marginBottom: "10px" }}>Scans job descriptions to identify key requirements and skills</li>
                    <li style={{ marginBottom: "10px" }}>Reorganizes your resume format to be ATS-compatible</li>
                    <li style={{ marginBottom: "10px" }}>Suggests industry-specific keywords to include</li>
                    <li style={{ marginBottom: "10px" }}>Removes formatting that confuses ATS systems</li>
                    <li style={{ marginBottom: "10px" }}>Provides a compatibility score for specific job descriptions</li>
                  </ul>
                  
              <div style={{ display: "flex", gap: "15px", marginTop: "25px" }}>
                <button 
                  className="update-btn" 
                  onClick={() => setShowResumePreview(true)}
                >
                  Optimize Existing Resume
                </button>
                <button 
                  className="update-btn" 
                  style={{ background: "var(--primary)" }}
                  onClick={handleCreateNewResume}
                >
                  Create New ATS Resume
                </button>
              </div>
                </>
              ) : (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h4>Your Resume Preview {isOptimized && "- AI Optimized"}</h4>
                    <button 
                      onClick={() => {
                        setShowResumePreview(false);
                        setIsOptimized(false);
                        setAtsScore(68);
                        setCurrentResume(sampleResume.original);
                        setCurrentSuggestions(improvementSuggestions);
                      }}
                      style={{ 
                        background: "transparent", 
                        border: "none", 
                        color: "var(--primary)",
                        cursor: "pointer",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      ← Back to options
                    </button>
                  </div>

                  {/* ATS Score Card */}
                  <div style={{ 
                    background: "#f5f5f5", 
                    padding: "15px", 
                    borderRadius: "8px",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div>
                      <h4 style={{ marginBottom: "5px" }}>Current ATS Score</h4>
                      <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                        Based on our scan of your resume for "Product Manager" position
                      </p>
                    </div>
                    <div style={{ 
                      width: "80px", 
                      height: "80px", 
                      borderRadius: "50%", 
                      background: atsScore >= 80 ? "#4caf50" : atsScore >= 60 ? "#ff9800" : "#f44336",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      fontSize: "24px",
                      fontWeight: "bold"
                    }}>
                      {atsScore}%
                    </div>
                  </div>

                  {/* Resume Preview - We add ref here for PDF generation */}
                  <div 
                    ref={resumeRef}
                    style={{ 
                      border: "1px solid var(--border-light)",
                      borderRadius: "8px",
                      padding: "20px",
                      marginBottom: "20px",
                      background: "white" 
                    }}
                  >
                    <h3 style={{ marginBottom: "10px", color: "#333", fontSize: "18px" }}>{currentResume.name}</h3>
                    <p style={{ fontSize: "14px", marginBottom: "5px", color: "#666" }}>
                      {currentResume.title}
                    </p>
                    <p style={{ fontSize: "13px", marginBottom: "15px", color: "#666" }}>
                      {currentResume.contact}
                    </p>

                    <div style={{ height: "1px", background: "#eee", margin: "15px 0" }}></div>

                    <h4 style={{ fontSize: "16px", marginBottom: "10px", color: "#333" }}>Summary</h4>
                    <p style={{ fontSize: "14px", marginBottom: "15px", color: "#666", lineHeight: "1.4" }}>
                      {currentResume.summary}
                    </p>

                    <h4 style={{ fontSize: "16px", marginBottom: "10px", color: "#333" }}>Experience</h4>
                    {currentResume.experience.map((exp, index) => (
                      <div key={index} style={{ marginBottom: "15px" }}>
                        <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333", marginBottom: "5px" }}>
                          {exp.title}
                        </p>
                        <p style={{ fontSize: "13px", color: "#666", marginBottom: "5px" }}>
                          {exp.period}
                        </p>
                        <ul style={{ fontSize: "13px", color: "#666", paddingLeft: "20px" }}>
                          {exp.bullets.map((bullet, idx) => (
                            <li key={idx} style={{ marginBottom: "5px" }}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    <h4 style={{ fontSize: "16px", marginBottom: "10px", color: "#333" }}>Skills</h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "15px" }}>
                      {currentResume.skills.map((skill, index) => (
                        <span key={index} style={{ 
                          fontSize: "12px", 
                          background: isOptimized && !sampleResume.original.skills.includes(skill) 
                            ? "#e8f5e9" // highlight new skills in green
                            : "#f1f1f1", 
                          padding: "5px 10px", 
                          borderRadius: "15px", 
                          color: "#666" 
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ATS Improvement Suggestions */}
                  <div style={{ 
                    background: isOptimized ? "#e8f5e9" : "var(--primary-light)", 
                    padding: "20px", 
                    borderRadius: "8px",
                    marginBottom: "20px" 
                  }}>
                    <h4 style={{ marginBottom: "15px" }}>
                      {isOptimized ? "AI Optimization Results" : "ATS Improvement Suggestions"}
                    </h4>
                    <ul style={{ marginLeft: "20px", fontSize: "14px", color: "var(--text-gray)" }}>
                      {currentSuggestions.map((suggestion, index) => (
                        <li key={index} style={{ marginBottom: "10px" }}>
                          <strong>{suggestion.title}:</strong> {suggestion.description}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ display: "flex", gap: "15px", marginTop: "25px" }}>
                    {!isOptimized ? (
                      <button 
                        className="update-btn" 
                        onClick={handleApplyOptimizations}
                        style={{ background: "var(--primary)" }}
                        disabled={isDownloading}
                      >
                        {isDownloading ? "Optimizing..." : "Apply AI Optimizations"}
                      </button>
                    ) : (
                      <div style={{
                        padding: "8px 15px",
                        background: "#e8f5e9",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        color: "#4caf50",
                        fontSize: "14px"
                      }}>
                        <span style={{ marginRight: "5px" }}>✓</span> AI Optimizations Applied
                      </div>
                    )}
                    <button 
                      className="update-btn"
                      onClick={handleDownloadResume}
                      disabled={isDownloading}
                    >
                      {isDownloading ? "Preparing PDF..." : "Download Optimized Resume"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </ResumeFeatureContent>
        );
      
      case FEATURES.CREATE_RESUME:
        return (
          <ResumeFeatureContent
            title="Create New ATS-Friendly Resume"
            icon="📄"
            description="Build a professional resume from scratch that will score highly on ATS systems."
          >
            <div style={{ marginTop: "20px" }}>
              <h4 style={{ marginBottom: "15px" }}>Create Your Resume</h4>
              <p style={{ marginBottom: "15px", fontSize: "14px", color: "var(--text-gray)" }}>
                Enter your basic information and our AI will format it professionally and optimize it for ATS systems.
              </p>
              
              <div style={{ 
                background: "var(--primary-light)", 
                padding: "20px", 
                borderRadius: "8px",
                marginBottom: "20px" 
              }}>
                <h4 style={{ marginBottom: "15px" }}>Personal Information</h4>
                
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
                    Full Name
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g., Jane Doe"
                    style={{ 
                      width: "100%", 
                      padding: "10px", 
                      borderRadius: "5px",
                      border: "1px solid var(--border-light)" 
                    }}
                    value={newResume.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
                    Target Job Title
                  </label>
                  <select 
                    style={{ 
                      width: "100%", 
                      padding: "10px", 
                      borderRadius: "5px",
                      border: "1px solid var(--border-light)" 
                    }}
                    value={targetJobTitle}
                    onChange={(e) => setTargetJobTitle(e.target.value)}
                  >
                    <option value="">Select a job title</option>
                    {jobTitles.map((title, index) => (
                      <option key={index} value={title}>{title}</option>
                    ))}
                  </select>
                </div>
                
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
                    Contact Information
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g., New York, NY | jane.doe@email.com | (555) 123-4567"
                    style={{ 
                      width: "100%", 
                      padding: "10px", 
                      borderRadius: "5px",
                      border: "1px solid var(--border-light)" 
                    }}
                    value={newResume.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                  />
                </div>
                
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
                    Upload existing resume (Optional)
                  </label>
                  <input 
                    type="file"
                    style={{ 
                      width: "100%", 
                      padding: "10px", 
                      borderRadius: "5px",
                      border: "1px solid var(--border-light)",
                      background: "white" 
                    }}
                  />
                  <p style={{ fontSize: "12px", color: "var(--text-gray)", marginTop: "5px" }}>
                    We can extract information from your existing resume to save time.
                  </p>
                </div>
              </div>
              
              <div style={{ 
                background: "#f5f5f5", 
                padding: "20px", 
                borderRadius: "8px",
                marginBottom: "20px" 
              }}>
                <h4 style={{ marginBottom: "15px" }}>Job Description Analysis</h4>
                <p style={{ fontSize: "14px", color: "var(--text-gray)", marginBottom: "15px" }}>
                  Paste a job description to tailor your resume for a specific position.
                </p>
                <textarea 
                  placeholder="Paste job description here..."
                  style={{ 
                    width: "100%", 
                    minHeight: "120px", 
                    padding: "10px", 
                    borderRadius: "5px",
                    border: "1px solid var(--border-light)" 
                  }}
                ></textarea>
              </div>
              
              <div style={{ display: "flex", gap: "15px", marginTop: "25px" }}>
                <button 
                  className="update-btn" 
                  onClick={() => setSelectedFeature(FEATURES.ATS)}
                  style={{ background: "transparent", border: "1px solid var(--border-light)" }}
                >
                  Cancel
                </button>
                <button 
                  className="update-btn" 
                  style={{ background: "var(--primary)" }}
                  onClick={handleSubmitNewResume}
                  disabled={isCreatingResume || !newResume.name || !targetJobTitle}
                >
                  {isCreatingResume ? "Creating Resume..." : "Generate ATS Resume"}
                </button>
              </div>
              <div className="resume-templates">
                <h2>Professional Resume Templates</h2>
                <p>Choose from our collection of ATS-optimized templates</p>
                
                <div className="templates-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "20px" }}>
                  <div className="template-card" style={{ border: "1px solid var(--border-light)", borderRadius: "8px", overflow: "hidden", boxShadow: selectedTemplate === "Professional" ? "0 0 0 2px var(--primary)" : "none" }}>
                    <div className="template-preview" style={{ height: "180px", background: "#f5f5f5", display: "flex", flexDirection: "column", padding: "15px" }}>
                      <div style={{ width: "70%", height: "15px", background: "#333", marginBottom: "10px" }}></div>
                      <div style={{ width: "50%", height: "10px", background: "#666", marginBottom: "15px" }}></div>
                      <div style={{ width: "100%", height: "1px", background: "#ddd", marginBottom: "15px" }}></div>
                      <div style={{ width: "90%", height: "8px", background: "#666", marginBottom: "8px" }}></div>
                      <div style={{ width: "85%", height: "8px", background: "#666", marginBottom: "15px" }}></div>
                      <div style={{ width: "40%", height: "10px", background: "#333", marginBottom: "10px" }}></div>
                      <div style={{ width: "95%", height: "8px", background: "#666", marginBottom: "8px" }}></div>
                      <div style={{ width: "90%", height: "8px", background: "#666" }}></div>
                    </div>
                    <div style={{ padding: "10px", textAlign: "center" }}>
                      <h4>Professional</h4>
                      <button 
                        className="template-button"
                        style={{ 
                          background: "var(--primary)", 
                          color: "white", 
                          border: "none", 
                          padding: "5px 15px", 
                          borderRadius: "4px", 
                          cursor: "pointer",
                          marginTop: "5px"
                        }}
                        onClick={() => handleSelectTemplate("Professional")}
                      >Use Template</button>
                    </div>
                  </div>
                  
                  <div className="template-card" style={{ border: "1px solid var(--border-light)", borderRadius: "8px", overflow: "hidden", boxShadow: selectedTemplate === "Modern" ? "0 0 0 2px var(--primary)" : "none" }}>
                    <div className="template-preview" style={{ height: "180px", background: "#f8f8f8", display: "flex", padding: "15px" }}>
                      <div style={{ width: "30%", background: "#e1e1e1", height: "100%", marginRight: "15px", display: "flex", flexDirection: "column", alignItems: "center", padding: "15px" }}>
                        <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#bbb", marginBottom: "15px" }}></div>
                        <div style={{ width: "80%", height: "10px", background: "#666", marginBottom: "10px" }}></div>
                        <div style={{ width: "60%", height: "10px", background: "#666", marginBottom: "20px" }}></div>
                        <div style={{ width: "80%", height: "8px", background: "#666", marginBottom: "8px" }}></div>
                        <div style={{ width: "80%", height: "8px", background: "#666", marginBottom: "8px" }}></div>
                        <div style={{ width: "80%", height: "8px", background: "#666" }}></div>
                      </div>
                      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <div style={{ width: "70%", height: "12px", background: "#333", marginBottom: "10px" }}></div>
                        <div style={{ width: "90%", height: "8px", background: "#666", marginBottom: "8px" }}></div>
                        <div style={{ width: "85%", height: "8px", background: "#666", marginBottom: "15px" }}></div>
                        <div style={{ width: "40%", height: "10px", background: "#333", marginBottom: "10px" }}></div>
                        <div style={{ width: "95%", height: "8px", background: "#666", marginBottom: "8px" }}></div>
                        <div style={{ width: "90%", height: "8px", background: "#666" }}></div>
                      </div>
                    </div>
                    <div style={{ padding: "10px", textAlign: "center" }}>
                      <h4>Modern</h4>
                      <button 
                        className="template-button"
                        style={{ 
                          background: "var(--primary)", 
                          color: "white", 
                          border: "none", 
                          padding: "5px 15px", 
                          borderRadius: "4px", 
                          cursor: "pointer",
                          marginTop: "5px"
                        }}
                        onClick={() => handleSelectTemplate("Modern")}
                      >Use Template</button>
                    </div>
                  </div>
                  
                  <div className="template-card" style={{ border: "1px solid var(--border-light)", borderRadius: "8px", overflow: "hidden", boxShadow: selectedTemplate === "Creative" ? "0 0 0 2px var(--primary)" : "none" }}>
                    <div className="template-preview" style={{ height: "180px", background: "#fff", display: "flex", flexDirection: "column", padding: "15px" }}>
                      <div style={{ display: "flex", marginBottom: "15px" }}>
                        <div style={{ flex: 2 }}>
                          <div style={{ width: "80%", height: "15px", background: "#333", marginBottom: "8px" }}></div>
                          <div style={{ width: "60%", height: "10px", background: "#666" }}></div>
                        </div>
                        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                          <div style={{ width: "40px", height: "40px", background: "#deeaff", borderRadius: "50%" }}></div>
                        </div>
                      </div>
                      <div style={{ width: "100%", height: "1px", background: "#ddd", marginBottom: "15px" }}></div>
                      <div style={{ display: "flex", marginBottom: "10px" }}>
                        <div style={{ width: "30%", height: "8px", background: "#3f87ff", marginRight: "10px" }}></div>
                        <div style={{ width: "65%", height: "8px", background: "#666", marginBottom: "10px" }}></div>
                      </div>
                      <div style={{ width: "90%", height: "8px", background: "#666", marginBottom: "15px" }}></div>
                      <div style={{ display: "flex", marginBottom: "10px" }}>
                        <div style={{ width: "30%", height: "8px", background: "#3f87ff", marginRight: "10px" }}></div>
                        <div style={{ width: "65%", height: "8px", background: "#666" }}></div>
                      </div>
                      <div style={{ width: "85%", height: "8px", background: "#666" }}></div>
                    </div>
                    <div style={{ padding: "10px", textAlign: "center" }}>
                      <h4>Creative</h4>
                      <button 
                        className="template-button"
                        style={{ 
                          background: "var(--primary)", 
                          color: "white", 
                          border: "none", 
                          padding: "5px 15px", 
                          borderRadius: "4px", 
                          cursor: "pointer",
                          marginTop: "5px"
                        }}
                        onClick={() => handleSelectTemplate("Creative")}
                      >Use Template</button>
                    </div>
                  </div>
                  
                  <div className="template-card" style={{ border: "1px solid var(--border-light)", borderRadius: "8px", overflow: "hidden", boxShadow: selectedTemplate === "Executive" ? "0 0 0 2px var(--primary)" : "none" }}>
                    <div className="template-preview" style={{ height: "180px", background: "#f9f9f9", display: "flex", flexDirection: "column", padding: "15px" }}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                        <div style={{ width: "50px", height: "50px", borderRadius: "4px", background: "#444", marginRight: "15px" }}></div>
                        <div style={{ flex: 1 }}>
                          <div style={{ width: "70%", height: "15px", background: "#333", marginBottom: "8px" }}></div>
                          <div style={{ width: "50%", height: "10px", background: "#666" }}></div>
                        </div>
                      </div>
                      <div style={{ width: "100%", height: "2px", background: "#444", marginBottom: "15px" }}></div>
                      <div style={{ width: "40%", height: "10px", background: "#333", marginBottom: "10px" }}></div>
                      <div style={{ width: "95%", height: "8px", background: "#666", marginBottom: "5px" }}></div>
                      <div style={{ width: "90%", height: "8px", background: "#666", marginBottom: "15px" }}></div>
                      <div style={{ width: "40%", height: "10px", background: "#333", marginBottom: "10px" }}></div>
                      <div style={{ width: "100%", height: "8px", background: "#666", marginBottom: "5px" }}></div>
                      <div style={{ width: "95%", height: "8px", background: "#666" }}></div>
                    </div>
                    <div style={{ padding: "10px", textAlign: "center" }}>
                      <h4>Executive</h4>
                      <button 
                        className="template-button"
                        style={{ 
                          background: "var(--primary)", 
                          color: "white", 
                          border: "none", 
                          padding: "5px 15px", 
                          borderRadius: "4px", 
                          cursor: "pointer",
                          marginTop: "5px"
                        }}
                        onClick={() => handleSelectTemplate("Executive")}
                      >Use Template</button>
                    </div>
                  </div>
                  
                  <div className="template-card" style={{ border: "1px solid var(--border-light)", borderRadius: "8px", overflow: "hidden", boxShadow: selectedTemplate === "Minimalist" ? "0 0 0 2px var(--primary)" : "none" }}>
                    <div className="template-preview" style={{ height: "180px", background: "#fff", display: "flex", flexDirection: "column", padding: "15px" }}>
                      <div style={{ width: "80%", height: "18px", background: "#333", marginBottom: "10px" }}></div>
                      <div style={{ width: "60%", height: "10px", background: "#777", marginBottom: "20px" }}></div>
                      <div style={{ width: "30%", height: "10px", background: "#333", marginBottom: "10px" }}></div>
                      <div style={{ width: "100%", height: "1px", background: "#eee", marginBottom: "10px" }}></div>
                      <div style={{ width: "95%", height: "6px", background: "#777", marginBottom: "6px" }}></div>
                      <div style={{ width: "90%", height: "6px", background: "#777", marginBottom: "15px" }}></div>
                      <div style={{ width: "30%", height: "10px", background: "#333", marginBottom: "10px" }}></div>
                      <div style={{ width: "100%", height: "1px", background: "#eee", marginBottom: "10px" }}></div>
                      <div style={{ width: "93%", height: "6px", background: "#777", marginBottom: "6px" }}></div>
                      <div style={{ width: "87%", height: "6px", background: "#777" }}></div>
                    </div>
                    <div style={{ padding: "10px", textAlign: "center" }}>
                      <h4>Minimalist</h4>
                      <button 
                        className="template-button"
                        style={{ 
                          background: "var(--primary)", 
                          color: "white", 
                          border: "none", 
                          padding: "5px 15px", 
                          borderRadius: "4px", 
                          cursor: "pointer",
                          marginTop: "5px"
                        }}
                        onClick={() => handleSelectTemplate("Minimalist")}
                      >Use Template</button>
                    </div>
                  </div>
                  
                  <div className="template-card" style={{ border: "1px solid var(--border-light)", borderRadius: "8px", overflow: "hidden", boxShadow: selectedTemplate === "Technical" ? "0 0 0 2px var(--primary)" : "none" }}>
                    <div className="template-preview" style={{ height: "180px", background: "#f5f7fa", display: "flex", flexDirection: "column", padding: "15px" }}>
                      <div style={{ width: "70%", height: "15px", background: "#333", marginBottom: "5px" }}></div>
                      <div style={{ width: "40%", height: "8px", background: "#666", marginBottom: "15px" }}></div>
                      <div style={{ display: "flex", marginBottom: "15px" }}>
                        <div style={{ width: "50%", paddingRight: "10px" }}>
                          <div style={{ width: "100%", height: "8px", background: "#666", marginBottom: "5px" }}></div>
                          <div style={{ width: "80%", height: "8px", background: "#666" }}></div>
                        </div>
                        <div style={{ width: "50%", paddingLeft: "10px" }}>
                          <div style={{ width: "100%", height: "8px", background: "#666", marginBottom: "5px" }}></div>
                          <div style={{ width: "80%", height: "8px", background: "#666" }}></div>
                        </div>
                      </div>
                      <div style={{ width: "35%", height: "10px", background: "#333", marginBottom: "10px" }}></div>
                      <div style={{ width: "100%", height: "1px", background: "#ddd", marginBottom: "10px" }}></div>
                      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "10px" }}>
                        <div style={{ height: "8px", width: "45px", background: "#adc6ff", borderRadius: "4px" }}></div>
                        <div style={{ height: "8px", width: "65px", background: "#adc6ff", borderRadius: "4px" }}></div>
                        <div style={{ height: "8px", width: "55px", background: "#adc6ff", borderRadius: "4px" }}></div>
                        <div style={{ height: "8px", width: "40px", background: "#adc6ff", borderRadius: "4px" }}></div>
                      </div>
                      <div style={{ width: "45%", height: "10px", background: "#333", marginBottom: "10px" }}></div>
                      <div style={{ width: "95%", height: "8px", background: "#666" }}></div>
                    </div>
                    <div style={{ padding: "10px", textAlign: "center" }}>
                      <h4>Technical</h4>
                      <button 
                        className="template-button"
                        style={{ 
                          background: "var(--primary)", 
                          color: "white", 
                          border: "none", 
                          padding: "5px 15px", 
                          borderRadius: "4px", 
                          cursor: "pointer",
                          marginTop: "5px"
                        }}
                        onClick={() => handleSelectTemplate("Technical")}
                      >Use Template</button>
                    </div>
                  </div>
                  
                  <div className="template-card" style={{ border: "1px solid var(--border-light)", borderRadius: "8px", overflow: "hidden", boxShadow: selectedTemplate === "Graduate" ? "0 0 0 2px var(--primary)" : "none" }}>
                    <div className="template-preview" style={{ height: "180px", background: "#fafafa", display: "flex", flexDirection: "column", padding: "15px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                        <div>
                          <div style={{ width: "120px", height: "15px", background: "#333", marginBottom: "5px" }}></div>
                          <div style={{ width: "90px", height: "8px", background: "#666" }}></div>
                        </div>
                        <div>
                          <div style={{ width: "90px", height: "8px", background: "#666", marginBottom: "5px", textAlign: "right" }}></div>
                          <div style={{ width: "120px", height: "8px", background: "#666", textAlign: "right" }}></div>
                        </div>
                      </div>
                      <div style={{ width: "100%", height: "1px", background: "#ddd", marginBottom: "10px" }}></div>
                      <div style={{ width: "40%", height: "10px", background: "#333", marginBottom: "10px" }}></div>
                      <div style={{ width: "95%", height: "8px", background: "#666", marginBottom: "5px" }}></div>
                      <div style={{ width: "90%", height: "8px", background: "#666", marginBottom: "15px" }}></div>
                      <div style={{ width: "40%", height: "10px", background: "#333", marginBottom: "10px" }}></div>
                      <div style={{ width: "100%", height: "8px", background: "#666", marginBottom: "5px" }}></div>
                      <div style={{ width: "95%", height: "8px", background: "#666" }}></div>
                    </div>
                    <div style={{ padding: "10px", textAlign: "center" }}>
                      <h4>Graduate</h4>
                      <button 
                        className="template-button"
                        style={{ 
                          background: "var(--primary)", 
                          color: "white", 
                          border: "none", 
                          padding: "5px 15px", 
                          borderRadius: "4px", 
                          cursor: "pointer",
                          marginTop: "5px"
                        }}
                        onClick={() => handleSelectTemplate("Graduate")}
                      >Use Template</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ResumeFeatureContent>
        );
      
      case FEATURES.COVER_LETTER:
        return (
          <ResumeFeatureContent
            title="Tailored Cover Letter"
            icon="✉️"
            description="Create personalized cover letters that match specific job descriptions and highlight relevant skills."
          >
            <div style={{ marginTop: "20px" }}>
              <h4 style={{ marginBottom: "15px" }}>Why a tailored cover letter matters</h4>
              <p style={{ marginBottom: "15px", fontSize: "14px", color: "var(--text-gray)" }}>
                A personalized cover letter demonstrates your interest in the specific role and company,
                highlighting why you're the perfect candidate for this particular position.
              </p>
              
              <h4 style={{ marginBottom: "15px" }}>Our AI cover letter creator:</h4>
              <ul style={{ marginLeft: "20px", marginBottom: "20px", fontSize: "14px", color: "var(--text-gray)" }}>
                <li style={{ marginBottom: "10px" }}>Analyzes job descriptions to identify key requirements</li>
                <li style={{ marginBottom: "10px" }}>Matches your experience to the role's needs</li>
                <li style={{ marginBottom: "10px" }}>Creates compelling narratives about your career journey</li>
                <li style={{ marginBottom: "10px" }}>Adapts tone to match company culture</li>
              </ul>
              
              <div style={{ marginTop: "20px", padding: "15px", background: "var(--primary-light)", borderRadius: "8px" }}>
                <h4 style={{ marginBottom: "10px" }}>Enter Job Description:</h4>
                <textarea 
                  placeholder="Paste job description here..."
                  style={{ 
                    width: "100%", 
                    minHeight: "120px", 
                    padding: "10px", 
                    borderRadius: "5px",
                    border: "1px solid var(--border-light)"
                  }}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                <button 
                  className="update-btn" 
                  style={{ marginTop: "15px" }}
                  onClick={handleGenerateCoverLetter}
                  disabled={isGeneratingCoverLetter}
                >
                  {isGeneratingCoverLetter ? "Generating..." : "Generate Cover Letter"}
                </button>
              </div>

              {isCoverLetterGenerated && (
                <div style={{ marginTop: "20px" }}>
                  <h4 style={{ marginBottom: "15px" }}>Your Generated Cover Letter:</h4>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)", marginBottom: "10px" }}>
                    You can edit the content below if needed before downloading.
                  </p>
                  <textarea
                    value={coverLetterContent}
                    onChange={(e) => setCoverLetterContent(e.target.value)}
                    style={{ 
                      width: "100%", 
                      minHeight: "300px", 
                      padding: "20px",
                      borderRadius: "8px",
                      border: "1px solid var(--border-light)",
                      fontSize: "14px",
                      lineHeight: "1.6",
                      fontFamily: "Arial, sans-serif",
                      marginBottom: "15px"
                    }}
                  />
                  
                  {/* Preview section for PDF generation */}
                  <div 
                    ref={coverLetterRef}
                    style={{ 
                      display: "none" // Hidden but used for PDF generation
                    }}
                  >
                    {coverLetterContent.split('\n').map((line, index) => (
                      <p key={index} style={{ marginBottom: "10px", fontSize: "14px", color: "#333" }}>
                        {line}
                      </p>
                    ))}
                  </div>
                  
                  <div style={{ display: "flex", gap: "15px" }}>
                    <button 
                      className="update-btn"
                      onClick={() => handleDownloadCoverLetter('pdf')}
                      disabled={isDownloading}
                    >
                      {isDownloading ? "Preparing PDF..." : "Download as PDF"}
                    </button>
                    <button 
                      className="update-btn"
                      onClick={() => handleDownloadCoverLetter('docx')}
                      disabled={isDownloading}
                    >
                      {isDownloading ? "Preparing DOCX..." : "Download as DOCX"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </ResumeFeatureContent>
        );
      
      case FEATURES.ANALYSIS:
        return (
          <ResumeFeatureContent
            title="Detailed Resume Analysis"
            icon="🔍"
            description="Get comprehensive feedback on your resume with actionable suggestions for improvement."
          >
            <div style={{ marginTop: "20px" }}>
              <h4 style={{ marginBottom: "15px" }}>What our analysis provides:</h4>
              <ul style={{ marginLeft: "20px", marginBottom: "20px", fontSize: "14px", color: "var(--text-gray)" }}>
                <li style={{ marginBottom: "10px" }}>Content evaluation - strength of your impact statements</li>
                <li style={{ marginBottom: "10px" }}>Skill gap analysis - comparing your profile with job market demands</li>
                <li style={{ marginBottom: "10px" }}>Format and readability assessment</li>
                <li style={{ marginBottom: "10px" }}>Keyword optimization recommendations</li>
                <li style={{ marginBottom: "10px" }}>Industry-specific best practices</li>
              </ul>
              
              <div style={{ 
                border: "2px dashed var(--border-light)", 
                borderRadius: "8px", 
                padding: "30px", 
                textAlign: "center",
                marginBottom: "20px" 
              }}>
                <div style={{ fontSize: "40px", marginBottom: "15px" }}>📄</div>
                <p style={{ marginBottom: "15px", color: "var(--text-gray)" }}>
                  Upload your resume to get a detailed analysis
                </p>
                <input 
                  type="file"
                  onChange={handleResumeUpload}
                  style={{ 
                    width: "100%", 
                    padding: "10px", 
                    borderRadius: "5px",
                    border: "1px solid var(--border-light)",
                    background: "white",
                    marginBottom: "15px"
                  }}
                />
                <button 
                  className="update-btn" 
                  style={{ marginTop: "10px" }}
                  onClick={() => analyzeResume(uploadedResume!)}
                  disabled={!uploadedResume || isAnalyzing}
                >
                  {isAnalyzing ? "Analyzing..." : "Upload Resume"}
                </button>
              </div>
              
              {analysisReport && (
                <div style={{ marginTop: "20px" }}>
                  <h4 style={{ marginBottom: "15px" }}>Analysis Report:</h4>
                  <div 
                    ref={analysisReportRef}
                    style={{ 
                      border: "1px solid var(--border-light)",
                      borderRadius: "8px",
                      padding: "20px",
                      background: "white",
                      marginBottom: "20px"
                    }}
                  >
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                      <div style={{ 
                        width: "100px", 
                        height: "100px", 
                        borderRadius: "50%", 
                        background: analysisReport.score >= 80 ? "#4caf50" : analysisReport.score >= 60 ? "#ff9800" : "#f44336",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        fontSize: "28px",
                        fontWeight: "bold",
                        margin: "0 auto 15px auto"
                      }}>
                        {analysisReport.score}%
                      </div>
                      <h3 style={{ fontSize: "18px", color: "#333" }}>Overall Score: {analysisReport.score}%</h3>
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <h4 style={{ fontSize: "16px", marginBottom: "10px", color: "#333", fontWeight: "bold" }}>Strengths:</h4>
                      <ul style={{ marginLeft: "20px", fontSize: "14px", color: "#666" }}>
                        {analysisReport.strengths.map((strength: string, index: number) => (
                          <li key={index} style={{ marginBottom: "5px" }}>{strength}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <h4 style={{ fontSize: "16px", marginBottom: "10px", color: "#333", fontWeight: "bold" }}>Weaknesses:</h4>
                      <ul style={{ marginLeft: "20px", fontSize: "14px", color: "#666" }}>
                        {analysisReport.weaknesses.map((weakness: string, index: number) => (
                          <li key={index} style={{ marginBottom: "5px" }}>{weakness}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <h4 style={{ fontSize: "16px", marginBottom: "10px", color: "#333", fontWeight: "bold" }}>Recommendations:</h4>
                      <ul style={{ marginLeft: "20px", fontSize: "14px", color: "#666" }}>
                        {analysisReport.recommendations.map((recommendation: string, index: number) => (
                          <li key={index} style={{ marginBottom: "5px" }}>{recommendation}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "space-between" }}>
                      <div style={{ 
                        width: "calc(33% - 10px)", 
                        padding: "15px", 
                        borderRadius: "8px", 
                        background: "#f5f5f5",
                        textAlign: "center" 
                      }}>
                        <div style={{ 
                          fontSize: "24px", 
                          fontWeight: "bold", 
                          color: analysisReport.keywordMatch >= 80 ? "#4caf50" : analysisReport.keywordMatch >= 60 ? "#ff9800" : "#f44336"
                        }}>
                          {analysisReport.keywordMatch}%
                        </div>
                        <p style={{ marginTop: "5px", fontSize: "14px", color: "#666" }}>Keyword Match</p>
                      </div>
                      
                      <div style={{ 
                        width: "calc(33% - 10px)", 
                        padding: "15px", 
                        borderRadius: "8px", 
                        background: "#f5f5f5",
                        textAlign: "center" 
                      }}>
                        <div style={{ 
                          fontSize: "24px", 
                          fontWeight: "bold", 
                          color: analysisReport.formatScore >= 80 ? "#4caf50" : analysisReport.formatScore >= 60 ? "#ff9800" : "#f44336"
                        }}>
                          {analysisReport.formatScore}%
                        </div>
                        <p style={{ marginTop: "5px", fontSize: "14px", color: "#666" }}>Format Score</p>
                      </div>
                      
                      <div style={{ 
                        width: "calc(33% - 10px)", 
                        padding: "15px", 
                        borderRadius: "8px", 
                        background: "#f5f5f5",
                        textAlign: "center" 
                      }}>
                        <div style={{ 
                          fontSize: "24px", 
                          fontWeight: "bold", 
                          color: analysisReport.contentScore >= 80 ? "#4caf50" : analysisReport.contentScore >= 60 ? "#ff9800" : "#f44336"
                        }}>
                          {analysisReport.contentScore}%
                        </div>
                        <p style={{ marginTop: "5px", fontSize: "14px", color: "#666" }}>Content Score</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "15px" }}>
                    <button 
                      className="update-btn"
                      onClick={handleDownloadAnalysisReport}
                      disabled={isDownloading}
                    >
                      {isDownloading ? "Preparing PDF..." : "Download Analysis Report"}
                    </button>
                  </div>
                </div>
              )}
              
              <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                You'll receive a detailed report with specific improvement suggestions within minutes.
              </p>
            </div>
          </ResumeFeatureContent>
        );
      
      case FEATURES.INTERVIEW:
        return (
          <ResumeFeatureContent
            title="Interview Guide"
            icon="🎯"
            description="Prepare for interviews with personalized questions based on your resume and target role."
          >
            <div style={{ marginTop: "20px" }}>
              <h4 style={{ marginBottom: "15px" }}>How our interview guide helps:</h4>
              <p style={{ marginBottom: "15px", fontSize: "14px", color: "var(--text-gray)" }}>
                Our AI analyzes your resume and target job descriptions to create a personalized
                interview preparation guide with likely questions and suggested answers.
              </p>
              
              <div style={{ 
                marginTop: "20px", 
                display: "grid", 
                gridTemplateColumns: "1fr 1fr", 
                gap: "15px",
                marginBottom: "20px"
              }}>
                <div style={{ 
                  background: "var(--primary-light)", 
                  padding: "15px", 
                  borderRadius: "8px" 
                }}>
                  <h4 style={{ marginBottom: "10px" }}>Role-specific Questions</h4>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                    Get questions tailored to the specific role you're applying for, 
                    covering technical skills and job requirements.
                  </p>
                </div>
                
                <div style={{ 
                  background: "var(--light-purple)", 
                  padding: "15px", 
                  borderRadius: "8px" 
                }}>
                  <h4 style={{ marginBottom: "10px" }}>Experience-based Questions</h4>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                    Practice questions based on your unique work experience 
                    and how to frame your answers effectively.
                  </p>
                </div>
                
                <div style={{ 
                  background: "#e8f5e9", 
                  padding: "15px", 
                  borderRadius: "8px" 
                }}>
                  <h4 style={{ marginBottom: "10px" }}>Behavioral Questions</h4>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                    Prepare for questions about workplace behavior, team collaboration,
                    and problem-solving approaches.
                  </p>
                </div>
                
                <div style={{ 
                  background: "#fff3e0", 
                  padding: "15px", 
                  borderRadius: "8px" 
                }}>
                  <h4 style={{ marginBottom: "10px" }}>Mock Interview Practice</h4>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                    Get real-time feedback on your answers with our AI-powered 
                    mock interview simulator.
                  </p>
                </div>
              </div>
              
              <div style={{ marginTop: "20px", padding: "15px", background: "var(--primary-light)", borderRadius: "8px" }}>
                <h4 style={{ marginBottom: "10px" }}>Enter Job Title:</h4>
                <input 
                  type="text"
                  placeholder="e.g., Software Engineer"
                  style={{ 
                    width: "100%", 
                    padding: "10px", 
                    borderRadius: "5px",
                    border: "1px solid var(--border-light)",
                    marginBottom: "15px"
                  }}
                  value={jobTitleForInterview}
                  onChange={(e) => setJobTitleForInterview(e.target.value)}
                />
                <button 
                  className="update-btn" 
                  onClick={handleGenerateInterviewQuestions}
                  disabled={isGeneratingInterview}
                >
                  {isGeneratingInterview ? "Generating..." : "Generate Interview Questions"}
                </button>
              </div>

              {interviewQuestions && (
                <div style={{ marginTop: "20px" }}>
                  <h4 style={{ marginBottom: "15px" }}>Your Interview Questions:</h4>
                  <div style={{ 
                    border: "1px solid var(--border-light)",
                    borderRadius: "8px",
                    padding: "20px",
                    background: "white",
                    marginBottom: "20px"
                  }}>
                    <h5 style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>Role-specific Questions:</h5>
                    <ul style={{ marginBottom: "15px", fontSize: "14px", color: "#333" }}>
                      {interviewQuestions.roleSpecific.map((question: string, index: number) => (
                        <li key={index} style={{ marginBottom: "5px" }}>{question}</li>
                      ))}
                    </ul>
                    <h5 style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>Behavioral Questions:</h5>
                    <ul style={{ marginBottom: "15px", fontSize: "14px", color: "#333" }}>
                      {interviewQuestions.behavioral.map((question: string, index: number) => (
                        <li key={index} style={{ marginBottom: "5px" }}>{question}</li>
                      ))}
                    </ul>
                    <h5 style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>Technical Questions:</h5>
                    <ul style={{ marginBottom: "15px", fontSize: "14px", color: "#333" }}>
                      {interviewQuestions.technical.map((question: string, index: number) => (
                        <li key={index} style={{ marginBottom: "5px" }}>{question}</li>
                      ))}
                    </ul>
                    <h5 style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>Suggested Questions:</h5>
                    <ul style={{ marginBottom: "15px", fontSize: "14px", color: "#333" }}>
                      {interviewQuestions.suggested.map((question: string, index: number) => (
                        <li key={index} style={{ marginBottom: "5px" }}>{question}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </ResumeFeatureContent>
        );
      
      case FEATURES.ROADMAP:
        return (
          <ResumeFeatureContent
            title="Career Roadmap"
            icon="🗺️"
            description="Get a personalized career development path with skills to acquire and milestones to achieve."
          >
            <div style={{ marginTop: "20px" }}>
              <h4 style={{ marginBottom: "15px" }}>Plan your career journey</h4>
              <p style={{ marginBottom: "15px", fontSize: "14px", color: "var(--text-gray)" }}>
                Our AI analyzes your current skills, experience, and career goals to create 
                a personalized roadmap for your professional development.
              </p>
              
              <div style={{ 
                background: "var(--primary-light)", 
                padding: "20px", 
                borderRadius: "8px",
                marginBottom: "20px" 
              }}>
                <h4 style={{ marginBottom: "15px" }}>Your Career Roadmap Includes:</h4>
                <ul style={{ marginLeft: "20px", marginBottom: "15px", fontSize: "14px", color: "var(--text-gray)" }}>
                  <li style={{ marginBottom: "10px" }}>Skill gap analysis for your target roles</li>
                  <li style={{ marginBottom: "10px" }}>Recommended learning resources and certifications</li>
                  <li style={{ marginBottom: "10px" }}>Timeline with achievable milestones</li>
                  <li style={{ marginBottom: "10px" }}>Industry trends and emerging skills in your field</li>
                  <li style={{ marginBottom: "10px" }}>Alternative career paths based on your transferable skills</li>
                </ul>
              </div>
              
              <div style={{ marginTop: "20px", padding: "15px", background: "var(--primary-light)", borderRadius: "8px" }}>
                <h4 style={{ marginBottom: "10px" }}>Enter Your Current and Target Job Titles:</h4>
                <input 
                  type="text"
                  placeholder="Current Job Title"
                  style={{ 
                    width: "100%", 
                    padding: "10px", 
                    borderRadius: "5px",
                    border: "1px solid var(--border-light)",
                    marginBottom: "15px"
                  }}
                  value={currentJobTitle}
                  onChange={(e) => setCurrentJobTitle(e.target.value)}
                />
                <input 
                  type="text"
                  placeholder="Target Job Title"
                  style={{ 
                    width: "100%", 
                    padding: "10px", 
                    borderRadius: "5px",
                    border: "1px solid var(--border-light)",
                    marginBottom: "15px"
                  }}
                  value={targetJobTitle}
                  onChange={(e) => setTargetJobTitle(e.target.value)}
                />
                <button 
                  className="update-btn" 
                  onClick={handleGenerateCareerRoadmap}
                  disabled={isGeneratingRoadmap}
                >
                  {isGeneratingRoadmap ? "Generating..." : "Generate Career Roadmap"}
                </button>
              </div>

              {careerRoadmap && (
                <div style={{ marginTop: "20px" }}>
                  <h4 style={{ marginBottom: "15px" }}>Your Career Roadmap:</h4>
                  <div 
                    ref={roadmapRef}
                    style={{ 
                      border: "1px solid var(--border-light)",
                      borderRadius: "8px",
                      padding: "20px",
                      background: "white",
                      marginBottom: "20px"
                    }}
                  >
                    <h5 style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>Current Role: {careerRoadmap.currentRole}</h5>
                    <h5 style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>Target Role: {careerRoadmap.targetRole}</h5>
                    <p style={{ marginBottom: "10px", fontSize: "14px", color: "#333" }}>Estimated Time: {careerRoadmap.timeEstimate}</p>
                    <p style={{ marginBottom: "10px", fontSize: "14px", color: "#333" }}>Skill Gaps:</p>
                    <ul style={{ marginBottom: "15px", fontSize: "14px", color: "#333" }}>
                      {careerRoadmap.skillGaps.map((skill: string, index: number) => (
                        <li key={index} style={{ marginBottom: "5px" }}>{skill}</li>
                      ))}
                    </ul>
                    <p style={{ marginBottom: "10px", fontSize: "14px", color: "#333" }}>Milestones:</p>
                    {careerRoadmap.milestones.map((milestone: any, index: number) => (
                      <div key={index} style={{ marginBottom: "15px" }}>
                        <h6 style={{ marginBottom: "5px", fontSize: "14px", color: "#333" }}>{milestone.title}</h6>
                        <ul style={{ marginBottom: "10px", fontSize: "14px", color: "#333" }}>
                          {milestone.tasks.map((task: string, idx: number) => (
                            <li key={idx} style={{ marginBottom: "5px" }}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <p style={{ marginBottom: "10px", fontSize: "14px", color: "#333" }}>Recommended Resources:</p>
                    <ul style={{ marginBottom: "15px", fontSize: "14px", color: "#333" }}>
                      {careerRoadmap.recommendedResources.map((resource: string, index: number) => (
                        <li key={index} style={{ marginBottom: "5px" }}>{resource}</li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ display: "flex", gap: "15px" }}>
                    <button 
                      className="update-btn"
                      onClick={handleDownloadRoadmap}
                      disabled={isDownloading}
                    >
                      {isDownloading ? "Preparing PDF..." : "Download Career Roadmap"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </ResumeFeatureContent>
        );
      
      case FEATURES.PROJECTS:
        return (
          <ResumeFeatureContent
            title="Project Recommendations"
            icon="📂"
            description="Discover industry-relevant projects to enhance your portfolio and demonstrate your skills."
          >
            <div style={{ marginTop: "20px" }}>
              <h4 style={{ marginBottom: "15px" }}>Why portfolio projects matter:</h4>
              <p style={{ marginBottom: "20px", fontSize: "14px", color: "var(--text-gray)" }}>
                Having relevant projects in your portfolio demonstrates your practical skills and initiative
                to potential employers, especially important for those changing careers or with less experience.
              </p>
              
              <div style={{ 
                background: "var(--light-purple)", 
                padding: "20px", 
                borderRadius: "8px",
                marginBottom: "20px" 
              }}>
                <h4 style={{ marginBottom: "15px" }}>Our Project Recommendations Include:</h4>
                <ul style={{ marginLeft: "20px", fontSize: "14px", color: "var(--text-gray)" }}>
                  <li style={{ marginBottom: "10px" }}>Industry-specific projects that showcase relevant skills</li>
                  <li style={{ marginBottom: "10px" }}>Detailed project descriptions and implementation guides</li>
                  <li style={{ marginBottom: "10px" }}>Skill-building projects of varying difficulty levels</li>
                  <li style={{ marginBottom: "10px" }}>Resources and tutorials to help you complete projects</li>
                  <li style={{ marginBottom: "10px" }}>Tips for presenting projects effectively on your resume</li>
                </ul>
              </div>
              
              <div style={{ marginTop: "25px" }}>
                  <h4 style={{ marginBottom: "15px" }}>Find Projects for Your Field:</h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" }}>
                    <span className="newly-added" style={{ cursor: "pointer" }} onClick={() => handleGenerateProjectIdeas("Software Development")}>
                      Software Development
                    </span>
                    <span className="newly-added" style={{ cursor: "pointer" }} onClick={() => handleGenerateProjectIdeas("Data Analysis")}>
                      Data Analysis
                    </span>
                    <span className="newly-added" style={{ cursor: "pointer" }} onClick={() => handleGenerateProjectIdeas("UX/UI Design")}>
                      UX/UI Design
                    </span>
                    <span className="newly-added" style={{ cursor: "pointer" }} onClick={() => handleGenerateProjectIdeas("Digital Marketing")}>
                      Digital Marketing
                    </span>
                    <span className="newly-added" style={{ cursor: "pointer" }} onClick={() => handleGenerateProjectIdeas("Project Management")}>
                      Project Management
                    </span>
                    <span className="newly-added" style={{ cursor: "pointer" }} onClick={() => handleGenerateProjectIdeas("Content Creation")}>
                      Content Creation
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
                    <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                      Enter a custom field to get more targeted project recommendations:
                    </p>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <input 
                        type="text"
                        placeholder="e.g., Machine Learning, Frontend Development, etc."
                        style={{ 
                          flex: 1,
                          padding: "10px", 
                          borderRadius: "5px",
                          border: "1px solid var(--border-light)"
                        }}
                        value={customProjectField}
                        onChange={(e) => setCustomProjectField(e.target.value)}
                      />
                      <button 
                        className="update-btn" 
                        onClick={() => handleGenerateProjectIdeas()}
                        disabled={isGeneratingProjects || !customProjectField.trim()}
                      >
                        {isGeneratingProjects ? "Generating..." : "Get Custom Project Ideas"}
                      </button>
                    </div>
                  </div>
                </div>
                
                {projectIdeas && (
                  <div style={{ marginTop: "25px" }}>
                    <h4 style={{ marginBottom: "15px" }}>Project Ideas for {projectCategory}:</h4>
                    <div 
                      ref={projectsRef}
                      style={{ 
                        border: "1px solid var(--border-light)",
                        borderRadius: "8px",
                        padding: "20px",
                        background: "white",
                        marginBottom: "20px"
                      }}
                    >
                      <div>
                        <h5 style={{ marginBottom: "15px", fontSize: "16px", color: "#333" }}>Beginner Level Projects:</h5>
                        {projectIdeas.beginner.map((project: any, index: number) => (
                          <div key={index} style={{ marginBottom: "20px", padding: "15px", border: "1px solid #eee", borderRadius: "8px" }}>
                            <h6 style={{ marginBottom: "5px", fontSize: "15px", color: "#333" }}>{project.title}</h6>
                            <p style={{ marginBottom: "10px", fontSize: "14px", color: "#666" }}>{project.description}</p>
                            <div style={{ marginBottom: "10px" }}>
                              <span style={{ fontSize: "13px", fontWeight: "bold", color: "#333" }}>Skills: </span>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "5px" }}>
                                {project.skills.map((skill: string, idx: number) => (
                                  <span key={idx} style={{ fontSize: "12px", background: "#f1f1f1", padding: "3px 8px", borderRadius: "10px", color: "#666" }}>
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <p style={{ fontSize: "13px", color: "#666" }}><b>Time Estimate:</b> {project.timeEstimate}</p>
                            <div style={{ marginTop: "10px" }}>
                              <span style={{ fontSize: "13px", fontWeight: "bold", color: "#333" }}>Resources: </span>
                              <ul style={{ marginLeft: "20px", marginTop: "5px", fontSize: "13px", color: "#666" }}>
                                {project.resources.map((resource: string, idx: number) => (
                                  <li key={idx}>{resource}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div style={{ marginTop: "25px" }}>
                        <h5 style={{ marginBottom: "15px", fontSize: "16px", color: "#333" }}>Intermediate Level Projects:</h5>
                        {projectIdeas.intermediate.map((project: any, index: number) => (
                          <div key={index} style={{ marginBottom: "20px", padding: "15px", border: "1px solid #eee", borderRadius: "8px" }}>
                            <h6 style={{ marginBottom: "5px", fontSize: "15px", color: "#333" }}>{project.title}</h6>
                            <p style={{ marginBottom: "10px", fontSize: "14px", color: "#666" }}>{project.description}</p>
                            <div style={{ marginBottom: "10px" }}>
                              <span style={{ fontSize: "13px", fontWeight: "bold", color: "#333" }}>Skills: </span>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "5px" }}>
                                {project.skills.map((skill: string, idx: number) => (
                                  <span key={idx} style={{ fontSize: "12px", background: "#f1f1f1", padding: "3px 8px", borderRadius: "10px", color: "#666" }}>
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <p style={{ fontSize: "13px", color: "#666" }}><b>Time Estimate:</b> {project.timeEstimate}</p>
                            <div style={{ marginTop: "10px" }}>
                              <span style={{ fontSize: "13px", fontWeight: "bold", color: "#333" }}>Resources: </span>
                              <ul style={{ marginLeft: "20px", marginTop: "5px", fontSize: "13px", color: "#666" }}>
                                {project.resources.map((resource: string, idx: number) => (
                                  <li key={idx}>{resource}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div style={{ marginTop: "25px" }}>
                        <h5 style={{ marginBottom: "15px", fontSize: "16px", color: "#333" }}>Advanced Level Projects:</h5>
                        {projectIdeas.advanced.map((project: any, index: number) => (
                          <div key={index} style={{ marginBottom: "20px", padding: "15px", border: "1px solid #eee", borderRadius: "8px" }}>
                            <h6 style={{ marginBottom: "5px", fontSize: "15px", color: "#333" }}>{project.title}</h6>
                            <p style={{ marginBottom: "10px", fontSize: "14px", color: "#666" }}>{project.description}</p>
                            <div style={{ marginBottom: "10px" }}>
                              <span style={{ fontSize: "13px", fontWeight: "bold", color: "#333" }}>Skills: </span>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "5px" }}>
                                {project.skills.map((skill: string, idx: number) => (
                                  <span key={idx} style={{ fontSize: "12px", background: "#f1f1f1", padding: "3px 8px", borderRadius: "10px", color: "#666" }}>
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <p style={{ fontSize: "13px", color: "#666" }}><b>Time Estimate:</b> {project.timeEstimate}</p>
                            <div style={{ marginTop: "10px" }}>
                              <span style={{ fontSize: "13px", fontWeight: "bold", color: "#333" }}>Resources: </span>
                              <ul style={{ marginLeft: "20px", marginTop: "5px", fontSize: "13px", color: "#666" }}>
                                {project.resources.map((resource: string, idx: number) => (
                                  <li key={idx}>{resource}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div style={{ display: "flex", gap: "15px" }}>
                      <button 
                        className="update-btn"
                        onClick={handleDownloadProjectIdeas}
                        disabled={isDownloading}
                      >
                        {isDownloading ? "Preparing PDF..." : "Download Project Ideas"}
                      </button>
                    </div>
                  </div>
                )}
            </div>
          </ResumeFeatureContent>
        );
      
      default:
        return (
          <>
        
            <section className="featured-jobs">
              <h2>
                <span 
                  onClick={() => window.location.href = '/'} 
                  style={{ 
                    cursor: 'pointer', 
                    marginRight: '5px',
                    display: 'inline-block',
                    width: '25px',
                    height: '25px',
                    lineHeight: '25px',
                    textAlign: 'center',
                    borderRadius: '50%',
                    transition: 'all 0.3s ease',
                    background: 'transparent'
                  }}
                  className="back-arrow"
                  title="Back to Home"
                  onMouseOver={(e) => e.currentTarget.style.background = 'var(--primary-light)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  ←
                </span>
                <span>Resume AI Assistant</span>
              </h2>
              <div className="job-card" style={{ padding: "25px" }}>
                <div className="job-info">
                  <h3 className="job-title">Enhance Your Resume with AI</h3>
                  <p style={{ marginBottom: "15px", color: "var(--text-gray)" }}>
                    Our AI-powered resume tool helps women craft compelling resumes
                    that highlight their skills and experiences effectively.
                  </p>
                  
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" }}>
                    <span className="newly-added" style={{ background: "var(--light-purple)" }}>Resume Analysis</span>
                    <span className="newly-added" style={{ background: "var(--primary-light)" }}>Skills Optimization</span>
                    <span className="newly-added" style={{ background: "#e8f5e9" }}>ATS Compatibility</span>
                    <span className="newly-added" style={{ background: "#fff3e0" }}>Career Gap Solutions</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Services Section - New Feature Cards */}
            <section className="featured-jobs">
              <h2>Our AI-Powered Resume Services</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px", marginTop: "15px" }}>
                {/* ATS-Friendly Resume */}
                <div 
                  className="job-card" 
                  style={{ padding: "20px", display: "flex", flexDirection: "column", cursor: "pointer" }}
                  onClick={() => setSelectedFeature(FEATURES.ATS)}
                >
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>📊</div>
                  <h3 className="job-title" style={{ marginBottom: "10px" }}>ATS-Friendly Resume</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)", flex: 1 }}>
                    Create resumes that pass through Applicant Tracking Systems with optimized keywords and formatting.
                  </p>
                  <button 
                    className="update-btn" 
                    style={{ alignSelf: "flex-start", marginTop: "15px" }}
                    onClick={(e) => { e.stopPropagation(); setSelectedFeature(FEATURES.ATS); }}
                  >
                    Optimize Resume
                  </button>
                </div>

                {/* Tailored Cover Letter */}
                <div 
                  className="job-card" 
                  style={{ padding: "20px", display: "flex", flexDirection: "column", cursor: "pointer" }}
                  onClick={() => setSelectedFeature(FEATURES.COVER_LETTER)}
                >
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>✉️</div>
                  <h3 className="job-title" style={{ marginBottom: "10px" }}>Tailored Cover Letter</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)", flex: 1 }}>
                    Create personalized cover letters that match specific job descriptions and highlight relevant skills.
                  </p>
                  <button 
                    className="update-btn" 
                    style={{ alignSelf: "flex-start", marginTop: "15px" }}
                    onClick={(e) => { e.stopPropagation(); setSelectedFeature(FEATURES.COVER_LETTER); }}
                  >
                    Create Cover Letter
                  </button>
                </div>

                {/* Resume Analysis */}
                <div 
                  className="job-card" 
                  style={{ padding: "20px", display: "flex", flexDirection: "column", cursor: "pointer" }}
                  onClick={() => setSelectedFeature(FEATURES.ANALYSIS)}
                >
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>🔍</div>
                  <h3 className="job-title" style={{ marginBottom: "10px" }}>Detailed Analysis</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)", flex: 1 }}>
                    Get comprehensive feedback on your resume with actionable suggestions for improvement.
                  </p>
                  <button 
                    className="update-btn" 
                    style={{ alignSelf: "flex-start", marginTop: "15px" }}
                    onClick={(e) => { e.stopPropagation(); setSelectedFeature(FEATURES.ANALYSIS); }}
                  >
                    Analyze Resume
                  </button>
                </div>

                {/* Interview Guide */}
                <div 
                  className="job-card" 
                  style={{ padding: "20px", display: "flex", flexDirection: "column", cursor: "pointer" }}
                  onClick={() => setSelectedFeature(FEATURES.INTERVIEW)}
                >
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>🎯</div>
                  <h3 className="job-title" style={{ marginBottom: "10px" }}>Interview Guide</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)", flex: 1 }}>
                    Prepare for interviews with personalized questions based on your resume and target role.
                  </p>
                  <button 
                    className="update-btn" 
                    style={{ alignSelf: "flex-start", marginTop: "15px" }}
                    onClick={(e) => { e.stopPropagation(); setSelectedFeature(FEATURES.INTERVIEW); }}
                  >
                    Prepare for Interview
                  </button>
                </div>

                {/* Career Roadmap */}
                <div 
                  className="job-card" 
                  style={{ padding: "20px", display: "flex", flexDirection: "column", cursor: "pointer" }}
                  onClick={() => setSelectedFeature(FEATURES.ROADMAP)}
                >
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>🗺️</div>
                  <h3 className="job-title" style={{ marginBottom: "10px" }}>Career Roadmap</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)", flex: 1 }}>
                    Get a personalized career development path with skills to acquire and milestones to achieve.
                  </p>
                  <button 
                    className="update-btn" 
                    style={{ alignSelf: "flex-start", marginTop: "15px" }}
                    onClick={(e) => { e.stopPropagation(); setSelectedFeature(FEATURES.ROADMAP); }}
                  >
                    Plan Career Path
                  </button>
                </div>

                {/* Recommended Projects */}
                <div 
                  className="job-card" 
                  style={{ padding: "20px", display: "flex", flexDirection: "column", cursor: "pointer" }}
                  onClick={() => setSelectedFeature(FEATURES.PROJECTS)}
                >
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>📂</div>
                  <h3 className="job-title" style={{ marginBottom: "10px" }}>Project Recommendations</h3>
                  <p style={{ fontSize: "14px", color: "var (--text-gray)", flex: 1 }}>
                    Discover industry-relevant projects to enhance your portfolio and demonstrate your skills.
                  </p>
                  <button 
                    className="update-btn" 
                    style={{ alignSelf: "flex-start", marginTop: "15px" }}
                    onClick={(e) => { e.stopPropagation(); setSelectedFeature(FEATURES.PROJECTS); }}
                  >
                    Find Projects
                  </button>
                </div>
              </div>
            </section>

            <section className="featured-jobs">
              <h2>Upload Your Resume</h2>
              <div className="job-card" style={{ padding: "30px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ 
                  border: "2px dashed var(--border-light)", 
                  borderRadius: "8px", 
                  padding: "40px", 
                  textAlign: "center",
                  width: "100%",
                  marginBottom: "20px" 
                }}>
                  <div style={{ fontSize: "40px", marginBottom: "15px" }}>📄</div>
                  <p style={{ marginBottom: "15px", color: "var(--text-gray)" }}>
                    Drag and drop your resume here or click to browse
                  </p>
                  <input 
                    type="file"
                    accept=".pdf,.docx,.rtf"
                    onChange={handleResumeUpload}
                    style={{ display: "none" }}
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload">
                    <button className="update-btn" style={{ marginTop: "10px" }}>
                      Upload Resume
                    </button>
                  </label>
                </div>
                {uploadedResume && (
                  <p style={{ marginTop: "10px", color: "var(--text-gray)" }}>
                    Uploaded File: {uploadedResume.name}
                  </p>
                )}
              </div>
            </section>

            <section className="featured-jobs">
              <h2>How Resume AI Works</h2>
              <div className="work-mode-options" style={{ marginTop: "15px" }}>
                <div className="mode-card">
                  <span className="mode-icon"></span>
                  <span className="mode-text">1. Upload your resume</span>
                </div>
                <div className="mode-card">
                  <span className="mode-icon"></span>
                  <span className="mode-text">2. AI analyzes strengths & gaps</span>
                </div>
                <div className="mode-card">
                  <span className="mode-icon"></span>
                  <span className="mode-text">3. Get personalized suggestions</span>
                </div>
                <div className="mode-card">
                  <span className="mode-icon"></span>
                  <span className="mode-text">4. Download enhanced resume</span>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="herkey-logo">HerKey Saarthi</span>
          <span className="turns-ten">Your AI-Assistant</span>
        </div>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search jobs, skills or career opportunities" 
            className="search-input" 
          />
        </div>
        
        <button className="sign-up-btn">Sign Up</button>
      </header>

      <div className="content-container">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <nav className="nav-menu">
            <ul>
              <li className="nav-item active">
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>📄</span>
                </span>
                <span className="nav-text">Resume AI</span>
              </li>
              <li className="nav-item" onClick={navigateToHome} style={{ cursor: 'pointer' }}>
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>💼</span>
                </span>
                <span className="nav-text">Jobs</span>
              </li>
              <li className="nav-item">
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>🏢</span>
                </span>
                <span className="nav-text">Companies</span>
              </li>
              <li className="nav-item" onClick={() => setSelectedFeature(FEATURES.PROJECTS)} style={{ cursor: 'pointer' }}>
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>📂</span>
                </span>
                <span className="nav-text">Projects</span>
              </li>
              <li className="nav-item">
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>👥</span>
                </span>
                <span className="nav-text">Community</span>
              </li>
              <li className="nav-item">
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>📝</span>
                </span>
                <span className="nav-text">Career Resources</span>
              </li>
              <li className="nav-item">
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>🔗</span>
                </span>
                <span className="nav-text">Mentorship</span>
              </li>
              <li className="nav-item">
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>📅</span>
                </span>
                <span className="nav-text">Events</span>
              </li>
              <li className="nav-item">
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>📊</span>
                </span>
                <span className="nav-text">More</span>
              </li>
            </ul>
            <div className="herkey-business">
              <button className="business-btn">
                <span className="business-icon">☰</span>
                JobsForHer for Employers
              </button>
            </div>
            <div className="app-download">
              <img src="/google-play-badge.png" alt="Get it on Google Play" className="google-play" />
            </div>
            <div className="social-icons">
              <span className="social-icon"></span>
              <span className="social-icon"></span>
              <span className="social-icon"></span>
              <span className="social-icon"></span>
            </div>
          </nav>
        </aside>

        {/* Main Content - Resume AI Specific */}
        <main className="main-content">
          {/* Back to Home Arrow */}
          {selectedFeature !== FEATURES.HOME && (
            <div style={{ marginBottom: "20px" }}>
              <button 
                onClick={() => setSelectedFeature(FEATURES.HOME)}
                style={{ 
                  background: "transparent", 
                  border: "none", 
                  display: "flex", 
                  alignItems: "center",
                  color: "var(--primary)",
                  cursor: "pointer",
                  padding: "5px 0"
                }}
              >
                ← Back to Home
              </button>
            </div>
          )}
          
          {renderFeatureContent()}
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <div className="profile-card">
            <h2 className="profile-title">Resume Strength Score</h2>
            <div className="profile-image" style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              margin: "15px auto",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              maxWidth: "280px"
            }}>
              <img 
                src="https://th.bing.com/th/id/OIP.v_KqaJBVSQaLkepvMZw-nAHaEK?pid=ImgDet&w=208&h=117&c=7&dpr=1.5" 
                alt="Resume strength meter" 
                style={{ 
                  width: "100%",
                  height: "auto",
                  display: "block"
                }}
              />
            </div>
            <button 
              className="update-btn"
              onClick={() => setSelectedFeature(FEATURES.ANALYSIS)}
            >
              Analyze Resume
            </button>
          </div>

          {/* Project Recommendations Component */}
          <ProjectRecommendations 
            onViewAllClick={() => setSelectedFeature(FEATURES.PROJECTS)}
          />

          <div className="career-break-card">
            <h2 className="card-title">Resume Tips for Career Breaks</h2>
            <p className="card-subtitle">
              Learn how to positively frame career gaps and highlight transferable skills in your resume.
            </p>
            <p className="scholarship-text">Free resource!</p>
            <div className="card-image">
              {/* Career break tips image */}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ResumeAI;
