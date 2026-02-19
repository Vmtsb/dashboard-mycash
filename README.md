# MyCash+ — Gestão Financeira Familiar

**MyCash+** é um sistema web completo de gestão financeira familiar, desenvolvido para permitir que múltiplos membros de uma família controlem suas finanças de forma colaborativa, intuitiva e moderna.

![MyCash+ Preview](home-dashboard-responsive.png)

## 🚀 Tecnologias

Este projeto utiliza o que há de mais moderno no ecossistema web:

- **React 18** + **TypeScript**
- **Vite** (Build Tool)
- **Tailwind CSS** (Estilização baseada em tokens)
- **React Router 6** (Roteamento SPA)
- **Lucide React** (Ícones)
- **Framer Motion** (Animações e transições)
- **Recharts** (Visualização de dados)
- **Date-fns** (Manipulação de datas)

## 🏗️ Arquitetura e Estrutura

O projeto segue boas práticas de organização modular e responsiva:

```text
src/
├── components/     # Componentes reutilizáveis (UI, Layout, Charts, Modals)
├── contexts/       # Gerenciamento de estado global (FinanceContext)
├── hooks/          # Hooks customizados (useFinance)
├── pages/          # Páginas principais (Dashboard, Cards, Profile, etc.)
├── routes/         # Configuração de roteamento (React Router)
├── types/          # Definições de interfaces TypeScript
├── utils/          # Funções utilitárias e formatadores
└── constants/      # Valores estáticos e configurações
```

## 🎨 Design System

O projeto é construído sobre um Design System rigoroso baseado no Figma:
- **Cores Semânticas**: Mapeadas diretamente para cores de marca e estados do sistema.
- **Tokens de Espaçamento**: Escala baseada em múltiplos de 4/8px para consistência visual.
- **Responsividade**: Mobile-first com breakpoints em `768px`, `1280px` e `1920px`.

## 📈 Status do Projeto

Atualmente, o projeto está na fase de **Estrutura Base e Sistema de Navegação**:
- [x] Prompt 0: Setup Inicial e Configuração de Tokens.
- [x] Prompt 1: Estrutura Base, Tipagem e Roteamento.
- [ ] Prompt 2: Sistema de Layout Desktop (Sidebar).
- [ ] Prompt 3: Sistema de Layout Mobile.

## 🛠️ Como rodar o projeto

1.  Clone o repositório
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
4.  Para gerar o build de produção:
    ```bash
    npm run build
    ```

## 🔗 Deploy

O projeto está configurado para deploy contínuo via **Vercel**:
[https://dashboard-mycash.vercel.app/](https://dashboard-mycash.vercel.app/)

---
Desenvolvido com o auxílio de **Advanced Agentic Coding** (Antigravity).
