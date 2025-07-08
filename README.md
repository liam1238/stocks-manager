# 📊 Stock Manager

A full-stack stock portfolio management application built with:

- ⚙️ **Backend:** NestJS + MongoDB
- 🖥️ **Frontend:** React 19 + Vite + MobX + Ant Design
- 📦 **Monorepo:** Nx Workspace

---

## 🗂️ Project Structure

.
├── apps
│ ├── backend # NestJS API server
│ ├── frontend # React frontend app (Vite)
│ └── stock-manager # Shared UI shell with routing config
├── tsconfig.base.json # Shared TS config
├── package.json # Monorepo root
├── nx.json # Nx config
├── README.md # This file
└── ...


---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/liam1238/stock-manager.git
cd stock-manager


2. Install dependencies (root) - npm install

3. Run: 
# Frontend
cd apps/frontend
npm run dev

# Backend
cd apps/backend
npm run start:dev