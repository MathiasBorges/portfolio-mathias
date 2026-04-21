import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --bg:           #080808;
    --surface:      #111111;
    --surface-2:    #1a1a1a;
    --border:       rgba(255, 255, 255, 0.07);
    --border-hover: rgba(255, 255, 255, 0.14);
    --text:         #ededed;
    --muted:        #737373;
    --muted-light:  #a1a1aa;
    --accent:       #3b82f6;
    --accent-light: #60a5fa;
    --accent-dark:  #2563eb;
    --accent-rgb:   59, 130, 246;
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: none;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .app {
    width: 100%;
    min-height: 100vh;
    background: var(--bg);
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    color: var(--text);
    line-height: 1.2;
  }

  p { line-height: 1.6; }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.2s;
  }

  svg { display: inline-block; vertical-align: middle; }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--accent); }

  body.no-scroll { overflow: hidden; }
`;

export default GlobalStyle;
