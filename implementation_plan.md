# Plano de Melhoria do Portfólio

Este plano visa reestruturar o projeto para melhorar a organização do código, a performance e a escalabilidade, sem alterar o design visual ou as funcionalidades existentes.

## User Review Required
> [!IMPORTANT]
> **Refatoração Estrutural**: A pasta `src/styles-components` será renomeada para `src/components`. Isso exigirá a atualização de todas as importações no projeto.

## Proposed Changes

### 1. Reestruturação de Diretórios
Organizar o código de forma mais semântica e padrão de mercado.

#### [MODIFY] Estrutura de Pastas
- Renomear `src/styles-components` para `src/components`.
- Criar `src/data` para armazenar dados estáticos.
- Criar `src/hooks` (se necessário futuramente, por enquanto opcional).

### 2. Extração de Dados (Data Driven UI)
Separar os dados da interface para facilitar a manutenção e adição de novos projetos/habilidades.

#### [NEW] [projects.js](file:///c:/dev-mathias/src/data/projects.js)
- Criar arquivo para exportar a lista de projetos (atualmente em `projects-styles.jsx`).

#### [NEW] [skills.js](file:///c:/dev-mathias/src/data/skills.js)
- Criar arquivo para exportar a lista de habilidades (atualmente em `skills-styles.jsx`).

#### [MODIFY] [projects-styles.jsx](file:///c:/dev-mathias/src/components/projects-styles.jsx)
- Importar dados de `src/data/projects.js`.
- Remover array hardcoded `projects`.

#### [MODIFY] [skills-styles.jsx](file:///c:/dev-mathias/src/components/skills-styles.jsx)
- Importar dados de `src/data/skills.js`.
- Remover array hardcoded `skillsData`.
- (Opcional) Remover ícones do array de dados e mapear no componente para manter o arquivo de dados serializável (JSON-like).

### 3. Otimização de Componentes
Melhorar a legibilidade e performance dos componentes principais.

#### [MODIFY] [projects-styles.jsx](file:///c:/dev-mathias/src/components/projects-styles.jsx)
- Separar os Styled Components do componente React lógico, se o arquivo ficar muito grande. (Neste primeiro passo, focaremos na extração de dados, mas manteremos a estrutura de arquivo único se não for excessivamente grande, para evitar complexidade desnecessária agora).
- **Ação**: Manter em um arquivo por enquanto, mas limpo dos dados.

### 4. Performance (Lazy Loading)
Melhorar o tempo de carregamento inicial.

#### [MODIFY] [App.jsx](file:///c:/dev-mathias/src/App.jsx)
- Implementar `React.lazy` para as seções abaixo da dobra (Projects, Contact, etc.).
- Adicionar `Suspense` com um fallback leve.

### 5. UI/UX Improvements
Melhorias visuais e de experiência do usuário.

#### [MODIFY] [global-styles.jsx](file:///c:/dev-mathias/src/styles-components/global-styles.jsx)
- **Tipografia**: Garantir o uso da fonte "Inter" ou similar em todo o projeto para consistência.
- **Scrollbar**: Personalizar a barra de rolagem para combinar com o tema dark/neon.

#### [MODIFY] [navbar-styles.jsx](file:///c:/dev-mathias/src/components/navbar-styles.jsx)
- **Glassmorphism**: Refinar o efeito de desfoque (`backdrop-filter`) para garantir legibilidade em todos os navegadores.
- **Indicador de Progresso**: Adicionar uma barra de progresso de leitura no topo da página (opcional, mas bom para UX).

#### [MODIFY] [hero-styles.jsx](file:///c:/dev-mathias/src/components/hero-styles.jsx)
- **Call to Action (CTA)**: Melhorar o contraste e o feedback visual dos botões principais.
- **Acessibilidade**: Revisar `aria-labels` e contraste de cores (especialmente o texto cinza sobre fundo escuro).

## Verification Plan

### Automated Tests
- O projeto não possui testes automatizados configurados. A verificação será manual.
- `npm run dev`: Verificar se a aplicação roda sem erros de importação.
- `npm run build`: Verificar se o build de produção ocorre sem erros.

# Plano de Melhoria do Portfólio

Este plano visa reestruturar o projeto para melhorar a organização do código, a performance e a escalabilidade, sem alterar o design visual ou as funcionalidades existentes.

## User Review Required
> [!IMPORTANT]
> **Refatoração Estrutural**: A pasta `src/styles-components` será renomeada para `src/components`. Isso exigirá a atualização de todas as importações no projeto.

## Proposed Changes

### 1. Reestruturação de Diretórios
Organizar o código de forma mais semântica e padrão de mercado.

#### [MODIFY] Estrutura de Pastas
- Renomear `src/styles-components` para `src/components`.
- Criar `src/data` para armazenar dados estáticos.
- Criar `src/hooks` (se necessário futuramente, por enquanto opcional).

