import React, { useState, useRef, useEffect } from 'react';
import './InterviewReadyAI.css';

// Add jsPDF import
declare const window: any;

function InterviewReadyAI() {
  const [jobTitleForInterview, setJobTitleForInterview] = useState('');
  const [isGeneratingInterview, setIsGeneratingInterview] = useState(false);
  const [interviewQuestions, setInterviewQuestions] = useState(null);
  const questionsRef = useRef(null);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [showInterviewTracker, setShowInterviewTracker] = useState(false);
  const [interviews, setInterviews] = useState([]);
  const [newInterview, setNewInterview] = useState({
    company: '',
    position: '',
    date: '',
    status: 'Scheduled',
    notes: ''
  });
  const [bookSessionModal, setBookSessionModal] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    topic: ''
  });
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [showBodyLanguageTips, setShowBodyLanguageTips] = useState(false);
  const [showSalaryNegotiationGuide, setShowSalaryNegotiationGuide] = useState(false);
  const [showVirtualInterviewTips, setShowVirtualInterviewTips] = useState(false);

  const handleGenerateInterviewQuestions = async () => {
    if (!jobTitleForInterview.trim()) {
      alert('Please enter a job title.');
      return;
    }

    setIsGeneratingInterview(true);

    try {
      // For demo purposes, we'll use mock data instead of making an actual API call
      // In a real application, this would be an API call to your backend
      setTimeout(() => {
        const mockInterviewQuestions = {
          roleSpecific: [
            {
              question: "What experience do you have with relevant technologies for this position?",
              answer: "When answering this question, highlight your experience with the specific technologies mentioned in the job description. Provide concrete examples of projects where you've used these technologies and the outcomes you achieved. If you lack experience with a particular technology, acknowledge this and emphasize your ability to learn quickly and adapt."
            },
            {
              question: "How do you stay updated with the latest developments in your field?",
              answer: "Mention specific resources like professional journals, online courses, webinars, industry conferences, and relevant communities or forums you participate in. Emphasize your commitment to continuous learning and provide examples of how you've applied newly acquired knowledge to improve your work."
            },
            {
              question: "Can you describe a challenging project you worked on and how you approached it?",
              answer: "Structure your answer using the STAR method (Situation, Task, Action, Result). Clearly define the challenge, explain your specific responsibilities, detail the actions you took to address the challenge, and quantify the positive results where possible. Focus on demonstrating problem-solving skills, initiative, and your ability to overcome obstacles."
            }
          ],
          behavioral: [
            {
              question: "Tell me about a time when you had to adapt to a significant change at work.",
              answer: "Describe a specific situation where you faced a major change (new technology, reorganization, shift in priorities). Explain your initial reaction and then focus on the steps you took to adapt. Highlight your flexibility, positive attitude, and willingness to learn. Conclude with the positive outcomes that resulted from your adaptation."
            },
            {
              question: "How do you handle conflicting priorities or deadlines?",
              answer: "Outline your approach to prioritization (urgency/importance matrix, project impact, etc.). Provide a specific example where you successfully managed multiple deadlines. Emphasize communication with stakeholders, realistic expectation setting, and your ability to remain calm under pressure. Conclude with how you successfully delivered results despite the constraints."
            },
            {
              question: "Describe a situation where you had to collaborate with a difficult team member.",
              answer: "Choose an example that demonstrates your interpersonal skills and emotional intelligence. Focus on the actions you took to improve the working relationship rather than criticizing the other person. Highlight your communication strategies, empathy, compromise when appropriate, and focus on shared goals. Conclude with the positive resolution and what you learned from the experience."
            }
          ],
          technical: [
            {
              question: "How would you approach troubleshooting a complex technical issue?",
              answer: "Outline a systematic approach: defining the problem clearly, gathering information through logs/monitoring tools, identifying potential causes, testing hypotheses methodically, implementing solutions, and verifying results. Emphasize the importance of documentation, communication with stakeholders, and learning from the troubleshooting process. If possible, provide a specific example where you successfully resolved a complex issue."
            },
            {
              question: "How do you ensure the quality and reliability of your work?",
              answer: "Discuss your quality assurance practices such as thorough testing, code reviews, documentation, and following industry standards and best practices. Mention specific tools or methodologies you use. Emphasize your attention to detail, proactive approach to identifying potential issues, and commitment to producing high-quality deliverables consistently."
            },
            {
              question: "What steps do you take when learning a new technology or tool?",
              answer: "Describe your learning methodology: starting with fundamentals, using official documentation, following tutorials, building small practice projects, joining communities for support, and gradually taking on more complex challenges. Emphasize your self-motivation, resourcefulness, and systematic approach to skill acquisition. Provide a recent example of a technology you learned and how you applied it successfully."
            }
          ],
          suggested: [
            {
              question: "Where do you see yourself professionally in five years?",
              answer: "Align your answer with realistic career progression in your field while showing ambition and enthusiasm. Discuss skills you want to develop, responsibilities you'd like to take on, and contributions you hope to make. Connect your goals to the position and company you're interviewing with, showing how this role fits into your longer-term career plan. Demonstrate commitment to growth while remaining flexible and realistic."
            },
            {
              question: "Why are you interested in working for our company specifically?",
              answer: "Show you've researched the company by mentioning specific aspects of their mission, values, products/services, culture, or recent achievements that resonate with you. Connect these elements to your personal motivations and career goals. Demonstrate genuine enthusiasm and explain how you believe you can contribute to the company's success based on your understanding of their needs and direction."
            },
            {
              question: "What unique value would you bring to our team?",
              answer: "Highlight your combination of technical skills, personal qualities, and unique experiences that make you a strong candidate. Connect your abilities directly to the requirements of the role and the company's needs. Provide specific examples of past achievements that demonstrate these strengths in action. Focus on what distinguishes you from other candidates with similar qualifications."
            }
          ]
        };
        
        setInterviewQuestions(mockInterviewQuestions);
        
        // Scroll to the questions section
        if (questionsRef.current) {
          questionsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        
        setIsGeneratingInterview(false);
      }, 1500); // Simulate API delay of 1.5 seconds
      
    } catch (error) {
      console.error(error);
      alert('An error occurred while generating interview questions.');
      setIsGeneratingInterview(false);
    }
  };

  // Toggle question expansion
  const toggleQuestionExpansion = (category, index) => {
    const key = `${category}-${index}`;
    setExpandedQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Interview Tracker handlers
  const handleOpenInterviewTracker = () => {
    setShowInterviewTracker(true);
  };

  const handleCloseInterviewTracker = () => {
    setShowInterviewTracker(false);
  };

  const handleInterviewInputChange = (e) => {
    const { name, value } = e.target;
    setNewInterview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddInterview = () => {
    if (!newInterview.company || !newInterview.position || !newInterview.date) {
      alert('Please fill in all required fields (Company, Position, and Date)');
      return;
    }

    setInterviews(prev => [...prev, { ...newInterview }]);
    setNewInterview({
      company: '',
      position: '',
      date: '',
      status: 'Scheduled',
      notes: ''
    });
  };

  const handleUpdateInterviewStatus = (index, status) => {
    setInterviews(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], status };
      return updated;
    });
  };

  const handleDeleteInterview = (index) => {
    if (window.confirm('Are you sure you want to delete this interview record?')) {
      setInterviews(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Book Session handlers
  const handleBookSession = () => {
    setBookSessionModal(true);
  };

  const handleCloseBookSession = () => {
    setBookSessionModal(false);
  };

  const handleSubmitBooking = () => {
    if (!bookingFormData.name || !bookingFormData.email || !bookingFormData.date || 
        !bookingFormData.time || !bookingFormData.topic) {
      alert('Please fill in all fields');
      return;
    }

    // Close the booking modal and show confirmation
    setBookSessionModal(false);
    setShowBookingConfirmation(true);
  };

  const handleCloseBookingConfirmation = () => {
    setShowBookingConfirmation(false);
    // Reset form data
    setBookingFormData({
      name: '',
      email: '',
      date: '',
      time: '',
      topic: ''
    });
  };

  // Resource modal handlers
  const handleOpenBodyLanguageTips = () => {
    setShowBodyLanguageTips(true);
  };

  const handleOpenSalaryNegotiationGuide = () => {
    setShowSalaryNegotiationGuide(true);
  };

  const handleOpenVirtualInterviewTips = () => {
    setShowVirtualInterviewTips(true);
  };

  const handleCloseResourceModal = () => {
    setShowBodyLanguageTips(false);
    setShowSalaryNegotiationGuide(false);
    setShowVirtualInterviewTips(false);
  };

  // Function to download interview questions as PDF
  const handleDownloadQuestions = () => {
    try {
      // Check if jsPDF is loaded
      if (typeof window.jspdf === 'undefined') {
        // If jsPDF is not available through the CDN, use a fallback approach
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.async = true;
        
        script.onload = () => {
          generatePDF();
        };
        
        document.body.appendChild(script);
      } else {
        generatePDF();
      }
    } catch (error) {
      console.error('Error downloading interview questions:', error);
      alert('Failed to download interview questions. Please try again.');
    }
  };

  // Helper function to generate the PDF
  const generatePDF = () => {
    // Create a new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Set document properties
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 7;
    let y = 20; // Starting y position
    
    // Add title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    const title = `Interview Questions for ${jobTitleForInterview}`;
    doc.text(title, pageWidth / 2, y, { align: 'center' });
    y += lineHeight * 2;
    
    // Function to add text with auto page break
    const addText = (text, fontSize, fontStyle) => {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', fontStyle);
      
      // Split text to fit page width
      const textLines = doc.splitTextToSize(text, pageWidth - 2 * margin);
      
      // Check if we need a new page
      if (y + textLines.length * lineHeight > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      
      // Add text to document
      doc.text(textLines, margin, y);
      y += textLines.length * lineHeight;
    };
    
    // Add section header function
    const addSectionHeader = (text) => {
      // Add some space
      y += lineHeight;
      
      // Check if we need a new page
      if (y + lineHeight * 2 > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(text, margin, y);
      y += lineHeight * 1.5;
    };
    
    // Add Role-specific Questions
    addSectionHeader("ROLE-SPECIFIC QUESTIONS:");
    interviewQuestions.roleSpecific.forEach((item, index) => {
      // Add question number and text
      addText(`${index + 1}. ${item.question}`, 12, 'bold');
      
      // Add answer
      addText(`Answer: ${item.answer}`, 10, 'normal');
      y += lineHeight / 2; // Add a little space
    });
    
    // Add Behavioral Questions
    addSectionHeader("BEHAVIORAL QUESTIONS:");
    interviewQuestions.behavioral.forEach((item, index) => {
      addText(`${index + 1}. ${item.question}`, 12, 'bold');
      addText(`Answer: ${item.answer}`, 10, 'normal');
      y += lineHeight / 2;
    });
    
    // Add Technical Questions
    addSectionHeader("TECHNICAL QUESTIONS:");
    interviewQuestions.technical.forEach((item, index) => {
      addText(`${index + 1}. ${item.question}`, 12, 'bold');
      addText(`Answer: ${item.answer}`, 10, 'normal');
      y += lineHeight / 2;
    });
    
    // Add Suggested Questions
    addSectionHeader("RESUME-BASED QUESTIONS:");
    interviewQuestions.suggested.forEach((item, index) => {
      addText(`${index + 1}. ${item.question}`, 12, 'bold');
      addText(`Answer: ${item.answer}`, 10, 'normal');
      y += lineHeight / 2;
    });
    
    // Add footer with date
    const today = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text(`Generated on ${today} | JobsForHer Interview Ready AI`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
    
    // Save the PDF
    doc.save(`Interview_Questions_${jobTitleForInterview.replace(/\s+/g, '_')}.pdf`);
    
    alert('Interview questions downloaded successfully as PDF!');
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="herkey-logo">JobsForHer</span>
          <span className="turns-ten">empowering women</span>
        </div>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search jobs, skills or career opportunities" 
            className="search-input" 
          />
        </div>
        <button style={{ marginRight: "15px", background: "transparent", border: "none", cursor: "pointer", fontSize: "20px" }}>
          ← Home
        </button>
        <button className="sign-up-btn">Sign Up</button>
      </header>

      <div className="content-container">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <nav className="nav-menu">
            <ul>
              <li className="nav-item" onClick={() => window.location.href = '/resume-ai'} style={{ cursor: 'pointer' }}>
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>📄</span>
                </span>
                <span className="nav-text">Resume AI</span>
              </li>
              <li className="nav-item" onClick={() => window.location.href = '/skillup-ai'} style={{ cursor: 'pointer' }}>
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>📚</span>
                </span>
                <span className="nav-text">SkillUp AI</span>
              </li>
              <li className="nav-item" onClick={() => window.location.href = '/project-ideas-ai'} style={{ cursor: 'pointer' }}>
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>📂</span>
                </span>
                <span className="nav-text">ProjectIdeas AI</span>
              </li>
              <li className="nav-item active">
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>🎯</span>
                </span>
                <span className="nav-text">InterviewReady AI</span>
              </li>
              <li className="nav-item" onClick={() => window.location.href = '/'} style={{ cursor: 'pointer' }}>
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>👥</span>
                </span>
                <span className="nav-text">MentorMatch AI</span>
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

        {/* Main Content */}
        <main className="main-content">
          {/* InterviewReady AI Hero Section */}
          <section className="featured-jobs">
            <h2>Ace Your Next Interview</h2>
            <div className="job-card" style={{ padding: "25px" }}>
              <div className="job-info">
                <h3 className="job-title">Prepare for interviews with personalized questions based on your resume and target role</h3>
                <p style={{ marginBottom: "15px", color: "var(--text-gray)" }}>
                  Our AI analyzes your resume and target job descriptions to create a personalized
                  interview preparation guide with likely questions and suggested answers.
                </p>
              </div>
            </div>
          </section>

          <section className="featured-jobs">
            <h2>How Our Interview Guide Helps</h2>
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
          </section>
          
          <section className="featured-jobs">
            <h2>Generate Interview Questions</h2>
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
          </section>

          {interviewQuestions && (
            <section className="featured-jobs">
              <h2>Your Interview Questions for {jobTitleForInterview}</h2>
              <div 
                ref={questionsRef}
                style={{ 
                  border: "1px solid var(--border-light)",
                  borderRadius: "8px",
                  padding: "20px",
                  background: "white",
                  marginBottom: "20px"
                }}
              >
                <h3 style={{ marginBottom: "15px", fontSize: "18px", color: "#333" }}>Role-specific Questions:</h3>
                <div style={{ marginBottom: "25px" }}>
                  {interviewQuestions.roleSpecific.map((item: any, index: number) => {
                    const isExpanded = expandedQuestions[`roleSpecific-${index}`];
                    return (
                      <div key={index} style={{ 
                        marginBottom: "15px", 
                        padding: "15px", 
                        border: "1px solid #eee", 
                        borderRadius: "8px",
                        background: isExpanded ? "#f9f9f9" : "white"
                      }}>
                        <div 
                          style={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center", 
                            cursor: "pointer" 
                          }}
                          onClick={() => toggleQuestionExpansion("roleSpecific", index)}
                        >
                          <h4 style={{ fontSize: "16px", color: "#333" }}>{item.question}</h4>
                          <span>{isExpanded ? "▲" : "▼"}</span>
                        </div>
                        {isExpanded && (
                          <div style={{ marginTop: "10px", padding: "10px", background: "#f1f1f1", borderRadius: "5px" }}>
                            <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.5" }}>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <h3 style={{ marginBottom: "15px", fontSize: "18px", color: "#333" }}>Behavioral Questions:</h3>
                <div style={{ marginBottom: "25px" }}>
                  {interviewQuestions.behavioral.map((item: any, index: number) => {
                    const isExpanded = expandedQuestions[`behavioral-${index}`];
                    return (
                      <div key={index} style={{ 
                        marginBottom: "15px", 
                        padding: "15px", 
                        border: "1px solid #eee", 
                        borderRadius: "8px",
                        background: isExpanded ? "#f9f9f9" : "white"
                      }}>
                        <div 
                          style={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center", 
                            cursor: "pointer" 
                          }}
                          onClick={() => toggleQuestionExpansion("behavioral", index)}
                        >
                          <h4 style={{ fontSize: "16px", color: "#333" }}>{item.question}</h4>
                          <span>{isExpanded ? "▲" : "▼"}</span>
                        </div>
                        {isExpanded && (
                          <div style={{ marginTop: "10px", padding: "10px", background: "#f1f1f1", borderRadius: "5px" }}>
                            <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.5" }}>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <h3 style={{ marginBottom: "15px", fontSize: "18px", color: "#333" }}>Technical Questions:</h3>
                <div style={{ marginBottom: "25px" }}>
                  {interviewQuestions.technical.map((item: any, index: number) => {
                    const isExpanded = expandedQuestions[`technical-${index}`];
                    return (
                      <div key={index} style={{ 
                        marginBottom: "15px", 
                        padding: "15px", 
                        border: "1px solid #eee", 
                        borderRadius: "8px",
                        background: isExpanded ? "#f9f9f9" : "white"
                      }}>
                        <div 
                          style={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center", 
                            cursor: "pointer" 
                          }}
                          onClick={() => toggleQuestionExpansion("technical", index)}
                        >
                          <h4 style={{ fontSize: "16px", color: "#333" }}>{item.question}</h4>
                          <span>{isExpanded ? "▲" : "▼"}</span>
                        </div>
                        {isExpanded && (
                          <div style={{ marginTop: "10px", padding: "10px", background: "#f1f1f1", borderRadius: "5px" }}>
                            <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.5" }}>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <h3 style={{ marginBottom: "15px", fontSize: "18px", color: "#333" }}>Resume-Based Questions:</h3>
                <div style={{ marginBottom: "25px" }}>
                  {interviewQuestions.suggested.map((item: any, index: number) => {
                    const isExpanded = expandedQuestions[`suggested-${index}`];
                    return (
                      <div key={index} style={{ 
                        marginBottom: "15px", 
                        padding: "15px", 
                        border: "1px solid #eee", 
                        borderRadius: "8px",
                        background: isExpanded ? "#f9f9f9" : "white"
                      }}>
                        <div 
                          style={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center", 
                            cursor: "pointer" 
                          }}
                          onClick={() => toggleQuestionExpansion("suggested", index)}
                        >
                          <h4 style={{ fontSize: "16px", color: "#333" }}>{item.question}</h4>
                          <span>{isExpanded ? "▲" : "▼"}</span>
                        </div>
                        {isExpanded && (
                          <div style={{ marginTop: "10px", padding: "10px", background: "#f1f1f1", borderRadius: "5px" }}>
                            <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.5" }}>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <button 
                className="update-btn" 
                onClick={handleDownloadQuestions}
              >
                Download Interview Questions
              </button>
            </section>
          )}

          {/* Interview Preparation Tips */}
          <section className="featured-jobs">
            <h2>Interview Preparation Tips</h2>
            <div className="job-card" style={{ padding: "20px" }}>
              <div style={{ marginBottom: "15px" }}>
                <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>1. Research the Company</h3>
                <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                  Understand the company's mission, values, products/services, and recent news to demonstrate genuine interest.
                </p>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>2. Practice Your Responses</h3>
                <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                  Rehearse answers to common questions using the STAR method (Situation, Task, Action, Result) for behavioral questions.
                </p>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>3. Prepare Thoughtful Questions</h3>
                <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                  Have 3-5 insightful questions ready to ask the interviewer about the role, team, and company.
                </p>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>4. Plan Your First Impression</h3>
                <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                  Dress appropriately, arrive early (or log in early for virtual interviews), and prepare a concise professional introduction.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>5. Follow Up Afterward</h3>
                <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                  Send a thank-you email within 24 hours expressing appreciation and reiterating your interest in the position.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <div className="profile-card">
            <h2 className="profile-title">Interview Success Rate</h2>
            <div className="profile-image" style={{ 
              display: "flex", 
              flexDirection: "column",
              alignItems: "center", 
              justifyContent: "center", 
              fontSize: "18px",
              color: "var(--text-gray)",
              height: "150px"
            }}>
              <div style={{ fontSize: "48px", color: "var(--primary)", fontWeight: "bold", marginBottom: "10px" }}>
                85%
              </div>
              <p style={{ fontSize: "14px" }}>of our users report interview success</p>
            </div>
            <button className="update-btn" onClick={handleOpenInterviewTracker}>Track Your Interviews</button>
          </div>

          <div className="career-break-card">
            <h2 className="card-title">Mock Interview Sessions</h2>
            <p className="card-subtitle">
              Practice with our AI-powered mock interviewer and get real-time feedback on your responses.
            </p>
            <p className="scholarship-text">First session free!</p>
            <button className="update-btn" style={{ width: "100%", marginTop: "15px" }} onClick={handleBookSession}>Book a Session</button>
          </div>
          
          <div className="career-break-card" style={{ marginTop: "20px" }}>
            <h2 className="card-title">Interview Resources</h2>
            <p className="card-subtitle">
              Access additional resources to help you prepare for your interviews
            </p>
            <div style={{ marginTop: "15px" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }} onClick={handleOpenBodyLanguageTips}>
                <span style={{ marginRight: "10px", color: "var(--primary)" }}>→</span>
                <span>Body Language Tips</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }} onClick={handleOpenSalaryNegotiationGuide}>
                <span style={{ marginRight: "10px", color: "var(--primary)" }}>→</span>
                <span>Salary Negotiation Guide</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }} onClick={handleOpenVirtualInterviewTips}>
                <span style={{ marginRight: "10px", color: "var(--primary)" }}>→</span>
                <span>Virtual Interview Best Practices</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Interview Tracker Modal */}
      {showInterviewTracker && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            width: "90%",
            maxWidth: "800px",
            maxHeight: "90vh",
            overflow: "auto",
            padding: "25px",
            position: "relative"
          }}>
            <button
              onClick={handleCloseInterviewTracker}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer"
              }}
            >
              ✕
            </button>
            
            <h2 style={{ marginBottom: "20px", color: "var(--primary)" }}>Interview Tracker</h2>
            
            {/* Add New Interview Form */}
            <div style={{ 
              marginBottom: "30px", 
              padding: "20px", 
              backgroundColor: "var(--primary-light)",
              borderRadius: "8px" 
            }}>
              <h3 style={{ marginBottom: "15px", fontSize: "18px" }}>Add New Interview</h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
                    Company*
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={newInterview.company}
                    onChange={handleInterviewInputChange}
                    style={{ 
                      width: "100%", 
                      padding: "10px", 
                      borderRadius: "5px",
                      border: "1px solid var(--border-light)"
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
                    Position*
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={newInterview.position}
                    onChange={handleInterviewInputChange}
                    style={{ 
                      width: "100%", 
                      padding: "10px", 
                      borderRadius: "5px",
                      border: "1px solid var(--border-light)"
                    }}
                  />
                </div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
                    Date*
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={newInterview.date}
                    onChange={handleInterviewInputChange}
                    style={{ 
                      width: "100%", 
                      padding: "10px", 
                      borderRadius: "5px",
                      border: "1px solid var(--border-light)"
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={newInterview.status}
                    onChange={handleInterviewInputChange}
                    style={{ 
                      width: "100%", 
                      padding: "10px", 
                      borderRadius: "5px",
                      border: "1px solid var(--border-light)"
                    }}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Offer Received">Offer Received</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
              
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={newInterview.notes}
                  onChange={handleInterviewInputChange}
                  style={{ 
                    width: "100%", 
                    padding: "10px", 
                    borderRadius: "5px",
                    border: "1px solid var(--border-light)",
                    minHeight: "80px"
                  }}
                  placeholder="Add any notes about the interview, questions asked, or follow-up tasks..."
                />
              </div>
              
              <button 
                onClick={handleAddInterview}
                style={{
                  backgroundColor: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontSize: "16px"
                }}
              >
                Add Interview
              </button>
            </div>
            
            {/* Interviews List */}
            <h3 style={{ marginBottom: "15px", fontSize: "18px" }}>Your Interviews</h3>
            
            {interviews.length === 0 ? (
              <p>No interviews tracked yet. Add your first interview above.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f5f5f5" }}>
                      <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Company</th>
                      <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Position</th>
                      <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Date</th>
                      <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Status</th>
                      <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interviews.map((interview, index) => (
                      <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={{ padding: "10px" }}>{interview.company}</td>
                        <td style={{ padding: "10px" }}>{interview.position}</td>
                        <td style={{ padding: "10px" }}>{new Date(interview.date).toLocaleDateString()}</td>
                        <td style={{ padding: "10px" }}>
                          <select
                            value={interview.status}
                            onChange={(e) => handleUpdateInterviewStatus(index, e.target.value)}
                            style={{ 
                              padding: "5px", 
                              borderRadius: "5px",
                              border: "1px solid var(--border-light)"
                            }}
                          >
                            <option value="Scheduled">Scheduled</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Offer Received">Offer Received</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                        <td style={{ padding: "10px" }}>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <button
                              onClick={() => {
                                // Show notes in an alert for simplicity
                                alert(`Notes for ${interview.company} interview:\n\n${interview.notes || "No notes available"}`);
                              }}
                              style={{
                                backgroundColor: "#f0f0f0",
                                border: "none",
                                borderRadius: "5px",
                                padding: "5px 10px",
                                cursor: "pointer"
                              }}
                            >
                              View Notes
                            </button>
                            <button
                              onClick={() => handleDeleteInterview(index)}
                              style={{
                                backgroundColor: "#ffebee",
                                color: "#d32f2f",
                                border: "none",
                                borderRadius: "5px",
                                padding: "5px 10px",
                                cursor: "pointer"
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Book a Session Modal */}
      {bookSessionModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            width: "90%",
            maxWidth: "500px",
            padding: "25px",
            position: "relative"
          }}>
            <button
              onClick={handleCloseBookSession}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer"
              }}
            >
              ✕
            </button>
            
            <h2 style={{ marginBottom: "20px", color: "var(--primary)" }}>Book a Session</h2>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmitBooking();
            }}>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="name" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Name</label>
                <input
                  type="text"
                  id="name"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ddd"
                  }}
                  value={bookingFormData.name}
                  onChange={(e) => setBookingFormData({...bookingFormData, name: e.target.value})}
                  required
                />
              </div>
              
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="email" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email</label>
                <input
                  type="email"
                  id="email"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ddd"
                  }}
                  value={bookingFormData.email}
                  onChange={(e) => setBookingFormData({...bookingFormData, email: e.target.value})}
                  required
                />
              </div>
              
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="date" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Date</label>
                <input
                  type="date"
                  id="date"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ddd"
                  }}
                  value={bookingFormData.date}
                  onChange={(e) => setBookingFormData({...bookingFormData, date: e.target.value})}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="time" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Time</label>
                <select
                  id="time"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ddd"
                  }}
                  value={bookingFormData.time}
                  onChange={(e) => setBookingFormData({...bookingFormData, time: e.target.value})}
                  required
                >
                  <option value="">Select a time</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                </select>
              </div>
              
              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="topic" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Session Topic</label>
                <select
                  id="topic"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ddd"
                  }}
                  value={bookingFormData.topic}
                  onChange={(e) => setBookingFormData({...bookingFormData, topic: e.target.value})}
                  required
                >
                  <option value="">Select a topic</option>
                  <option value="Mock Interview">Mock Interview</option>
                  <option value="Resume Review">Resume Review</option>
                  <option value="Career Guidance">Career Guidance</option>
                  <option value="Technical Preparation">Technical Preparation</option>
                  <option value="Behavioral Interview Prep">Behavioral Interview Prep</option>
                </select>
              </div>
              
              <button
                type="submit"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "12px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  width: "100%"
                }}
              >
                Schedule Session
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Booking Confirmation Modal */}
      {showBookingConfirmation && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            width: "90%",
            maxWidth: "500px",
            padding: "25px",
            position: "relative",
            textAlign: "center"
          }}>
            <h2 style={{ marginBottom: "15px", color: "var(--primary)" }}>Booking Confirmed!</h2>
            <p style={{ marginBottom: "20px", fontSize: "16px" }}>
              Your session has been booked successfully. We've sent a confirmation email to {bookingFormData.email} with all the details.
            </p>
            <p style={{ marginBottom: "30px", fontSize: "15px" }}>
              <strong>Date:</strong> {bookingFormData.date}<br />
              <strong>Time:</strong> {bookingFormData.time}<br />
              <strong>Topic:</strong> {bookingFormData.topic}
            </p>
            <button
              onClick={handleCloseBookingConfirmation}
              style={{
                backgroundColor: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Resource Modals */}
      {/* Body Language Tips Modal */}
      {showBodyLanguageTips && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            width: "90%",
            maxWidth: "700px",
            maxHeight: "90vh",
            overflow: "auto",
            padding: "25px",
            position: "relative"
          }}>
            <button
              onClick={handleCloseResourceModal}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer"
              }}
            >
              ✕
            </button>
            
            <h2 style={{ marginBottom: "20px", color: "var(--primary)" }}>Body Language Tips for Interviews</h2>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>1. Maintain Good Posture</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Sit up straight with shoulders back but relaxed. Good posture conveys confidence and attentiveness.
                Avoid slouching or leaning too far back, which can signal disinterest or overconfidence.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>2. Practice Effective Eye Contact</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Maintain natural eye contact with your interviewer(s), looking at them for 5-7 seconds at a time before briefly looking away.
                In panel interviews, make eye contact with the person asking the question, but also glance at other panel members while answering.
                For virtual interviews, look at your camera (not the screen) to create the impression of eye contact.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>3. Monitor Your Hand Gestures</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Use natural, open hand gestures to emphasize points and show engagement.
                Keep gestures contained within your personal space—wild movements can be distracting.
                Avoid nervous habits like pen-clicking, hair-twirling, or excessive fidgeting.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>4. Present an Engaged Expression</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Display a pleasant, attentive facial expression with occasional smiles.
                Nod occasionally to show you're listening and understanding.
                Be mindful of unconscious facial expressions that might convey confusion or disagreement.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>5. Control Your Nervous Energy</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Practice deep, slow breathing before and during the interview to remain calm.
                Plant both feet on the floor to ground yourself and reduce leg-shaking.
                Channel nervous energy into focused enthusiasm rather than random movements.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>6. Prepare Your Materials</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Have a copy of your resume, the job description, and prepared notes within reach.
                Keep a notepad and pen handy for taking notes during the interview.
                Have a glass of water nearby in case your throat gets dry.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>7. Practice Virtual Interview Etiquette</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Join the meeting 5-10 minutes early to address any last-minute technical issues.
                Mute yourself when not speaking if there's any background noise.
                Speak clearly and slightly slower than normal, pausing occasionally to account for possible audio delays.
                If experiencing technical difficulties, stay calm and communicate the issue professionally.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Salary Negotiation Guide Modal */}
      {showSalaryNegotiationGuide && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            width: "90%",
            maxWidth: "700px",
            maxHeight: "90vh",
            overflow: "auto",
            padding: "25px",
            position: "relative"
          }}>
            <button
              onClick={handleCloseResourceModal}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer"
              }}
            >
              ✕
            </button>
            
            <h2 style={{ marginBottom: "20px", color: "var(--primary)" }}>Salary Negotiation Guide</h2>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>1. Do Your Research</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Research salary ranges for your position, industry, and location using websites like Glassdoor, LinkedIn Salary, and PayScale.
                Understand the company's compensation structure and benefits package if possible.
                Know your market value based on your skills, experience, and qualifications.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Timing is Everything</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Wait until you have a formal job offer before discussing compensation.
                If asked about salary expectations earlier, try to postpone the conversation or provide a range based on your research.
                Negotiate when you have the most leverage—after they've decided they want you but before you've accepted.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Consider the Total Package</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Look beyond the base salary to evaluate the entire compensation package, including:
                Benefits (health insurance, retirement plans, etc.)
                Paid time off and flexible work arrangements
                Professional development opportunities
                Stock options or equity
                Bonuses and performance incentives
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Use the Right Language</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Frame your negotiation in collaborative rather than confrontational terms.
                Use phrases like "I'm excited about this opportunity and want to make it work" or "Based on my research and the value I can bring..."
                Express appreciation for the offer before moving into negotiation.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Practice Your Pitch</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Rehearse your negotiation talking points with a friend or mentor.
                Prepare concrete examples of your accomplishments and how they translate to value for the company.
                Anticipate potential objections and plan your responses.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Be Willing to Walk Away</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Know your bottom line—the minimum offer you're willing to accept.
                Be prepared to respectfully decline if the final offer doesn't meet your needs.
                Keep your job search active until you've signed a contract you're satisfied with.
              </p>
            </div>
            
            <div>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Get It In Writing</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Once you've reached an agreement, request a written offer that includes all the details you've negotiated.
                Review the document carefully before signing.
                Follow up with a thank-you note expressing your appreciation for the negotiation process.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Virtual Interview Tips Modal */}
      {showVirtualInterviewTips && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            width: "90%",
            maxWidth: "700px",
            maxHeight: "90vh",
            overflow: "auto",
            padding: "25px",
            position: "relative"
          }}>
            <button
              onClick={handleCloseResourceModal}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer"
              }}
            >
              ✕
            </button>
            
            <h2 style={{ marginBottom: "20px", color: "var(--primary)" }}>Virtual Interview Best Practices</h2>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>1. Test Your Technology</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Check your internet connection, camera, and microphone at least a day before the interview.
                Download and test the required video conferencing software.
                Have a backup plan (like a phone number to call) in case of technical difficulties.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>2. Set Up Your Environment</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Choose a quiet location with minimal background noise and distractions.
                Ensure good lighting that illuminates your face evenly (avoid backlight from windows).
                Set up a neutral, professional background or use a simple virtual background if needed.
                Position your camera at eye level and at a distance that frames your head and shoulders.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>3. Dress Professionally</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Dress completely as you would for an in-person interview, even below camera view.
                Avoid bright patterns or colors that may be distracting on camera.
                Consider how your clothing appears against your background.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>4. Master Virtual Communication</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Look directly at the camera when speaking to create the impression of eye contact.
                Speak clearly and slightly slower than in normal conversation.
                Avoid interrupting others—virtual conversations often have slight delays.
                Use appropriate hand gestures and posture to appear engaged.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>5. Prepare Your Materials</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Have your resume, the job description, and prepared notes nearby but out of camera view.
                Keep a glass of water within reach.
                Close unnecessary applications and browser tabs to avoid distractions.
                Prepare digital copies of any materials you might need to share.
              </p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>6. Minimize Distractions</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Turn off phone notifications and alarms.
                Inform household members about your interview to avoid interruptions.
                Keep pets in another room if possible.
                Close windows to reduce outside noise.
              </p>
            </div>
            
            <div>
              <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>7. Follow Up Effectively</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
                Send a thank-you email within 24 hours of your interview.
                Reference specific points from your conversation to personalizeyour message.
                Express continued interest in the position and company.
                Inquire about next steps in the hiring process if they weren't mentioned during the interview.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterviewReadyAI;