import React from 'react';

interface ProjectRecommendationsProps {
  onViewAllClick: () => void;
}

export const ProjectRecommendations: React.FC<ProjectRecommendationsProps> = ({ onViewAllClick }) => {
  return (
    <div className="recommendations-card">
      <h2 className="card-title">Project Recommendations</h2>
      <p className="card-subtitle">
        Boost your portfolio with these industry-relevant projects
      </p>
      
      <div className="project-preview">
        <div className="project-item">
          <h4>Personal Portfolio Website</h4>
          <p>Create a responsive website to showcase your skills and projects</p>
          <div className="project-tags">
            <span>Beginner</span>
            <span>Web Development</span>
          </div>
        </div>
        
        <div className="project-item">
          <h4>Data Visualization Dashboard</h4>
          <p>Build an interactive dashboard with real-world data analysis</p>
          <div className="project-tags">
            <span>Intermediate</span>
            <span>Data Analysis</span>
          </div>
        </div>
      </div>
      
      <button 
        className="view-all-btn"
        onClick={onViewAllClick}
      >
        View All Projects
      </button>
    </div>
  );
};