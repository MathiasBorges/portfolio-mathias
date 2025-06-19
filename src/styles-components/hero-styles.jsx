// src/components/Hero.js
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import me_and_techs from "../assets/my_pic_in_hero.png";

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
  color: #ffffff;
  text-align: center;
  gap: 20px;
  padding: 0 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(74, 144, 226, 0.1) 0%,
      transparent 70%
    );
    z-index: 0;
  }

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
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
`;

const TechImage = styled(motion.img)`
  width: 450px;
  height: 450px;
  object-fit: contain;
  margin-bottom: 2px;
  border-radius: 50%;
  filter: drop-shadow(0 0 20px rgba(74, 144, 226, 0.5));
  transition: all 0.3s ease;
  z-index: 1;
  animation: animateImage 1.5s ease-in-out infinite alternate;
  @keyframes animateImage {
    to {
      filter: drop-shadow(0 0 1px rgba(74, 144, 226, 0.5));
    }
  }
  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 30px rgba(74, 144, 226, 0.8));
  }

  @media screen and (max-width: 768px) {
    width: 200px;
    height: 200px;
    margin-top: 0;
    margin-bottom: 30px;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.2;
  margin: 0;
  font-weight: 700;
  background: linear-gradient(to right, #ffffff, #b0b0b0);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  z-index: 1;

  span {
    font-family: "Fira Code", monospace;
    background: linear-gradient(to right, #4A90E2, #FF6B6B);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 0 10px rgba(74, 144, 226, 0.5);
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.5rem);
  margin: 15px 0 0;
  max-width: 700px;
  line-height: 1.6;
  color: #b0b0b0;
  z-index: 1;
`;

const HighlightText = styled(motion.span)`
  font-weight: 600;
  color: ${(props) => props.color || "#ffffff"};
  text-shadow: 0 0 5px ${(props) => props.shadow || "rgba(255,255,255,0.3)"};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  z-index: 1;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const PrimaryButton = styled(motion.a)`
  padding: 12px 28px;
  background: linear-gradient(135deg, #4a90e2, #2a5d9e);
  color: #ffffff;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.4);
  transition: all 0.3s ease;
  display: inline-block;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(74, 144, 226, 0.6);
  }
`;

const SecondaryButton = styled(motion.a)`
  padding: 12px 28px;
  background: transparent;
  color: #4a90e2;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1rem;
  border: 2px solid #4a90e2;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;

  &:hover {
    background: rgba(74, 144, 226, 0.1);
    transform: translateY(-3px);
  }
`;

const Hero = () => {
  return (
    <HeroSection id="home">
      <ContentWrapper>
        <TechImage
          src={me_and_techs}
          alt="Desenvolvedor de Software"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        <Title
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Olá, eu sou <span>Desenvolvedor de Software</span>
        </Title>

        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Criando soluções incríveis para{" "}
          <HighlightText
            color="#FF6B6B"
            shadow="rgba(255,107,107,0.4)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            web
          </HighlightText>
          ,{" "}
          <HighlightText
            color="#4D96FF"
            shadow="rgba(77,150,255,0.4)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            mobile
          </HighlightText>{" "}
          e{" "}
          <HighlightText
            color="#FFD166"
            shadow="rgba(255,209,102,0.4)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            desktop
          </HighlightText>
        </Subtitle>

        <ButtonContainer>
          <PrimaryButton
            href="#projetos"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            Ver Projetos
          </PrimaryButton>
          <SecondaryButton
            href="#contato"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            Contato
          </SecondaryButton>
        </ButtonContainer>
      </ContentWrapper>
    </HeroSection>
  );
};

export default Hero;
