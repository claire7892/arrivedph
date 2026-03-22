# 🎓 ArrivEd PH — AI Hub Setup Guide

## Ano ang laman ng folder na ito?

```
arrivedph-backend/
├── server.js          ← Node.js backend (proxy server)
├── package.json       ← Project config
├── .env.example       ← Template ng API key config
├── .gitignore         ← Protektado ang .env — hindi ma-upload sa GitHub
└── public/
    └── index.html     ← Ang iyong AI Hub website
```

---

## 🚀 STEP 1 — I-install ang Node.js

Pumunta sa https://nodejs.org at i-download ang **LTS version** (libre).

---

## 🔑 STEP 2 — Kumuha ng Anthropic API Key

1. Pumunta sa https://console.anthropic.com
2. Mag-sign up o mag-login
3. Pumunta sa **API Keys** → **Create Key**
4. Kopyahin ang key (nagsisimula sa `sk-ant-...`)

---

## ⚙️ STEP 3 — I-setup ang project

Buksan ang terminal/command prompt sa loob ng `arrivedph-backend` folder:

```bash
# I-install ang mga dependencies
npm install

# Gumawa ng .env file mula sa template
cp .env.example .env
```

Buksan ang `.env` file at ilagay ang iyong API key:
```
ANTHROPIC_API_KEY=sk-ant-ILAGAY-MO-DITO-ANG-TUNAY-NA-KEY
```

---

## ▶️ STEP 4 — I-run ang server

```bash
npm start
```

Dapat makita mo:
```
✅  ArrivEd PH AI Server running at http://localhost:3000
```

Buksan ang browser at pumunta sa: **http://localhost:3000**

---

## 🌐 STEP 5 — I-deploy online (para ma-access ng lahat)

### Option A: Render.com (LIBRE, pinakamadali)

1. Pumunta sa https://render.com at mag-sign up (libre)
2. I-upload ang `arrivedph-backend` folder sa isang bagong **GitHub repo**
   - SIGURADUHING ang `.env` ay **hindi** naka-upload (protektado na ng .gitignore)
3. Sa Render: **New → Web Service** → i-connect ang iyong GitHub repo
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Sa **Environment Variables** ng Render, idagdag:
   - Key: `ANTHROPIC_API_KEY`
   - Value: ang iyong actual API key
6. I-deploy! Bibigyan ka ng Render ng URL tulad ng:
   `https://arrivedph-ai.onrender.com`

### Option B: Railway.app (may libreng tier din)

1. Pumunta sa https://railway.app
2. **New Project → Deploy from GitHub repo**
3. Idagdag ang `ANTHROPIC_API_KEY` sa Variables
4. I-deploy!

---

## 🔗 STEP 6 — I-link sa iyong ArrivEd PH website

Sa iyong main website (claire7892.github.io/arrivedph), magdagdag ng button:

```html
<a href="https://YOUR-RENDER-URL.onrender.com" target="_blank">
  Try AI Tools →
</a>
```

---

## ❓ Troubleshooting

| Problem | Solusyon |
|---------|---------|
| `Cannot find module 'express'` | I-run muli ang `npm install` |
| `Invalid API key` | I-check ang `.env` file — tama ba ang key? |
| Hindi ma-access sa browser | Siguraduhing naka-run ang `npm start` |
| CORS error | Normal lang — naka-handle na ng server |

---

## 💰 Gastos

- **Render.com hosting:** LIBRE (may limits sa free tier)
- **Anthropic API:** ~$0.003 per chat message (napakamura)
- **Domain (optional):** ~$10/year kung gusto mong custom domain

---

## 🛡️ Seguridad

- Ang API key ay **nasa server lang** — hindi makikita ng mga users
- Ang `.gitignore` ay nagpoprotekta ng `.env` file
- **HUWAG** ibahagi ang iyong `.env` file kahit kanino

---

*ArrivEd PH AI Hub — Powered by Claude (Anthropic)*
