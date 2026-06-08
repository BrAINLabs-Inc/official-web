# BrAIN Labs Inc. — Official Website

Welcome to the official public website repository for **BrAIN Labs Inc.** This project powers our public web presence, showcasing our research team, publications, projects, events, blogs, and other initiatives.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Metadata**: [React Helmet Async](https://github.com/staylor/react-helmet-async)

---

## Project Structure

```text
official-web/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD Deployment Workflow
├── web/
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/             # Images & design assets
│   │   ├── components/         # Shared & UI components (PageLayout, SEO, Nav/Footer)
│   │   ├── data/               # General static configuration data
│   │   ├── lib/
│   │   │   └── api.ts          # Public-only API Fetch Client
│   │   ├── pages/              # Page modules (Home, Projects, Team, Blog, etc.)
│   │   ├── App.tsx             # Main router configuration
│   │   └── main.tsx            # App initialization
│   ├── package.json            # Web app dependencies & scripts
│   ├── tsconfig.json           # TS configuration
│   └── wrangler.jsonc          # Cloudflare Pages deployment configuration
└── README.md
```

---

## ⚡ Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) v20+
- npm v10+

### 2. Installation & Dev Server
All frontend commands should be executed from within the `web` directory:

```bash
# Clone the repository
git clone https://github.com/BrAINLabs-Inc/official-web.git
cd official-web/web

# Install dependencies
npm install

# Start the local development server
npm run dev
```

### 3. Build for Production
To bundle the site locally:

```bash
cd web
npm run build
```
The output directory will be `web/dist`.

---

## API Configuration

The website fetches content dynamically from the **BrAIN Labs Portal API**:
- **Production API base URL**: `https://api.brainlabsinc.org/api/v1`

In local development, you can point to a local backend instance by setting the environment variable in a `web/.env` file:
```env
VITE_API_URL=http://localhost:3001
```
If `VITE_API_URL` is omitted, the client defaults to fetching from `https://api.brainlabsinc.org/api/v1`.

---

## Deployment (Cloudflare Pages)

The website is designed for zero-config deployment to **Cloudflare Pages**. 

### CI/CD Deployment via GitHub Actions
A GitHub Actions workflow is set up in `.github/workflows/deploy.yml`. Upon pushing to the `main` or `develop` branch, the codebase is validated (linting & TypeScript check) and automatically deployed to Cloudflare Pages.

To enable deployment, configure the following secrets in your GitHub Repository Settings (`Settings` -> `Secrets and variables` -> `Actions`):

1. **`CLOUDFLARE_API_TOKEN`**: A Cloudflare API token with `Cloudflare Pages (Edit)` permissions.
2. **`CLOUDFLARE_ACCOUNT_ID`**: Your Cloudflare account ID.

---

© 2026 BrAIN Labs Inc. All rights reserved.
