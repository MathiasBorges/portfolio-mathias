import React, { useRef, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import styled from "styled-components";
import { Canvas, useFrame } from "@react-three/fiber";
import my_image from "../assets/me.jpeg";
import { FiUser, FiMail } from "react-icons/fi";

// --- Styled Components Atualizados ---

const AboutSection = styled.section`
  padding: 120px 20px;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
  color: #c5cad3;
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
      radial-gradient(circle at 70% 20%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 30% 80%, rgba(37, 99, 235, 0.03) 0%, transparent 50%);
    z-index: 0;
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
  font-family: "Inter", sans-serif;
  margin-bottom: 60px;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  
  svg {
    color: #3b82f6;
  }
`;

const GridLayout = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  align-items: center;
  gap: 60px;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
`;

const AvatarContainer = styled(motion.div)`
  position: relative;
  justify-self: center;
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: linear-gradient(45deg, #3b82f6, transparent, #2563eb, transparent, #3b82f6);
    border-radius: 50%;
    opacity: 0.1;
    animation: rotate 8s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const Avatar = styled(motion.img)`
  width: 100%;
  max-width: 300px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #3b82f6;
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
  animation: pulseGlow 4s ease-in-out infinite alternate;
  position: relative;
  z-index: 2;

  @keyframes pulseGlow {
    from {
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
    }
    to {
      box-shadow: 0 0 40px rgba(59, 130, 246, 0.5);
    }
  }
`;

const TextContent = styled(motion.div)`
  background: linear-gradient(145deg, rgba(17, 17, 17, 0.4), rgba(10, 10, 10, 0.3));
  padding: 32px;
  border-radius: 20px;
  border: 1px solid rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
    border-radius: 20px 20px 0 0;
  }
  
  font-size: clamp(1rem, 1.2vw, 1.15rem);
  line-height: 1.8;
  color: #a0a4ad;

  @media (max-width: 768px) {
    text-align: center;
    padding: 24px;
  }

  p {
    margin-bottom: 24px;
    
    &:last-of-type {
      margin-bottom: 32px;
    }
  }
`;

const Highlight = styled(motion.span)`
  font-weight: 600;
  color: #3b82f6;
  background-color: rgba(59, 130, 246, 0.15);
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  display: inline-block;
  cursor: default;
`;

const ContactButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  font-size: 1rem;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #090909;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 700;
  margin-top: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: 0.5s;
  }

  &:hover {
    background: linear-gradient(135deg, #2563eb, #3b82f6);
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(59, 130, 246, 0.4);
    
    &::before {
      left: 100%;
    }
  }

  svg {
    transition: all 0.3s ease;
  }
`;

// --- 3D Floating Element ---

const FloatCanvasWrap = styled.div`
  position: absolute;
  top: 50px;
  right: 50px;
  width: 170px;
  height: 170px;
  z-index: 0;
  pointer-events: auto;

  @media (max-width: 768px) { display: none; }
`;

function FloatOctahedron() {
  const mesh = useRef();
  const hovered = useRef(false);

  useFrame((_, dt) => {
    if (!mesh.current) return;
    const speed = hovered.current ? 3.5 : 0.5;
    mesh.current.rotation.x += dt * speed * 0.4;
    mesh.current.rotation.y += dt * speed * 0.6;
  });

  return (
    <mesh
      ref={mesh}
      onPointerOver={() => { hovered.current = true; }}
      onPointerOut={() => { hovered.current = false; }}
    >
      <octahedronGeometry args={[1.2, 0]} />
      <meshStandardMaterial color="#93c5fd" wireframe transparent opacity={0.9} />
    </mesh>
  );
}

// --- Framer Motion Variants ---

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// --- Componente Final ---

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <AboutSection id="sobre" ref={ref}>
      <FloatCanvasWrap>
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }} dpr={[1, 1.5]} style={{ background: "transparent" }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[3, 3, 3]} intensity={1.2} color="#3b82f6" />
            <FloatOctahedron />
          </Canvas>
        </Suspense>
      </FloatCanvasWrap>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FiUser size={32} /> Sobre Mim
        </SectionTitle>

        <GridLayout
          variants={gridVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <AvatarContainer variants={itemVariants}>
            <Avatar
              src={my_image}
              alt="Foto de perfil"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3 }}
            />
          </AvatarContainer>

          <TextContent variants={textVariants}>
            <p>
              Sou um desenvolvedor apaixonado por tecnologia e resolução de problemas. Atuo tanto no <Highlight whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.25)" }}>Front-end</Highlight> quanto no <Highlight whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.25)" }}>Back-end</Highlight>, sempre buscando evoluir e entregar soluções eficientes.
            </p>
            <p>
              Tenho experiência liderando e colaborando em projetos diversos, utilizando metodologias ágeis como o <Highlight whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.25)" }}>Scrum</Highlight>. Busco criar experiências digitais que geram impacto e valor.
            </p>
            <ContactButton
              href="#contato"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail color="#090909" /> Entrar em Contato
            </ContactButton>
          </TextContent>
        </GridLayout>
      </Container>
    </AboutSection>
  );
};

export default About;


