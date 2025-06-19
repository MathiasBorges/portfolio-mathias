import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styled from "styled-components";
import my_image from "../assets/just_me.png";

// Estilização da seção "Sobre"
const AboutSection = styled.section`
  padding: 100px 20px;
  background: linear-gradient(to bottom, #1a1a1a, #2d2d2d);
  color: #f5f5f5;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234A90E2' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
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
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin-bottom: 40px;
  background: linear-gradient(to right, #f5f5f5, #b0b0b0);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(to right, #4a90e2, #FF6B6B);
    border-radius: 3px;
  }
`;

const AboutContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  background: rgba(30, 30, 30, 0.8);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(74, 144, 226, 0.2);
`;

const Avatar = styled(motion.img)`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #4a90e2;
  box-shadow: 0 0 30px rgba(74, 144, 226, 0.5);
  margin-bottom: 30px;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 40px rgba(74, 144, 226, 0.8);
  }
`;

const TextContent = styled.div`
  text-align: center;
  font-size: clamp(1rem, 1.2vw, 1.2rem);
  line-height: 1.8;
  color: #e0e0e0;
`;

const Highlight = styled.span`
  font-weight: 600;
  color: ${(props) => props.color || "#4a90e2"};
  background: ${(props) => props.bg || "rgba(255,255,255,0.1)"};
  padding: 2px 8px;
  border-radius: 5px;
  margin: 0 5px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px
      ${(props) => props.shadow || "rgba(74, 144, 226, 0.3)"};
  }
`;

const DownloadButton = styled(motion.a)`
  display: inline-block;
  padding: 15px 30px;
  font-size: 1rem;
  background: linear-gradient(135deg, #4a90e2, #2a5d9e);
  color: #f5f5f5;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  margin-top: 30px;
  border: none;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(74, 144, 226, 0.4);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    transform: translateY(-30px);
    box-shadow: 0 8px 25px rgba(74, 144, 226, 0.6);

    &::before {
      left: 100%;
    }
  }
`;

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <AboutSection id="sobre" ref={ref}>
      <Container>
        <Avatar
          src={my_image}
          alt="Minha foto de perfil"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <SectionTitle
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Sobre Mim{" "}
          <i
            style={{ background: "linear-gradient(to right, #4A90E2, #FF6B6B)",backgroundClip: "text", color: "transparent",WebkitBackgroundClip:"text" }}
            className="bi bi-file-person-fill"
          ></i>
        </SectionTitle>

        <AboutContent
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <TextContent>
            <p>
              Olá, sou um desenvolvedor que gosta de resolver problemas de forma
              prática e objetiva, com base em desenvolvimento{" "}
              <Highlight
                color="#ff7b00"
                bg="rgba(255,123,0,0.1)"
                shadow="rgba(255,123,0,0.3)"
              >
                Front-end
              </Highlight>{" "}
              e{" "}
              <Highlight
                color="#4a90e2"
                bg="rgba(74,144,226,0.1)"
                shadow="rgba(74,144,226,0.3)"
              >
                Back-end
              </Highlight>
              . Estou sempre em busca de desafios que me permitam crescer e
              aprender novas tecnologias.
            </p>

            <p>
              Já colaborei e liderei em equipes criativas em projetos impactantes
              que solucionam problemas reais, além disso, utilizando
              metodologias ágeis como{" "}
              <Highlight
                color="#6bd425"
                bg="rgba(107,212,37,0.1)"
                shadow="rgba(107,212,37,0.3)"
              >
                SCRUM
              </Highlight>{" "}
              e{" "}
              <Highlight
                color="#ffd700"
                bg="rgba(255,215,0,0.1)"
                shadow="rgba(255,215,0,0.3)"
              >
                SPRINT
              </Highlight>
              .
            </p>

            <p>
              Em meus projetos combino pensamento estratégico, atenção aos
              detalhes e paixão ao criar experiências digitais.
            </p>
          </TextContent>

          <DownloadButton
            href="#contato"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            Entre em contato ↓
          </DownloadButton>
        </AboutContent>
      </Container>
    </AboutSection>
  );
};

export default About;
