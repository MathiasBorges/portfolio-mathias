// src/components/Hero.js
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import me_and_techs from "../assets/my_pic_in_hero.png";
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

const TechImage = styled(motion.img)`
  width: 400px;
  height: 400px;
  object-fit:contain;
  border-radius: 50%;
  filter:drop-shadow(0 0 0px white);

  animation:shadowTransition 2s ease-in infinite alternate;
  @keyframes shadowTransition{
    to{
      filter:drop-shadow(0 0 6px white);
    }
  }

  @media screen and (max-width: 768px) {
    width: 180px;
    height: 180px;
    margin-bottom: 30px;
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
    background: linear-gradient(90deg, #00ffe0 0%, #00bfa6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.25rem);
  margin: 15px 0 0;
  max-width: 700px;
  line-height: 1.6;
  color: #a0a4ad;
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
        <TechImage
          src={me_and_techs}
          alt="Desenvolvedor de Software"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -12, 0],
          }}
          transition={{
            duration: 0.6,
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            },
          }}
        />

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
