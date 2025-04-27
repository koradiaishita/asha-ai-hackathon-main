import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ResumeAI from './pages/ResumeAI.tsx'
import ProjectIdeasAI from './pages/ProjectIdeasAI.tsx'
import InterviewReadyAI from './pages/InterviewReadyAI.tsx'
import SkillUpAI from './pages/SkillUpAI.tsx'
import UpskillNavigator from './pages/UpskillNavigator.tsx'
import MentorMatchAI from './pages/MentorMatchAI.tsx'
import Careers from './pages/Careers.tsx'

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/resume-ai" element={<ResumeAI />} />
        <Route path="/project-ideas-ai" element={<ProjectIdeasAI />} />
        <Route path="/interview-ready-ai" element={<InterviewReadyAI />} />
        <Route path="/skillup-ai" element={<SkillUpAI />} />
        <Route path="/upskill-navigator" element={<UpskillNavigator />} />
        <Route path="/mentor-match-ai" element={<MentorMatchAI />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
