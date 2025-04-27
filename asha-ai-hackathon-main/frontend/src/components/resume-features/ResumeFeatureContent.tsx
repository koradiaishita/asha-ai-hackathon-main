import React from 'react';

interface ResumeFeatureContentProps {
  title: string;
  description: string;
  icon: string;
  children?: React.ReactNode;
}

export function ResumeFeatureContent({ 
  title, 
  description, 
  icon,
  children 
}: ResumeFeatureContentProps) {
  return (
    <section className="featured-jobs">
      <h2>{title}</h2>
      <div className="job-card" style={{ padding: "25px" }}>
        <div className="job-info">
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <div style={{ fontSize: "30px", marginRight: "15px" }}>{icon}</div>
            <h3 className="job-title">{title}</h3>
          </div>
          <p style={{ marginBottom: "20px", color: "var(--text-gray)" }}>
            {description}
          </p>
          
          {children}
        </div>
      </div>
    </section>
  );
}