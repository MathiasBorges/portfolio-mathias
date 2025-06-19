import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
// Se você não estiver usando Bootstrap Icons globalmente, importe os SVGs ou use outra biblioteca de ícones
// import { List, XLg } from 'react-bootstrap-icons';

// --- 1. Theming (Exemplo Básico) ---
const theme = {
  colors: {
    primary: "#4A90E2",
    secondary: "#FF6B6B",
    text: "#F5F5F5",
    backgroundDark: "rgba(30, 30, 30, 0.9)",
    backgroundDarker: "rgba(20, 20, 20, 0.98)",
    borderLight: "rgba(255, 255, 255, 0.1)",
    overlay: "rgba(0, 0, 0, 0.5)",
    iconButtonBg: "rgba(74, 144, 226, 0.2)",
  },
  breakpoints: {
    tablet: "768px",
  },
  navbarHeight: "60px", // Exemplo de variável para altura
  borderRadius: "50px",
};

// --- 2. Estilo Global para Bloquear Scroll ---
const GlobalStyle = createGlobalStyle`
  body.no-scroll {
    overflow: hidden;
  }
`;

// --- 3. Estrutura de Links ---
const navItems = [
  { href: "#sobre", label: "Sobre" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];

// --- Styled Components Refatorados ---

const NavbarContainer = styled(motion.nav)`
  position: fixed;
  top: 1.5rem; // Pode ser ajustado ou vir do tema
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 90%;
  max-width: 1200px;
  background: ${({ theme }) => theme.colors.backgroundDark};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); // Prefixo para compatibilidade
  color: ${({ theme }) => theme.colors.text};
  padding: 0 2rem; // Padding vertical pode ser controlado pela altura/alinhamento
  height: ${({ theme }) => theme.navbarHeight};
  display: flex;
  justify-content: space-between; // Simplifica o layout interno
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  z-index: 1000;
`;

const Logo = styled(motion.a)`
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  white-space: nowrap;
  animation: animaLogoTexto 2s ease-in-out alternate infinite;
  @keyframes animaLogoTexto {
   from{
    text-shadow: 0 0 20px #4A90E2;
   }to{
    text-shadow: 0 0 15px #FF6B6B;
   }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.3rem;
  }
`;

// Container para links desktop E botão mobile (para controle de ordem/espaçamento)
const NavActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem; // Espaçamento entre últimos links e/ou botão
`;

const NavLinksDesktop = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none; // Esconde links desktop em telas menores
  }
`;

const NavLink = styled(motion.a)`
  position: relative;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 0;
  white-space: nowrap;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary}
    );
    transition: width 0.3s ease;
  }

  &:hover::after,
  &:focus::after { // Adiciona foco para acessibilidade
    width: 100%;
  }
  &:focus {
     outline: 2px solid ${({ theme }) => theme.colors.primary}; // Estilo de foco visível
     outline-offset: 4px;
     border-radius: 2px; // Para acompanhar o outline
  }
  &:focus:not(:focus-visible) { // Remove outline se não for foco via teclado
     outline: none;
  }
`;

const MobileMenuButton = styled(motion.button)`
  background: ${({ theme }) => theme.colors.iconButtonBg};
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: none; // Escondido por padrão
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001; // Acima da navbar, mas abaixo do menu/overlay
  padding: 0; // Remove padding padrão de botão

  // --- 5. Mover estilos inline do ícone ---
  .icon {
     font-size: 1.5rem; // Tamanho padrão
     display: flex;
     align-items: center;
     justify-content: center;
  }
  .icon-close {
      font-size: 1.2rem; // Tamanho específico para o 'X'
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex; // Mostra apenas em telas menores
  }

  &:focus {
     outline: 2px solid ${({ theme }) => theme.colors.primary};
     outline-offset: 2px;
  }
   &:focus:not(:focus-visible) {
     outline: none;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 999; // Abaixo do menu mobile
`;

const MobileMenuContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: min(70%, 300px); // Largura responsiva com máximo
  height: 100vh;
  background: ${({ theme }) => theme.colors.backgroundDarker};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  padding: calc(${({ theme }) => theme.navbarHeight} + 2rem) 2rem 2rem; // Padding superior considera altura da navbar
  z-index: 1000; // Mesmo z-index da navbar ou maior
  box-shadow: -5px 0 15px rgba(0,0,0,0.3); // Sombra para destacar
`;

// --- 6. Animação Stagger para links mobile ---
const mobileMenuVariants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.07, // Atraso entre animações dos filhos
      delayChildren: 0.2,    // Atraso antes de começar a animar os filhos
    },
  },
  closed: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      staggerChildren: 0.05, // Animação de saída também
      staggerDirection: -1, // Ordem reversa na saída
    },
  },
};

const mobileLinkVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }, // Efeito de 'subir' mais rápido
    },
  },
  closed: {
    y: 50, // Começa de baixo
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};


const MobileNavLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 1.2rem;
  padding: 1rem 0;
  margin: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  cursor: pointer;

  &:last-child {
      border-bottom: none; // Remove borda do último item
  }

  &:focus {
     outline: 2px solid ${({ theme }) => theme.colors.primary};
     outline-offset: 2px;
     border-radius: 2px;
  }
   &:focus:not(:focus-visible) {
     outline: none;
  }
`;

// --- Componente Principal ---

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  // --- 4. Bloquear Scroll ---
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    // Cleanup function para remover a classe se o componente for desmontado
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]); // Executa quando 'isOpen' muda

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    // Prover o tema para todos os styled-components descendentes
    <ThemeProvider theme={theme}>
      <GlobalStyle /> {/* Aplica o estilo global */}
      <NavbarContainer
        aria-label="Navegação Principal" // Acessibilidade
        initial={{ y: -100, opacity: 0 }} // Começa fora da tela e invisível
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Logo href="#">Dev Mathias</Logo>

        <NavActionContainer>
          <NavLinksDesktop>
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </NavLink>
            ))}
          </NavLinksDesktop>

          <MobileMenuButton
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
            aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"} // Acessibilidade
            aria-expanded={isOpen} // Acessibilidade
          >
            {/* Use SVGs ou componentes de ícone aqui para melhor controle */}
            {/* Exemplo com classes (requer Bootstrap Icons CSS) */}
            {isOpen ? (
               <i className="bi bi-x-lg icon icon-close" />
            ) : (
               <i className="bi bi-list icon" />
            )}
            {/* Exemplo com react-bootstrap-icons (npm install react-bootstrap-icons)
             {isOpen ? <XLg size={20} /> : <List size={24} />}
            */}
          </MobileMenuButton>
        </NavActionContainer>

      </NavbarContainer>

      <AnimatePresence>
        {isOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu} // Fecha o menu ao clicar no overlay
              aria-hidden="true" // Overlay é decorativo
            />
            <MobileMenuContainer
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              aria-modal="true" // Acessibilidade: Indica que o conteúdo fora está inerte
              role="dialog" // Acessibilidade: Define como uma janela de diálogo
            >
               {/* Poderia adicionar um botão de fechar aqui dentro também */}
               {/* <CloseButtonInternal onClick={closeMenu}>X</CloseButtonInternal> */}
              {navItems.map((item) => (
                <MobileNavLink
                  key={item.href}
                  href={item.href}
                  variants={mobileLinkVariants} // Aplica variantes de animação individuais
                  onClick={closeMenu} // Fecha o menu ao clicar em um link
                  whileHover={{ x: 5 }} // Pequeno efeito no hover
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
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