import React, { Suspense, lazy } from 'react';
import NavbarComponent from "./components/navbar-styles";
import Hero from "./components/hero-styles";
import styled, { keyframes } from 'styled-components';

// Lazy load components below the fold
const About = lazy(() => import("./components/about-styles"));
const Experience = lazy(() => import("./components/experience-styles"));
const Skills = lazy(() => import("./components/skills-styles"));
const Projects = lazy(() => import("./components/projects-styles"));
const Contact = lazy(() => import("./components/contato-styles"));


// --- Styled Components for Loading ---

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0f1117;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(59, 130, 246, 0.1);
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
`;

const LoadingFallback = () => (
  <LoadingContainer>
    <Spinner />
  </LoadingContainer>
);

function App() {

  return (
    <div className="app">
      <NavbarComponent />
      <Hero />
      <Suspense fallback={<LoadingFallback />}>
        <About/>
        <Experience/>
        <Skills/>
        <Projects/>
        <Contact/>
      </Suspense>
    </div>
  );
}

export default App;
