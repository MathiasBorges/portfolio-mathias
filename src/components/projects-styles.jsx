import React, { Suspense, useRef, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight, FiBriefcase, FiPlay, FiPause, FiX, FiMaximize, FiInfo } from "react-icons/fi";
import { Link as ScrollLink } from "react-scroll";
import { projects } from "../data/projects";

// --- Styled Components ---

const ProjectsSection = styled.section`
  padding: 120px 20px;
  background: #0a0a0a;
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
      radial-gradient(circle at 80% 10%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 20% 90%, rgba(37, 99, 235, 0.03) 0%, transparent 50%);
    z-index: 0;
  }

  @media (max-width: 480px) {
    padding: 92px 16px 84px;
  }
`;

const ProjectsOrbitalWrap = styled.div`
  position: absolute;
  top: 36px;
  right: 28px;
  width: 180px;
  height: 180px;
  z-index: 1;

  @media (max-width: 900px) {
    display: none;
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
  margin-bottom: 80px;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  
  svg {
    color: #3b82f6;
  }

  @media (max-width: 480px) {
    margin-bottom: 48px;
    text-align: center;
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  width: 100%;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  @media (max-width: 768px) {
    gap: 30px;
  }
`;

const ProjectCard = styled(motion.div)`
  background: linear-gradient(145deg, rgba(17, 17, 17, 0.6), rgba(10, 10, 10, 0.5));
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(59, 130, 246, 0.1);
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  transform-style: preserve-3d;
  
  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    border-color: rgba(59, 130, 246, 0.3);
  }

  @media (max-width: 480px) {
    border-radius: 16px;
  }
`;

const MediaContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: #000;
  overflow: hidden;
`;

const CardSignal = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 30% 30%, rgba(147, 197, 253, 0.85), rgba(59, 130, 246, 0.16) 45%, transparent 70%),
    rgba(6, 10, 18, 0.55);
  border: 1px solid rgba(147, 197, 253, 0.24);
  box-shadow: 0 0 24px rgba(59, 130, 246, 0.18);
  backdrop-filter: blur(10px);
  pointer-events: none;
  z-index: 2;
`;

const MediaItem = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  
  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NavigationButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  ${(props) => (props.direction === "left" ? "left: 10px;" : "right: 10px;")}
  
  &:hover {
    background: rgba(59, 130, 246, 0.8);
    color: #000;
  }
`;

const MediaCounter = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  backdrop-filter: blur(4px);
  z-index: 10;
`;

const Content = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media (max-width: 480px) {
    padding: 18px;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  color: #a0a4ad;
  line-height: 1.6;
  margin-bottom: 24px;
  flex-grow: 1;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const TechTag = styled.span`
  font-size: 0.8rem;
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid rgba(59, 130, 246, 0.2);
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: auto;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const ProjectLink = styled(motion.a)`
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const LiveButton = styled(ProjectLink)`
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #0a0a0a;
  border: none;
  
  &:hover {
    background: linear-gradient(135deg, #2563eb, #3b82f6);
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  }
`;

const RepoButton = styled(ProjectLink)`
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #ffffff;
  }
`;

// --- Modal Components ---

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  width: 95%;
  height: 90%;
  max-width: 1400px;
  background: #111111;
  border-radius: 20px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

const ModalHeader = styled.div`
  padding: 16px 24px;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 14px 16px;
    gap: 12px;
  }
`;

const ModalTitle = styled.h3`
  color: #fff;
  margin: 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const IconButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: #a0a4ad;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
`;

const ModalTip = styled(motion.div)`
  background: #3b82f6;
  color: #0a0a0a;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  position: relative;
  margin-right: 14px;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  display: flex;
  align-items: center;
  gap: 6px;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 0; 
    height: 0; 
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid #3b82f6;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;



const IframeContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const FallbackMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #0a0a0a;
  width: 80%;
  max-width: 400px;
`;

// --- Framer Motion Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function ProjectsCrystal({ pointer, hovered }) {
  const groupRef = useRef(null);
  const coreRef = useRef(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || !coreRef.current) return;

    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.35 + pointer.x * 0.65;
    groupRef.current.rotation.x = Math.sin(t * 0.55) * 0.18 + pointer.y * 0.45;
    groupRef.current.position.y = Math.sin(t * 0.9) * 0.14;

    const targetScale = hovered ? 1.12 : 1;
    coreRef.current.scale.x += (targetScale - coreRef.current.scale.x) * 0.08;
    coreRef.current.scale.y += (targetScale - coreRef.current.scale.y) * 0.08;
    coreRef.current.scale.z += (targetScale - coreRef.current.scale.z) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.95, 0]} />
        <meshStandardMaterial color="#93c5fd" wireframe transparent opacity={0.85} />
      </mesh>
      <mesh rotation={[Math.PI / 2.8, 0, 0]}>
        <torusGeometry args={[1.5, 0.03, 12, 80]} />
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// --- Componente Individual do Card ---

