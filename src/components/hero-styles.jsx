import React, { useRef, Suspense, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { FiGithub, FiLinkedin, FiArrowDown } from "react-icons/fi";

// ─── 3D Scene ────────────────────────────────────────────────────────────────

function WireframeIcosahedron() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.10;
    meshRef.current.rotation.y = t * 0.14;
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.14;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.7, 1]} />
      <meshStandardMaterial color="#3b82f6" wireframe transparent opacity={0.45} />
    </mesh>
  );
}

function OuterRing() {
  const ringRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ringRef.current.rotation.z = t * 0.08;
    ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.3;
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.5, 0.012, 6, 80]} />
      <meshStandardMaterial color="#60a5fa" transparent opacity={0.22} />
    </mesh>
  );
}

function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#3b82f6" />
      <pointLight position={[-5, -3, -5]} intensity={0.6} color="#1d4ed8" />
      <WireframeIcosahedron />
      <OuterRing />
    </Canvas>
  );
}

// ─── Styled Components ───────────────────────────────────────────────────────

const HeroSection = styled.section`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  background: var(--bg);
  padding: 0 8vw;
  position: relative;
  overflow: hidden;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 110px 24px 60px;
    text-align: center;
  }
`;

const GridLine = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(59, 130, 246, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  z-index: 0;
`;

const LeftContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  z-index: 1;
`;

const TagLine = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);

  &::before {
    content: '';
    display: block;
    width: 28px;
    height: 1px;
    background: var(--accent);
  }

  @media (max-width: 900px) {
    justify-content: center;
    &::before { display: none; }
  }
`;

const Name = styled(motion.h1)`
  font-size: clamp(3rem, 6vw, 5.2rem);
  font-weight: 800;
  color: var(--text);
  line-height: 1.0;
  letter-spacing: -0.03em;
`;

const BlueWord = styled.span`
  color: var(--accent);
`;

const Role = styled(motion.p)`
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  color: var(--muted-light);
  max-width: 460px;
  line-height: 1.75;

  @media (max-width: 900px) {
    max-width: 100%;
  }
`;

const ButtonRow = styled(motion.div)`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const PrimaryBtn = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 26px;
  background: var(--accent);
  color: #fff;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: var(--accent-light);
    transform: translateY(-2px);
  }
`;

const SecondaryBtn = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 26px;
  background: transparent;
  color: var(--muted-light);
  border: 1px solid var(--border-hover);
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, transform 0.2s;

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-2px);
  }
`;

const SocialRow = styled(motion.div)`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const SocialBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--muted);
  transition: border-color 0.2s, color 0.2s, transform 0.2s;

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-2px);
  }
`;

const StatusBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 20px;
  font-size: 0.78rem;
  color: var(--accent-light);
  width: fit-content;

  @media (max-width: 900px) {
    margin: 0 auto;
  }
`;

const Dot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 6px #22c55e;
  animation: blink 2s ease-in-out infinite;

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 520px;
  position: relative;
  z-index: 1;

  @media (max-width: 900px) {
    height: 300px;
  }
`;

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ScrollHint = styled(motion.div)`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: var(--muted);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  z-index: 2;

  svg {
    animation: bounce 2s ease-in-out infinite;
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(6px); }
    }
  }
`;

// ─── Animation Variants ───────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Component ───────────────────────────────────────────────────────────────

const EmailCopy = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.78rem;
  color: var(--muted);
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
  margin-left: 4px;

  &:hover {
    color: var(--accent);
    background: rgba(59, 130, 246, 0.08);
  }
`;

const CopyFeedback = styled(motion.span)`
  font-size: 0.72rem;
  color: #22c55e;
  font-weight: 600;
  pointer-events: none;
`;

const Hero = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mathias.borges.marques@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <HeroSection id="home">
      <GridLine />

      <LeftContent variants={container} initial="hidden" animate="visible">
        <StatusBadge variants={item}>
          <Dot /> Disponível para oportunidades
        </StatusBadge>

        <TagLine variants={item}>Desenvolvedor de Software</TagLine>

        <Name variants={item}>
          Mathias<br />
          <BlueWord>Borges</BlueWord>
        </Name>

        <Role variants={item}>
          Estudante de Ciência da Computação com perfil multidisciplinar.
          Experiência em sistemas corporativos, web, mobile e automação.
          Baseado em Maceió, AL.
        </Role>

        <ButtonRow variants={item}>
          <PrimaryBtn href="#projetos" whileTap={{ scale: 0.97 }}>
            Ver projetos
          </PrimaryBtn>
          <SecondaryBtn href="#contato" whileTap={{ scale: 0.97 }}>
            Entrar em contato
          </SecondaryBtn>
        </ButtonRow>

        <SocialRow variants={item}>
          <SocialBtn
            href="https://github.com/MathiasBorges"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FiGithub size={17} />
          </SocialBtn>
          <SocialBtn
            href="https://www.linkedin.com/in/mathias-borges-marques/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={17} />
          </SocialBtn>
          <EmailCopy onClick={handleCopyEmail} title="Copiar e-mail">
            {copied ? (
              <CopyFeedback
                key="copied"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                E-mail copiado ✓
              </CopyFeedback>
            ) : (
              <span>mathias.borges.marques@gmail.com</span>
            )}
          </EmailCopy>
        </SocialRow>
      </LeftContent>

      <RightContent>
        <CanvasWrapper>
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </CanvasWrapper>
      </RightContent>

      <ScrollHint
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <FiArrowDown size={16} />
        scroll
      </ScrollHint>
    </HeroSection>
  );
};

export default Hero;
