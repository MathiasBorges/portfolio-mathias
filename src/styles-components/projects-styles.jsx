import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import styled from "styled-components";

// Importações de imagens e vídeos (verifique se os caminhos estão corretos)
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
// Importar imagem para o GerenciaME, se tiver uma
// import gerenciame_image from "../assets/projetos-assets/projeto-6-gerenciame.png";

// --- Styled Components Gerais da Seção ---
const ProjectsSection = styled(motion.section)`
    padding: 120px 20px;
    background: linear-gradient(to bottom, #0a0a0a, #1a1a1a);
    color: #f5f5f5;
    position: relative;
    overflow: hidden;
    text-align: center; // Centraliza o título

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        // Padrão sutil de fundo, ajustado a opacidade
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234A90E2' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        z-index: 0;
    }
`;

const SectionTitle = styled(motion.h2)`
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    margin-bottom: 60px;
    background: linear-gradient(to right, #f5f5f5, #b0b0b0);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    position: relative;
    display: inline-block;

    &::after {
        content: "";
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        width: 80px; // Levemente menor
        height: 4px;
        background: linear-gradient(to right, #4a90e2, #FF6B6B);
        border-radius: 4px;
    }
`;

const ProjectsContainer = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
`;

const ProjectsGrid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); // Ajuste para telas menores
    gap: 30px;
    width: 100%;
`;

// --- Styled Components do Card (Movidos para cá) ---
const ProjectCard = styled(motion.div)`
    background: rgba(30, 30, 30, 0.8);
    border-radius: 16px; // Aplicar border-radius em todos os cantos
    padding: 25px; // Aumentar um pouco o padding
    text-align: left;
    transition: all 0.3s ease;
    border: 1px solid rgba(74, 144, 226, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4); // Aumentar a sombra
    overflow: hidden;
    position: relative;
    display: flex; // Usar flexbox para o layout interno
    flex-direction: column;
    height: 100%; // Garante que todos os cards tenham a mesma altura no grid

    &:hover {
        transform: translateY(-8px); // Efeito hover sutil
        box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5); // Sombra maior no hover
        border-color: rgba(74, 144, 226, 0.4);
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 5px;
        background: linear-gradient(to right, #4a90e2, #FF6B6B);
    }
`;

const ImageContainer = styled.div`
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 20px;
    height: 200px; // Altura fixa para consistência
    background-color: #000; // Fundo preto para vídeos/imagens
    display: flex; // Centralizar mídia
    align-items: center;
    justify-content: center;
`;

const ProjectMedia = styled.div`
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;

    img,
    video {
        width: 100%;
        height: 100%;
        object-fit: cover; // Garante que a mídia cubra o container sem distorcer
        border-radius: 12px;
    }
`;

const MediaIndicator = styled.div`
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 6px; // Aumentar o espaço entre os pontos
    z-index: 3; // Acima dos botões de navegação
`;

const IndicatorDot = styled.div`
    width: 9px; // Levemente maior
    height: 9px;
    border-radius: 50%;
    background: ${props => props.active ? "#4A90E2" : "rgba(255,255,255,0.4)"}; // Fundo mais visível para inativo
    transition: all 0.3s ease;
    cursor: pointer; // Indica que é clicável
`;

const NavButton = styled(motion.button)`
    position: absolute;
    top: 50%;
    
    background: rgba(0, 0, 0, 0.6); // Fundo mais escuro para contraste
    color: #F5F5F5;
    border: none;
    width: 35px; // Levemente menor
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1rem; // Tamanho do ícone
    border-radius: 50%;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.3s ease, background 0.3s ease, transform 0.3s ease;

    ${ProjectCard}:hover & {
        opacity: 1;
    }

    &:hover {
        background: #4A90E2;
        transform:scale(1.1);
    }

     &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
      background: rgba(0, 0, 0, 0.6);
    }
`;

const PrevButton = styled(NavButton)`
    left: 15px;
`;

const NextButton = styled(NavButton)`
    right: 15px;
`;

const ProjectTitle = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 10px; // Espaço menor
    color: #F5F5F5;
    font-weight: 600;
`;

const ProjectDescription = styled.p`
    font-size: 1rem;
    color: #B0B0B0;
    line-height: 1.5; // Espaçamento de linha ajustado
    margin-bottom: 20px;
    flex-grow: 1; // Permite que a descrição ocupe espaço extra
`;

const TechList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px; // Espaço menor entre as badges
    margin-bottom: 20px;
`;

const TechBadge = styled(motion.span)`
    background: rgba(74, 144, 226, 0.15); // Opacidade menor
    color: #4A90E2;
    padding: 4px 10px; // Padding ajustado
    font-size: 0.8rem; // Fonte menor
    border-radius: 20px;
    border: 1px solid rgba(74, 144, 226, 0.25); // Opacidade menor
    transition: all 0.3s ease;

    &:hover {
        background: rgba(74, 144, 226, 0.3); // Fundo no hover
        transform: translateY(-2px);
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 12px; // Espaço menor entre os botões
    margin-top: 20px; // Garante espaço acima dos botões
`;

