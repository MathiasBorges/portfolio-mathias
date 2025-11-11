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
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #e2e8f0;
    background: #0f1117;
    overflow-x: hidden;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #0f1117;
  }

  ::-webkit-scrollbar-thumb {
    background: #1a1d27;
    border-radius: 5px;
    border: 2px solid #0f1117;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #00ffe0;
  }

  .app {
    width: 100%;
    min-height: 100vh;
    background: #0f1117;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    color: #ffffff;
  }

  p {
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s ease;
  }
  
  svg {
    display: inline-block;
    vertical-align: middle;
  }
`;
export default GlobalStyle;
