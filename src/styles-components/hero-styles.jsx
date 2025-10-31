// src/components/Hero.js
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import just_me_image from "../assets/just_me.jpg";
import hero_background from "../assets/my_pic_in_hero2.png";
import { FiCoffee,FiSmartphone } from "react-icons/fi";
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

  @media screen and (max-width: 768px) {
    gap: 25px;
    padding-top: 80px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
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

  span {
    font-family: "Inter", sans-serif;
    background: linear-gradient(90deg, #00ffe0 0%, #00bfa6 50%, #00ffe0 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
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
  background: linear-gradient(90deg, #00ffe0 0%, #00bfa6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  @media screen and (max-width: 768px) {
    line-height: 1.8;
  }
`;

const HighlightText = styled(motion.span)`
  font-weight: 600;
  color: white;
  background-color: rgba(0, 255, 224, 0.1);
  padding: 3px 8px;
  border-radius: 5px;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 20px;
  margin-top: 30px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const PrimaryButton = styled(motion.a)`
  padding: 12px 28px;
  background: #00bfa6;
  color: #ffffff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:.5em;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 191, 166, 0.2);

  &:hover {
    transform: translateY(-2px);
    background: #00ffe0;
    box-shadow: 0 6px 20px rgba(0, 255, 224, 0.25);
    svg{
      color:white;
    }
  }
`;

const SecondaryButton = styled(motion.a)`

  padding: 12px 28px;
  background: transparent;
  color: #00ffe0;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  border: 2px solid #00ffe0;
  cursor: pointer;
  transition: all 0.3s ease;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:.5em;

  &:hover {
    background: rgba(0, 255, 224, 0.06);
    transform: translateY(-2px);
    svg{
      color:white;
    }
  }
`;

// --- Variantes de Animação ---

const subtitleContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const buttonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.2,
      staggerChildren: 0.2,
    },
  },
};

// --- Componente Hero ---

const Hero = () => {
  return (
    <HeroSection id="home">
      <ContentWrapper>
        <ImageContainer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
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
            alt="Desenvolvedor de Software"
          />
        </ImageContainer>

        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Olá, eu sou <span>Desenvolvedor de Software</span>
        </Title>

        <Subtitle
          variants={subtitleContainerVariants}
          initial="hidden"
          animate="visible"
        >
          Criando soluções para{" "}
          <HighlightText variants={wordVariants}>web</HighlightText>,{" "}
          <HighlightText variants={wordVariants}>mobile</HighlightText> e{" "}
          <HighlightText variants={wordVariants}>desktop</HighlightText>
        </Subtitle>

        <ButtonContainer
          variants={buttonContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <PrimaryButton
            href="#projetos"
            variants={wordVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiCoffee size={32}/>
            Ver Projetos
          </PrimaryButton>
          <SecondaryButton
            href="#contato"
            variants={wordVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiSmartphone size={32}/>
            Contato
          </SecondaryButton>
        </ButtonContainer>
      </ContentWrapper>
    </HeroSection>
  );
};

export default Hero;