### 2. Extração de Dados (Data Driven UI)
Separar os dados da interface para facilitar a manutenção e adição de novos projetos/habilidades.

#### [NEW] [projects.js](file:///c:/dev-mathias/src/data/projects.js)
- Criar arquivo para exportar a lista de projetos (atualmente em `projects-styles.jsx`).

#### [NEW] [skills.js](file:///c:/dev-mathias/src/data/skills.js)
- Criar arquivo para exportar a lista de habilidades (atualmente em `skills-styles.jsx`).

#### [MODIFY] [projects-styles.jsx](file:///c:/dev-mathias/src/components/projects-styles.jsx)
- Importar dados de `src/data/projects.js`.
- Remover array hardcoded `projects`.

#### [MODIFY] [skills-styles.jsx](file:///c:/dev-mathias/src/components/skills-styles.jsx)
- Importar dados de `src/data/skills.js`.
- Remover array hardcoded `skillsData`.
- (Opcional) Remover ícones do array de dados e mapear no componente para manter o arquivo de dados serializável (JSON-like).

### 3. Otimização de Componentes
Melhorar a legibilidade e performance dos componentes principais.

#### [MODIFY] [projects-styles.jsx](file:///c:/dev-mathias/src/components/projects-styles.jsx)
- Separar os Styled Components do componente React lógico, se o arquivo ficar muito grande. (Neste primeiro passo, focaremos na extração de dados, mas manteremos a estrutura de arquivo único se não for excessivamente grande, para evitar complexidade desnecessária agora).
- **Ação**: Manter em um arquivo por enquanto, mas limpo dos dados.

### 4. Performance (Lazy Loading)
Melhorar o tempo de carregamento inicial.

#### [MODIFY] [App.jsx](file:///c:/dev-mathias/src/App.jsx)
- Implementar `React.lazy` para as seções abaixo da dobra (Projects, Contact, etc.).
- Adicionar `Suspense` com um fallback leve.

### 5. UI/UX Improvements
Melhorias visuais e de experiência do usuário.

#### [MODIFY] [global-styles.jsx](file:///c:/dev-mathias/src/styles-components/global-styles.jsx)
- **Tipografia**: Garantir o uso da fonte "Inter" ou similar em todo o projeto para consistência.
- **Scrollbar**: Personalizar a barra de rolagem para combinar com o tema dark/neon.

#### [MODIFY] [navbar-styles.jsx](file:///c:/dev-mathias/src/components/navbar-styles.jsx)
- **Glassmorphism**: Refinar o efeito de desfoque (`backdrop-filter`) para garantir legibilidade em todos os navegadores.
- **Indicador de Progresso**: Adicionar uma barra de progresso de leitura no topo da página (opcional, mas bom para UX).

#### [MODIFY] [hero-styles.jsx](file:///c:/dev-mathias/src/components/hero-styles.jsx)
- **Call to Action (CTA)**: Melhorar o contraste e o feedback visual dos botões principais.
- **Acessibilidade**: Revisar `aria-labels` e contraste de cores (especialmente o texto cinza sobre fundo escuro).

## Verification Plan

### Automated Tests
- O projeto não possui testes automatizados configurados. A verificação será manual.
- `npm run dev`: Verificar se a aplicação roda sem erros de importação.
- `npm run build`: Verificar se o build de produção ocorre sem erros.

### Manual Verification
#### [MODIFY] [skills-styles.jsx](file:///c:/dev-mathias/src/components/skills-styles.jsx)
- **Staggered List**: Ensure skill tags appear one by one with a staggered animation.
- **Icon Animation**: Add a subtle animation to the category icons on hover.

#### [MODIFY] [projects-styles.jsx](file:///c:/dev-mathias/src/components/projects-styles.jsx)
- **Card Entry**: Staggered entry for project cards.
- **Media Transition**: Smooth fade/slide transition when switching project media.

#### [MODIFY] [contato-styles.jsx](file:///c:/dev-mathias/src/components/contato-styles.jsx)
- **Input Focus**: Add a smooth scale or border animation on input focus.
- **Success Animation**: Add a checkmark animation on successful form submission.

### 7. Live Demo Modal (New Request)
- **Goal**: Open project "Live Demo" links in a modal with an iframe instead of a new tab.
- **Constraint**: Many sites block iframes (X-Frame-Options).
- **Solution**:
    -   Create a `ProjectModal` component within `projects-styles.jsx`.
    -   Implement an iframe to load the URL.
    -   **Crucial**: Add an "Open in New Tab" button within the modal as a fallback for sites that block embedding.
    -   Update "Live Demo" button logic to open this modal.

### 8. Final UX/UI Polish
- **Mobile Menu**: Add `staggerChildren` to `mobileMenuVariants` for a cascading entry of menu links.
- **Custom Cursor**: Enhance `MouseFollower` with a trailing effect or better physics for a fluid feel.
- **Logo Animation**: Add a "Cyberpunk Glitch" effect to the Navbar logo on hover.
