// src/components/Hero.js
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import just_me_image from "../assets/me.jpeg";
import hero_background from "../assets/my_pic_in_hero2.png";
import { FiCoffee, FiSmartphone } from "react-icons/fi";

// --- Styled Components Modernizados ---

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0f1117;
  color: #d1d5db;
  text-align: center;
  gap: 20px;
  padding: 0 20px;
  overflow-x: hidden;
  position: relative;

  /* Background sutil */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 50%, rgba(0, 255, 224, 0.05) 0%, transparent 60%);
    z-index: 0;
  }

  @media screen and (max-width: 768px) {
    gap: 25px;
    padding-top: 80px;
  }
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  background: rgba(0, 255, 224, 0.03);
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  width: 450px;
  height: 450px;

  @media screen and (max-width: 768px) {
    width: 280px;
    height: 280px;
    margin-bottom: 30px;
  }
`;

const BackgroundImage = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 0px black);
  scale: 1.5;
  animation: shadowTransition 2s ease-in infinite alternate;
  @keyframes shadowTransition {
    to {
      filter: drop-shadow(0 0 6px black);
    }
  }
`;

const ProfileImage = styled(motion.img)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(0, 255, 224, 0.3), 0 0 25px rgba(0, 255, 224, 0.2);
  animation: pulseGlow 3s ease-in-out infinite alternate;

  @keyframes pulseGlow {
    from {
      box-shadow: 0 0 15px rgba(0, 255, 224, 0.3), 0 0 25px rgba(0, 255, 224, 0.2);
    }
    to {
      box-shadow: 0 0 25px rgba(0, 255, 224, 0.5), 0 0 40px rgba(0, 255, 224, 0.3);
    }
  }

  @media screen and (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  line-height: 1.2;
  margin: 0;
  font-weight: 700;
  color: #ffffff;
  overflow: hidden; /* Para o efeito de reveal */

  span {
    font-family: "Inter", sans-serif;
    background: linear-gradient(90deg, #00ffe0 0%, #00bfa6 50%, #00ffe0 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
    
    animation: gradient-flow 4s linear infinite;

    @keyframes gradient-flow {
        to {
            background-position: -200% center;
        }
    }
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.25rem);
  margin: 15px 0 0;
  max-width: 700px;
  line-height: 1.6;
  color: #a0a4ad; /* Melhor contraste */
  
  @media screen and (max-width: 768px) {
    line-height: 1.8;
  }
`;

const HighlightText = styled(motion.span)`
  font-weight: 600;
  color: #00ffe0;
  background-color: rgba(0, 255, 224, 0.05);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid rgba(0, 255, 224, 0.1);
  display: inline-block;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 20px;
  margin-top: 30px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    width: 100%;
    max-width: 300px;
  }
`;

const PrimaryButton = styled(motion.a)`
  padding: 14px 32px;
  background: linear-gradient(135deg, #00ffe0 0%, #00bfa6 100%);
  color: #0f1117;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8em;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 255, 224, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 255, 224, 0.4);
    filter: brightness(1.1);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled(motion.a)`
  padding: 14px 32px;
  background: rgba(255, 255, 255, 0.03);
  color: #00ffe0;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  border: 1px solid rgba(0, 255, 224, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8em;
  backdrop-filter: blur(5px);

  &:hover {
    background: rgba(0, 255, 224, 0.1);
    border-color: #00ffe0;
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(0, 255, 224, 0.1);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

// --- Variantes de Animação ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const textRevealVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

// --- Componente Hero ---

const Hero = () => {
  return (
    <HeroSection id="home">
      {/* Elementos Flutuantes de Fundo */}
      <FloatingElement 
        style={{ top: '15%', left: '10%', width: '100px', height: '100px' }}
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <FloatingElement 
        style={{ bottom: '20%', right: '15%', width: '150px', height: '150px' }}
        animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <ContentWrapper>
        <ImageContainer
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0
          }}
          transition={{
            duration: 0.8,
            ease: "backOut"
          }}
        >
          <BackgroundImage
            src={hero_background}
            alt="Tech background"
            animate={{
              y: [0, -12, 0],
            }}
            
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
          />
          <ProfileImage
            src={just_me_image}
            alt="Mathias Borges - Desenvolvedor de Software"
          />
        </ImageContainer>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div style={{ overflow: 'hidden' }}>
            <Title variants={textRevealVariants}>
              Olá, eu sou <motion.span whileHover={{ scale: 1.05 }}>Desenvolvedor de Software</motion.span>
            </Title>
          </div>

          <Subtitle variants={wordVariants}>
            Criando soluções para{" "}
            <HighlightText whileHover={{ scale: 1.1, rotate: -2 }} variants={wordVariants}>web</HighlightText>,{" "}
            <HighlightText whileHover={{ scale: 1.1, rotate: 2 }} variants={wordVariants}>mobile</HighlightText> e{" "}
            <HighlightText whileHover={{ scale: 1.1, rotate: -2 }} variants={wordVariants}>desktop</HighlightText>
          </Subtitle>

          <ButtonContainer variants={containerVariants}>
            <PrimaryButton
              href="#projetos"
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Ver meus projetos"
            >
              <FiCoffee size={20}/>
              Ver Projetos
            </PrimaryButton>
            <SecondaryButton
              href="#contato"
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Entrar em contato"
            >
              <FiSmartphone size={20}/>
              Contato
            </SecondaryButton>
          </ButtonContainer>
        </motion.div>
      </ContentWrapper>
    </HeroSection>
  );
};

export default Hero;
