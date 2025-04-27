import React, { useState, useEffect } from 'react';
import '../App.css';
import '../pages/BackToHome.css';
import { jobsData } from '../data/jobsData';

// Import Material UI icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

function Careers() {
  const [filteredJobs, setFilteredJobs] = useState(jobsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedMode, setSelectedMode] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<number[]>([]);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  // Navigation handler to go back to home
  const navigateToHome = () => {
    window.location.href = '/';
  };

  // Effect to filter jobs based on search and filters
  useEffect(() => {
    let results = jobsData;
    
    // Apply search term filter
    if (searchTerm) {
      results = results.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply location filter
    if (selectedLocation) {
      results = results.filter(job => job.location === selectedLocation);
    }
    
    // Apply work mode filter
    if (selectedMode) {
      results = results.filter(job => job.mode === selectedMode);
    }
    
    // Apply experience filter
    if (selectedExperience) {
      results = results.filter(job => {
        const jobExp = parseInt(job.experience.split('-')[0]);
        const filterExp = parseInt(selectedExperience.split('-')[0]);
        return jobExp >= filterExp;
      });
    }
    
    // Apply tags filter
    if (selectedTags.length > 0) {
      results = results.filter(job => 
        selectedTags.some(tag => job.tags.includes(tag))
      );
    }
    
    setFilteredJobs(results);
  }, [searchTerm, selectedLocation, selectedMode, selectedExperience, selectedTags]);

  // Handle search input submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled in the useEffect
  };

  // Handle bookmark button click
  const handleBookmark = (jobId: number) => {
    setBookmarkedJobs(prev => {
      if (prev.includes(jobId)) {
        return prev.filter(id => id !== jobId);
      } else {
        return [...prev, jobId];
      }
    });
  };

  // Handle apply button click
  const handleApply = (job: any) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
    window.scrollTo(0, 0);
  };

  // Handle filter reset
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSelectedMode('');
    setSelectedExperience('');
    setSelectedTags([]);
  };

  // Get unique locations for filter
  const locations = [...new Set(jobsData.map(job => job.location))];
  
  // Get unique work modes for filter
  const workModes = [...new Set(jobsData.map(job => job.mode))];
  
  // Get unique experience ranges for filter
  const experienceRanges = [...new Set(jobsData.map(job => job.experience))];
  
  // Get unique tags for filter
  const allTags = [...new Set(jobsData.flatMap(job => job.tags))];

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for applying to the ${selectedJob?.title} position at ${selectedJob?.company}! Your application has been submitted successfully. We will review your profile and get back to you soon.`);
    setShowApplicationForm(false);
    setSelectedJob(null);
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
            placeholder="Search jobs, skills or companies" 
            className="search-input" 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="search-icon" fontSize="small" />
        </form>
        <button className="sign-up-btn">Sign Up</button>
      </header>

      <div className="content-container">
        {/* Main Content */}
        <main className="main-content" style={{ flex: 1, padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <span 
              onClick={navigateToHome} 
              style={{ 
                cursor: 'pointer',
                marginRight: '10px',
                fontSize: '24px',
                display: 'inline-block',
                width: '30px',
                height: '30px',
                lineHeight: '30px',
                textAlign: 'center',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                background: 'transparent',
                color: 'var(--primary)'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'var(--primary-light)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              ←
            </span>
            <h2>Career Opportunities</h2>
          </div>

          {showApplicationForm && selectedJob ? (
            <div style={{ 
              background: '#fff',
              borderRadius: '8px',
              padding: '25px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              marginBottom: '20px'
            }}>
              <div style={{ 
                background: 'var(--primary-light)',
                padding: '15px',
                borderRadius: '6px',
                marginBottom: '20px'
              }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '5px' }}>
                  Applying for: {selectedJob.title}
                </h3>
                <p>
                  {selectedJob.company} • {selectedJob.location} • {selectedJob.mode} • {selectedJob.experience}
                </p>
              </div>

              <h3 style={{ marginBottom: '20px' }}>Complete Your Application</h3>
              
              <form onSubmit={handleFormSubmit} style={{ 
                backgroundColor: 'rgba(236, 242, 255, 0.7)', 
                padding: '20px', 
                borderRadius: '8px',
                border: '1px solid #dbe4ff'
              }}>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                    Full Name
                  </label>
                  <input 
                    type="text"
                    required
                    style={{ 
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--border-light)',
                      borderRadius: '4px'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                    Email Address
                  </label>
                  <input 
                    type="email"
                    required
                    style={{ 
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--border-light)',
                      borderRadius: '4px'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                    Phone Number
                  </label>
                  <input 
                    type="tel"
                    required
                    style={{ 
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--border-light)',
                      borderRadius: '4px'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                    Upload your resume
                  </label>
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    required
                    style={{ 
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--border-light)',
                      borderRadius: '4px'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                    Why are you interested in this position?
                  </label>
                  <textarea 
                    rows={4}
                    required
                    style={{ 
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--border-light)',
                      borderRadius: '4px',
                      fontFamily: 'inherit'
                    }}
                    placeholder="Share why you're interested in this role and what makes you a good fit..."
                  ></textarea>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                    Availability to start
                  </label>
                  <select
                    required
                    style={{ 
                      width: '100%',
                      padding: '10px',
                      border: '1px solid var(--border-light)',
                      borderRadius: '4px'
                    }}
                  >
                    <option value="">Select your availability</option>
                    <option value="immediately">Immediately</option>
                    <option value="2weeks">2 weeks notice</option>
                    <option value="1month">1 month notice</option>
                    <option value="2months">2+ months notice</option>
                  </select>
                </div>
                
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', fontWeight: '500' }}>
                    <input
                      type="checkbox"
                      required
                      style={{ marginRight: '8px' }}
                    />
                    I agree to receive job-related communications
                  </label>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button 
                    type="button"
                    style={{ 
                      padding: '10px 20px',
                      background: 'transparent',
                      color: 'var(--primary)',
                      border: '1px solid var(--primary)',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setShowApplicationForm(false);
                      setSelectedJob(null);
                    }}
                  >
                    Back to Jobs
                  </button>
                  
                  <button 
                    type="submit"
                    style={{ 
                      padding: '10px 20px',
                      background: 'var(--primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              {/* Filter Section */}
              <div style={{ 
                background: '#fff',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FilterListIcon style={{ marginRight: '8px', color: 'var(--primary)' }} />
                    <h3 style={{ margin: 0 }}>Filters</h3>
                  </div>
                  <button 
                    onClick={handleResetFilters}
                    style={{ 
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--primary)',
                      cursor: 'pointer',
                      fontSize: '14px',
                      textDecoration: 'underline'
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                  {/* Location Filter */}
                  <div style={{ flex: '1 1 200px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px' }}>
                      <LocationOnIcon style={{ fontSize: '16px', verticalAlign: 'middle', marginRight: '4px' }} />
                      Location
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={e => setSelectedLocation(e.target.value)}
                      style={{ 
                        width: '100%',
                        padding: '8px',
                        border: '1px solid var(--border-light)',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    >
                      <option value="">All Locations</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Work Mode Filter */}
                  <div style={{ flex: '1 1 200px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px' }}>
                      <WorkIcon style={{ fontSize: '16px', verticalAlign: 'middle', marginRight: '4px' }} />
                      Work Mode
                    </label>
                    <select
                      value={selectedMode}
                      onChange={e => setSelectedMode(e.target.value)}
                      style={{ 
                        width: '100%',
                        padding: '8px',
                        border: '1px solid var(--border-light)',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    >
                      <option value="">All Work Modes</option>
                      {workModes.map(mode => (
                        <option key={mode} value={mode}>{mode}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Experience Filter */}
                  <div style={{ flex: '1 1 200px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px' }}>
                      <ScheduleIcon style={{ fontSize: '16px', verticalAlign: 'middle', marginRight: '4px' }} />
                      Experience
                    </label>
                    <select
                      value={selectedExperience}
                      onChange={e => setSelectedExperience(e.target.value)}
                      style={{ 
                        width: '100%',
                        padding: '8px',
                        border: '1px solid var(--border-light)',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    >
                      <option value="">Any Experience</option>
                      {experienceRanges.map(exp => (
                        <option key={exp} value={exp}>{exp}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Skills/Tags Filter */}
                <div style={{ marginTop: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>
                    <LocalOfferIcon style={{ fontSize: '16px', verticalAlign: 'middle', marginRight: '4px' }} />
                    Skills
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {allTags.slice(0, 15).map(tag => (
                      <div 
                        key={tag} 
                        onClick={() => {
                          if (selectedTags.includes(tag)) {
                            setSelectedTags(prev => prev.filter(t => t !== tag));
                          } else {
                            setSelectedTags(prev => [...prev, tag]);
                          }
                        }}
                        style={{ 
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '13px',
                          cursor: 'pointer',
                          backgroundColor: selectedTags.includes(tag) ? 'var(--primary)' : 'var(--primary-light)',
                          color: selectedTags.includes(tag) ? 'white' : 'var(--primary)',
                          border: selectedTags.includes(tag) ? 'none' : '1px solid var(--primary-light)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Jobs Listing */}
              <div style={{ 
                background: '#fff',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>
                    Available Jobs 
                    <span style={{ fontSize: '14px', color: 'var(--text-gray)', marginLeft: '8px' }}>
                      ({filteredJobs.length} results)
                    </span>
                  </span>
                  {searchTerm && (
                    <span style={{ fontSize: '14px', color: 'var(--text-gray)' }}>
                      Search results for: "{searchTerm}"
                    </span>
                  )}
                </h3>

                {filteredJobs.length === 0 ? (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '30px', 
                    color: 'var(--text-gray)'
                  }}>
                    <p style={{ marginBottom: '15px' }}>No jobs found matching your criteria.</p>
                    <button 
                      onClick={handleResetFilters}
                      style={{ 
                        padding: '8px 15px',
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {filteredJobs.map(job => (
                      <div key={job.id} className="job-card" style={{ 
                        border: '1px solid var(--border-light)',
                        borderRadius: '8px',
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        position: 'relative'
                      }}>
                        <div className="company-logo" style={{ marginRight: '15px' }}>
                          <div style={{ 
                            width: '50px',
                            height: '50px',
                            borderRadius: '8px',
                            backgroundColor: 'var(--primary-light)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px',
                            color: 'var(--primary)',
                            fontWeight: 'bold'
                          }}>
                            {job.company.charAt(0)}
                          </div>
                        </div>
                        
                        <div className="job-info" style={{ flex: 1 }}>
                          <h3 className="job-title" style={{ color: 'var(--primary)', marginBottom: '5px' }}>
                            {job.title}
                          </h3>
                          <h4 className="company-name" style={{ marginBottom: '10px', color: 'var(--text-gray)', fontWeight: 'normal' }}>
                            {job.company}
                          </h4>
                          <p className="job-location" style={{ marginBottom: '10px', fontSize: '14px', color: 'var(--text-gray)' }}>
                            {job.location} • {job.mode} • {job.experience}
                          </p>
                          <div className="job-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
                            {job.tags.map(tag => (
                              <span key={tag} style={{ 
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                backgroundColor: '#f0f0f0',
                                color: 'var(--text-gray)'
                              }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                          <span className="newly-added" style={{ 
                            display: 'inline-block',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            backgroundColor: 'var(--primary-light)',
                            color: 'var(--primary)',
                            fontWeight: 'bold'
                          }}>
                            {job.badge}
                          </span>
                        </div>
                        
                        <div className="job-actions" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                          <BookmarkBorderIcon 
                            className="bookmark-btn" 
                            onClick={() => handleBookmark(job.id)} 
                            style={{ 
                              cursor: 'pointer',
                              color: bookmarkedJobs.includes(job.id) ? 'var(--primary)' : 'inherit',
                              fill: bookmarkedJobs.includes(job.id) ? 'var(--primary)' : 'none'
                            }} 
                          />
                          <button 
                            className="apply-btn" 
                            onClick={() => handleApply(job)}
                            style={{ 
                              padding: '8px 15px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                              backgroundColor: 'var(--primary)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            <FlashOnIcon style={{ fontSize: '16px' }} />
                            Easy Apply
                          </button>
                        </div>
                        
                        {/* Posted date - can be added from actual data in the future */}
                        <div style={{ 
                          position: 'absolute', 
                          top: '10px', 
                          right: '10px',
                          fontSize: '12px',
                          color: 'var(--text-gray)'
                        }}>
                          Posted 3 days ago
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Application Tips Section */}
          {!showApplicationForm && (
            <div style={{ 
              marginTop: '20px',
              background: '#fff',
              borderRadius: '8px',
              padding: '25px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ marginBottom: '15px' }}>Application Tips from Asha AI</h3>
              
              <div style={{ 
                padding: '15px',
                backgroundColor: 'var(--primary-light)',
                borderRadius: '8px',
                marginBottom: '15px'
              }}>
                <p style={{ marginBottom: '10px', fontSize: '15px' }}>
                  <strong>Struggling with your job applications?</strong> Ask Asha AI for help with:
                </p>
                <ul style={{ paddingLeft: '20px' }}>
                  <li style={{ marginBottom: '5px' }}>Resume tailoring for specific jobs</li>
                  <li style={{ marginBottom: '5px' }}>Cover letter writing assistance</li>
                  <li style={{ marginBottom: '5px' }}>Interview preparation tips</li>
                  <li style={{ marginBottom: '5px' }}>Skill gap analysis for career growth</li>
                </ul>
                <p style={{ marginTop: '10px', fontSize: '14px' }}>
                  Click the chat icon in the bottom right corner to start a conversation with Asha!
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Careers;
