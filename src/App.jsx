import Hero from "./styles-components/hero-styles";
import NavbarComponent from "./styles-components/navbar-styles";
import About from "./styles-components/about-styles";
import Projects from "./styles-components/projects-styles";
import Contact from "./styles-components/contato-styles";

function App() {

  return (
    <div className="app">
      <NavbarComponent />
      <Hero />
      <About/>
      <Projects/>
      <Contact/>
    </div>
  );
}

export default App;
