# Portfólio Pessoal - Mathias Borges

Portfólio profissional com minha trajetória, habilidades e projetos em desenvolvimento de software.

## Links

- Repositório GitHub (público): https://github.com/MathiasBorges/dev-mathias
- Site publicado: https://dev-mathias.web.app

## Sobre o Projeto

Este portfólio apresenta minha trajetória, habilidades e projetos em desenvolvimento de software, com foco em organização visual, navegação clara e responsividade.

## Seções do Portfólio

- Apresentação (nome, frase de perfil e avatar)
- Sobre Mim (formação, área de interesse e motivação)
- Habilidades (tecnologias e ferramentas)
- Projetos (lista de projetos com links)
- Contato (e-mail, LinkedIn e GitHub)

## Tecnologias Utilizadas

- React
- Vite
- Styled Components
- Framer Motion
- EmailJS
- Firebase Hosting

## Como Rodar Localmente

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Gere o build de produção:

```bash
npm run build
```

## Configuração do Formulário (EmailJS)

Para o formulário de contato funcionar, crie o arquivo `.env` na raiz do projeto com:

```bash
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

Se aparecer erro `412 (Precondition Failed)`, verifique no painel do EmailJS:

1. IDs e chave pública corretos.
2. Template ativo.
3. Domínio de origem autorizado (por exemplo, `localhost`).

## Responsividade

O layout foi construído para funcionar em desktop e dispositivos móveis, utilizando unidades relativas e media queries.

## Autor

Mathias Borges

- LinkedIn: https://www.linkedin.com/in/mathias-borges-marques/
- GitHub: https://github.com/MathiasBorges
- E-mail: mathias.borges.marques@gmail.com
