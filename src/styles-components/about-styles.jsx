import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styled from "styled-components";
import my_image from "../assets/just_me.jpg";
import { FiUser, FiMail } from "react-icons/fi";

// --- Styled Components Atualizados ---

const AboutSection = styled.section`
  padding: 100px 20px;
  background: #10111c;
  color: #c5cad3;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 2.6rem);
  font-weight: 700;
  font-family: "Inter", sans-serif;
  margin-bottom: 50px;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  gap: 12px;

`;

const GridLayout = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  align-items: center;
  gap: 60px;
  width: 100%;
  max-width: 1000px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Avatar = styled(motion.img)`
  width: 100%;
  max-width: 280px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #00ffe0;
  box-shadow: 0 0 20px rgba(0, 255, 224, 0.2);
  animation: pulseGlow 4s ease-in-out infinite alternate;
  justify-self: center;

  @keyframes pulseGlow {
    from {
      box-shadow: 0 0 10px rgba(0, 255, 224, 0.2);
    }
    to {
      box-shadow: 0 0 25px rgba(0, 255, 224, 0.4);
    }
  }
`;

const TextContent = styled(motion.div)`
  font-size: clamp(1rem, 1.2vw, 1.15rem);
  line-height: 1.75;
  color: #a0a4ad;

  @media (max-width: 768px) {
    text-align: center;
  }

  p {
    margin-bottom: 20px;
  }
`;

const Highlight = styled.span`
  font-weight: 600;
  color: #00ffe0;
  background-color: rgba(0, 255, 224, 0.1);
  padding: 3px 8px;
  border-radius: 5px;
`;

const ContactButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 28px;
  font-size: 1rem;
  background: #00aaff;
  color: #ffffff;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  margin-top: 30px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 170, 255, 0.25);

  &:hover {
    background: #00c2ff;
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 170, 255, 0.35);
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
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
          <Avatar
            src={my_image}
            alt="Foto de perfil"
            variants={itemVariants}
          />

          <TextContent variants={itemVariants}>
            <p>
              Sou um desenvolvedor apaixonado por tecnologia e resolução de problemas. Atuo tanto no <Highlight>Front-end</Highlight> quanto no <Highlight>Back-end</Highlight>, sempre buscando evoluir e entregar soluções eficientes.
            </p>
            <p>
              Tenho experiência liderando e colaborando em projetos diversos, utilizando metodologias ágeis como o <Highlight>Scrum</Highlight>. Busco criar experiências digitais que geram impacto e valor.
            </p>
            <ContactButton
              href="#contato"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail /> Entrar em Contato
            </ContactButton>
          </TextContent>
        </GridLayout>
      </Container>
    </AboutSection>
  );
};

export default About;
