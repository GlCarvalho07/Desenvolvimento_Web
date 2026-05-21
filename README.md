# 🏀 BASQUETE — História, Regras e Lendas da NBA
 
Site informativo e interativo sobre o universo do basquete: da origem do esporte até as grandes lendas da NBA, com seções dinâmicas e recursos de acessibilidade.
 
---
 
## 📸 Preview
 
> Acesse o site e explore as seções interativas de simulador, quiz e comparador de jogadores.
 
---
 
## 🗂️ Estrutura do Projeto
 
```
📁 projeto
├── basquete.html   # Estrutura e conteúdo da página
├── style.css       # Todos os estilos e animações
└── main.js         # Lógica interativa (quiz, simulador, comparador, linha do tempo)
```
 
---
 
## 🚀 Funcionalidades
 
### 📜 Conteúdo Estático
- **Hero** com imagem de fundo e animação de entrada
- **Ticker** animado com resultados de partidas recentes
- **História** do basquete com foto de James Naismith e citação histórica
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
- **Google Fonts:** [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) · [DM Sans](https://fonts.google.com/specimen/DM+Sans) · [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
- **VLibras** — plugin de acessibilidade do governo brasileiro
---
 
## 📁 Detalhes dos Arquivos
 
### `basquete.html`
Contém toda a marcação semântica da página, organizada nas seções:
`Hero → Ticker → História → Linha do Tempo → Regras → Simulador → Quiz → Comparador → Lendas`
 
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
- **Linha do Tempo** — geração dinâmica dos itens e toggle de descrição
- **Simulador** — controle de placar, histórico e quartos
- **Quiz** — renderização de perguntas, validação e tela de resultado
- **Comparador** — barras de estatísticas comparativas entre jogadores
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
