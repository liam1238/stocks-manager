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
```

### 2. Install dependencies (root) 
```bash 
npm install
```

### 3. Environment Variables
```bash
# Example for backend:
MONGODB_URI=mongodb://localhost:27017/stock-portfolio
FMP_API_KEY=your_api_key

# Example for frontend:
VITE_API_BASE_URL=http://localhost:3000/api
```

### 4. Run: 
```bash
# Frontend
cd apps/frontend
npm run dev

# Backend
cd apps/backend
npm run start:dev
```