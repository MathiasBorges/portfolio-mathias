import styled from "styled-components";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

// Definindo o componente estilizado para o container externo
const Mouse = styled(motion.div)`
  position: fixed;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
`;

// Definindo o componente interno que rotaciona
const RotatingInner = styled.div`
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.8);
  
  box-shadow: 0 0 15px #4A90E2 , 0 0 10px #FF6B6B;
  animation: rotate 1s linear infinite;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: 0 });
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <Mouse
      initial={{ x: mousePosition.x, y: mousePosition.y }}
      animate={{
        x: mousePosition.x - 15,
        y: mousePosition.y - 15,
        scale: isClicked ? 1.3 : 1,
        opacity: 0.9,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        scale: { duration: 0.2 },
      }}
    >
      <RotatingInner />
    </Mouse>
  );
};

// Componente ScrollButton
const ScrollButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: linear-gradient(135deg, #FF6B6B 0%, #4A90E2 100%);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
  opacity: 0.85;
  z-index: 9999;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .tooltip {
    visibility: hidden;
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 12px;
    bottom: 70px;
    right: 0;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }

  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
`;

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <ScrollButton
        onClick={scrollToTop}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Scroll to top"
      >
        <i className="bi bi-arrow-up-circle-fill" style={{ color: "white", scale: "2" }}></i>
      </ScrollButton>
    )
  );
};

export default MouseFollower;