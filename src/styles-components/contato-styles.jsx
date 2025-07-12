import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { FiSmartphone } from "react-icons/fi";

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
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234A90E2' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
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

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin-bottom: 60px;
  background: linear-gradient(to right, #f5f5f5, #b0b0b0);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  display: inline-block;
   @media (max-width: 768px) {
    font-size:1.77rem;
  }
`;

const ContactContent = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  width: 100%;
  max-width: 1000px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: rgba(30, 30, 30, 0.8);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(74, 144, 226, 0.2);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #b0b0b0;
  text-align: left;
`;

const Input = styled.input`
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(20, 20, 20, 0.5);
  color: #f5f5f5;
  transition: all 0.3s ease;

  &:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
    outline: none;
    background: rgba(30, 30, 30, 0.8);
  }

  &::placeholder {
    color: #666;
  }
`;

const TextArea = styled.textarea`
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(20, 20, 20, 0.5);
  color: #f5f5f5;
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
    outline: none;
    background: rgba(30, 30, 30, 0.8);
  }

  &::placeholder {
    color: #666;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 15px;
  font-size: 1rem;
  background: linear-gradient(135deg, #4a90e2, #2a5d9e);
  color: #f5f5f5;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-top: 10px;
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
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(74, 144, 226, 0.6);

    &::before {
      left: 100%;
    }
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;

    &::before {
      display: none;
    }
    
  }
`;

const MessageStatus = styled(motion.p)`
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  margin-top: 20px;
  background: ${(props) =>
    props.success ? "rgba(40, 167, 69, 0.2)" : "rgba(220, 53, 69, 0.2)"};
  color: ${(props) => (props.success ? "#28a745" : "#dc3545")};
  border: 1px solid
    ${(props) =>
      props.success ? "rgba(40, 167, 69, 0.3)" : "rgba(220, 53, 69, 0.3)"};
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 30px;
  background: rgba(30, 30, 30, 0.8);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(74, 144, 226, 0.2);
  align-self: flex-start;

  @media (max-width: 768px) {
    align-self: center;
  }
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #f5f5f5;
`;

const InfoText = styled.p`
  font-size: 1rem;
  color: #b0b0b0;
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 15px;
  color: #f5f5f5;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 12px 20px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(74, 144, 226, 0.2);
    transform: translateX(5px);
  }

  i {
    font-size: 1.5rem;
    color: #4a90e2;
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
        <div>
          <FiSmartphone size={32} />
          <SectionTitle
             style={{marginLeft:"10px"}}
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Entre em Contato
          </SectionTitle>
        </div>
        
        <ContactContent>
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
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Sua Mensagem</Label>
              <TextArea
                id="message"
                name="message"
                placeholder="O que gostaria de conversar?"
                required
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

            {message && (
              <MessageStatus
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                success={message.success}
              >
                {message.text}
              </MessageStatus>
            )}
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
