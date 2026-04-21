import React, { useState, useRef, Suspense } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import styled from "styled-components";
import { Canvas, useFrame } from "@react-three/fiber";
import { FiBriefcase, FiBook, FiAward, FiChevronDown, FiMapPin, FiCalendar } from "react-icons/fi";
import { experienceData } from "../data/experience";

// ─── Styled Components ───────────────────────────────────────────────────────

const Section = styled.section`
  padding: 120px 8vw;
  background: var(--surface);
  position: relative;
  overflow: hidden;
`;

const SectionLabel = styled.div`
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;

  &::before {
    content: '';
    display: block;
    width: 28px;
    height: 1px;
    background: var(--accent);
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  color: var(--text);
  margin-bottom: 12px;
  letter-spacing: -0.02em;
`;

const SectionSub = styled.p`
  font-size: 1rem;
  color: var(--muted);
  max-width: 500px;
  margin-bottom: 56px;
  line-height: 1.6;
`;

const Tabs = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 48px;
  background: var(--surface-2);
  padding: 4px;
  border-radius: 10px;
  width: fit-content;
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 20px;
  border-radius: 7px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ $active }) => $active ? "var(--accent)" : "transparent"};
  color: ${({ $active }) => $active ? "#fff" : "var(--muted)"};

  &:hover {
    color: ${({ $active }) => $active ? "#fff" : "var(--text)"};
  }
`;

// ─── Work Timeline ────────────────────────────────────────────────────────────

const Timeline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(
      to bottom,
      transparent,
      var(--border-hover) 10%,
      var(--border-hover) 90%,
      transparent
    );
  }

  @media (max-width: 768px) {
    &::before { left: 11px; }
  }
`;

const TimelineItem = styled(motion.div)`
  padding-left: 48px;
  padding-bottom: 36px;
  position: relative;
  cursor: pointer;

  @media (max-width: 768px) {
    padding-left: 36px;
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: 8px;
  top: 6px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid ${({ $current }) => $current ? "var(--accent)" : "var(--border-hover)"};
  background: ${({ $current }) => $current ? "var(--accent)" : "var(--surface)"};
  transition: all 0.2s;
  z-index: 1;

  ${TimelineItem}:hover & {
    border-color: var(--accent);
    background: var(--accent);
  }

  @media (max-width: 768px) {
    left: 4px;
    width: 14px;
    height: 14px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

const CardLeft = styled.div`
  flex: 1;
`;

const RoleTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
`;

const CompanyName = styled.div`
  font-size: 0.9rem;
  color: var(--accent-light);
  font-weight: 500;
  margin-bottom: 6px;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  font-size: 0.78rem;
  color: var(--muted);
  margin-bottom: 0;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const CurrentBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-radius: 12px;
  font-size: 0.72rem;
  color: var(--accent-light);
  font-weight: 600;
`;

const ChevronBtn = styled(motion.div)`
  color: var(--muted);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid var(--border);
  border-radius: 6px;
  flex-shrink: 0;
  transition: border-color 0.2s;

  ${TimelineItem}:hover & {
    border-color: var(--accent);
    color: var(--accent);
  }
`;

const ExpandContent = styled(motion.div)`
  overflow: hidden;
`;

const ExpandInner = styled.div`
  padding-top: 16px;
`;

const DescList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;

  li {
    font-size: 0.9rem;
    color: var(--muted-light);
    line-height: 1.6;
    padding-left: 16px;
    position: relative;

    &::before {
      content: '→';
      position: absolute;
      left: 0;
      color: var(--accent);
      font-size: 0.75rem;
    }
  }
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TechTag = styled.span`
  padding: 3px 10px;
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.18);
  border-radius: 6px;
  font-size: 0.75rem;
  color: var(--accent-light);
  font-weight: 500;
`;

// ─── Education ───────────────────────────────────────────────────────────────

const EduGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

const EduCard = styled(motion.div)`
  padding: 28px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 14px;
  transition: border-color 0.2s;

  &:hover {
    border-color: rgba(59, 130, 246, 0.3);
  }
`;

const EduDegree = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
  line-height: 1.4;
`;

const EduInstitution = styled.div`
  font-size: 0.88rem;
  color: var(--accent-light);
  font-weight: 500;
  margin-bottom: 10px;
`;

const EduMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 0.78rem;
  color: var(--muted);
`;

// ─── Certifications ──────────────────────────────────────────────────────────

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
`;

const CertCard = styled(motion.div)`
  padding: 22px 24px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: border-color 0.2s, transform 0.2s;

  &:hover {
    border-color: rgba(59, 130, 246, 0.3);
    transform: translateY(-3px);
  }
`;

const CertName = styled.div`
  font-size: 0.93rem;
  font-weight: 600;
  color: var(--text);
  line-height: 1.4;
`;

const CertMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.78rem;
  color: var(--muted);
`;

const CertYear = styled.span`
  padding: 2px 8px;
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.18);
  border-radius: 6px;
  color: var(--accent-light);
  font-weight: 600;
  font-size: 0.73rem;
`;

