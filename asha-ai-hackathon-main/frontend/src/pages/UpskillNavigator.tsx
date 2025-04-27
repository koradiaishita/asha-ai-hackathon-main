import { useState } from 'react';
import '../App.css';

function UpskillNavigator() {
  // States for courses and course interactions
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [courseEnrollments, setCourseEnrollments] = useState<string[]>([]);

  // Add a navigation handler that will be implemented when router is installed
  const navigateToHome = () => {
    window.location.href = '/'; // Simple navigation without router
  };

  // Handle Browse Courses button click
  const handleBrowseCourses = () => {
    // Scroll to the Featured Courses section
    const coursesSection = document.querySelector('.featured-jobs h2:contains("Featured Courses")');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert("Explore our featured courses to enhance your skills!");
    }
  };

  // Handle Enroll Now button click for a specific course
  const handleEnrollNow = (courseName: string) => {
    // Check if course is already enrolled
    if (courseEnrollments.includes(courseName)) {
      alert(`You are already enrolled in ${courseName}!`);
    } else {
      // Add course to enrollments
      setCourseEnrollments([...courseEnrollments, courseName]);
      alert(`Successfully enrolled in ${courseName}! Your learning journey begins now.`);
    }
  };

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    alert(`You selected the ${category} category. Showing ${category} courses...`);
    // In a real app, this would filter courses by category
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
              <li className="nav-item">
                <span className="nav-icon mic-icon"></span>
                <span className="nav-text">Resume AI</span>
              </li>
              <li className="nav-item active">
                <span className="nav-icon briefcase-icon"></span>
                <span className="nav-text">Upskill Navigator</span>
              </li>
              <li className="nav-item">
                <span className="nav-icon building-icon"></span>
                <span className="nav-text">Companies</span>
              </li>
              <li className="nav-item">
                <span className="nav-icon group-icon"></span>
                <span className="nav-text">Community</span>
              </li>
              <li className="nav-item">
                <span className="nav-icon post-icon"></span>
                <span className="nav-text">Career Resources</span>
              </li>
              <li className="nav-item">
                <span className="nav-icon network-icon"></span>
                <span className="nav-text">Mentorship</span>
              </li>
              <li className="nav-item">
                <span className="nav-icon calendar-icon"></span>
                <span className="nav-text">Events</span>
              </li>
              <li className="nav-item">
                <span className="nav-icon grid-icon"></span>
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
          {/* Upskill Navigator Hero Section */}
          <section className="featured-jobs">
            <h2>Master In-Demand Skills</h2>
            <div className="job-card" style={{ 
              padding: "30px", 
              background: "linear-gradient(to right, var(--primary-light), #f0f7ff)",
              borderRadius: "10px" 
            }}>
              <div className="job-info">
                <h3 className="job-title" style={{ fontSize: "24px", marginBottom: "15px" }}>
                  Access premium courses and start your learning journey
                </h3>
                <p style={{ marginBottom: "20px", fontSize: "16px", color: "var(--text-gray)" }}>
                  Gain in-demand skills that employers are looking for and advance your career with our curated learning paths.
                </p>
                <div style={{ display: "flex", gap: "15px" }}>
                  <button 
                    className="update-btn" 
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      background: "var(--primary)", 
                      borderRadius: "8px",
                      padding: "12px 25px",
                      fontSize: "16px"
                    }}
                    onClick={handleBrowseCourses}
                  >
                    <span>Browse Courses</span>
                    <span style={{ marginLeft: "10px", fontSize: "18px" }}>→</span>
                  </button>
                  <button 
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      background: "transparent", 
                      border: "1px solid var(--primary)",
                      color: "var(--primary)",
                      borderRadius: "8px",
                      padding: "12px 25px",
                      fontSize: "16px",
                      cursor: "pointer"
                    }}
                  >
                    <span>Take Skill Assessment</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Career Roadmap Section */}
          <section className="featured-jobs">
            <h2>Create Your Career Roadmap</h2>
            <div className="job-card" style={{ padding: "25px", marginBottom: "20px" }}>
              <p style={{ marginBottom: "15px", fontSize: "14px", color: "var(--text-gray)" }}>
                Get a personalized career development path with skills to acquire and milestones to achieve. 
                Our AI analyzes your current skills, experience, and career goals to create a personalized 
                roadmap for your professional development.
              </p>
            </div>

            <div className="job-card" style={{ 
              padding: "25px",
              background: "var(--primary-light)", 
              borderRadius: "8px",
              marginBottom: "20px" 
            }}>
              <h4 style={{ marginBottom: "15px", fontSize: "16px" }}>Your Career Roadmap Includes:</h4>
              <ul style={{ 
                marginLeft: "20px", 
                marginBottom: "20px", 
                fontSize: "14px", 
                color: "var(--text-gray)",
                listStyleType: "disc" 
              }}>
                <li style={{ marginBottom: "8px" }}>Skill gap analysis for your target roles</li>
                <li style={{ marginBottom: "8px" }}>Recommended learning resources and certifications</li>
                <li style={{ marginBottom: "8px" }}>Timeline with achievable milestones</li>
                <li style={{ marginBottom: "8px" }}>Industry trends and emerging skills in your field</li>
                <li style={{ marginBottom: "8px" }}>Alternative career paths based on your transferable skills</li>
              </ul>
            </div>
              
            <div className="job-card" style={{ padding: "25px" }}>
              <h4 style={{ marginBottom: "10px", fontSize: "16px" }}>Enter Your Current and Target Job Titles:</h4>
              <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
                <input 
                  type="text" 
                  placeholder="Current job title, e.g., Software Developer" 
                  style={{ 
                    flex: 1,
                    padding: "10px", 
                    borderRadius: "5px",
                    border: "1px solid var(--border-light)" 
                  }}
                />
                <input 
                  type="text" 
                  placeholder="Target job title, e.g., Data Analyst" 
                  style={{ 
                    flex: 1,
                    padding: "10px", 
                    borderRadius: "5px",
                    border: "1px solid var(--border-light)" 
                  }}
                />
              </div>
              
              <button 
                className="update-btn" 
                style={{ 
                  background: "var(--primary)", 
                  borderRadius: "8px",
                  padding: "10px 20px"
                }}
              >
                Generate Career Roadmap
              </button>
              
              {/* Sample Career Roadmap Result */}
              <div style={{ 
                marginTop: "25px", 
                border: "1px solid var(--border-light)", 
                borderRadius: "8px", 
                padding: "25px" 
              }}>
                <h3 style={{ marginBottom: "20px", fontSize: "18px", textAlign: "center" }}>Your Career Roadmap:</h3>
                
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(3, 1fr)", 
                  gap: "15px", 
                  marginBottom: "25px",
                  background: "#f9f9f9",
                  padding: "15px",
                  borderRadius: "8px"
                }}>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "bold" }}>Current Role:</p>
                    <p style={{ fontSize: "16px" }}>Software Developer</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "bold" }}>Target Role:</p>
                    <p style={{ fontSize: "16px" }}>Data Analyst</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "bold" }}>Estimated Time:</p>
                    <p style={{ fontSize: "16px" }}>2-3 years</p>
                  </div>
                </div>
                
                <div style={{ marginBottom: "25px" }}>
                  <h4 style={{ 
                    marginBottom: "15px", 
                    fontSize: "16px", 
                    borderBottom: "1px solid var(--border-light)",
                    paddingBottom: "8px"
                  }}>Skill Gaps:</h4>
                  <ul style={{ 
                    listStyleType: "disc", 
                    paddingLeft: "25px", 
                    fontSize: "14px",
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "8px 20px"
                  }}>
                    <li>Advanced data analytics</li>
                    <li>Project management certification</li>
                    <li>Leadership experience</li>
                    <li>Strategic planning</li>
                    <li>Industry-specific knowledge</li>
                  </ul>
                </div>
                
                <div style={{ marginBottom: "25px" }}>
                  <h4 style={{ 
                    marginBottom: "15px", 
                    fontSize: "16px", 
                    borderBottom: "1px solid var(--border-light)",
                    paddingBottom: "8px"
                  }}>Milestones:</h4>
                  
                  <div style={{ marginBottom: "20px" }}>
                    <h5 style={{ 
                      fontWeight: "bold", 
                      marginBottom: "10px", 
                      fontSize: "15px",
                      backgroundColor: "#f0f7ff",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      display: "inline-block"
                    }}>Short-term (0-6 months)</h5>
                    <ul style={{ 
                      listStyleType: "disc", 
                      paddingLeft: "25px", 
                      fontSize: "14px",
                      lineHeight: "1.6"
                    }}>
                      <li>Complete a certified project management course</li>
                      <li>Take on a team leadership role in current position</li>
                      <li>Develop data analysis skills through online courses</li>
                      <li>Network with professionals in target role</li>
                      <li>Create 2-3 portfolio projects demonstrating key skills</li>
                    </ul>
                  </div>
                  
                  <div style={{ marginBottom: "20px" }}>
                    <h5 style={{ 
                      fontWeight: "bold", 
                      marginBottom: "10px", 
                      fontSize: "15px",
                      backgroundColor: "#fff8e1",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      display: "inline-block"
                    }}>Mid-term (6-18 months)</h5>
                    <ul style={{ 
                      listStyleType: "disc", 
                      paddingLeft: "25px", 
                      fontSize: "14px",
                      lineHeight: "1.6"
                    }}>
                      <li>Obtain relevant industry certification</li>
                      <li>Seek a role with more responsibility in current field</li>
                      <li>Contribute to cross-functional projects to build experience</li>
                      <li>Develop mentorship relationships with senior professionals</li>
                      <li>Present at industry events or webinars to build visibility</li>
                    </ul>
                  </div>
                  
                  <div style={{ marginBottom: "20px" }}>
                    <h5 style={{ 
                      fontWeight: "bold", 
                      marginBottom: "10px", 
                      fontSize: "15px",
                      backgroundColor: "#f1f8e9",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      display: "inline-block"
                    }}>Long-term (18+ months)</h5>
                    <ul style={{ 
                      listStyleType: "disc", 
                      paddingLeft: "25px", 
                      fontSize: "14px",
                      lineHeight: "1.6"
                    }}>
                      <li>Apply for transitional roles that bridge current and target positions</li>
                      <li>Complete advanced training specific to target role</li>
                      <li>Build a portfolio showcasing relevant accomplishments</li>
                      <li>Develop expertise in emerging industry trends</li>
                      <li>Target companies with clear advancement paths to your goal</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 style={{ 
                    marginBottom: "15px", 
                    fontSize: "16px", 
                    borderBottom: "1px solid var(--border-light)",
                    paddingBottom: "8px"
                  }}>Recommended Resources:</h4>
                  <ul style={{ 
                    listStyleType: "disc", 
                    paddingLeft: "25px", 
                    fontSize: "14px",
                    lineHeight: "1.6"
                  }}>
                    <li>LinkedIn Learning: 'Path to becoming a Data Analyst'</li>
                    <li>Coursera Professional Certificate in related field</li>
                    <li>Industry-specific conferences and networking events</li>
                    <li>Professional association membership</li>
                    <li>Recommended books and thought leaders to follow</li>
                  </ul>
                </div>
                
                <div style={{ marginTop: "25px", textAlign: "center" }}>
                  <button 
                    className="update-btn" 
                    style={{ 
                      padding: "10px 20px", 
                      fontSize: "15px",
                      borderRadius: "8px"
                    }}
                  >
                    Download Career Roadmap
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="featured-jobs">
            <h2>Our Learning Impact</h2>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(4, 1fr)", 
              gap: "15px", 
              marginTop: "15px" 
            }}>
              <div className="job-card" style={{ 
                padding: "25px", 
                textAlign: "center",
                border: "1px solid #e6f2ff",
                boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
                transition: "transform 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 3px 10px rgba(0,0,0,0.05)";
              }}>
                <div style={{ fontSize: "36px", marginBottom: "15px", color: "var(--primary)" }}>⏱️</div>
                <h3 style={{ marginBottom: "10px", fontSize: "18px", color: "#333" }}>Learning Hours</h3>
                <p style={{ fontSize: "28px", fontWeight: "bold", color: "var(--primary)" }}>2k+</p>
                <p style={{ fontSize: "14px", color: "var(--text-gray)", marginTop: "5px" }}>Hours of quality content</p>
              </div>
              
              <div className="job-card" style={{ 
                padding: "25px", 
                textAlign: "center",
                border: "1px solid #e6f2ff",
                boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
                transition: "transform 0.3s ease",
                cursor: "pointer"
              }}>
                <div style={{ fontSize: "36px", marginBottom: "15px", color: "var(--primary)" }}>🏆</div>
                <h3 style={{ marginBottom: "10px", fontSize: "18px", color: "#333" }}>Success Stories</h3>
                <p style={{ fontSize: "28px", fontWeight: "bold", color: "var(--primary)" }}>50+</p>
                <p style={{ fontSize: "14px", color: "var(--text-gray)", marginTop: "5px" }}>Career transformations</p>
              </div>
              
              <div className="job-card" style={{ 
                padding: "25px", 
                textAlign: "center",
                border: "1px solid #e6f2ff",
                boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
                transition: "transform 0.3s ease",
                cursor: "pointer"
              }}>
                <div style={{ fontSize: "36px", marginBottom: "15px", color: "var(--primary)" }}>📚</div>
                <h3 style={{ marginBottom: "10px", fontSize: "18px" }}>Topics</h3>
                <p style={{ fontSize: "28px", fontWeight: "bold", color: "var(--primary)" }}>15+</p>
                <p style={{ fontSize: "14px", color: "var(--text-gray)", marginTop: "5px" }}>In-demand skill areas</p>
              </div>
              
              <div className="job-card" style={{ 
                padding: "25px", 
                textAlign: "center",
                border: "1px solid #e6f2ff",
                boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
                transition: "transform 0.3s ease",
                cursor: "pointer"
              }}>
                <div style={{ fontSize: "36px", marginBottom: "15px", color: "var(--primary)" }}>💫</div>
                <h3 style={{ marginBottom: "10px", fontSize: "18px", color: "#333" }}>Avg. Salary Hike</h3>
                <p style={{ fontSize: "28px", fontWeight: "bold", color: "var(--primary)" }}>3.2x</p>
                <p style={{ fontSize: "14px", color: "var(--text-gray)", marginTop: "5px" }}>After completing courses</p>
              </div>
            </div>
          </section>

          {/* Featured Courses */}
          <section className="featured-jobs">
            <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2>Featured Courses</h2>
              <span style={{ color: "var(--primary)", cursor: "pointer", display: "flex", alignItems: "center" }}>
                View all courses <span style={{ marginLeft: "5px", fontSize: "18px" }}>→</span>
              </span>
            </div>
            
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(3, 1fr)", 
              gap: "20px"
            }}>
              {/* Course Card 1 */}
              <div className="job-card" style={{ 
                padding: "0", 
                overflow: "hidden", 
                border: "1px solid #eee",
                borderRadius: "10px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
                <div style={{ 
                  height: "160px", 
                  background: "linear-gradient(135deg, #4b6cb7, #182848)", 
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <div style={{ fontSize: "50px" }}>📊</div>
                  <div style={{ 
                    position: "absolute", 
                    top: "15px", 
                    right: "15px", 
                    background: "#fff", 
                    borderRadius: "20px", 
                    padding: "5px 12px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    boxShadow: "0 3px 8px rgba(0,0,0,0.1)"
                  }}>
                    Bestseller
                  </div>
                </div>
                <div style={{ padding: "20px" }}>
                  <span style={{ 
                    fontSize: "12px", 
                    background: "#f0f7ff", 
                    color: "var(--primary)", 
                    padding: "3px 10px", 
                    borderRadius: "12px",
                    display: "inline-block",
                    marginBottom: "10px"
                  }}>
                    Data Science
                  </span>
                  <h3 style={{ marginBottom: "10px", fontSize: "18px" }}>Data Science Fundamentals</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)", marginBottom: "15px", lineHeight: "1.5" }}>
                    Learn the basics of data analysis, visualization, and machine learning fundamentals
                  </p>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                    <span style={{ marginRight: "10px", color: "#ffb400", fontSize: "16px" }}>★★★★☆</span>
                    <span style={{ fontSize: "13px", color: "var(--text-gray)" }}>4.2 (1.2k reviews)</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>₹2,499</span>
                    <button className="update-btn" style={{ padding: "8px 15px", fontSize: "14px", borderRadius: "6px" }} onClick={() => handleEnrollNow('Data Science Fundamentals')}>Enroll Now</button>
                  </div>
                </div>
              </div>
              
              {/* Course Card 2 */}
              <div className="job-card" style={{ 
                padding: "0", 
                overflow: "hidden", 
                border: "1px solid #eee",
                borderRadius: "10px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
                <div style={{ 
                  height: "160px", 
                  background: "linear-gradient(135deg, #667eea, #764ba2)", 
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <div style={{ fontSize: "50px" }}>💻</div>
                  <div style={{ 
                    position: "absolute", 
                    top: "15px", 
                    right: "15px", 
                    background: "#e8f5e9", 
                    borderRadius: "20px", 
                    padding: "5px 12px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#4caf50",
                    boxShadow: "0 3px 8px rgba(0,0,0,0.1)"
                  }}>
                    New
                  </div>
                </div>
                <div style={{ padding: "20px" }}>
                  <span style={{ 
                    fontSize: "12px", 
                    background: "#f0f7ff", 
                    color: "var(--primary)", 
                    padding: "3px 10px", 
                    borderRadius: "12px",
                    display: "inline-block",
                    marginBottom: "10px"
                  }}>
                    Web Development
                  </span>
                  <h3 style={{ marginBottom: "10px", fontSize: "18px" }}>Full-Stack Web Development</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)", marginBottom: "15px", lineHeight: "1.5" }}>
                    Master modern web development technologies from frontend to backend
                  </p>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                    <span style={{ marginRight: "10px", color: "#ffb400", fontSize: "16px" }}>★★★★★</span>
                    <span style={{ fontSize: "13px", color: "var(--text-gray)" }}>4.8 (856 reviews)</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>₹3,999</span>
                    <button className="update-btn" style={{ padding: "8px 15px", fontSize: "14px", borderRadius: "6px" }} onClick={() => handleEnrollNow('Full-Stack Web Development')}>Enroll Now</button>
                  </div>
                </div>
              </div>
              
              {/* Course Card 3 */}
              <div className="job-card" style={{ 
                padding: "0", 
                overflow: "hidden", 
                border: "1px solid #eee",
                borderRadius: "10px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
                <div style={{ 
                  height: "160px", 
                  background: "linear-gradient(135deg, #ff9a9e, #fad0c4)", 
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <div style={{ fontSize: "50px" }}>🎨</div>
                  <div style={{ 
                    position: "absolute", 
                    top: "15px", 
                    right: "15px", 
                    background: "#fff3e0", 
                    borderRadius: "20px", 
                    padding: "5px 12px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#ff9800",
                    boxShadow: "0 3px 8px rgba(0,0,0,0.1)"
                  }}>
                    Popular
                  </div>
                </div>
                <div style={{ padding: "20px" }}>
                  <span style={{ 
                    fontSize: "12px", 
                    background: "#f0f7ff", 
                    color: "var(--primary)", 
                    padding: "3px 10px", 
                    borderRadius: "12px",
                    display: "inline-block",
                    marginBottom: "10px"
                  }}>
                    Design
                  </span>
                  <h3 style={{ marginBottom: "10px", fontSize: "18px" }}>UX/UI Design Essentials</h3>
                  <p style={{ fontSize: "14px", color: "var(--text-gray)", marginBottom: "15px", lineHeight: "1.5" }}>
                    Create beautiful, user-friendly interfaces that delight users
                  </p>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                    <span style={{ marginRight: "10px", color: "#ffb400", fontSize: "16px" }}>★★★★☆</span>
                    <span style={{ fontSize: "13px", color: "var(--text-gray)" }}>4.5 (732 reviews)</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>₹2,999</span>
                    <button className="update-btn" style={{ padding: "8px 15px", fontSize: "14px", borderRadius: "6px" }} onClick={() => handleEnrollNow('UX/UI Design Essentials')}>Enroll Now</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Popular Categories */}
          <section className="featured-jobs">
            <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2>Popular Categories</h2>
              <span style={{ color: "var(--primary)", cursor: "pointer", display: "flex", alignItems: "center" }}>
                Explore all categories <span style={{ marginLeft: "5px", fontSize: "18px" }}>→</span>
              </span>
            </div>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(4, 1fr)", 
              gap: "20px",
              marginTop: "15px"
            }}>
              <div 
                className="job-card" 
                style={{ 
                  padding: "25px", 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  justifyContent: "center",
                  cursor: "pointer",
                  border: "1px solid #e6f2ff",
                  borderRadius: "10px",
                  background: selectedCategory === "Technology" ? "linear-gradient(to bottom, #e6f2ff, #ffffff)" : "linear-gradient(to bottom, #f8faff, #ffffff)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: selectedCategory === "Technology" ? "0 10px 20px rgba(0,0,0,0.08)" : "none"
                }}
                onClick={() => handleCategorySelect("Technology")}
              >
                <div style={{ 
                  fontSize: "40px", 
                  marginBottom: "15px",
                  background: "#f0f7ff",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>💻</div>
                <h3 style={{ textAlign: "center", fontSize: "16px", fontWeight: "600" }}>Technology</h3>
                <p style={{ fontSize: "14px", color: "var(--text-gray)", marginTop: "5px", textAlign: "center" }}>12 courses</p>
              </div>
              
              <div 
                className="job-card" 
                style={{ 
                  padding: "25px", 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  justifyContent: "center",
                  cursor: "pointer",
                  border: "1px solid #e6f2ff",
                  borderRadius: "10px",
                  background: selectedCategory === "Data Science" ? "linear-gradient(to bottom, #e6f2ff, #ffffff)" : "linear-gradient(to bottom, #f8faff, #ffffff)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: selectedCategory === "Data Science" ? "0 10px 20px rgba(0,0,0,0.08)" : "none"
                }}
                onClick={() => handleCategorySelect("Data Science")}
              >
                <div style={{ 
                  fontSize: "40px", 
                  marginBottom: "15px",
                  background: "#f0f7ff",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>📊</div>
                <h3 style={{ textAlign: "center", fontSize: "16px", fontWeight: "600" }}>Data Science</h3>
                <p style={{ fontSize: "14px", color: "var(--text-gray)", marginTop: "5px", textAlign: "center" }}>8 courses</p>
              </div>
              
              <div 
                className="job-card" 
                style={{ 
                  padding: "25px", 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  justifyContent: "center",
                  cursor: "pointer",
                  border: "1px solid #e6f2ff",
                  borderRadius: "10px",
                  background: selectedCategory === "Design" ? "linear-gradient(to bottom, #e6f2ff, #ffffff)" : "linear-gradient(to bottom, #f8faff, #ffffff)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: selectedCategory === "Design" ? "0 10px 20px rgba(0,0,0,0.08)" : "none"
                }}
                onClick={() => handleCategorySelect("Design")}
              >
                <div style={{ 
                  fontSize: "40px", 
                  marginBottom: "15px",
                  background: "#f0f7ff",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>🎨</div>
                <h3 style={{ textAlign: "center", fontSize: "16px", fontWeight: "600" }}>Design</h3>
                <p style={{ fontSize: "14px", color: "var(--text-gray)", marginTop: "5px", textAlign: "center" }}>10 courses</p>
              </div>
              
              <div 
                className="job-card" 
                style={{ 
                  padding: "25px", 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  justifyContent: "center",
                  cursor: "pointer",
                  border: "1px solid #e6f2ff",
                  borderRadius: "10px",
                  background: selectedCategory === "Marketing" ? "linear-gradient(to bottom, #e6f2ff, #ffffff)" : "linear-gradient(to bottom, #f8faff, #ffffff)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: selectedCategory === "Marketing" ? "0 10px 20px rgba(0,0,0,0.08)" : "none"
                }}
                onClick={() => handleCategorySelect("Marketing")}
              >
                <div style={{ 
                  fontSize: "40px", 
                  marginBottom: "15px",
                  background: "#f0f7ff",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>📱</div>
                <h3 style={{ textAlign: "center", fontSize: "16px", fontWeight: "600" }}>Marketing</h3>
                <p style={{ fontSize: "14px", color: "var(--text-gray)", marginTop: "5px", textAlign: "center" }}>7 courses</p>
              </div>
              
              <div 
                className="job-card" 
                style={{ 
                  padding: "25px", 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  justifyContent: "center",
                  cursor: "pointer",
                  border: "1px solid #e6f2ff",
                  borderRadius: "10px",
                  background: selectedCategory === "Finance" ? "linear-gradient(to bottom, #e6f2ff, #ffffff)" : "linear-gradient(to bottom, #f8faff, #ffffff)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: selectedCategory === "Finance" ? "0 10px 20px rgba(0,0,0,0.08)" : "none"
                }}
                onClick={() => handleCategorySelect("Finance")}
              >
                <div style={{ 
                  fontSize: "40px", 
                  marginBottom: "15px",
                  background: "#f0f7ff",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>📈</div>
                <h3 style={{ textAlign: "center", fontSize: "16px", fontWeight: "600" }}>Finance</h3>
                <p style={{ fontSize: "14px", color: "var(--text-gray)", marginTop: "5px", textAlign: "center" }}>6 courses</p>
              </div>
              
              <div 
                className="job-card" 
                style={{ 
                  padding: "25px", 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  justifyContent: "center",
                  cursor: "pointer",
                  border: "1px solid #e6f2ff",
                  borderRadius: "10px",
                  background: selectedCategory === "Leadership" ? "linear-gradient(to bottom, #e6f2ff, #ffffff)" : "linear-gradient(to bottom, #f8faff, #ffffff)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: selectedCategory === "Leadership" ? "0 10px 20px rgba(0,0,0,0.08)" : "none"
                }}
                onClick={() => handleCategorySelect("Leadership")}
              >
                <div style={{ 
                  fontSize: "40px", 
                  marginBottom: "15px",
                  background: "#f0f7ff",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>👩‍💼</div>
                <h3 style={{ textAlign: "center", fontSize: "16px", fontWeight: "600" }}>Leadership</h3>
                <p style={{ fontSize: "14px", color: "var(--text-gray)", marginTop: "5px", textAlign: "center" }}>5 courses</p>
              </div>
              
              <div 
                className="job-card" 
                style={{ 
                  padding: "25px", 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  justifyContent: "center",
                  cursor: "pointer",
                  border: "1px solid #e6f2ff",
                  borderRadius: "10px",
                  background: selectedCategory === "Research" ? "linear-gradient(to bottom, #e6f2ff, #ffffff)" : "linear-gradient(to bottom, #f8faff, #ffffff)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: selectedCategory === "Research" ? "0 10px 20px rgba(0,0,0,0.08)" : "none"
                }}
                onClick={() => handleCategorySelect("Research")}
              >
                <div style={{ 
                  fontSize: "40px", 
                  marginBottom: "15px",
                  background: "#f0f7ff",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>🔍</div>
                <h3 style={{ textAlign: "center", fontSize: "16px", fontWeight: "600" }}>Research</h3>
                <p style={{ fontSize: "14px", color: "var(--text-gray)", marginTop: "5px", textAlign: "center" }}>4 courses</p>
              </div>
              
              <div 
                className="job-card" 
                style={{ 
                  padding: "25px", 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  justifyContent: "center",
                  cursor: "pointer",
                  border: "1px solid #e6f2ff",
                  borderRadius: "10px",
                  background: selectedCategory === "HR" ? "linear-gradient(to bottom, #e6f2ff, #ffffff)" : "linear-gradient(to bottom, #f8faff, #ffffff)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: selectedCategory === "HR" ? "0 10px 20px rgba(0,0,0,0.08)" : "none"
                }}
                onClick={() => handleCategorySelect("HR")}
              >
                <div style={{ 
                  fontSize: "40px", 
                  marginBottom: "15px",
                  background: "#f0f7ff",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>👥</div>
                <h3 style={{ textAlign: "center", fontSize: "16px", fontWeight: "600" }}>HR</h3>
                <p style={{ fontSize: "14px", color: "var(--text-gray)", marginTop: "5px", textAlign: "center" }}>3 courses</p>
              </div>
            </div>
          </section>
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <div className="profile-card">
            <h2 className="profile-title">Your Learning Journey</h2>
            <div className="profile-image" style={{ height: "150px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p style={{ color: "var(--text-gray)" }}>No courses enrolled yet</p>
            </div>
            <button className="update-btn">Explore Courses</button>
          </div>

          <div className="career-break-card">
            <h2 className="card-title">Skill Assessment</h2>
            <p className="card-subtitle">
              Take our free skill assessment to discover your strengths and areas for improvement.
            </p>
            <p className="scholarship-text">15-minute assessment</p>
            <button className="update-btn" style={{ width: "100%", marginTop: "15px" }}>Start Assessment</button>
          </div>
          
          <div className="career-break-card" style={{ marginTop: "20px" }}>
            <h2 className="card-title">Learning Paths</h2>
            <p className="card-subtitle">
              Curated course sequences to master a specific role or technology
            </p>
            <div style={{ marginTop: "15px" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }}>
                <span style={{ marginRight: "10px", color: "var(--primary)" }}>→</span>
                <span>Data Scientist Path</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }}>
                <span style={{ marginRight: "10px", color: "var(--primary)" }}>→</span>
                <span>Full-Stack Developer Path</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }}>
                <span style={{ marginRight: "10px", color: "var(--primary)" }}>→</span>
                <span>Product Manager Path</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default UpskillNavigator;