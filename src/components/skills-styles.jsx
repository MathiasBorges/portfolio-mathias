import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styled from "styled-components";
import { FiCode, FiDatabase, FiTool, FiGitBranch } from "react-icons/fi";
import { skillsData } from "../data/skills";

const SkillsSection = styled.section`
  padding: 120px 20px;
  background: linear-gradient(135deg, #0c0c1a 0%, #141425 50%, #0f1117 100%);
  color: #e2e8f0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 25% 75%, rgba(0, 255, 224, 0.04) 0%, transparent 50%),
      radial-gradient(circle at 75% 25%, rgba(0, 191, 166, 0.04) 0%, transparent 50%);
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 2.6rem);
  font-weight: 700;
  margin-bottom: 60px;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  
  svg {
    color: #00ffe0;
  }
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 1100px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const SkillCategory = styled(motion.div)`
  background: linear-gradient(145deg, rgba(26, 26, 45, 0.8), rgba(20, 20, 37, 0.7));
  padding: 28px;
  border-radius: 16px;
  border: 1px solid rgba(0, 255, 224, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ffe0, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    border-color: rgba(0, 255, 224, 0.3);
    transform: translateY(-6px);
    box-shadow: 0 15px 35px rgba(0, 255, 224, 0.15);
    
    &::before {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const CategoryIcon = styled(motion.div)`
  width: 52px;
  height: 52px;
  background: rgba(0, 255, 224, 0.1);
  border: 1px solid rgba(0, 255, 224, 0.2);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: #00ffe0;
  transition: all 0.3s ease;
  
  ${SkillCategory}:hover & {
    background: rgba(0, 255, 224, 0.15);
    border-color: rgba(0, 255, 224, 0.4);
    transform: scale(1.05) rotate(5deg);
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 20px;
  line-height: 1.3;
`;

const SkillsList = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: auto;
`;

const SkillTag = styled(motion.span)`
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  padding: 8px 14px;
  font-size: 0.85rem;
  font-weight: 500;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  white-space: nowrap;
  cursor: default;

  &:hover {
    background: rgba(0, 255, 224, 0.1);
    border-color: rgba(0, 255, 224, 0.3);
    color: #00ffe0;
    transform: translateY(-1px);
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2
    }
  }
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

// Map titles to icons
const getIcon = (title) => {
  switch (title) {
    case "Frontend": return <FiCode size={26} />;
    case "Backend & Database": return <FiDatabase size={26} />;
    case "Ferramentas": return <FiTool size={26} />;
    case "Outros": return <FiGitBranch size={26} />;
    default: return <FiCode size={26} />;
  }
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SkillsSection id="skills" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FiCode size={32} /> Habilidades
        </SectionTitle>

        <SkillsGrid
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillsData.map((category, index) => (
            <SkillCategory key={index} variants={itemVariants}>
              <CategoryIcon
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {getIcon(category.title)}
              </CategoryIcon>
              <CategoryTitle>{category.title}</CategoryTitle>
              <SkillsList
                variants={listVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {category.skills.map((skill, skillIndex) => (
                  <SkillTag
                    key={skillIndex}
                    variants={tagVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill}
                  </SkillTag>
                ))}
              </SkillsList>
            </SkillCategory>
          ))}
        </SkillsGrid>
      </Container>
    </SkillsSection>
  );
};

export default Skills;