import styled from "styled-components";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

const Mouse = styled(motion.div)`
  position: fixed;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  background: transparent;
  border: 2px solid #4A90E2;
`;

const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 150);
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
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: isClicked ? 1.2 : 1,
        opacity: 0.7,
      }}
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 40,
        scale: { duration: 0.15 },
      }}
      aria-hidden="true"
    />
  );
};

const ScrollButton = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #4A90E2;
  color: #ffffff;
  border: none;
  padding: 10px;
  border-radius: 8px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.8;
  z-index: 9999;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  svg {
    width: 24px;
    height: 24px;
    stroke: #ffffff;
  }

  .tooltip {
    visibility: hidden;
    position: absolute;
    background: #1a1a1a;
    color: #ffffff;
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 0.85rem;
    font-family: "Inter", sans-serif;
    bottom: 60px;
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
      setIsVisible(window.scrollY > 300);
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
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Voltar ao topo"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
        <span className="tooltip">Voltar ao topo</span>
      </ScrollButton>
    )
  );
};

export default MouseFollower;