// ─── Tab Content ─────────────────────────────────────────────────────────────

function WorkTab() {
  const [expanded, setExpanded] = useState("fiea");

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <Timeline>
      {experienceData.work.map((exp, i) => (
        <TimelineItem
          key={exp.id}
          onClick={() => toggle(exp.id)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
        >
          <TimelineDot $current={exp.current} />
          <CardHeader>
            <CardLeft>
              <RoleTitle>{exp.role}</RoleTitle>
              <CompanyName>{exp.company}</CompanyName>
              <MetaRow>
                <MetaItem><FiCalendar size={11} /> {exp.period}</MetaItem>
                {exp.location && (
                  <MetaItem><FiMapPin size={11} /> {exp.location}</MetaItem>
                )}
                {exp.current && <CurrentBadge>● Atual</CurrentBadge>}
              </MetaRow>
            </CardLeft>
            <ChevronBtn
              animate={{ rotate: expanded === exp.id ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiChevronDown size={14} />
            </ChevronBtn>
          </CardHeader>

          <AnimatePresence initial={false}>
            {expanded === exp.id && (
              <ExpandContent
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
              >
                <ExpandInner>
                  <DescList>
                    {exp.description.map((d, idx) => <li key={idx}>{d}</li>)}
                  </DescList>
                  <TechList>
                    {exp.techs.map((t) => <TechTag key={t}>{t}</TechTag>)}
                  </TechList>
                </ExpandInner>
              </ExpandContent>
            )}
          </AnimatePresence>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

function EducationTab() {
  return (
    <EduGrid>
      {experienceData.education.map((edu, i) => (
        <EduCard
          key={edu.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <EduDegree>{edu.degree}</EduDegree>
          <EduInstitution>{edu.institution}</EduInstitution>
          <EduMeta>
            <MetaItem><FiCalendar size={11} /> {edu.period}</MetaItem>
            {edu.location && <MetaItem><FiMapPin size={11} /> {edu.location}</MetaItem>}
            {edu.current && <CurrentBadge>● Atual</CurrentBadge>}
          </EduMeta>
        </EduCard>
      ))}
    </EduGrid>
  );
}

function CertificationsTab() {
  return (
    <CertGrid>
      {experienceData.certifications.map((cert, i) => (
        <CertCard
          key={cert.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.07 }}
        >
          <CertName>{cert.name}</CertName>
          <CertMeta>
            <span>{cert.issuer}</span>
            <CertYear>{cert.year}</CertYear>
          </CertMeta>
        </CertCard>
      ))}
    </CertGrid>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const TABS = [
  { id: "work", label: "Experiência", icon: <FiBriefcase size={14} /> },
  { id: "education", label: "Formação", icon: <FiBook size={14} /> },
  { id: "certifications", label: "Certificações", icon: <FiAward size={14} /> },
];

// ─── 3D Floating Element ─────────────────────────────────────────────────────

const FloatCanvasWrap = styled.div`
  position: absolute;
  top: 60px;
  right: 60px;
  width: 150px;
  height: 150px;
  z-index: 0;
  pointer-events: auto;

  @media (max-width: 768px) { display: none; }
`;

function FloatDodecahedron() {
  const mesh = useRef();
  const hovered = useRef(false);

  useFrame((_, dt) => {
    if (!mesh.current) return;
    const speed = hovered.current ? 3.5 : 0.4;
    mesh.current.rotation.x += dt * speed * 0.3;
    mesh.current.rotation.y += dt * speed * 0.5;
    mesh.current.rotation.z += dt * speed * 0.15;
  });

  return (
    <mesh
      ref={mesh}
      onPointerOver={() => { hovered.current = true; }}
      onPointerOut={() => { hovered.current = false; }}
    >
      <dodecahedronGeometry args={[1.1, 0]} />
      <meshStandardMaterial color="#93c5fd" wireframe transparent opacity={0.9} />
    </mesh>
  );
}

const Experience = () => {
  const [activeTab, setActiveTab] = useState("work");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <Section id="experiencia" ref={sectionRef}>
      <FloatCanvasWrap>
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} dpr={[1, 1.5]} style={{ background: "transparent" }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[3, 3, 3]} intensity={1.2} color="#3b82f6" />
            <FloatDodecahedron />
          </Canvas>
        </Suspense>
      </FloatCanvasWrap>
      <SectionLabel>Trajetória</SectionLabel>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Experiência & Formação
      </SectionTitle>
      <SectionSub>
        Uma visão completa da minha carreira, formação acadêmica e certificações obtidas.
      </SectionSub>

      <Tabs>
        {TABS.map((tab) => (
          <Tab
            key={tab.id}
            $active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </Tab>
        ))}
      </Tabs>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === "work" && <WorkTab />}
          {activeTab === "education" && <EducationTab />}
          {activeTab === "certifications" && <CertificationsTab />}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
};

export default Experience;