const ProjectButton = styled(motion.a)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    border-radius: 30px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 0.9rem; // Fonte menor
    gap: 8px;
    flex-grow: 1; // Permite que os botões cresçam
    max-width: 150px; // Limita o tamanho máximo do botão

    &:hover {
        transform: translateY(-3px);
    }

     i {
      margin-right: 5px; // Espaço entre ícone e texto
    }
`;

const LiveButton = styled(ProjectButton)`
    background: linear-gradient(135deg, #4A90E2, #2a5d9e);
    color: #F5F5F5;
    box-shadow: 0 4px 10px rgba(74, 144, 226, 0.3); // Sombra ajustada

    &:hover {
        box-shadow: 0 6px 15px rgba(74, 144, 226, 0.5); // Sombra maior no hover
    }
`;

const RepoButton = styled(ProjectButton)`
    background: rgba(255, 255, 255, 0.08); // Fundo mais sutil
    color: #F5F5F5;
    border: 1px solid rgba(255, 255, 255, 0.15); // Borda mais sutil

    &:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.3);
    }
`;

const DisabledButton = styled(ProjectButton)`
    background: rgba(100, 100, 100, 0.15); // Fundo mais claro para disabled
    color: #888;
    border: 1px solid rgba(255, 255, 255, 0.05);
    cursor: not-allowed;
    box-shadow: none; // Sem sombra para disabled

    &:hover {
      transform: none; // Remove efeito hover
      background: rgba(100, 100, 100, 0.15); // Mantém o fundo disabled no hover
    }
