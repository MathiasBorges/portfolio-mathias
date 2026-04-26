import anot_in_image from "../assets/projetos-assets/projeto-1-anotin.png";
import anot_in_video from "../assets/projetos-assets/projeto-1-anotin.mp4";
import devflix_image from "../assets/projetos-assets/projeto-2-devflix.png";
import devflix_video from "../assets/projetos-assets/projeto-2-devflix.mp4";
import perdido_image from "../assets/projetos-assets/projeto-3-perdido.png";
import perdido_video from "../assets/projetos-assets/projeto-3-perdido.mp4";
import the_uiratec_image from "../assets/projetos-assets/projeto-4-theuiratec.png";
import the_uiratec_video from "../assets/projetos-assets/projeto-4-theuiratec.mp4";
import just_chat_image from "../assets/projetos-assets/projeto-5-justchat.png";
import just_chat_video from "../assets/projetos-assets/projeto-5-justchat.mp4";
import vokefy_image from "../assets/projetos-assets/projeto-7-vokefy.png";
import vokefy_video from "../assets/projetos-assets/projeto-7-vokefy.mp4";
import optimize_image from "../assets/projetos-assets/projeto-8-optimize.png";
import optimize_video from "../assets/projetos-assets/projeto-8-optimize.mp4";
import mellk_image from "../assets/projetos-assets/projeto-9-mellk.png";
import mellk_video from "../assets/projetos-assets/projeto-9-mellk.mp4";
import cafe_com_jota_image from "../assets/projetos-assets/projeto-10-cafe-com-jota.png";

export const projects = [
    {
      title: "Café Com Jota",
      description:
        "Plataforma completa de financiamento coletivo criada para ampliar o impacto de uma iniciativa social local que destina 20% da receita para apoiar pessoas sem-teto e animais abandonados.",
      media: [{ type: "image", src: cafe_com_jota_image }],
      link: "https://cafe-com-jota.web.app/",
      techs: ["React.js", "Firebase", "Mercado Pago", "Crowdfunding"],
    },
    {
      title: "Mellk",
      description: "Este é um sistema de gestão comercial, desenvolvido para controlar cadastros, vendas, estoque e finanças de forma integrada",
      media: [{ type: "image", src: mellk_image }, { type: "video", src: mellk_video }],
      link: "#contato",
      techs: ["Python", "JSON", "Tkinter"],
      repo: "https://github.com/MathiasBorges/Mellk",
    },
    {
      title: "Vokefy",
      description:
        "Uma ferramenta que gera currículos em PDFs de forma ágil e rápida.",
      media: [
        { type: "image", src: vokefy_image },
        { type: "video", src: vokefy_video },
      ],
      link: "https://vokefy-saas.web.app/",
      techs: [
        "Next.js",
        "Firebase",
        "Node.js",
        "Render",
        "Chakra UI",
        "Framer Motion",
      ],
    },
    {
      title: "The Uiratec",
      description: "Rede Social Interna de uma instituição.",
      media: [
        { type: "image", src: the_uiratec_image },
        { type: "video", src: the_uiratec_video },
      ],
      link: "https://the-uiratec.infinityfreeapp.com/TheUiratec/php/",
      repo: "https://github.com/MathiasBorges/The-Uiratec",
      techs: ["PHP", "MySQL", "JavaScript", "CSS3"],
    },
    {
      title: "Optimize App Pro",
      description:
        "Software Desktop para realizar operações do Windows de forma mais simples.",
      media: [
        { type: "image", src: optimize_image },
        { type: "video", src: optimize_video },
      ],
      link: "#contato",
      techs: [
        "Python",
        "Tkinter",
        "psutil",
        "WMI",
        "JSON",
        "MatplotLib",
        ".exe",
      ],
    },
    {
      title: "Just Chat",
      description:
        "Um bate-papo centralizado sobre o assunto que o usuário quiser.",
      media: [
        { type: "image", src: just_chat_image },
        { type: "video", src: just_chat_video },
      ],
      link: "https://justchat-nzj9.onrender.com/",
      repo: "https://github.com/MathiasBorges/JustChat",
      techs: ["React.js", "CSS3", "Node.js", "Render", "AppWrite"],
    },
    {
      title: "Perdido",
      description: "Um jogo 2D para desktop.",
      media: [
        { type: "image", src: perdido_image },
        { type: "video", src: perdido_video },
      ],
      link: "#contato",
      repo: "https://github.com/MathiasBorges/RPG-Perdido-demoVersion",
      techs: ["PyGame", "FL Studio", "CraftPix", ".exe"],
    },
    {
      title: "AnotIn",
      description: "Sistema de bloco de tarefas.",
      media: [
        { type: "image", src: anot_in_image },
        { type: "video", src: anot_in_video },
      ],
      link: "https://mathiasborges.github.io/AnotIn/notes.html",
      repo: "https://github.com/MathiasBorges/AnotIn",
      techs: ["HTML5", "CSS3", "JavaScript"],
    },
    {
      title: "DevFlix",
      description: "Simulação de uma plataforma de vídeos.",
      media: [
        { type: "image", src: devflix_image },
        { type: "video", src: devflix_video },
      ],
      link: "https://devflix-493y.onrender.com/#/",
      repo: "https://github.com/MathiasBorges/devflix-",
      techs: ["React.js", "CSS3", "Node.js", "Render"],
    },
  ];
