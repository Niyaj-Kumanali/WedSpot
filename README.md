<<<<<<< HEAD
# WedsPot 💍

**[Live Demo](https://wed-spot.vercel.app/)**

**WedsPot** is a premium, intelligence-driven wedding management platform designed to streamline the planning process for clients, vendors, and management staff. Built with a modern, glassmorphic aesthetic and powered by AI, WedsPot provides a seamless experience for orchestrating the perfect wedding.

## ✨ Core Features

### 🚀 Advanced Dashboard System
Multi-role tailored interfaces for distinct user experiences:
- **Admin Dashboard**: High-level oversight and system management.
- **Manager Dashboard**: Operational logistics and vendor coordination.
- **Staff Dashboard**: Task execution and event day management.
- **Vendor Dashboard**: Service management and booking tracking.
- **Client Dashboard**: Personalized wedding planning journey and budget tracking.

### 🧠 Intelligence & AI
- **Intelligence Center**: A centralized hub for real-time protocols and system alerts.
- **AI Assistant**: integrated design and planning assistant for intelligent wedding insights.
- **WedsBot**: SignalR-powered real-time support and coordination chatbot.

### 🎨 Premium Design Language
- **MUI Powered**: Fully migrated to Material UI for component consistency and performance.
- **Glassmorphism**: A sleek, modern aesthetic with depth, blur effects, and smooth transitions.
- **Responsive & Dynamic**: Optimized for all screen sizes with fluid interactions.

## 🛠 Tech Stack

### Frontend
- **Framework**: [React 19+](https://react.dev/)
- **Build Tool**: [Vite 7](https://vite.dev/)
- **State Management**: [React Context](https://react.dev/learn/passing-data-deeply-with-context)
- **Styling**: [Material UI (MUI)](https://mui.com/), [Emotion](https://emotion.sh/), [SASS](https://sass-lang.com/)
- **Icons**: [MUI Icons](https://mui.com/material-ui/material-icons/), [Lucide React](https://lucide.dev/)
- **Animation**: [GSAP](https://gsap.com/)

### Communication & Integration
- **API Client**: [Axios](https://axios-http.com/)
- **Real-time**: [@microsoft/signalr](https://learn.microsoft.com/en-us/aspnet/core/signalr/)

## 🏁 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Recommended: Latest LTS)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Execution
Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## 📂 Project Structure

- `src/components`: Reusable UI components (Dashboards, Notifications, AI Chat).
- `src/pages`: Main application views and role-specific dashboards.
- `src/layouts`: Dashboard and standard page layouts.
- `src/theme`: Centralized MUI theme configuration and design tokens.
- `src/api`: Axios instance and API communication logic.

---

*WedsPot - Redefining Wedding Intelligence.*
=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
>>>>>>> d720bde (Pushing the project to the repo)
