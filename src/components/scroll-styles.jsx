import styled from "styled-components";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

const Mouse = styled(motion.div)`
  position: fixed;
  width: 10px;
  height: 10px;
  background-color: #00ffe0;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
`;

const MouseRing = styled(motion.div)`
  position: fixed;
  width: 40px;
  height: 40px;
  border: 2px solid rgba(0, 255, 224, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s, background-color 0.2s;
`;

const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <Mouse
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isClicked ? 0.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 1500,
          damping: 100,
          mass: 0.1
        }}
      />
      <MouseRing
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isClicked ? 0.8 : 1,
          backgroundColor: isClicked ? "rgba(0, 255, 224, 0.1)" : "transparent"
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 1
        }}
      />
    </>
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