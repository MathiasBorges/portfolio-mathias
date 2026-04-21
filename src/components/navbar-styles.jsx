// NavbarComponent.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import styled, { ThemeProvider, createGlobalStyle, keyframes } from "styled-components";
import { FiHome, FiUser, FiCode, FiBriefcase, FiMail, FiClock } from "react-icons/fi";

// Theme com nova identidade visual escura
const theme = {
  colors: {
    primary: "#3b82f6",
    text: "#e2e8f0",
    secondaryText: "#a0a4ad",
    background: "rgba(15, 17, 23, 0.8)", // Mais transparente para glassmorphism
    borderLight: "rgba(255, 255, 255, 0.1)",
    overlay: "rgba(0, 0, 0, 0.6)"
  },
  breakpoints: {
    tablet: "768px"
  },
  navbarHeight: "60px",
  borderRadius: "12px"
};

const GlobalStyle = createGlobalStyle`
  body.no-scroll {
    overflow: hidden;
  }
`;

const navItems = [
  { href: "#home", label: "Home", icon: <FiHome /> },
  { href: "#sobre", label: "Sobre", icon: <FiUser /> },
  { href: "#experiencia", label: "Trajetória", icon: <FiClock /> },
  { href: "#skills", label: "Skills", icon: <FiCode /> },
  { href: "#projetos", label: "Projetos", icon: <FiBriefcase /> },
  { href: "#contato", label: "Contato", icon: <FiMail /> },
];

// --- Styled Components Atualizados ---
const NavbarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  padding-top: 1.2rem;
`;

const NavbarContainer = styled(motion.nav)`
  width: 92%;
  max-width: 1180px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 2rem;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  position: relative;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: ${({ theme }) => theme.colors.primary};
  transform-origin: 0%;
`;

const glitch = keyframes`
  0% { transform: translate(0) }
  20% { transform: translate(-2px, 2px) }
  40% { transform: translate(-2px, -2px) }
  60% { transform: translate(2px, 2px) }
  80% { transform: translate(2px, -2px) }
  100% { transform: translate(0) }
`;

const Logo = styled(motion.a)`
  font-size: 1.6rem;
  font-weight: 800;
  font-family: "Inter", sans-serif;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 1px;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: #fff;
    text-shadow: 2px 2px #ff00c1, -2px -2px #00fff9;
    animation: ${glitch} 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
  }
`;

const NavActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLinksDesktop = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.secondaryText)};
  background-color: ${({ theme, active }) => (active ? 'rgba(59, 130, 246, 0.1)' : 'transparent')};
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.primary};
    background-color: rgba(59, 130, 246, 0.1);
  }
`;

const MobileMenuButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  width: 42px;
  height: 42px;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;

  .icon {
    width: 26px;
    height: 26px;
    stroke-width: 2.5;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.overlay};
  z-index: 999;
  backdrop-filter: blur(4px);
`;

const MobileMenuContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: min(75%, 300px);
  height: 100vh;
  background: #0a0a0a;
  padding: calc(${({ theme }) => theme.navbarHeight} + 1.8rem) 1.8rem;
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${({ theme }) => theme.colors.borderLight};
  z-index: 1000;
  box-shadow: -10px 0 30px rgba(0,0,0,0.5);
`;

const MobileNavLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.text)};
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 1.2rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const mobileMenuVariants = {
  open: {
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  closed: {
    x: "100%",
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 40,
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const mobileLinkVariants = {
  open: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  closed: { y: 20, opacity: 0, transition: { duration: 0.3 } }
};

// --- Componente Principal ---
const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.href.substring(1)));
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveLink(`#${section.id}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <NavbarWrapper>
        <NavbarContainer
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          aria-label="Barra de navegação"
        >
          <ProgressBar style={{ scaleX }} />
          <Logo href="#home">Dev Mathias</Logo>

          <NavActionContainer>
            <NavLinksDesktop>
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  active={activeLink === item.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </NavLinksDesktop>

            <MobileMenuButton
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg className="icon" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              ) : (
                <svg className="icon" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </MobileMenuButton>
          </NavActionContainer>
        </NavbarContainer>
      </NavbarWrapper>

      <AnimatePresence>
        {isOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              aria-hidden="true"
            />
            <MobileMenuContainer
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              aria-modal="true"
              role="dialog"
            >
              {navItems.map((item) => (
                <MobileNavLink
                  key={item.href}
                  href={item.href}
                  active={activeLink === item.href}
                  variants={mobileLinkVariants}
                  onClick={closeMenu}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </MobileNavLink>
              ))}
            </MobileMenuContainer>
          </>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default NavbarComponent;

