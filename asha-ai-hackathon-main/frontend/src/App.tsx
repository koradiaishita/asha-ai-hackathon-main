import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import React from 'react'

// Sample job data
const jobsData = [
  {
    id: 1,
    title: "Senior Project Manager",
    company: "Tech Innovations",
    location: "Bangalore",
    mode: "Remote",
    experience: "5-8 Yr",
    tags: ["Project Management", "Team Leadership", "Agile", "JIRA", "Scrum"],
    badge: "Returnship Friendly",
    applyLink: "/apply/senior-project-manager",
  },
  {
    id: 2,
    title: "UX Design Lead",
    company: "Creative Solutions",
    location: "Mumbai",
    mode: "Hybrid",
    experience: "3-6 Yr",
    tags: ["UI/UX", "Product Design", "Figma", "Sketch", "User Research"],
    badge: "Women Preferred",
    applyLink: "/apply/ux-design-lead",
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "WebTech Systems",
    location: "Pune",
    mode: "Remote",
    experience: "2-5 Yr",
    tags: ["React", "JavaScript", "HTML/CSS", "TypeScript", "Git"],
    badge: "Flexible Hours",
    applyLink: "/apply/frontend-developer",
  },
  {
    id: 4,
    title: "Content Writer",
    company: "Digital Media",
    location: "Delhi",
    mode: "Work From Home",
    experience: "1-3 Yr",
    tags: ["Content Strategy", "SEO", "Editing", "Social Media", "Blogging"],
    badge: "Part Time Available",
    applyLink: "/apply/content-writer",
  },
  {
    id: 5,
    title: "HR Manager",
    company: "Global Services",
    location: "Chennai",
    mode: "Hybrid",
    experience: "4-7 Yr",
    tags: ["Recruitment", "Employee Relations", "HR Policies", "Training", "Performance Management"],
    badge: "Returnship Friendly",
    applyLink: "/apply/hr-manager",
  },
  {
    id: 6,
    title: "Data Analyst",
    company: "Analytics Pro",
    location: "Bangalore",
    mode: "Full Time",
    experience: "2-4 Yr",
    tags: ["SQL", "Python", "Data Visualization", "Excel", "Power BI"],
    badge: "Women Preferred",
    applyLink: "/apply/data-analyst",
  },
  {
    id: 7,
    title: "Customer Success Manager",
    company: "SaaS Solutions",
    location: "Hyderabad",
    mode: "Part Time",
    experience: "3-5 Yr",
    tags: ["Client Management", "SaaS", "CRM", "Customer Retention", "Account Management"],
    badge: "Flexible Hours",
    applyLink: "/apply/customer-success-manager",
  }
];

// Sample events data
const eventsData = [
  {
    id: 1,
    title: "Women in Tech Conference",
    date: "April 15, 2025",
    location: "Bangalore",
    description: "A conference dedicated to women in technology featuring keynote speakers, panel discussions, and networking opportunities.",
    registrationLink: "/events/women-in-tech-conference"
  },
  {
    id: 2,
    title: "Return to Work Workshop",
    date: "April 22, 2025",
    location: "Virtual",
    description: "Workshop designed for women looking to return to the workforce after a career break. Learn strategies for resume building, interviewing, and skill enhancement.",
    registrationLink: "/events/return-to-work-workshop"
  },
  {
    id: 3,
    title: "Leadership Summit",
    date: "May 5, 2025",
    location: "Mumbai",
    description: "Summit focusing on leadership skills and career advancement strategies for women professionals.",
    registrationLink: "/events/leadership-summit"
  }
];

function App() {
  return <HomePage />;
}

