import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";


const GlobalStyle = createGlobalStyle`
  * {
    scroll-behavior: smooth;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: none;
  }
  
  @media (max-width: 768px) {
    #root {
      margin: 0;
    }
  }

  body {
    font-family: 'Inter', sans-serif; /* Substituímos Arial por Inter para um visual mais moderno */
    color: #F5F5F5;
    background: #1A1A1A;
  }

  .app {
    width: 100%;
    height: 100%;
    padding: 0.1%;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3); /* Sombra mais suave */
    background: linear-gradient(135deg, #1A1A1A, #2D2D2D);
  }

  h1, h2 {
    font-weight: 700;
    color: #F5F5F5;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  svg {
    color: #00ffe0;
  }
`;
export default GlobalStyle;
