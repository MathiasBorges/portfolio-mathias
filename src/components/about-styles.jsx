import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styled from "styled-components";
import my_image from "../assets/me.jpeg";
import { FiUser, FiMail } from "react-icons/fi";

// --- Styled Components Atualizados ---

const AboutSection = styled.section`
  padding: 120px 20px;
  background: linear-gradient(135deg, #0f1117 0%, #1a1d27 50%, #10111c 100%);
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
      radial-gradient(circle at 70% 20%, rgba(0, 255, 224, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 30% 80%, rgba(0, 191, 166, 0.03) 0%, transparent 50%);
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
    color: #00ffe0;
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
    background: linear-gradient(45deg, #00ffe0, transparent, #00bfa6, transparent, #00ffe0);
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
  border: 4px solid #00ffe0;
  box-shadow: 0 0 30px rgba(0, 255, 224, 0.3);
  animation: pulseGlow 4s ease-in-out infinite alternate;
  position: relative;
  z-index: 2;

  @keyframes pulseGlow {
    from {
      box-shadow: 0 0 20px rgba(0, 255, 224, 0.3);
    }
    to {
      box-shadow: 0 0 40px rgba(0, 255, 224, 0.5);
    }
  }
`;

const TextContent = styled(motion.div)`
  background: linear-gradient(145deg, rgba(26, 26, 45, 0.4), rgba(20, 20, 37, 0.3));
  padding: 32px;
  border-radius: 20px;
  border: 1px solid rgba(0, 255, 224, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ffe0, transparent);
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
  color: #00ffe0;
  background-color: rgba(0, 255, 224, 0.15);
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 224, 0.2);
  display: inline-block;
  cursor: default;
`;

const ContactButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  font-size: 1rem;
  background: linear-gradient(135deg, #00ffe0, #00bfa6);
  color: #0f0f23;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 700;
  margin-top: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 255, 224, 0.3);
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
    background: linear-gradient(135deg, #00bfa6, #00ffe0);
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 255, 224, 0.4);
    
    &::before {
      left: 100%;
    }
  }

  svg {
    transition: all 0.3s ease;
  }
`;

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
              Sou um desenvolvedor apaixonado por tecnologia e resolução de problemas. Atuo tanto no <Highlight whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 255, 224, 0.25)" }}>Front-end</Highlight> quanto no <Highlight whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 255, 224, 0.25)" }}>Back-end</Highlight>, sempre buscando evoluir e entregar soluções eficientes.
            </p>
            <p>
              Tenho experiência liderando e colaborando em projetos diversos, utilizando metodologias ágeis como o <Highlight whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 255, 224, 0.25)" }}>Scrum</Highlight>. Busco criar experiências digitais que geram impacto e valor.
            </p>
            <ContactButton
              href="#contato"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail color="#0f0f23" /> Entrar em Contato
            </ContactButton>
          </TextContent>
        </GridLayout>
      </Container>
    </AboutSection>
  );
};

export default About;