// HomePage component for the main landing page
function HomePage() {
  const [filteredJobs, setFilteredJobs] = useState(jobsData);
  const [activeWorkMode, setActiveWorkMode] = useState<string | null>(null);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<number[]>([]);

  const [showingEvents, setShowingEvents] = useState(false);
  const [showingContact, setShowingContact] = useState(false);
  const [showingEmployers, setShowingEmployers] = useState(false);
  const [showingProfile, setShowingProfile] = useState(false);
  const [showingReturnship, setShowingReturnship] = useState(false);
  
  // Add user state to store registered users
  const [registeredUsers, setRegisteredUsers] = useState<{fullName: string, email: string, password: string}[]>([]);

  const [currentUser, setCurrentUser] = useState<string>('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });

  // Add a welcome banner state
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(false);
  
  // Function to handle search input submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchInput = document.querySelector('.search-input') as HTMLInputElement;
    if (searchInput && searchInput.value.trim()) {
      const searchTerm = searchInput.value.toLowerCase();
      const results = jobsData.filter(job => 
        job.title.toLowerCase().includes(searchTerm) || 
        job.company.toLowerCase().includes(searchTerm) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
      setFilteredJobs(results);
      setActiveWorkMode(null);
      setShowingEvents(false);
      setShowingContact(false);
      setShowingEmployers(false);
    }
  };

  // State for sign up modal
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [signUpFormData, setSignUpFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Function to handle sign up button click
  const handleSignUp = () => {
    setShowSignUpModal(true);
  };

  // Function to handle sign up form input changes
  const handleSignUpInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to handle sign up form submission
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (signUpFormData.password !== signUpFormData.confirmPassword) {
      alert("Passwords don't match. Please try again.");
      return;
    }
    
    // Here you would typically send this data to your backend API
    // For now, we'll just show a success message
    alert(`Thank you for signing up, ${signUpFormData.fullName}! A confirmation link has been sent to ${signUpFormData.email}.`);
    
    // Add user to registered users state
    setRegisteredUsers(prev => [...prev, {
      fullName: signUpFormData.fullName,
      email: signUpFormData.email,
      password: signUpFormData.password
    }]);
    
    // Close the modal and reset form
    setShowSignUpModal(false);
    setSignUpFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  // Function to handle bookmark button click
  const handleBookmark = (jobId: number) => {
    setBookmarkedJobs(prev => {
      if (prev.includes(jobId)) {
        return prev.filter(id => id !== jobId);
      } else {
        return [...prev, jobId];
      }
    });
  };

  // Function to handle apply button click
  const handleApply = (jobTitle: string) => {
    const userReady = confirm(`You are about to apply for: ${jobTitle}\n\nDo you want to continue?`);
    if (userReady) {
      const thankYouMessage = `Thank you for applying to the ${jobTitle} position! Your application has been submitted successfully. We will review your profile and get back to you soon.`;
      alert(thankYouMessage);
      // Redirect to careers page after the alert
      window.location.href = '/careers';
    }
  };

  // Function to handle work mode filter
  const handleWorkModeFilter = (mode: string) => {
    let filteredResults;
    
    if (activeWorkMode === mode) {
      // If clicking the same mode, clear the filter
      setActiveWorkMode(null);
      filteredResults = jobsData;
    } else {
      setActiveWorkMode(mode);
      // Filter jobs by the selected work mode
      if (mode === "Work From Home") {
        filteredResults = jobsData.filter(job => 
          job.mode === "Remote" || job.mode === "Work From Home"
        );
      } else {
        filteredResults = jobsData.filter(job => job.mode === mode);
      }
    }
    
    setFilteredJobs(filteredResults);
    setShowingEvents(false);
    setShowingContact(false);
    setShowingEmployers(false);
    setShowingProfile(false);
    setShowingReturnship(false);
  };

  // Function to handle update profile button
  const handleUpdateProfile = () => {
    setShowingProfile(true);
    setShowingEvents(false);
    setShowingContact(false);
    setShowingEmployers(false);
    setShowingReturnship(false);
  };

  // Function to handle returnship program button
  const handleReturnshipProgram = () => {
    setShowingReturnship(true);
    setShowingProfile(false);
    setShowingEvents(false);
    setShowingContact(false);
    setShowingEmployers(false);
  };
  
  // Function to handle business button click
  const handleBusinessClick = () => {
    setShowingEmployers(true);
    setShowingEvents(false);
    setShowingContact(false);
    setShowingProfile(false);
    setShowingReturnship(false);
    setActiveWorkMode(null);
  };
  
  // Function to handle events click
  const handleEventsClick = () => {
    setShowingEvents(true);
    setShowingContact(false);
    setShowingEmployers(false);
    setShowingProfile(false);
    setShowingReturnship(false);
    setActiveWorkMode(null);
  };
  
  // Function to handle contact us click
  const handleContactClick = () => {
    setShowingContact(true);
    setShowingEvents(false);
    setShowingEmployers(false);
    setShowingProfile(false);
    setShowingReturnship(false);
    setActiveWorkMode(null);
  };
  
  // Function to handle "show all jobs" click
  const handleShowAllJobs = () => {
    setFilteredJobs(jobsData);
    setActiveWorkMode(null);
    setShowingEvents(false);
    setShowingContact(false);
    setShowingEmployers(false);
    setShowingProfile(false);
    setShowingReturnship(false);
  };

  // Function to handle login input changes
  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to handle login form submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Find user with matching email
    const user = registeredUsers.find(user => user.email === loginFormData.email);
    
    if (user && user.password === loginFormData.password) {
      // Set logged in state
      setCurrentUser(user.fullName);
      setShowLoginModal(false);
      // Show welcome banner
      setShowWelcomeBanner(true);
      // Reset form data
      setLoginFormData({
        email: '',
        password: ''
      });
      
      // Hide welcome banner after 5 seconds
      setTimeout(() => {
        setShowWelcomeBanner(false);
      }, 5000);
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  // Function to handle Log In button click from signup modal
  const handleShowLogin = () => {
    setShowSignUpModal(false);
    setShowLoginModal(true);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="herkey-logo">HerKey Saarthi</span>
          <span className="turns-ten">Your AI-Assistant</span>
        </div>
        <form className="search-container" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search jobs, skills or career opportunities" 
            className="search-input" 
          />
        </form>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="sign-up-btn" 
            style={{ 
              backgroundColor: 'transparent', 
              color: 'var(--primary)',
              border: '1px solid var(--primary)'
            }}
            onClick={() => setShowLoginModal(true)}
          >
            Login
          </button>
          <button className="sign-up-btn" onClick={handleSignUp}>Sign Up</button>
        </div>
      </header>

      {/* Welcome Banner */}
      {showWelcomeBanner && (
        <div style={{
          position: 'fixed',
          top: '80px', 
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'var(--primary)',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'fadeIn 0.5s ease-out'
        }}>
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px'
          }}>
            {currentUser.charAt(0).toUpperCase()}
          </div>
          <div>
            <p style={{ fontWeight: '500', marginBottom: '3px' }}>Welcome back, {currentUser}!</p>
            <p style={{ fontSize: '14px', opacity: '0.9' }}>It's great to see you again</p>
          </div>
        </div>
      )}

      <div className="content-container">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <nav className="nav-menu">
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <li className="nav-item">
                <Link to="/" style={{ 
                  textDecoration: 'none', 
                  color: 'inherit', 
                  display: 'flex', 
                  alignItems: 'center', 
                  width: '100%',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(149, 69, 225, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                }}>
                  <span className="nav-text" style={{ fontSize: '15px', fontWeight: '500' }}>Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/resume-ai" style={{ 
                  textDecoration: 'none', 
                  color: 'inherit', 
                  display: 'flex', 
                  alignItems: 'center', 
                  width: '100%',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s'
                }}>
                  <span className="nav-text" style={{ fontSize: '15px', fontWeight: '500' }}>Resume AI</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/skillup-ai" style={{ 
                  textDecoration: 'none', 
                  color: 'inherit', 
                  display: 'flex', 
                  alignItems: 'center', 
                  width: '100%',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s'
                }}>
                  <span className="nav-text" style={{ fontSize: '15px', fontWeight: '500' }}>SkillUp AI</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/project-ideas-ai" style={{ 
                  textDecoration: 'none', 
                  color: 'inherit', 
                  display: 'flex', 
                  alignItems: 'center', 
                  width: '100%',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s'
                }}>
                  <span className="nav-text" style={{ fontSize: '15px', fontWeight: '500' }}>ProjectIdeas AI</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/interview-ready-ai" style={{ 
                  textDecoration: 'none', 
                  color: 'inherit', 
                  display: 'flex', 
                  alignItems: 'center', 
                  width: '100%',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s'
                }}>
                  <span className="nav-text" style={{ fontSize: '15px', fontWeight: '500' }}>InterviewReadyAI</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/mentor-match-ai" style={{ 
                  textDecoration: 'none', 
                  color: 'inherit', 
                  display: 'flex', 
                  alignItems: 'center', 
                  width: '100%',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s'
                }}>
                  <span className="nav-text" style={{ fontSize: '15px', fontWeight: '500' }}>MentorMatch AI</span>
                </Link>
              </li>
              <li className="nav-item">
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  cursor: 'pointer',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s'
                }} onClick={handleEventsClick}>
                  <span className="nav-text" style={{ fontSize: '15px', fontWeight: '500' }}>Events</span>
                </div>
              </li>
              <li className="nav-item">
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  cursor: 'pointer',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s'
                }} onClick={handleContactClick}>
                  <span className="nav-text" style={{ fontSize: '15px', fontWeight: '500' }}>Contact us</span>
                </div>
              </li>
            </ul>
            <div className="herkey-business" style={{ marginTop: '20px', padding: '0 10px' }}>
              <button className="business-btn" style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '12px 15px',
                backgroundColor: 'rgba(149, 69, 225, 0.08)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '500',
                color: 'var(--primary)',
                transition: 'background-color 0.2s'
              }} onClick={handleBusinessClick}>
                JobsForHer for Employers
              </button>
            </div>
            <div className="app-download" style={{ margin: '20px 0', padding: '0 10px', textAlign: 'center' }}>
              <img src="/google-play-badge.png" alt="Get it on Google Play" className="google-play" style={{ 
                maxWidth: '180px', 
                display: 'block',
                margin: '0 auto',
                borderRadius: '6px'
              }} />
            </div>
            <div className="social-icons" style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '15px',
              margin: '15px 0' 
            }}>
              <span className="social-icon" style={{ color: 'var(--primary)', cursor: 'pointer' }} />
              <span className="social-icon" style={{ color: 'var(--primary)', cursor: 'pointer' }} />
              <span className="social-icon" style={{ color: 'var(--primary)', cursor: 'pointer' }} />
              <span className="social-icon" style={{ color: 'var(--primary)', cursor: 'pointer' }} />
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {!showingEvents && !showingContact && !showingEmployers && !showingProfile && !showingReturnship && (
            <>
              {/* Asha AI Description Section */}
              <section className="featured-jobs">
                <h2>Meet Asha - Your Career Assistant</h2>
                <div className="job-card" style={{ padding: "25px" }}>
                  <div className="job-info" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ 
                      maxWidth: "250px", 
                      marginBottom: "20px", 
                      borderRadius: "8px", 
                      overflow: "hidden",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                    }}></div>
                    <h3 className="job-title">Asha AI Chatbot</h3>
                    <p style={{ marginBottom: "15px", color: "var(--text-gray)", textAlign: "center" }}>
                      Asha is an AI-powered virtual assistant designed to guide women in their career journey. 
                      Ask about jobs, events, mentorship programs, and more!
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px", justifyContent: "center" }}>
                      <span className="newly-added" style={{ background: "var(--light-purple)" }}>Contextual Awareness</span>
                      <span className="newly-added" style={{ background: "var(--primary-light)" }}>Real-time Information</span>
                      <span className="newly-added" style={{ background: "#e8f5e9" }}>Bias Prevention</span>
                      <span className="newly-added" style={{ background: "#fff3e0" }}>Privacy Focused</span>
                    </div>
                    <p style={{ fontSize: "14px", color: "var(--purple-text)", fontWeight: "500", textAlign: "center" }}>
                      Click the chat icon in the bottom right corner to start a conversation with Asha!
                    </p>
                  </div>
                </div>
              </section>

              {/* Work Mode Section */}
              <section className="work-mode-section">
                <div className="section-header">
                  <h2>Discover opportunities by work mode</h2>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {activeWorkMode && (
                      <button 
                        onClick={handleShowAllJobs}
                        style={{ 
                          marginRight: "10px", 
                          background: "transparent", 
                          border: "1px solid var(--primary)",
                          borderRadius: "4px",
                          padding: "5px 10px",
                          color: "var(--primary)",
                          cursor: "pointer",
                          fontSize: "14px"
                        }}
                      >
                        Show All Jobs
                      </button>
                    )}
                  </div>
                </div>
                <div className="work-mode-options">
                  <div 
                    className={`mode-card wfh ${activeWorkMode === "Work From Home" ? "active" : ""}`} 
                    onClick={() => handleWorkModeFilter("Work From Home")}
                    style={{ 
                      cursor: "pointer",
                      border: activeWorkMode === "Work From Home" ? "2px solid var(--primary)" : "none"
                    }}
                  >
                    <span className="mode-text">Work From Home</span>
                  </div>
                  <div 
                    className={`mode-card hybrid ${activeWorkMode === "Hybrid" ? "active" : ""}`} 
                    onClick={() => handleWorkModeFilter("Hybrid")}
                    style={{ 
                      cursor: "pointer",
                      border: activeWorkMode === "Hybrid" ? "2px solid var(--primary)" : "none"
                    }}
                  >
                    <span className="mode-text">Hybrid</span>
                  </div>
                  <div 
                    className={`mode-card part-time ${activeWorkMode === "Part Time" ? "active" : ""}`} 
                    onClick={() => handleWorkModeFilter("Part Time")}
                    style={{ 
                      cursor: "pointer",
                      border: activeWorkMode === "Part Time" ? "2px solid var(--primary)" : "none"
                    }}
                  >
                    <span className="mode-text">Part Time</span>
                  </div>
                  <div 
                    className={`mode-card full-time ${activeWorkMode === "Full Time" ? "active" : ""}`} 
                    onClick={() => handleWorkModeFilter("Full Time")}
                    style={{ 
                      cursor: "pointer",
                      border: activeWorkMode === "Full Time" ? "2px solid var(--primary)" : "none"
                    }}
                  >
                    <span className="mode-text">Full Time</span>
                  </div>
                </div>
              </section>

              {/* Featured Jobs Section */}
              <section className="featured-jobs">
                <h2>
                  {activeWorkMode ? `${activeWorkMode} Opportunities` : 'Women-friendly Jobs'}
                  {activeWorkMode && <span style={{ fontSize: "14px", color: "var(--text-gray)", marginLeft: "10px" }}>({filteredJobs.length} results)</span>}
                </h2>
                
                {filteredJobs.length === 0 ? (
                  <div className="job-card" style={{ padding: "25px", textAlign: "center" }}>
                    <p style={{ color: "var(--text-gray)" }}>No jobs found matching your criteria.</p>
                    <button 
                      onClick={handleShowAllJobs}
                      style={{ 
                        marginTop: "15px", 
                        background: "var(--primary)", 
                        color: "white", 
                        border: "none",
                        borderRadius: "4px",
                        padding: "8px 15px",
                        cursor: "pointer"
                      }}
                    >
                      View All Jobs
                    </button>
                  </div>
                ) : (
                  filteredJobs.map(job => (
                    <div className="job-card" key={job.id}>
                      <div className="company-logo">
                        <span className="herkey-job-logo"></span>
                      </div>
                      <div className="job-info">
                        <h3 className="job-title">{job.title}</h3>
                        <h4 className="company-name">{job.company}</h4>
                        <p className="job-location">{job.location} | {job.mode} | {job.experience}</p>
                        <p className="job-tags">{job.tags.slice(0, 3).join(' • ')} {job.tags.length > 3 ? `+${job.tags.length - 3}` : ''}</p>
                        <span className="newly-added">{job.badge}</span>
                      </div>
                      <div className="job-actions">
                        <span 
                          className="bookmark-btn" 
                          onClick={() => handleBookmark(job.id)} 
                          style={{ 
                            cursor: 'pointer',
                            color: bookmarkedJobs.includes(job.id) ? 'var(--primary)' : 'inherit',
                            fill: bookmarkedJobs.includes(job.id) ? 'var(--primary)' : 'none'
                          }} 
                        />
                        <button className="apply-btn" onClick={() => handleApply(job.title)}>
                          <span className="lightning-icon" />
                          Easy Apply
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </section>
            </>
          )}

          {/* Events Section */}
          {showingEvents && (
            <section className="featured-jobs">
              <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <button 
                  onClick={handleShowAllJobs}
                  style={{ 
                    marginRight: "15px", 
                    background: "transparent", 
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                    color: "var(--primary)"
                  }}
                >
                  ←
                </button>
                <h2>Upcoming Events</h2>
              </div>
              
              {eventsData.map(event => (
                <div className="job-card" key={event.id} style={{ padding: "25px" }}>
                  <div className="job-info">
                    <h3 className="job-title">{event.title}</h3>
                    <p style={{ color: "var(--purple-text)", marginBottom: "10px" }}>
                      <strong>Date:</strong> {event.date} | <strong>Location:</strong> {event.location}
                    </p>
                    <p style={{ color: "var(--text-gray)", marginBottom: "20px" }}>
                      {event.description}
                    </p>
                    <button 
                      className="apply-btn" 
                      style={{ alignSelf: "flex-start" }}
                      onClick={() => alert(`You've successfully registered for ${event.title}. Check your email for the confirmation.`)}
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Contact Us Section */}
          {showingContact && (
            <section className="featured-jobs">
              <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <button 
                  onClick={handleShowAllJobs}
                  style={{ 
                    marginRight: "15px", 
                    background: "transparent", 
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                    color: "var(--primary)"
                  }}
                >
                  ←
                </button>
                <h2>Contact Us</h2>
              </div>
              
              <div className="job-card" style={{ padding: "25px" }}>
                <div className="job-info">
                  <h3 className="job-title" style={{ marginBottom: "20px" }}>Get in Touch with JobsForHer</h3>
                  
                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ color: "var(--purple-text)", marginBottom: "10px" }}>Email</h4>
                    <p>support@jobsforher.com</p>
                  </div>
                  
                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ color: "var(--purple-text)", marginBottom: "10px" }}>Phone</h4>
                    <p>+91-8000-000-000</p>
                  </div>
                  
                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ color: "var(--purple-text)", marginBottom: "10px" }}>Address</h4>
                    <p>JobsForHer HQ, 123 Tech Park, Koramangala</p>
                    <p>Bangalore, Karnataka 560034</p>
                    <p>India</p>
                  </div>
                  
                  <div style={{ marginTop: "30px" }}>
                    <h4 style={{ color: "var(--purple-text)", marginBottom: "15px" }}>Send us a message</h4>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      alert("Thank you for your message! We'll get back to you soon.");
                      handleShowAllJobs();
                    }}>
                      <div style={{ marginBottom: "15px" }}>
                        <input 
                          type="text" 
                          placeholder="Your Name" 
                          required
                          style={{ 
                            width: "100%", 
                            padding: "10px",
                            border: "1px solid var(--border-light)",
                            borderRadius: "4px"
                          }}
                        />
                      </div>
                      <div style={{ marginBottom: "15px" }}>
                        <input 
                          type="email" 
                          placeholder="Your Email" 
                          required
                          style={{ 
                            width: "100%", 
                            padding: "10px",
                            border: "1px solid var(--border-light)",
                            borderRadius: "4px"
                          }}
                        />
                      </div>
                      <div style={{ marginBottom: "15px" }}>
                        <textarea 
                          placeholder="Your Message" 
                          required
                          rows={5}
                          style={{ 
                            width: "100%", 
                            padding: "10px",
                            border: "1px solid var(--border-light)",
                            borderRadius: "4px",
                            fontFamily: "inherit"
                          }}
                        ></textarea>
                      </div>
                      <button 
                        type="submit"
                        className="apply-btn" 
                        style={{ width: "100%" }}
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Employers Section */}
          {showingEmployers && (
            <section className="featured-jobs">
              <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <button 
                  onClick={handleShowAllJobs}
                  style={{ 
                    marginRight: "15px", 
                    background: "transparent", 
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                    color: "var(--primary)"
                  }}
                >
                  ←
                </button>
                <h2>JobsForHer for Employers</h2>
              </div>
              
              <div className="job-card" style={{ padding: "25px" }}>
                <div className="job-info">
                  <h3 className="job-title" style={{ marginBottom: "15px" }}>Connect with talented women professionals</h3>
                  <p style={{ color: "var(--text-gray)", marginBottom: "20px" }}>
                    JobsForHer helps companies hire skilled and qualified women professionals. Our platform offers services to post jobs, search for candidates, organize hiring events, and build diversity in your organization.
                  </p>
                  
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginBottom: "20px" }}>
                    <div style={{ 
                      flex: "1 1 220px", 
                      border: "1px solid var(--border-light)", 
                      borderRadius: "8px",
                      padding: "15px"
                    }}>
                      <h4 style={{ color: "var(--purple-text)", marginBottom: "10px" }}>Job Postings</h4>
                      <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                        Post jobs specifically targeting women candidates returning to work, women in tech, and more.
                      </p>
                    </div>
                    
                    <div style={{ 
                      flex: "1 1 220px", 
                      border: "1px solid var(--border-light)", 
                      borderRadius: "8px",
                      padding: "15px"
                    }}>
                      <h4 style={{ color: "var(--purple-text)", marginBottom: "10px" }}>Candidate Search</h4>
                      <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                        Access our database of qualified women candidates and filter by skills, experience, and more.
                      </p>
                    </div>
                    
                    <div style={{ 
                      flex: "1 1 220px", 
                      border: "1px solid var(--border-light)", 
                      borderRadius: "8px",
                      padding: "15px"
                    }}>
                      <h4 style={{ color: "var(--purple-text)", marginBottom: "10px" }}>Diversity Initiatives</h4>
                      <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                        Partner with us on returnship programs, women in leadership initiatives, and diversity hiring.
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    className="apply-btn" 
                    style={{ alignSelf: "flex-start" }}
                    onClick={() => {
                      const email = prompt("Enter your business email to get more information:");
                      if (email) {
                        alert(`Thank you for your interest! We'll send more information about our employer services to ${email} shortly.`);
                        handleShowAllJobs();
                      }
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Profile Section */}
          {showingProfile && (
            <section className="featured-jobs">
              <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <button 
                  onClick={handleShowAllJobs}
                  style={{ 
                    marginRight: "15px", 
                    background: "transparent", 
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                    color: "var(--primary)"
                  }}
                >
                  ←
                </button>
                <h2>Complete Your Profile</h2>
              </div>
              
              <div className="job-card" style={{ padding: "25px" }}>
                <div className="job-info">
                  <h3 className="job-title" style={{ marginBottom: "15px" }}>Profile Information</h3>
                  <p style={{ color: "var(--text-gray)", marginBottom: "20px" }}>
                    Complete your profile to help us match you with the best opportunities for your skills and career goals.
                  </p>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    alert("Profile updated successfully! You'll now receive personalized job recommendations.");
                    handleShowAllJobs();
                  }}>
                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Full Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter your full name" 
                        required
                        style={{ 
                          width: "100%", 
                          padding: "10px",
                          border: "1px solid var(--border-light)",
                          borderRadius: "4px"
                        }}
                      />
                    </div>
                    
                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Professional Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Software Engineer, Marketing Manager" 
                        required
                        style={{ 
                          width: "100%", 
                          padding: "10px",
                          border: "1px solid var(--border-light)",
                          borderRadius: "4px"
                        }}
                      />
                    </div>
                    
                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Skills</label>
                      <input 
                        type="text" 
                        placeholder="e.g., JavaScript, Project Management, Content Writing" 
                        required
                        style={{ 
                          width: "100%", 
                          padding: "10px",
                          border: "1px solid var(--border-light)",
                          borderRadius: "4px"
                        }}
                      />
                    </div>
                    
                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Experience Level</label>
                      <select 
                        required
                        style={{ 
                          width: "100%", 
                          padding: "10px",
                          border: "1px solid var(--border-light)",
                          borderRadius: "4px"
                        }}
                      >
                        <option value="">Select experience level</option>
                        <option value="fresher">Fresher (0-1 years)</option>
                        <option value="junior">Junior (1-3 years)</option>
                        <option value="mid">Mid-level (3-5 years)</option>
                        <option value="senior">Senior (5-8 years)</option>
                        <option value="expert">Expert (8+ years)</option>
                      </select>
                    </div>
                    
                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Preferred Work Mode</label>
                      <div style={{ display: "flex", gap: "15px" }}>
                        <label style={{ display: "flex", alignItems: "center" }}>
                          <input type="checkbox" style={{ marginRight: "5px" }} />
                          Remote
                        </label>
                        <label style={{ display: "flex", alignItems: "center" }}>
                          <input type="checkbox" style={{ marginRight: "5px" }} />
                          Hybrid
                        </label>
                        <label style={{ display: "flex", alignItems: "center" }}>
                          <input type="checkbox" style={{ marginRight: "5px" }} />
                          On-site
                        </label>
                        <label style={{ display: "flex", alignItems: "center" }}>
                          <input type="checkbox" style={{ marginRight: "5px" }} />
                          Part-time
                        </label>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Resume</label>
                      <input 
                        type="file" 
                        style={{ 
                          width: "100%", 
                          padding: "10px",
                          border: "1px solid var(--border-light)",
                          borderRadius: "4px",
                          background: "white"
                        }}
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="apply-btn" 
                      style={{ width: "100%" }}
                    >
                      Save Profile
                    </button>
                  </form>
                </div>
              </div>
            </section>
          )}

          {/* Returnship Program Section */}
          {showingReturnship && (
            <section className="featured-jobs">
              <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <button 
                  onClick={handleShowAllJobs}
                  style={{ 
                    marginRight: "15px", 
                    background: "transparent", 
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                    color: "var(--primary)"
                  }}
                >
                  ←
                </button>
                <h2>Returnship Program</h2>
              </div>
              
              <div className="job-card" style={{ padding: "25px" }}>
                <div className="job-info">
                  <h3 className="job-title" style={{ marginBottom: "15px" }}>Returning to Work After a Career Break</h3>
                  <p style={{ color: "var(--text-gray)", marginBottom: "20px" }}>
                    JobsForHer's Returnship Program is designed specifically for women who want to restart their careers after taking a break. 
                    Our structured program helps you rebuild confidence, refresh skills, and transition smoothly back into the workforce.
                  </p>
                  
                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{ color: "var(--purple-text)", marginBottom: "15px" }}>Program Benefits</h4>
                    <ul style={{ paddingLeft: "20px", color: "var(--text-gray)" }}>
                      <li style={{ marginBottom: "8px" }}>Mentorship from industry leaders</li>
                      <li style={{ marginBottom: "8px" }}>Skill refresher courses in various domains</li>
                      <li style={{ marginBottom: "8px" }}>Resume building and interview preparation</li>
                      <li style={{ marginBottom: "8px" }}>Access to women-friendly employers</li>
                      <li style={{ marginBottom: "8px" }}>Networking opportunities with successful women professionals</li>
                      <li style={{ marginBottom: "8px" }}>Virtual and in-person workshops</li>
                    </ul>
                  </div>
                  
                  <div style={{ marginBottom: "25px" }}>
                    <h4 style={{ color: "var(--purple-text)", marginBottom: "15px" }}>Upcoming Cohort</h4>
                    <p style={{ color: "var(--text-gray)" }}>
                      <strong>Start Date:</strong> May 15, 2025<br />
                      <strong>Duration:</strong> 12 weeks<br />
                      <strong>Application Deadline:</strong> April 30, 2025<br />
                      <strong>Participation Fee:</strong> ₹10,000 (Scholarships available)<br />
                    </p>
                  </div>
                  
                  <button 
                    className="apply-btn" 
                    style={{ alignSelf: "flex-start" }}
                    onClick={() => {
                      const email = prompt("Enter your email to apply for the Returnship Program:");
                      if (email) {
                        alert(`Thank you for your interest in our Returnship Program! We've sent application details to ${email}. Be sure to apply before April 30, 2025.`);
                        handleShowAllJobs();
                      }
                    }}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </section>
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <div className="profile-card">
            <h2 className="profile-title">Complete your career profile!</h2>
            <div className="profile-image">
              <img 
                src="https://www.shutterstock.com/image-vector/vector-illustration-green-business-team-260nw-572985127.jpg" 
                alt="Complete your profile" 
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
            <button className="update-btn" onClick={handleUpdateProfile}>Update now</button>
          </div>

          <div className="career-break-card">
            <h2 className="card-title">Returning to work after a career break?</h2>
            <p className="card-subtitle">
              JobsForHer's Returnship Program helps women rebuild confidence and skills for a successful career comeback.
            </p>
            <p className="scholarship-text">Limited spots available!</p>
            <div className="card-image" style={{ 
              textAlign: 'center', 
              margin: '15px auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: '280px',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <img 
                src="https://media.istockphoto.com/id/1418460779/vector/phrase-limited-spots-available-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=79DLbT7CJf6io7EaFNTj89qWloo2a8Ycnp-cLY-GA_s=" 
                alt="Limited spots available" 
                style={{ 
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>
            <button className="returnship-btn" onClick={handleReturnshipProgram}>Apply Now</button>
          </div>
        </aside>
      </div>

      {/* Sign Up Modal */}
      {showSignUpModal && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="modal-content" style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '450px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            position: 'relative'
          }}>
            <button 
              onClick={() => setShowSignUpModal(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
            
            <h2 style={{
              color: 'var(--primary)',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              Create an Account
            </h2>
            
            <p style={{
              color: 'var(--text-gray)',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              Join JobsForHer and discover opportunities tailored for women
            </p>
            
            <form onSubmit={handleSignUpSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '5px', 
                  fontWeight: '500',
                  fontSize: '14px'
                }}>
                  Full Name
                </label>
                <input 
                  type="text" 
                  name="fullName"
                  value={signUpFormData.fullName}
                  onChange={handleSignUpInputChange}
                  placeholder="Enter your full name" 
                  required
                  style={{ 
                    width: '100%', 
                    padding: '12px',
                    border: '1px solid var(--border-light)',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '5px', 
                  fontWeight: '500',
                  fontSize: '14px'
                }}>
                  Email
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={signUpFormData.email}
                  onChange={handleSignUpInputChange}
                  placeholder="Enter your email address" 
                  required
                  style={{ 
                    width: '100%', 
                    padding: '12px',
                    border: '1px solid var(--border-light)',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '5px', 
                  fontWeight: '500',
                  fontSize: '14px'
                }}>
                  Password
                </label>
                <input 
                  type="password" 
                  name="password"
                  value={signUpFormData.password}
                  onChange={handleSignUpInputChange}
                  placeholder="Create a password" 
                  required
                  minLength={8}
                  style={{ 
                    width: '100%', 
                    padding: '12px',
                    border: '1px solid var(--border-light)',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
                <small style={{ 
                  color: 'var(--text-gray)',
                  fontSize: '12px'
                }}>
                  Password must be at least 8 characters long
                </small>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '5px', 
                  fontWeight: '500',
                  fontSize: '14px'
                }}>
                  Confirm Password
                </label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={signUpFormData.confirmPassword}
                  onChange={handleSignUpInputChange}
                  placeholder="Confirm your password" 
                  required
                  minLength={8}
                  style={{ 
                    width: '100%', 
                    padding: '12px',
                    border: '1px solid var(--border-light)',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <button 
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
              >
                Create Account
              </button>
              
              <div style={{
                marginTop: '20px',
                textAlign: 'center',
                fontSize: '14px',
                color: 'var(--text-gray)'
              }}>
                Already have an account? 
                <span 
                  style={{
                    color: 'var(--primary)',
                    cursor: 'pointer',
                    marginLeft: '5px',
                    fontWeight: '500'
                  }}
                  onClick={handleShowLogin}
                >
                  Log In
                </span>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="modal-content" style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '450px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            position: 'relative'
          }}>
            <button 
              onClick={() => setShowLoginModal(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
            
            <h2 style={{
              color: 'var(--primary)',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              Log In
            </h2>
            
            <p style={{
              color: 'var(--text-gray)',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              Welcome back! Please enter your credentials to log in.
            </p>
            
            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '5px', 
                  fontWeight: '500',
                  fontSize: '14px'
                }}>
                  Email
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={loginFormData.email}
                  onChange={handleLoginInputChange}
                  placeholder="Enter your email address" 
                  required
                  style={{ 
                    width: '100%', 
                    padding: '12px',
                    border: '1px solid var(--border-light)',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '5px', 
                  fontWeight: '500',
                  fontSize: '14px'
                }}>
                  Password
                </label>
                <input 
                  type="password" 
                  name="password"
                  value={loginFormData.password}
                  onChange={handleLoginInputChange}
                  placeholder="Enter your password" 
                  required
                  minLength={8}
                  style={{ 
                    width: '100%', 
                    padding: '12px',
                    border: '1px solid var(--border-light)',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <button 
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
              >
                Log In
              </button>
              
              <div style={{
                marginTop: '20px',
                textAlign: 'center',
                fontSize: '14px',
                color: 'var(--text-gray)'
              }}>
                Don't have an account? 
                <span 
                  style={{
                    color: 'var(--primary)',
                    cursor: 'pointer',
                    marginLeft: '5px',
                    fontWeight: '500'
                  }}
                  onClick={() => {
                    setShowLoginModal(false);
                    setShowSignUpModal(true);
                  }}
                >
                  Sign Up
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App