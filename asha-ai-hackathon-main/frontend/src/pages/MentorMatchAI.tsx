import React, { useState, useRef } from 'react';
import { mentorsData } from '../data/jobsData';
import { useNavigate } from 'react-router-dom';
import './MentorMatchAIStyles.css';

export default function MentorMatchAI() {
  // State for mentor functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null);
  const [showMentorRequest, setShowMentorRequest] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [bookmarkedMentors, setBookmarkedMentors] = useState<number[]>([]);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [message, setMessage] = useState('');
  const requestFormRef = useRef<HTMLDivElement>(null);
  
  // Add states for the "Get Matched" functionality
  const [showMatchForm, setShowMatchForm] = useState(false);
  const [matchPreferences, setMatchPreferences] = useState({
    careerStage: '',
    industry: '',
    goals: '',
    challenges: '',
    preferredMentorStyle: 'Directive'
  });
  const [isMatching, setIsMatching] = useState(false);
  const [matchResults, setMatchResults] = useState<any[]>([]);
  const matchFormRef = useRef<HTMLDivElement>(null);

  // Add states for the "Become a Mentor" functionality
  const [showMentorApplicationForm, setShowMentorApplicationForm] = useState(false);
  const [mentorApplication, setMentorApplication] = useState({
    fullName: '',
    email: '',
    currentRole: '',
    company: '',
    yearsOfExperience: '',
    expertise: [] as string[],
    motivation: '',
    availability: '',
    linkedinProfile: ''
  });
  const [otherExpertise, setOtherExpertise] = useState('');
  const [isSubmittingApplication, setIsSubmittingApplication] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const mentorApplicationRef = useRef<HTMLDivElement>(null);

  // Add state for event details modal
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{
    title: string;
    date: string;
    location: string;
    description: string;
    speakers?: string[];
    registerUrl?: string;
  } | null>(null);

  // Add a navigation handler
  const navigate = useNavigate();
  
  const navigateToHome = () => {
    navigate('/');
  };
  
  // Navigate to specific pages using React Router
  const navigateTo = (path: string) => {
    navigate(path);
  };

  // Handle event click
  const handleEventClick = (title: string, date: string, location: string) => {
    setSelectedEvent({
      title,
      date,
      location,
      description: getEventDescription(title),
      speakers: getEventSpeakers(title),
      registerUrl: "#register"
    });
    setShowEventDetails(true);
  };
  
  // Get event description based on title
  const getEventDescription = (title: string) => {
    switch(title) {
      case "Women in Tech Panel Discussion":
        return "Join industry leaders for an inspiring discussion on navigating the tech industry as a woman. Our panelists will share their experiences, challenges they've overcome, and strategies for success in tech careers.";
      case "Group Mentoring: Career Transitions":
        return "This group mentoring session focuses on successfully navigating career transitions. Learn from mentors who have made significant career shifts and connect with others on similar journeys.";
      case "Leadership Skills Workshop":
        return "An in-person workshop focused on developing essential leadership skills for women in the workplace. Topics include effective communication, building confidence, and leading diverse teams.";
      default:
        return "Join us for this exciting event to expand your network and advance your career.";
    }
  };
  
  // Get event speakers based on title
  const getEventSpeakers = (title: string) => {
    switch(title) {
      case "Women in Tech Panel Discussion":
        return ["Priya Sharma - CTO, TechInnovate", "Meera Patel - Engineering Director, GlobalSoft", "Deepa Menon - Founder, CodeHers"];
      case "Group Mentoring: Career Transitions":
        return ["Anjali Kapoor - Career Coach", "Shalini Reddy - HR Director"];
      case "Leadership Skills Workshop":
        return ["Dr. Lakshmi Nair - Leadership Consultant", "Trisha Gupta - Executive Coach"];
      default:
        return [];
    }
  };

  // Filter mentors based on search and expertise
  const filteredMentors = mentorsData.filter(mentor => {
    const matchesSearch = searchTerm === '' || 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesExpertise = selectedExpertise === null || 
      mentor.expertise.some(exp => exp.toLowerCase().includes(selectedExpertise.toLowerCase()));

    const showsBookmarked = !showBookmarked || bookmarkedMentors.includes(mentor.id);
    
    return matchesSearch && matchesExpertise && showsBookmarked;
  });

  // Handle bookmark toggling
  const handleToggleBookmark = (mentorId: number) => {
    setBookmarkedMentors(prev => {
      if (prev.includes(mentorId)) {
        return prev.filter(id => id !== mentorId);
      } else {
        return [...prev, mentorId];
      }
    });
  };

  // Handle mentor request
  const handleRequestMentor = (mentor: any) => {
    setSelectedMentor(mentor);
    setShowMentorRequest(true);
    setTimeout(() => {
      requestFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Handle submitting mentor request
  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Request sent to ${selectedMentor.name}! They will contact you soon to schedule your first session.`);
    setShowMentorRequest(false);
    setMessage('');
  };

  // Find my match functionality
  const handleFindMatch = () => {
    setShowMatchForm(true);
    // Scroll to the match form section when opened
    setTimeout(() => {
      matchFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  // Handle input changes for the match preferences form
  const handleMatchInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMatchPreferences({
      ...matchPreferences,
      [name]: value
    });
  };
  
  // Handle submitting the match preferences form
  const handleSubmitMatchPreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMatching(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      // Mock matching algorithm - in a real app, this would be an API call to a backend
      // that analyzes the user's preferences and returns personalized mentor matches
      const matchedMentors = mentorsData
        .filter(mentor => {
          // Simple matching logic based on industry or expertise
          return mentor.expertise.some(exp => 
            exp.toLowerCase().includes(matchPreferences.industry.toLowerCase()) ||
            matchPreferences.goals.toLowerCase().includes(exp.toLowerCase())
          );
        })
        .sort(() => 0.5 - Math.random()) // Shuffle the results
        .slice(0, 3); // Get top 3 matches
      
      setMatchResults(matchedMentors);
      setIsMatching(false);
    }, 2000);
  };
  
  // Become a mentor functionality
  const handleBecomeMentor = () => {
    setShowMentorApplicationForm(true);
    // Scroll to the application form when opened
    setTimeout(() => {
      mentorApplicationRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  // Handle input changes for the mentor application form
  const handleApplicationInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMentorApplication({
      ...mentorApplication,
      [name]: value
    });
  };
  
  // Handle expertise selection in the mentor application form
  const handleExpertiseChange = (expertise: string) => {
    setMentorApplication(prev => {
      const updatedExpertise = prev.expertise.includes(expertise)
        ? prev.expertise.filter(item => item !== expertise)
        : [...prev.expertise, expertise];
      
      return {
        ...prev,
        expertise: updatedExpertise
      };
    });
  };
  
  // Handle adding other expertise in the mentor application form
  const handleAddOtherExpertise = () => {
    if (otherExpertise.trim()) {
      setMentorApplication(prev => ({
        ...prev,
        expertise: [...prev.expertise, otherExpertise.trim()]
      }));
      setOtherExpertise('');
    }
  };
  
  // Handle submitting the mentor application form
  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingApplication(true);
    
    // Simulate form submission delay
    setTimeout(() => {
      setIsSubmittingApplication(false);
      setApplicationSubmitted(true);
    }, 1500);
  };

  return (
  <div className="mentor-match-container">
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
        <button onClick={navigateToHome} style={{ marginRight: "15px", background: "transparent", border: "none", cursor: "pointer", fontSize: "20px" }}>
          ← Home
        </button>
        <button className="sign-up-btn">Sign Up</button>
      </header>

      <div className="content-container">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <nav className="nav-menu">
            <ul>
              <li className="nav-item" onClick={() => navigateTo('/resume-ai')} style={{ cursor: 'pointer' }}>
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>📄</span>
                </span>
                <span className="nav-text">Resume AI</span>
              </li>
              <li className="nav-item" onClick={() => navigateTo('/skillup-ai')} style={{ cursor: 'pointer' }}>
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>📚</span>
                </span>
                <span className="nav-text">SkillUp AI</span>
              </li>
              <li className="nav-item" onClick={() => navigateTo('/project-ideas-ai')} style={{ cursor: 'pointer' }}>
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>📂</span>
                </span>
                <span className="nav-text">ProjectIdeas AI</span>
              </li>
              <li className="nav-item" onClick={() => navigateTo('/interview-ready-ai')} style={{ cursor: 'pointer' }}>
                <span className="nav-icon">
                  <span style={{ fontSize: "22px" }}>🎯</span>
                </span>
                <span className="nav-text">InterviewReady AI</span>
              </li>
              <li className="nav-item active">
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
          {/* MentorMatch AI Hero Section */}
          <section className="featured-jobs">
            <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
              <button 
                onClick={navigateToHome} 
                style={{ 
                  background: "none", 
                  border: "none", 
                  cursor: "pointer", 
                  fontSize: "24px", 
                  marginRight: "10px",
                  color: "var(--primary)"
                }}
              >
                ←
              </button>
              <h2>Find Your Perfect Mentor</h2>
            </div>
            <div className="job-card" style={{ padding: "25px" }}>
              <div className="job-info">
                <h3 className="job-title">Connect with experienced women leaders in your field</h3>
                <p style={{ marginBottom: "15px", color: "var(--text-gray)" }}>
                  Our AI-powered matching system connects you with mentors who have the specific expertise 
                  you need and understand the unique challenges women face in their careers.
                </p>
                
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" }}>
                  <span className="newly-added" style={{ background: "var(--light-purple)" }}>1:1 Mentorship</span>
                  <span className="newly-added" style={{ background: "var(--primary-light)" }}>Career Guidance</span>
                  <span className="newly-added" style={{ background: "#e8f5e9" }}>Leadership Skills</span>
                  <span className="newly-added" style={{ background: "#fff3e0" }}>Industry Insights</span>
                </div>
              </div>
            </div>
          </section>

          {/* Mentor Search Section */}
          <section className="featured-jobs">
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginBottom: "15px" 
            }}>
              <h2>Browse Mentors</h2>
              <div>
                <button 
                  className={`update-btn ${!showBookmarked ? 'active' : ''}`} 
                  style={{ 
                    marginRight: "10px", 
                    background: !showBookmarked ? "var(--primary)" : "transparent",
                    color: !showBookmarked ? "white" : "var(--primary)",
                    border: !showBookmarked ? "none" : "1px solid var(--primary)"
                  }}
                  onClick={() => setShowBookmarked(false)}
                >
                  All Mentors
                </button>
                <button 
                  className={`update-btn ${showBookmarked ? 'active' : ''}`}
                  style={{ 
                    background: showBookmarked ? "var(--primary)" : "transparent",
                    color: showBookmarked ? "white" : "var(--primary)",
                    border: showBookmarked ? "none" : "1px solid var(--primary)"
                  }}
                  onClick={() => setShowBookmarked(true)}
                >
                  My Mentors ({bookmarkedMentors.length})
                </button>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <input 
                type="text"
                placeholder="Search mentors by name, role, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  width: "100%", 
                  padding: "12px 15px", 
                  borderRadius: "8px",
                  border: "1px solid var(--border-light)",
                  fontSize: "15px"
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>Filter by Expertise:</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <span 
                  className={`newly-added ${selectedExpertise === 'Leadership' ? 'active' : ''}`} 
                  style={{ 
                    background: selectedExpertise === 'Leadership' ? "var(--primary)" : "var(--light-purple)",
                    color: selectedExpertise === 'Leadership' ? "white" : "inherit",
                    cursor: "pointer"
                  }}
                  onClick={() => setSelectedExpertise(selectedExpertise === 'Leadership' ? null : 'Leadership')}
                >
                  Leadership
                </span>
                <span 
                  className={`newly-added ${selectedExpertise === 'Technology' ? 'active' : ''}`} 
                  style={{ 
                    background: selectedExpertise === 'Technology' ? "var(--primary)" : "var(--primary-light)",
                    color: selectedExpertise === 'Technology' ? "white" : "inherit",
                    cursor: "pointer"
                  }}
                  onClick={() => setSelectedExpertise(selectedExpertise === 'Technology' ? null : 'Technology')}
                >
                  Technology
                </span>
                <span 
                  className={`newly-added ${selectedExpertise === 'UX/UI Design' ? 'active' : ''}`} 
                  style={{ 
                    background: selectedExpertise === 'UX/UI Design' ? "var(--primary)" : "#e8f5e9",
                    color: selectedExpertise === 'UX/UI Design' ? "white" : "inherit",
                    cursor: "pointer"
                  }}
                  onClick={() => setSelectedExpertise(selectedExpertise === 'UX/UI Design' ? null : 'UX/UI Design')}
                >
                  UX/UI Design
                </span>
                <span 
                  className={`newly-added ${selectedExpertise === 'Marketing' ? 'active' : ''}`} 
                  style={{ 
                    background: selectedExpertise === 'Marketing' ? "var(--primary)" : "#fff3e0",
                    color: selectedExpertise === 'Marketing' ? "white" : "inherit",
                    cursor: "pointer"
                  }}
                  onClick={() => setSelectedExpertise(selectedExpertise === 'Marketing' ? null : 'Marketing')}
                >
                  Marketing
                </span>
              </div>
            </div>

            {filteredMentors.length === 0 ? (
              <div className="job-card" style={{ padding: "30px", textAlign: "center" }}>
                <p style={{ fontSize: "16px", color: "var(--text-gray)" }}>
                  {showBookmarked ? 
                    "You haven't bookmarked any mentors yet. Browse all mentors to find someone you connect with!" : 
                    "No mentors match your current search criteria. Try adjusting your filters or search term."}
                </p>
              </div>
            ) : (
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
                gap: "20px"
              }}>
                {filteredMentors.map(mentor => (
                  <div 
                    key={mentor.id} 
                    className="job-card" 
                    style={{ 
                      padding: "20px", 
                      display: "flex", 
                      flexDirection: "column",
                      height: "100%"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                      <div style={{ 
                        width: "60px", 
                        height: "60px", 
                        borderRadius: "50%", 
                        background: "#e6e6e6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        color: "#666"
                      }}>
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <button 
                        onClick={() => handleToggleBookmark(mentor.id)}
                        style={{ 
                          background: "transparent", 
                          border: "none", 
                          cursor: "pointer",
                          fontSize: "20px",
                          color: bookmarkedMentors.includes(mentor.id) ? "var(--primary)" : "#ccc"
                        }}
                      >
                        {bookmarkedMentors.includes(mentor.id) ? '★' : '☆'}
                      </button>
                    </div>
                    
                    <h3 style={{ fontSize: "18px", marginBottom: "5px" }}>{mentor.name}</h3>
                    <p style={{ fontSize: "14px", color: "var(--text-gray)", marginBottom: "10px" }}>
                      {mentor.role} at {mentor.company}
                    </p>
                    
                    <div style={{ marginBottom: "15px" }}>
                      <p style={{ fontSize: "14px", color: "#666", marginBottom: "5px" }}>
                        <strong>Experience:</strong> {mentor.experience}
                      </p>
                      <p style={{ fontSize: "14px", color: "#666", marginBottom: "5px" }}>
                        <strong>Availability:</strong> {mentor.availability}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
                        <strong style={{ marginRight: "5px" }}>Rating:</strong>
                        <span style={{ color: "#ff9800", marginRight: "5px" }}>{'★'.repeat(Math.floor(mentor.rating))}</span>
                        <span>{mentor.rating} ({mentor.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "15px" }}>
                      <p style={{ fontSize: "14px", marginBottom: "5px" }}><strong>Expertise:</strong></p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                        {mentor.expertise.map((exp, index) => (
                          <span 
                            key={index}
                            style={{ 
                              fontSize: "12px", 
                              background: "#f1f1f1", 
                              padding: "3px 8px", 
                              borderRadius: "10px", 
                              color: "#666" 
                            }}
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button 
                      className="update-btn" 
                      style={{ 
                        marginTop: "auto", 
                        background: "var(--primary)",
                        width: "100%"
                      }}
                      onClick={() => handleRequestMentor(mentor)}
                    >
                      Request Mentorship
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Mentor Request Form */}
          {showMentorRequest && (
            <section className="featured-jobs" ref={requestFormRef}>
              <h2>Request Mentorship from {selectedMentor.name}</h2>
              <div className="job-card" style={{ padding: "25px" }}>
                <form onSubmit={handleSubmitRequest}>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                      What specific areas would you like guidance on?
                    </label>
                    <select 
                      style={{ 
                        width: "100%", 
                        padding: "10px", 
                        borderRadius: "5px",
                        border: "1px solid var(--border-light)"
                      }}
                      required
                    >
                      <option value="">Select an area of focus</option>
                      {selectedMentor.expertise.map((exp: string, index: number) => (
                        <option key={index} value={exp}>{exp}</option>
                      ))}
                      <option value="Career Transition">Career Transition</option>
                      <option value="Work-Life Balance">Work-Life Balance</option>
                      <option value="Returning to Work">Returning to Work After a Break</option>
                    </select>
                  </div>
                  
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                      Preferred mentorship format
                    </label>
                    <div style={{ display: "flex", gap: "15px" }}>
                      <label style={{ display: "flex", alignItems: "center" }}>
                        <input type="radio" name="format" value="one-on-one" defaultChecked style={{ marginRight: "5px" }} />
                        One-on-One Sessions
                      </label>
                      <label style={{ display: "flex", alignItems: "center" }}>
                        <input type="radio" name="format" value="email" style={{ marginRight: "5px" }} />
                        Email Mentorship
                      </label>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                      Your career stage
                    </label>
                    <select 
                      style={{ 
                        width: "100%", 
                        padding: "10px", 
                        borderRadius: "5px",
                        border: "1px solid var(--border-light)"
                      }}
                      required
                    >
                      <option value="">Select your career stage</option>
                      <option value="Early Career">Early Career (0-3 years)</option>
                      <option value="Mid Career">Mid Career (3-10 years)</option>
                      <option value="Senior">Senior (10+ years)</option>
                      <option value="Returning">Returning After a Career Break</option>
                      <option value="Transitioning">Career Transition</option>
                    </select>
                  </div>
                  
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                      Message to {selectedMentor.name}
                    </label>
                    <textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Introduce yourself and explain why you'd like ${selectedMentor.name} as your mentor...`}
                      style={{ 
                        width: "100%", 
                        padding: "10px", 
                        borderRadius: "5px",
                        border: "1px solid var(--border-light)",
                        minHeight: "120px",
                        resize: "vertical"
                      }}
                      required
                    />
                  </div>
                  
                  <div style={{ display: "flex", gap: "15px" }}>
                    <button 
                      type="button"
                      className="update-btn" 
                      style={{ 
                        background: "transparent", 
                        border: "1px solid var(--border-light)" 
                      }}
                      onClick={() => setShowMentorRequest(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="update-btn" 
                      style={{ 
                        background: "var(--primary)", 
                        flex: 1
                      }}
                    >
                      Send Request
                    </button>
                  </div>
                </form>
              </div>
            </section>
          )}

          {/* Mentor Application Form */}
          {showMentorApplicationForm && (
            <section className="featured-jobs" ref={mentorApplicationRef}>
              <h2>Become a Mentor</h2>
              <div className="job-card" style={{ padding: "25px" }}>
                {!isSubmittingApplication && !applicationSubmitted ? (
                  <form onSubmit={handleSubmitApplication}>
                    <p style={{ marginBottom: "20px", color: "var(--text-gray)" }}>
                      Share your professional experience and expertise to help other women advance in their careers.
                      Complete the form below to join our mentor community.
                    </p>
                    
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                        Full Name *
                      </label>
                      <input 
                        type="text"
                        name="fullName"
                        value={mentorApplication.fullName}
                        onChange={handleApplicationInputChange}
                        style={{ 
                          width: "100%", 
                          padding: "10px", 
                          borderRadius: "5px",
                          border: "1px solid var(--border-light)"
                        }}
                        required
                      />
                    </div>
                    
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                        Email Address *
                      </label>
                      <input 
                        type="email"
                        name="email"
                        value={mentorApplication.email}
                        onChange={handleApplicationInputChange}
                        style={{ 
                          width: "100%", 
                          padding: "10px", 
                          borderRadius: "5px",
                          border: "1px solid var(--border-light)"
                        }}
                        required
                      />
                    </div>
                    
                    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                          Current Role *
                        </label>
                        <input 
                          type="text"
                          name="currentRole"
                          value={mentorApplication.currentRole}
                          onChange={handleApplicationInputChange}
                          style={{ 
                            width: "100%", 
                            padding: "10px", 
                            borderRadius: "5px",
                            border: "1px solid var(--border-light)"
                          }}
                          required
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                          Company/Organization *
                        </label>
                        <input 
                          type="text"
                          name="company"
                          value={mentorApplication.company}
                          onChange={handleApplicationInputChange}
                          style={{ 
                            width: "100%", 
                            padding: "10px", 
                            borderRadius: "5px",
                            border: "1px solid var(--border-light)"
                          }}
                          required
                        />
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                        Years of Professional Experience *
                      </label>
                      <select 
                        name="yearsOfExperience"
                        value={mentorApplication.yearsOfExperience}
                        onChange={handleApplicationInputChange}
                        style={{ 
                          width: "100%", 
                          padding: "10px", 
                          borderRadius: "5px",
                          border: "1px solid var(--border-light)"
                        }}
                        required
                      >
                        <option value="">Select experience</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5-10 years">5-10 years</option>
                        <option value="10-15 years">10-15 years</option>
                        <option value="15+ years">15+ years</option>
                      </select>
                    </div>
                    
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                        Areas of Expertise *
                      </label>
                      <p style={{ fontSize: "14px", color: "var(--text-gray)", marginBottom: "10px" }}>
                        Select all areas where you can provide mentorship:
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" }}>
                        {["Leadership", "Technical Skills", "Career Transitions", "Public Speaking", 
                          "Work-Life Balance", "Negotiation", "Technology", "Marketing", "UX/UI Design", 
                          "Product Management", "Entrepreneurship", "Returning to Work"
                        ].map(expertise => (
                          <span 
                            key={expertise}
                            className="newly-added" 
                            style={{ 
                              background: mentorApplication.expertise.includes(expertise) ? "var(--primary)" : "#f1f1f1",
                              color: mentorApplication.expertise.includes(expertise) ? "white" : "#666",
                              cursor: "pointer",
                              fontSize: "14px",
                              padding: "5px 12px"
                            }}
                            onClick={() => handleExpertiseChange(expertise)}
                          >
                            {expertise}
                          </span>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <input 
                          type="text"
                          value={otherExpertise}
                          onChange={(e) => setOtherExpertise(e.target.value)}
                          placeholder="Other expertise..."
                          style={{ 
                            flex: 1,
                            padding: "10px", 
                            borderRadius: "5px",
                            border: "1px solid var(--border-light)"
                          }}
                        />
                        <button 
                          type="button"
                          onClick={handleAddOtherExpertise}
                          className="update-btn" 
                          style={{ 
                            padding: "0 15px",
                            background: "var(--primary)"
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                        Why do you want to be a mentor? *
                      </label>
                      <textarea 
                        name="motivation"
                        value={mentorApplication.motivation}
                        onChange={handleApplicationInputChange}
                        placeholder="Share your motivation for becoming a mentor and how you hope to make an impact..."
                        style={{ 
                          width: "100%", 
                          padding: "10px", 
                          borderRadius: "5px",
                          border: "1px solid var(--border-light)",
                          minHeight: "100px",
                          resize: "vertical"
                        }}
                        required
                      />
                    </div>
                    
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                        Availability for Mentoring *
                      </label>
                      <select 
                        name="availability"
                        value={mentorApplication.availability}
                        onChange={handleApplicationInputChange}
                        style={{ 
                          width: "100%", 
                          padding: "10px", 
                          borderRadius: "5px",
                          border: "1px solid var(--border-light)"
                        }}
                        required
                      >
                        <option value="">Select availability</option>
                        <option value="1-2 hours/month">1-2 hours per month</option>
                        <option value="3-4 hours/month">3-4 hours per month</option>
                        <option value="5+ hours/month">5+ hours per month</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>
                    
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                        LinkedIn Profile URL
                      </label>
                      <input 
                        type="url"
                        name="linkedinProfile"
                        value={mentorApplication.linkedinProfile}
                        onChange={handleApplicationInputChange}
                        placeholder="https://www.linkedin.com/in/yourprofile"
                        style={{ 
                          width: "100%", 
                          padding: "10px", 
                          borderRadius: "5px",
                          border: "1px solid var(--border-light)"
                        }}
                      />
                    </div>
                    
                    <div style={{ display: "flex", gap: "15px" }}>
                      <button 
                        type="button"
                        className="update-btn" 
                        style={{ 
                          background: "transparent", 
                          border: "1px solid var(--border-light)" 
                        }}
                        onClick={() => setShowMentorApplicationForm(false)}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="update-btn" 
                        style={{ 
                          background: "var(--primary)", 
                          flex: 1
                        }}
                      >
                        Submit Application
                      </button>
                    </div>
                  </form>
                ) : isSubmittingApplication ? (
                  <div style={{ textAlign: "center", padding: "30px 0" }}>
                    <div style={{ fontSize: "36px", marginBottom: "15px" }}>📋</div>
                    <h3 style={{ marginBottom: "10px" }}>Submitting Your Application</h3>
                    <p style={{ color: "var(--text-gray)", marginBottom: "20px" }}>
                      Please wait while we process your mentor application...
                    </p>
                    <div className="progress-bar" style={{ 
                      height: "6px", 
                      width: "100%", 
                      backgroundColor: "#e6e6e6", 
                      borderRadius: "3px",
                      overflow: "hidden",
                      position: "relative"
                    }}>
                      <div className="progress" style={{
                        position: "absolute",
                        height: "100%",
                        width: "30%",
                        backgroundColor: "var(--primary)",
                        borderRadius: "3px",
                        animation: "progressMove 1.5s infinite ease-in-out"
                      }}></div>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: "30px 0" }}>
                    <div style={{ fontSize: "48px", marginBottom: "15px" }}>✅</div>
                    <h3 style={{ marginBottom: "10px" }}>Application Submitted Successfully!</h3>
                    <p style={{ color: "var(--text-gray)", marginBottom: "20px" }}>
                      Thank you for applying to be a mentor! We'll review your application and contact you within 7 business days.
                    </p>
                    <p style={{ fontSize: "14px", marginBottom: "20px" }}>
                      While you wait, you can explore our resources for mentors or browse other mentors to see how they structure their profiles.
                    </p>
                    <button 
                      className="update-btn" 
                      style={{ 
                        background: "var(--primary)", 
                        padding: "10px 20px"
                      }}
                      onClick={() => {
                        setShowMentorApplicationForm(false);
                        setApplicationSubmitted(false);
                      }}
                    >
                      Back to MentorMatch
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* How It Works Section */}
          <section className="featured-jobs">
            <h2>How MentorMatch Works</h2>
            <div className="work-mode-options" style={{ marginTop: "15px", marginBottom: "20px" }}>
              <div className="mode-card">
                <span className="mode-icon"></span>
                <span className="mode-text">1. Browse profiles and find your perfect mentor match</span>
              </div>
              <div className="mode-card">
                <span className="mode-icon"></span>
                <span className="mode-text">2. Send a personalized request explaining your goals</span>
              </div>
              <div className="mode-card">
                <span className="mode-icon"></span>
                <span className="mode-text">3. Schedule your first session and begin your journey</span>
              </div>
              <div className="mode-card">
                <span className="mode-icon"></span>
                <span className="mode-text">4. Build a meaningful long-term mentoring relationship</span>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="featured-jobs">
            <h2>Success Stories</h2>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
              gap: "20px",
              marginTop: "15px"
            }}>
              <div className="job-card" style={{ padding: "20px" }}>
                <div style={{ fontSize: "20px", color: "var(--primary)", marginBottom: "10px" }}>❝</div>
                <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
                  "My mentor helped me transition from a technical role to product management. Her guidance was invaluable in navigating this career shift while balancing family responsibilities."
                </p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ 
                    width: "40px", 
                    height: "40px", 
                    borderRadius: "50%", 
                    background: "#e6e6e6",
                    marginRight: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    RA
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "bold" }}>Riya A.</p>
                    <p style={{ fontSize: "12px", color: "#666" }}>Product Manager, Bangalore</p>
                  </div>
                </div>
              </div>
              
              <div className="job-card" style={{ padding: "20px" }}>
                <div style={{ fontSize: "20px", color: "var(--primary)", marginBottom: "10px" }}>❝</div>
                <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
                  "After a 4-year career break to raise my children, my mentor helped me update my skills and rebuild my confidence. I'm now working at a company with flexible hours."
                </p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ 
                    width: "40px", 
                    height: "40px", 
                    borderRadius: "50%", 
                    background: "#e6e6e6",
                    marginRight: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    SM
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "bold" }}>Sneha M.</p>
                    <p style={{ fontSize: "12px", color: "#666" }}>UX Designer, Pune</p>
                  </div>
                </div>
              </div>
              
              <div className="job-card" style={{ padding: "20px" }}>
                <div style={{ fontSize: "20px", color: "var(--primary)", marginBottom: "10px" }}>❝</div>
                <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
                  "My mentor helped me navigate challenges as the only woman on my engineering team and develop leadership skills. I've since been promoted to team lead."
                </p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ 
                    width: "40px", 
                    height: "40px", 
                    borderRadius: "50%", 
                    background: "#e6e6e6",
                    marginRight: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    PK
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "bold" }}>Priyanka K.</p>
                    <p style={{ fontSize: "12px", color: "#666" }}>Engineering Lead, Hyderabad</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* AI Mentor Matching Form */}
          {showMatchForm && (
            <section className="featured-jobs" ref={matchFormRef}>
              <h2>Find Your Perfect Mentor Match</h2>
              <div className="job-card" style={{ padding: "25px" }}>
                {!isMatching && matchResults.length === 0 ? (
                  <form onSubmit={handleSubmitMatchPreferences}>
                    <p style={{ marginBottom: "20px", color: "var(--text-gray)" }}>
                      Tell us about your career goals and preferences to help our AI find the most compatible mentors for you.
                    </p>
                    
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                        Your current career stage
                      </label>
                      <select 
                        name="careerStage"
                        value={matchPreferences.careerStage}
                        onChange={handleMatchInputChange}
                        style={{ 
                          width: "100%", 
                          padding: "10px", 
                          borderRadius: "5px",
                          border: "1px solid var(--border-light)"
                        }}
                        required
                      >
                        <option value="">Select your career stage</option>
                        <option value="Early Career">Early Career (0-3 years)</option>
                        <option value="Mid Career">Mid Career (3-10 years)</option>
                        <option value="Senior">Senior (10+ years)</option>
                        <option value="Returning">Returning After a Career Break</option>
                        <option value="Transitioning">Career Transition</option>
                      </select>
                    </div>
                    
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                        Industry/Field
                      </label>
                      <select 
                        name="industry"
                        value={matchPreferences.industry}
                        onChange={handleMatchInputChange}
                        style={{ 
                          width: "100%", 
                          padding: "10px", 
                          borderRadius: "5px",
                          border: "1px solid var(--border-light)"
                        }}
                        required
                      >
                        <option value="">Select your industry</option>
                        <option value="Technology">Technology</option>
                        <option value="Finance">Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Design">Design</option>
                        <option value="HR">Human Resources</option>
                        <option value="Consulting">Consulting</option>
                      </select>
                    </div>
                    
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                        Your career goals
                      </label>
                      <textarea 
                        name="goals"
                        value={matchPreferences.goals}
                        onChange={handleMatchInputChange}
                        placeholder="What are your short and long-term career objectives? What skills do you want to develop?"
                        style={{ 
                          width: "100%", 
                          padding: "10px", 
                          borderRadius: "5px",
                          border: "1px solid var(--border-light)",
                          minHeight: "100px",
                          resize: "vertical"
                        }}
                        required
                      />
                    </div>
                    
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                        Current challenges
                      </label>
                      <textarea 
                        name="challenges"
                        value={matchPreferences.challenges}
                        onChange={handleMatchInputChange}
                        placeholder="What specific challenges are you facing in your career journey?"
                        style={{ 
                          width: "100%", 
                          padding: "10px", 
                          borderRadius: "5px",
                          border: "1px solid var(--border-light)",
                          minHeight: "100px",
                          resize: "vertical"
                        }}
                        required
                      />
                    </div>
                    
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                        Preferred mentoring style
                      </label>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <label style={{ display: "flex", alignItems: "center" }}>
                          <input 
                            type="radio" 
                            name="preferredMentorStyle" 
                            value="Directive" 
                            checked={matchPreferences.preferredMentorStyle === 'Directive'}
                            onChange={handleMatchInputChange}
                            style={{ marginRight: "8px" }} 
                          />
                          <div>
                            <strong>Directive</strong> - Provides specific advice and clear guidance
                          </div>
                        </label>
                        <label style={{ display: "flex", alignItems: "center" }}>
                          <input 
                            type="radio" 
                            name="preferredMentorStyle" 
                            value="Collaborative" 
                            checked={matchPreferences.preferredMentorStyle === 'Collaborative'}
                            onChange={handleMatchInputChange}
                            style={{ marginRight: "8px" }} 
                          />
                          <div>
                            <strong>Collaborative</strong> - Works together to explore options and solutions
                          </div>
                        </label>
                        <label style={{ display: "flex", alignItems: "center" }}>
                          <input 
                            type="radio" 
                            name="preferredMentorStyle" 
                            value="Challenging" 
                            checked={matchPreferences.preferredMentorStyle === 'Challenging'}
                            onChange={handleMatchInputChange}
                            style={{ marginRight: "8px" }} 
                          />
                          <div>
                            <strong>Challenging</strong> - Pushes you outside your comfort zone with tough questions
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    <div style={{ display: "flex", gap: "15px" }}>
                      <button 
                        type="button"
                        className="update-btn" 
                        style={{ 
                          background: "transparent", 
                          border: "1px solid var(--border-light)" 
                        }}
                        onClick={() => setShowMatchForm(false)}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="update-btn" 
                        style={{ 
                          background: "var(--primary)", 
                          flex: 1
                        }}
                      >
                        Find My Matches
                      </button>
                    </div>
                  </form>
                ) : isMatching ? (
                  <div style={{ textAlign: "center", padding: "30px 0" }}>
                    <div style={{ fontSize: "36px", marginBottom: "15px" }}>🔍</div>
                    <h3 style={{ marginBottom: "10px" }}>Finding Your Perfect Matches</h3>
                    <p style={{ color: "var(--text-gray)", marginBottom: "20px" }}>
                      Our AI is analyzing your preferences and career goals to find the most compatible mentors for you...
                    </p>
                    <div className="progress-bar" style={{ 
                      height: "6px", 
                      width: "100%", 
                      backgroundColor: "#e6e6e6", 
                      borderRadius: "3px",
                      overflow: "hidden",
                      position: "relative"
                    }}>
                      <div className="progress" style={{
                        position: "absolute",
                        height: "100%",
                        width: "30%",
                        backgroundColor: "var(--primary)",
                        borderRadius: "3px",
                        animation: "progressMove 1.5s infinite ease-in-out"
                      }}></div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ marginBottom: "20px", textAlign: "center" }}>
                      <div style={{ fontSize: "36px", marginBottom: "15px" }}>🎉</div>
                      <h3 style={{ marginBottom: "10px" }}>We Found Your Perfect Matches!</h3>
                      <p style={{ color: "var(--text-gray)", marginBottom: "15px" }}>
                        Based on your career goals, industry, and preferences, here are the mentors we recommend:
                      </p>
                    </div>
                    
                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
                      gap: "20px",
                      marginBottom: "20px"
                    }}>
                      {matchResults.map(mentor => (
                        <div 
                          key={mentor.id} 
                          className="job-card" 
                          style={{ 
                            padding: "20px", 
                            display: "flex", 
                            flexDirection: "column",
                            height: "100%",
                            border: "2px solid var(--primary-light)",
                            position: "relative"
                          }}
                        >
                          <div style={{ 
                            position: "absolute", 
                            top: "10px", 
                            right: "10px", 
                            background: "var(--primary-light)",
                            color: "var(--primary)",
                            padding: "3px 8px",
                            borderRadius: "10px",
                            fontSize: "12px",
                            fontWeight: "bold"
                          }}>
                            Match Score: {Math.floor(80 + Math.random() * 15)}%
                          </div>
                          
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", marginTop: "15px" }}>
                            <div style={{ 
                              width: "60px", 
                              height: "60px", 
                              borderRadius: "50%", 
                              background: "#e6e6e6",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "24px",
                              color: "#666"
                            }}>
                              {mentor.name.split(' ').map((n: string) => n[0]).join('')}
                            </div>
                            <button 
                              onClick={() => handleToggleBookmark(mentor.id)}
                              style={{ 
                                background: "transparent", 
                                border: "none", 
                                cursor: "pointer",
                                fontSize: "20px",
                                color: bookmarkedMentors.includes(mentor.id) ? "var(--primary)" : "#ccc"
                              }}
                            >
                              {bookmarkedMentors.includes(mentor.id) ? '★' : '☆'}
                            </button>
                          </div>
                          
                          <h3 style={{ fontSize: "18px", marginBottom: "5px" }}>{mentor.name}</h3>
                          <p style={{ fontSize: "14px", color: "var(--text-gray)", marginBottom: "10px" }}>
                            {mentor.role} at {mentor.company}
                          </p>
                          
                          <div style={{ marginBottom: "15px" }}>
                            <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>
                              <strong>Why this is a great match:</strong>
                            </p>
                            <p style={{ fontSize: "14px", color: "#666", marginBottom: "5px", fontStyle: "italic" }}>
                              "{mentor.name} has expertise in {mentor.expertise.join(', ')}, which aligns perfectly with your goals in {matchPreferences.industry}."
                            </p>
                          </div>
                          
                          <button 
                            className="update-btn" 
                            style={{ 
                              marginTop: "auto", 
                              background: "var(--primary)",
                              width: "100%"
                            }}
                            onClick={() => handleRequestMentor(mentor)}
                          >
                            Request Mentorship
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div style={{ display: "flex", gap: "15px" }}>
                      <button 
                        className="update-btn" 
                        style={{ 
                          background: "transparent", 
                          border: "1px solid var(--border-light)" 
                        }}
                        onClick={() => {
                          setMatchResults([]);
                          setShowMatchForm(false);
                        }}
                      >
                        Close
                      </button>
                      <button 
                        className="update-btn" 
                        style={{ 
                          background: "var(--primary)", 
                          flex: 1
                        }}
                        onClick={() => {
                          setMatchResults([]);
                        }}
                      >
                        Refine Preferences
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <div className="profile-card">
            <h2 className="profile-title">My Mentors</h2>
            <div style={{ padding: "15px 0" }}>
              <p style={{ fontSize: "14px", color: "var(--text-gray)", marginBottom: "10px" }}>
                {bookmarkedMentors.length > 0 
                  ? `You have bookmarked ${bookmarkedMentors.length} mentor${bookmarkedMentors.length > 1 ? 's' : ''}.` 
                  : "You haven't bookmarked any mentors yet."}
              </p>
              {bookmarkedMentors.length > 0 && (
                <button 
                  className="update-btn" 
                  style={{ width: "100%", background: "var(--primary)" }}
                  onClick={() => setShowBookmarked(true)}
                >
                  View My Mentors
                </button>
              )}
            </div>
          </div>

          <div className="career-break-card">
            <h2 className="card-title">Find My Match</h2>
            <p className="card-subtitle">
              Not sure who to choose? Let our AI find the perfect mentor based on your career goals and challenges.
            </p>
            <button className="update-btn" style={{ width: "100%", marginTop: "15px" }} onClick={handleFindMatch}>
              Get Matched
            </button>
          </div>
          
          <div className="career-break-card" style={{ marginTop: "20px" }}>
            <h2 className="card-title">Become a Mentor</h2>
            <p className="card-subtitle">
              Share your expertise and help other women advance in their careers.
            </p>
            <p className="scholarship-text">Build your network and leadership skills!</p>
            <button className="update-btn" style={{ width: "100%", marginTop: "15px" }} onClick={handleBecomeMentor}>
              Apply Now
            </button>
          </div>
          
          <div style={{ 
            marginTop: "20px", 
            border: "1px solid var(--border-light)", 
            borderRadius: "8px", 
            padding: "15px" 
          }}>
            <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>Upcoming Mentor Events</h3>
            <div 
              style={{ marginBottom: "15px", borderBottom: "1px solid var(--border-light)", paddingBottom: "10px", cursor: "pointer" }}
              onClick={() => handleEventClick("Women in Tech Panel Discussion", "April 20, 2025", "Virtual")}
            >
              <p style={{ fontSize: "14px", fontWeight: "bold" }}>Women in Tech Panel Discussion</p>
              <p style={{ fontSize: "12px", color: "var(--text-gray)" }}>April 20, 2025 • Virtual</p>
            </div>
            <div 
              style={{ marginBottom: "15px", borderBottom: "1px solid var(--border-light)", paddingBottom: "10px", cursor: "pointer" }}
              onClick={() => handleEventClick("Group Mentoring: Career Transitions", "April 25, 2025", "Virtual")}
            >
              <p style={{ fontSize: "14px", fontWeight: "bold" }}>Group Mentoring: Career Transitions</p>
              <p style={{ fontSize: "12px", color: "var(--text-gray)" }}>April 25, 2025 • Virtual</p>
            </div>
            <div 
              style={{ cursor: "pointer" }}
              onClick={() => handleEventClick("Leadership Skills Workshop", "May 3, 2025", "Bangalore")}
            >
              <p style={{ fontSize: "14px", fontWeight: "bold" }}>Leadership Skills Workshop</p>
              <p style={{ fontSize: "12px", color: "var(--text-gray)" }}>May 3, 2025 • Bangalore</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Event Details Modal */}
      {showEventDetails && selectedEvent && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
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
            maxWidth: "600px",
            maxHeight: "80vh",
            overflow: "auto",
            padding: "25px",
            position: "relative"
          }}>
            <button 
              onClick={() => setShowEventDetails(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "transparent",
                border: "none",
                fontSize: "18px",
                cursor: "pointer"
              }}
            >
              ✕
            </button>
            
            <h2 style={{ marginBottom: "15px", color: "var(--primary)" }}>{selectedEvent.title}</h2>
            
            <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
              <div style={{ 
                padding: "8px 15px", 
                backgroundColor: "var(--primary-light)", 
                borderRadius: "20px",
                fontSize: "14px"
              }}>
                📅 {selectedEvent.date}
              </div>
              <div style={{ 
                padding: "8px 15px", 
                backgroundColor: "#f1f1f1", 
                borderRadius: "20px",
                fontSize: "14px"
              }}>
                📍 {selectedEvent.location}
              </div>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>About This Event</h3>
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#555" }}>
                {selectedEvent.description}
              </p>
            </div>
            
            {selectedEvent.speakers && selectedEvent.speakers.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>Speakers</h3>
                <ul style={{ paddingLeft: "20px" }}>
                  {selectedEvent.speakers.map((speaker, index) => (
                    <li key={index} style={{ fontSize: "14px", marginBottom: "5px" }}>{speaker}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "16px", marginBottom: "10px" }}>Who Should Attend</h3>
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#555" }}>
                {selectedEvent.title.includes("Career Transitions") 
                  ? "Women looking to change industries, roles, or returning to work after a break."
                  : selectedEvent.title.includes("Leadership") 
                    ? "Women in mid to senior career stages looking to advance into leadership positions."
                    : "Women at all career stages interested in the tech industry and networking with peers."}
              </p>
            </div>
            
            <button 
              className="update-btn" 
              style={{ 
                width: "100%", 
                background: "var(--primary)",
                padding: "12px",
                fontSize: "15px"
              }}
            >
              Register for This Event
            </button>
          </div>
        </div>
      )}
    </div> // Properly closing the mentor-match-container div
  );
</div>)}