const ProjectCardComponent = ({ project, onOpenModal }) => {
  const [currentMedia, setCurrentMedia] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 18, mass: 0.4 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 18, mass: 0.4 });

  const handleCardPointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;

    rotateY.set((px - 0.5) * 10);
    rotateX.set((0.5 - py) * 10);
  };

  const resetCardTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const nextMedia = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentMedia((prev) => (prev + 1) % project.media.length);
    setIsPlaying(false);
  };

  const prevMedia = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentMedia((prev) => (prev - 1 + project.media.length) % project.media.length);
    setIsPlaying(false);
  };

  const togglePlay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const isInternalLink = project.link && project.link.startsWith("#");
  const isZipLink = project.link && project.link.endsWith(".zip");

  const handleLiveDemoClick = (e) => {
    if (!isInternalLink && !isZipLink && project.link) {
      e.preventDefault();
      onOpenModal(project);
    }
  };

  return (
    <ProjectCard
      variants={cardVariants}
      layout
      onMouseMove={handleCardPointerMove}
      onMouseLeave={resetCardTilt}
      whileHover={{ y: -10, scale: 1.01 }}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1200 }}
    >
      <MediaContainer>
        
        <AnimatePresence mode="wait">
          <MediaItem
            key={currentMedia}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.media[currentMedia].type === "video" ? (
              <>
                <video
                  ref={videoRef}
                  src={project.media[currentMedia].src}
                  poster={project.media[0].src}
                  loop
                  muted
                  playsInline
                  onClick={togglePlay}
                />
                <NavigationButton
                  style={{ 
                    top: "50%", 
                    left: "50%", 
                    width: "60px", 
                    height: "60px",
                    background: "rgba(0,0,0,0.4)",
                    opacity: isPlaying ? 0 : 1
                  }}
                  initial={{ x: "-50%", y: "-50%" }}
                  onClick={togglePlay}
                  whileHover={{ scale: 1.1, background: "rgba(59, 130, 246, 0.8)", x: "-50%", y: "-50%" }}
                  whileTap={{ scale: 0.9, x: "-50%", y: "-50%" }}
                >
                  {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} style={{ marginLeft: "4px" }} />}
                </NavigationButton>
              </>
            ) : (
              <img src={project.media[currentMedia].src} alt={project.title} />
            )}
          </MediaItem>
        </AnimatePresence>

        {project.media.length > 1 && (
          <>
            <NavigationButton
              direction="left"
              onClick={prevMedia}
              initial={{ y: "-50%" }}
              whileHover={{ scale: 1.1, y: "-50%" }}
              whileTap={{ scale: 0.9, y: "-50%" }}
            >
              <FiChevronLeft size={24} />
            </NavigationButton>
            <NavigationButton
              direction="right"
              onClick={nextMedia}
              initial={{ y: "-50%" }}
              whileHover={{ scale: 1.1, y: "-50%" }}
              whileTap={{ scale: 0.9, y: "-50%" }}
            >
              <FiChevronRight size={24} />
            </NavigationButton>
            <MediaCounter>
              {currentMedia + 1} / {project.media.length}
            </MediaCounter>
          </>
        )}
      </MediaContainer>

      <Content>
        <ProjectHeader>
          <ProjectTitle>{project.title}</ProjectTitle>
        </ProjectHeader>

        <ProjectDescription>{project.description}</ProjectDescription>

        <TechStack>
          {project.techs.map((tech, index) => (
            <TechTag key={index}>{tech}</TechTag>
          ))}
        </TechStack>

        <LinksContainer>
          {project.link && project.link !== "#" && (
            <>
              {isInternalLink ? (
                <ScrollLink
                  to={project.link.replace("#", "")}
                  smooth={true}
                  duration={600}
                  offset={-80}
                  style={{ display: 'inline-flex', textDecoration: 'none', cursor: 'pointer', flex: 1 }}
                >
                  <LiveButton
                    as="div"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiExternalLink /> Contatar
                  </LiveButton>
                </ScrollLink>
              ) : (
                <LiveButton
                  href={project.link}
                  target={isZipLink ? "_self" : "_blank"}
                  rel={isZipLink ? "" : "noopener noreferrer"}
                  download={isZipLink}
                  onClick={handleLiveDemoClick}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiExternalLink /> {isZipLink ? "Download" : "Ver Projeto"}
                </LiveButton>
              )}
            </>
          )}

          {project.repo && (
            <RepoButton
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiGithub /> Code
            </RepoButton>
          )}
        </LinksContainer>
      </Content>
    </ProjectCard>
  );
};