`;


const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" }); // Ajuste a margin conforme necessário

    const projects = [
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
        {
            title: "Perdido",
            description: "Um jogo 2D para desktop.",
             media: [
                { type: "image", src: perdido_image },
                 // Certifique-se que o caminho do vídeo está correto ou remova se não existir
                 { type: "video", src: perdido_video },
            ],
            // O link para um .zip é um download direto
            link: "#", // Ajuste o caminho se o download for local
            repo: "https://github.com/MathiasBorges/RPG-Perdido-demoVersion",
            techs: ["PyGame", "FL Studio", "CraftPix"],
        },
        {
            title: "The Uiratec",
            description: "Rede Social Interna de uma instituição.",
            media: [
                { type: "image", src: the_uiratec_image },
                { type: "video", src: the_uiratec_video },
            ],
            link: "https://the-uiratec.infinityfreeapp.com/TheUiratec/php/", // Link marcado como indisponível
            repo: "https://github.com/MathiasBorges/The-Uiratec",
            techs: ["PHP", "MySQL", "JavaScript", "CSS3"],
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
            title: "Vokefy",
            description: "Uma ferramenta que gera currículos em PDFs de forma ágil e rápida.",
            media: [
              // Use a imagem real ou um placeholder
                { type: "image", src: vokefy_image}, // Substitua vokefy_image
               // Se não tiver vídeo, remova o objeto de vídeo ou use src: ""
                { type: "video", src: "" },
            ],
            link: "https://vokefy-saas.web.app/",
            // Verifique se há um repositório público
            techs: ["Next.js", "Firebase", "Node.js", "Render", "Chakra UI", "Framer Motion"],
        },
    ];

    // Estado para armazenar o índice da mídia atual para CADA projeto
    const [mediaIndexes, setMediaIndexes] = useState(projects.map(() => 0));

    // Função para avançar a mídia de um projeto específico
    const handleNextMedia = (projectIndex) => {
        setMediaIndexes(prevIndexes => {
            const newIndexes = [...prevIndexes];
            const currentMediaLength = projects[projectIndex].media.length;
            newIndexes[projectIndex] = (prevIndexes[projectIndex] + 1) % currentMediaLength;
            return newIndexes;
        });
    };

    // Função para retroceder a mídia de um projeto específico
    const handlePrevMedia = (projectIndex) => {
        setMediaIndexes(prevIndexes => {
            const newIndexes = [...prevIndexes];
            const currentMediaLength = projects[projectIndex].media.length;
            newIndexes[projectIndex] = (prevIndexes[projectIndex] - 1 + currentMediaLength) % currentMediaLength;
            return newIndexes;
        });
    };

    // Função para ir para uma mídia específica de um projeto
    const handleGoToMedia = (projectIndex, mediaIndex) => {
      setMediaIndexes(prevIndexes => {
          const newIndexes = [...prevIndexes];
          newIndexes[projectIndex] = mediaIndex;
          return newIndexes;
      });
    };

    // Refs para controlar os vídeos individualmente (opcional, pode ser complexo)
    // Nesta versão simplificada de arquivo único, vamos omitir o controle
    // complexo de pause/reset on scroll para manter o código mais conciso.
    // Os controles padrão do vídeo já permitem pausar/play.

    return (
        <ProjectsSection
            id="projetos"
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
        >
            <ProjectsContainer>
                <SectionTitle
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.2 }}
                >
                    Meus Projetos
                </SectionTitle>

                <ProjectsGrid
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1, // Delay entre os cards
                            },
                        },
                        hidden: {
                            opacity: 0,
                        },
                    }}
                >
                    {projects.map((project, index) => {
                        // Obtém o índice da mídia atual para este projeto específico
                        const currentMediaIndex = mediaIndexes[index] || 0; // Fallback para 0
                        // Obtém a mídia atual
                        const currentMedia = project.media && project.media.length > 0 ? project.media[currentMediaIndex] : null;

                        return (
                            <ProjectCard
                                key={index}
                                // Animação individual de cada card
                                variants={{
                                    visible: { opacity: 1, y: 0 },
                                    hidden: { opacity: 0, y: 50 },
                                }}
                                transition={{ duration: 0.6, delay: index * 0.1 }} // Usa o index para o delay
                                whileHover={{ scale: 1.02 }}
                            >
                                <ImageContainer>
                                     {currentMedia ? (
                                        <ProjectMedia>
                                            {currentMedia.type === "image" ? (
                                                <img
                                                    src={currentMedia.src}
                                                    alt={project.title}
                                                />
                                            ) : (
                                                // Verifica se a src do video não está vazia
                                                currentMedia.src ? (
                                                  <video
                                                      src={currentMedia.src}
                                                      controls // Manter controles para interatividade
                                                      muted // Iniciar mutado é melhor UX em listas
                                                      loop // Loop
                                                      playsInline // Essencial para autoplay em mobile
                                                      // Não adicionamos ref aqui para evitar complexidade em arquivo único
                                                  />
                                                ) : (
                                                  // Placeholder se o vídeo source estiver vazio
                                                  <div style={{ color: '#888', textAlign: 'center', padding: '20px' }}>
                                                    Vídeo indisponível.
                                                  </div>
                                                )
                                            )}
                                        </ProjectMedia>
                                    ) : (
                                        // Placeholder se não houver mídia
                                        <div style={{ color: '#888', textAlign: 'center', padding: '20px' }}>
                                          Nenhuma mídia disponível para este projeto.
                                        </div>
                                    )}

                                    {/* Controles de navegação apenas se houver mais de uma mídia */}
                                    {project.media && project.media.length > 1 && (
                                        <>
                                            <PrevButton
                                                onClick={() => handlePrevMedia(index)} // Chama a função do pai com o index do projeto
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                aria-label="Mídia anterior"
                                            >
                                                {"<"}
                                            </PrevButton>
                                            <NextButton
                                                onClick={() => handleNextMedia(index)} // Chama a função do pai com o index do projeto
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                aria-label="Próxima mídia"
                                            >
                                                {">"}
                                            </NextButton>
                                            <MediaIndicator>
                                                {project.media.map((_, idx) => (
                                                    <IndicatorDot
                                                        key={idx}
                                                        active={idx === currentMediaIndex}
                                                        onClick={() => handleGoToMedia(index, idx)} // Chama a função do pai com index do projeto e da mídia
                                                        aria-label={`Ir para mídia ${idx + 1}`}
                                                    />
                                                ))}
                                            </MediaIndicator>
                                        </>
                                    )}
                                </ImageContainer>

                                <ProjectTitle>{project.title}</ProjectTitle>
                                <ProjectDescription>{project.description}</ProjectDescription>

                                <TechList>
                                    {/* Verifica se techs existe antes de mapear */}
                                    {project.techs && project.techs.map((tech, idx) => (
                                        <TechBadge
                                            key={idx}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {tech}
                                        </TechBadge>
                                    ))}
                                </TechList>

                                <ButtonContainer>
                                    {/* Lógica de botões */}
                                    {project.link && project.link !== "#" && !project.link.endsWith('.zip') ? (
                                        <LiveButton
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            aria-label={`Acessar ${project.title} (abre em nova aba)`}
                                        >
                                            <i className="bi bi-box-arrow-up-right"></i> Acessar
                                        </LiveButton>
                                    ) : project.link && project.link.endsWith('.zip') ? (
                                         // Botão de download para arquivos .zip
                                         <LiveButton // Pode usar o estilo LiveButton para download
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            aria-label={`Download do jogo ${project.title} (abre em nova aba)`}
                                        >
                                            <i className="bi bi-download"></i> Download
                                        </LiveButton>
                                    ) : (
                                        <DisabledButton
                                            title="Deploy não disponível"
                                            whileHover={{ scale: 1 }}
                                            whileTap={{ scale: 1 }}
                                            as="div" // Renderiza como div para evitar warnings
                                        >
                                            <i className="bi bi-eye-slash"></i> Indisponível
                                        </DisabledButton>
                                    )}

                                    {project.repo && ( // Renderiza o botão repo apenas se houver repo
                                        <RepoButton
                                            href={project.repo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            aria-label={`Ver repositório do ${project.title} no GitHub (abre em nova aba)`}
                                        >
                                            <i className="bi bi-github"></i> Repositório
                                        </RepoButton>
                                    )}
                                </ButtonContainer>
                            </ProjectCard>
                        );
                    })}
                </ProjectsGrid>
            </ProjectsContainer>
        </ProjectsSection>
    );
};

export default Projects;