import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { FiSmartphone, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const ContactSection = styled.section`
  padding: 120px 20px;
  background: linear-gradient(to bottom, #1a1a2d, #141425);
  color: #f5f5f5;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 80%, rgba(0, 255, 224, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(0, 191, 166, 0.03) 0%, transparent 50%);
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;

`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 60px;
  
  svg {
    color: #00ffe0;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 2.6rem);
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

const ContactContent = styled(motion.div)`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 40px;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: linear-gradient(145deg, rgba(26, 26, 45, 0.9), rgba(20, 20, 37, 0.8));
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 224, 0.1);
  position: relative;
  
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #00ffe0;
  font-weight: 500;
  text-align: left;
`;

const Input = styled(motion.input)`
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(26, 26, 45, 0.6);
  color: #e2e8f0;
  transition: all 0.3s ease;

  &:focus {
    border-color: #00ffe0;
    box-shadow: 0 0 0 3px rgba(0, 255, 224, 0.2);
    outline: none;
    background: rgba(26, 26, 45, 0.8);
  }

  &::placeholder {
    color: #888;
  }
`;

const TextArea = styled(motion.textarea)`
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(26, 26, 45, 0.6);
  color: #e2e8f0;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    border-color: #00ffe0;
    box-shadow: 0 0 0 3px rgba(0, 255, 224, 0.2);
    outline: none;
    background: rgba(26, 26, 45, 0.8);
  }

  &::placeholder {
    color: #888;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 16px 24px;
  font-size: 1rem;
  background: linear-gradient(135deg, #00ffe0, #00bfa6);
  color: #0f0f23;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease;
  margin-top: 8px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 56px;

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
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: 0.5s;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(0, 255, 224, 0.4);
    background: linear-gradient(135deg, #00bfa6, #00ffe0);

    &::before {
      left: 100%;
    }
  }

  &:disabled {
    background: rgba(100, 100, 100, 0.3);
    color: #666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;

    &::before {
      display: none;
    }
  }
`;

const MessageStatus = styled(motion.div)`
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  font-weight: 500;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: ${(props) =>
    props.success 
      ? "linear-gradient(135deg, rgba(0, 255, 224, 0.1), rgba(0, 191, 166, 0.1))" 
      : "linear-gradient(135deg, rgba(220, 53, 69, 0.1), rgba(185, 28, 28, 0.1))"};
  color: ${(props) => props.success ? "#00ffe0" : "#ff6b6b"};
  border: 1px solid ${(props) =>
    props.success ? "rgba(0, 255, 224, 0.3)" : "rgba(220, 53, 69, 0.3)"};
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 32px;
  background: linear-gradient(145deg, rgba(26, 26, 45, 0.9), rgba(20, 20, 37, 0.8));
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 224, 0.1);
  align-self: flex-start;
  position: relative;
  
 

  @media (max-width: 768px) {
    align-self: center;
  }
`;

const InfoTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 12px;
  color: #ffffff;
  font-weight: 600;
`;

const InfoText = styled.p`
  font-size: 1rem;
  color: #a0a4ad;
  line-height: 1.7;
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 16px;
  color: #e2e8f0;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 16px 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(0, 255, 224, 0.1);
    border-color: rgba(0, 255, 224, 0.3);
    transform: translateX(8px);
  }

  i {
    font-size: 1.4rem;
    color: #00ffe0;
    transition: all 0.3s ease;
  }
`;

const Contact = () => {
  const ref = useRef();
  const refSection = useRef(null);
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isInView = useInView(refSection, { once: true, margin: "-100px" });

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    emailjs
      .sendForm(
        "service_bdiwhxl",
        "template_xsmh59t",
        ref.current,
        "IXUTuZ0QeccX_mtzV"
      )
      .then(
        (result) => {
          setMessage({ text: "Mensagem enviada com sucesso!", success: true });
          ref.current.reset();
          setIsSubmitting(false);
          setTimeout(() => setMessage(null), 5000); // Limpa mensagem após 5s
        },
        (error) => {
          setMessage({
            text: "Erro ao enviar a mensagem. Tente novamente mais tarde.",
            success: false,
          });
          setIsSubmitting(false);
        }
      );
  };

  return (
    <ContactSection id="contato" ref={refSection}>
      <Container>
        <TitleContainer>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <FiSmartphone size={32} />
          </motion.div>
          <SectionTitle
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Entre em Contato
          </SectionTitle>
        </TitleContainer>
        
        <ContactContent
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ContactForm
            ref={ref}
            onSubmit={sendEmail}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FormGroup>
              <Label htmlFor="name">Seu Nome</Label>
              <Input
                type="text"
                id="name"
                name="from_name"
                placeholder="Como posso te chamar?"
                required
                whileFocus={{ scale: 1.02, borderColor: "#00ffe0" }}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Seu E-mail</Label>
              <Input
                type="email"
                id="email"
                name="from_email"
                placeholder="Para onde devo responder?"
                required
                whileFocus={{ scale: 1.02, borderColor: "#00ffe0" }}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Sua Mensagem</Label>
              <TextArea
                id="message"
                name="message"
                placeholder="O que gostaria de conversar?"
                required
                whileFocus={{ scale: 1.02, borderColor: "#00ffe0" }}
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <>
                  <i className="bi bi-arrow-repeat"></i> Enviando...
                </>
              ) : (
                <>
                  <i className="bi bi-send-fill"></i> Enviar Mensagem
                </>
              )}
            </SubmitButton>

            <AnimatePresence>
              {message && (
                <MessageStatus
                  initial={{ opacity: 0, height: 0, y: 20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  success={message.success}
                >
                  {message.success ? <FiCheckCircle size={20} /> : <FiAlertCircle size={20} />}
                  {message.text}
                </MessageStatus>
              )}
            </AnimatePresence>
          </ContactForm>

          <ContactInfo
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div>
              <InfoTitle>Vamos conversar?</InfoTitle>
              <InfoText>
                Estou sempre aberto a novas oportunidades, projetos
                interessantes ou apenas um bate-papo sobre tecnologia.
              </InfoText>
            </div>

            <SocialLinks>
              <InfoTitle>Redes Sociais</InfoTitle>
              <SocialLink
                href="https://github.com/MathiasBorges"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
              >
                <i className="bi bi-github"></i>
                <span>GitHub</span>
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/mathias-borges-marques/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
              >
                <i className="bi bi-linkedin"></i>
                <span>LinkedIn</span>
              </SocialLink>
              <SocialLink
                href="mailto:mathias.borges.marques@gmail.com"
                whileHover={{ scale: 1.02 }}
              >
                <i className="bi bi-envelope-at-fill"></i>
                <span>E-mail</span>
              </SocialLink>
            </SocialLinks>
          </ContactInfo>
        </ContactContent>
      </Container>
    </ContactSection>
  );
};

export default Contact;