// --- Componente Principal ---

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState(null);
  const [sceneHovered, setSceneHovered] = useState(false);
  const [scenePointer, setScenePointer] = useState({ x: 0, y: 0 });

  const handleSceneMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;

    setScenePointer({ x, y: -y });
  };

  const resetScene = () => {
    setSceneHovered(false);
    setScenePointer({ x: 0, y: 0 });
  };

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  return (
    <ProjectsSection id="projetos" ref={ref}>
      <ProjectsOrbitalWrap onMouseMove={handleSceneMove} onMouseLeave={resetScene}>
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 4.5], fov: 42 }}
            dpr={[1, 1.5]}
            style={{ background: "transparent" }}
            onPointerEnter={() => setSceneHovered(true)}
            onPointerLeave={resetScene}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[3, 3, 4]} intensity={1.1} color="#60a5fa" />
            <pointLight position={[-4, -3, -4]} intensity={0.4} color="#1d4ed8" />
            <ProjectsCrystal pointer={scenePointer} hovered={sceneHovered} />
          </Canvas>
        </Suspense>
      </ProjectsOrbitalWrap>

      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FiBriefcase size={32} /> Projetos Recentes
        </SectionTitle>

        <ProjectsGrid
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <ProjectCardComponent 
              key={index} 
              project={project} 
              onOpenModal={openModal}
            />
          ))}
        </ProjectsGrid>
      </Container>

      <AnimatePresence>
        {selectedProject && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <ModalTitle>
                  <FiExternalLink /> {selectedProject.title} - Live Preview
                </ModalTitle>
                <ModalActions>
                  <ModalTip
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    <FiInfo size={14} /> Não carregou? Abra aqui
                  </ModalTip>
                  <IconButton
                    as="a"
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Abrir em nova aba"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiExternalLink size={20} />
                  </IconButton>
                  <IconButton
                    onClick={closeModal}
                    title="Fechar"
                    whileHover={{ scale: 1.1, color: "#ff6b6b" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiX size={24} />
                  </IconButton>
                </ModalActions>
              </ModalHeader>
              <IframeContainer>
                <StyledIframe 
                  src={selectedProject.link} 
                  title={`Preview de ${selectedProject.title}`}
                  loading="lazy"
                />
              </IframeContainer>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </ProjectsSection>
  );
};

export default Projects;


