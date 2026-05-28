# 🏀NBA GL — História, Regras e Lendas da NBA
 
Site informativo e interativo sobre o universo do basquete: da origem do esporte até as grandes lendas da NBA, com seções dinâmicas e recursos de acessibilidade.
 
---
 
## 📸 Preview
 
(boisterous-buttercream-cdd6f0.netlify.app)
 
---
 
## 🗂️ Estrutura do Projeto
 
```
📁 projeto
├── basquete.html   # Estrutura e conteúdo da página
├── style.css       # Todos os estilos e animações
└── main.js         # Lógica interativa (simulador)
```
 
---
 
## 🚀 Funcionalidades
 
### 📜 Conteúdo Estático
- **Hero** com imagem de fundo e animação de entrada
- **Ticker** animado com resultados de partidas recentes
- **História** do basquete e citação histórica
- **Regras oficiais** em cards comparativos NBA × FIBA
- **Lendas Imortais** com cards de Michael Jordan, LeBron James, Kobe Bryant e Oscar Schmidt
### ⚡ Seções Interativas
 
| Seção | Descrição |
|---|---|
| 🕐 **Linha do Tempo** | 10 marcos históricos clicáveis de 1891 a 2023 |
| 🏀 **Simulador de Jogo** | Placar interativo com +1, +2, +3 pts, desfazer e histórico de lances |
| ❓ **Quiz NBA** | 7 perguntas com feedback imediato, pontuação e tela de resultado |
| 📊 **Comparador de Lendas** | Compare 6 jogadores históricos em 6 estatísticas com barras animadas |
 
---
 
## ⚛️ Uso do React
 
Três seções do projeto foram migradas para **React 18**, renderizado diretamente no navegador via CDN (sem necessidade de build ou Node.js). Essa abordagem foi adotada para tornar os componentes interativos **auto-contidos e independentes do `main.js`**, eliminando bugs causados pela ausência ou falha no carregamento do arquivo externo.
 
### Como funciona
 
O React e o Babel são carregados via CDN no final do `<body>`:
 
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.2/babel.min.js"></script>
```
 
Cada componente é escrito em um bloco `<script type="text/babel">` e montado em um `<div>` reservado no HTML:
 
```html
<!-- No HTML -->
<div id="react-quiz"></div>
 
<!-- No script -->
ReactDOM.createRoot(document.getElementById("react-quiz")).render(<QuizNBA />);
```
 
### Componentes React do projeto
 
| Componente | Montado em | Descrição |
|---|---|---|
| `<LinhaDoTempo />` | `#react-timeline` | Renderiza os 10 marcos históricos com `IntersectionObserver` para animações de entrada e toggle de descrição ao clicar |
| `<QuizNBA />` | `#react-quiz` | Gerencia o estado completo do quiz: pergunta atual, opção selecionada, pontuação e tela de resultado com medalha |
| `<ComparadorLendas />` | `#react-comparador` | Exibe barras de estatísticas espelhadas e placar de categorias vencidas, atualizados em tempo real ao trocar os jogadores nos selects |
 
### Por que React nesses componentes?
 
Esses três componentes possuem **estado interno complexo** — animações baseadas em interação, respostas condicionais e re-renderizações frequentes — que tornam a manipulação direta do DOM via JavaScript vanilla verbosa e propensa a bugs. O React simplifica esse gerenciamento com `useState` e `useEffect`, mantendo a interface sempre sincronizada com os dados.
 
> **Nota:** o restante da página (Hero, Ticker, Regras, Simulador e Lendas) continua em HTML/CSS/JS puro, sem dependência do React.
 
---
 
## ♿ Acessibilidade
 
- **VLibras** integrado para tradução em Libras
- **Modo alto contraste** ativável pelo botão no header
- **Skip link** para pular direto ao conteúdo principal
- Uso de `aria-label`, `role` e elementos semânticos (`<main>`, `<header>`, `<nav>`, `<article>`, `<figure>`)
---
 
## 🎨 Tecnologias e Fontes
 
- **HTML5** semântico
- **CSS3** — variáveis customizadas, Grid, Flexbox, animações com `@keyframes`
- **JavaScript** vanilla — sem frameworks ou dependências externas
- **React 18** — via CDN, para os componentes interativos (Linha do Tempo, Quiz e Comparador)
- **Babel Standalone** — transpilação de JSX diretamente no navegador
- **Google Fonts:** [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) · [DM Sans](https://fonts.google.com/specimen/DM+Sans) · [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
- **VLibras** — plugin de acessibilidade do governo brasileiro
---
 
## 📁 Detalhes dos Arquivos
 
### `basquete.html`
Contém toda a marcação semântica da página, organizada nas seções:
`Hero → Ticker → História → Linha do Tempo → Regras → Simulador → Quiz → Comparador → Lendas`
 
Os componentes React são montados em `<div>`s reservados dentro das respectivas `<section>`s.
 
### `style.css`
Organizado por seção com comentários:
- Variáveis CSS globais (cores, fontes, bordas)
- Estilos de layout (Grid e Flexbox)
- Animações (`heroFadeIn`, `ticker`, `reveal`)
- Modo alto contraste
- Media queries para responsividade (≤ 1200px e ≤ 900px)
### `main.js`
Módulos independentes:
- **Header scroll** — adiciona classe `.scrolled` ao rolar
- **Scroll Reveal** — `IntersectionObserver` para animações de entrada
- **Alto Contraste** — alterna classe `.high-contrast` no `body`
- **Simulador** — controle de placar, histórico e quartos
> As seções de Linha do Tempo, Quiz e Comparador foram migradas para React e não dependem mais do `main.js`.
 
---
 
## 🏅 Jogadores em Destaque
 
| Jogador | Apelido | Títulos |
|---|---|---|
| Michael Jordan | The G.O.A.T | 6× NBA |
| LeBron James | The King | 4× NBA |
| Kobe Bryant ✦ | Black Mamba | 5× NBA |
| Oscar Schmidt 🇧🇷 ✦ | Mão Santa | 5× Olimpíadas |
 
> ✦ In Memoriam
 
---
 
## 👨‍💻 Autor
 
Desenvolvido por **[Guilherme Carvalho](https://github.com/GlCarvalho07)**.
 
> Este projeto utilizou Inteligência Artificial como auxílio no desenvolvimento.
