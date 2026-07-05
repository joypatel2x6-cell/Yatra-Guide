# 🗺️ Yatra Guide — Your Indian Travel Companion

> A fast, offline-capable travel planning web app built for every explorer of India.

[![Live Demo](https://img.shields.io/badge/Live-Vercel-black?logo=vercel)](https://yatra-guide.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Made for India](https://img.shields.io/badge/Made%20for-India%20🇮🇳-FF9933)

---

## 📖 Overview

**Yatra Guide** is a premium, single-page travel companion web app tailored for India. It helps travellers discover destinations, plan routes, compare transport costs, generate AI-powered itineraries, and access emergency services — all without needing to sign up or share personal data.

Most core features run **100% offline** using local algorithms and browser storage, so the app works reliably even in areas with poor connectivity. The AI chat assistant (Yatra AI) is the only feature that requires an internet connection, powered securely via a Vercel serverless backend.

---

## ✨ Features

### 🏠 Home
- Animated hero section with featured Indian destinations (Delhi, Agra, Jaipur, Goa, Srinagar, Manali, Kochi, and more)
- **Popular Destinations grid** with best-season tags for each city
- **"Why Choose Yatra Guide"** feature highlights — Offline Route Planner, Transit Cost Estimator, Local Privacy First, Emergency Directory
- Traveller reviews section with scroll-reveal animations

### 🗺️ Route Planner (Dashboard)
- Select any two cities from **15+ major Indian cities**
- Choose a travel mode: **Bike, Car, Bus, Train, or Flight**
- Instantly calculates:
  - **Distance** using the [Haversine formula](https://en.wikipedia.org/wiki/Haversine_formula) (great-circle distance between GPS coordinates)
  - **Estimated travel time** based on typical mode speeds
  - **Cost estimate** using calibrated per-km rate models
- **Save to Favorites** to bookmark any route for quick re-access
- **Recent Searches** history panel — automatically persisted in `localStorage`
- Destination **Emergency contacts** shown inline after calculation

### 🌐 Explorer
- City explorer with an **interactive Leaflet.js map** of India
- Browse cities state-by-state using GeoJSON boundaries
- Click any city marker to view details and jump to the Route Planner

### ⭐ Saved Trips
- Manage all your favorited routes in one place
- Displays distance, transport mode, and estimated duration for each saved trip
- Remove individual trips with a single click
- Fully local — stored in your browser with zero server involvement

### ⚡ AI Hub (Yatra AI)
- **AI-powered travel intelligence** for personalized trip planning
- **Weather Risk Analysis** — predicts rain probability, heat risk, and overall travel score for any city and month using built-in seasonal weather patterns for 15+ cities
- **Smart Itinerary Generator** — creates day-by-day schedules (1–7 days) in three styles: **Cultural**, **Adventure**, or **Relaxation**, personalized with city landmarks
- **Route AI Advisor** — evaluates a selected route and transport mode, generating a smart recommendation with a star rating
- **Packing List Generator** — produces a tailored packing checklist based on destination, travel style, and trip duration
- **Yatra AI Chat Widget** — a persistent floating chat assistant available across all pages, powered by **Google Gemini 2.5 Flash** via a secure backend API

### 🚑 Emergency
- Quick-access directory of emergency contacts for every supported city
- Includes: local hospitals, police stations, and national helplines (ambulance: 102, police: 100, fire: 101, women's helpline: 1091)

### 📋 About
- Mission statement and project philosophy
- Stats: 15+ cities, 5 transport modes, 100% offline core, zero tracking
- Tech stack breakdown and feature cards

### 💬 Feedback
- In-app feedback form to submit ratings and comments
- Stored locally in the browser

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| Vanilla HTML / CSS / JS | Core SPA structure and logic |
| [Leaflet.js](https://leafletjs.com/) | Interactive map rendering |
| [Marked.js](https://marked.js.org/) | Markdown rendering for AI chat responses |
| Google Fonts (Inter, Outfit, Poppins) | Typography |
| CSS custom properties + glassmorphism | Theming and dark mode UI |
| `localStorage` | Persistent offline storage (history, favorites, chat) |

### Backend (Vercel Serverless)
| Technology | Purpose |
|---|---|
| Node.js (Vercel Function) | Secure API endpoint at `/api/chat` |
| [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) | Google Gemini 2.5 Flash for AI chat |
| Built-in rate limiting | 60 requests per 10 minutes per IP |

### Deployment
| Service | Role |
|---|---|
| [Vercel](https://vercel.com) | Hosts frontend static files + serverless API |
| GitHub | Source control and CI/CD trigger |

---

## 📁 Project Structure

```
Yatra-Guide/
├── api/
│   └── chat.js              # Vercel serverless function (Gemini AI chat)
├── frontend/
│   ├── index.html           # Main SPA entry point
│   ├── assets/              # Hero images
│   ├── css/
│   │   ├── style.css        # Core design system & component styles
│   │   └── pages_redesign.css # Page-level redesign overrides
│   ├── data/
│   │   ├── cities.js        # City data with GPS coordinates
│   │   ├── india_states.js  # GeoJSON state boundaries for the map
│   │   └── temp.geojson     # Geospatial data
│   └── js/
│       ├── app.js           # SPA router and app initializer
│       ├── app.bundle.js    # Bundled JS (all views + logic)
│       ├── api.js           # Data access helpers
│       ├── components/
│       │   ├── Emergency.js # Emergency contacts module
│       │   └── Map.js       # Leaflet map component
│       ├── utils/
│       │   ├── calculator.js # Haversine distance & cost calculations
│       │   └── storage.js   # localStorage read/write helpers
│       └── views/
│           ├── Home.js       # Home page view
│           ├── RoutePlanner.js # Dashboard / Route Planner view
│           ├── AIHub.js      # AI Hub view (weather, itinerary, chat)
│           ├── SavedTrips.js # Saved favorites view
│           ├── About.js      # About page view
│           ├── Feedback.js   # Feedback form view
│           └── Contact.js    # Contact view
├── backend/                 # Legacy Express server (local dev use)
│   ├── server.js
│   ├── routes/chat.js
│   └── package.json
├── vercel.json              # Vercel deployment configuration
├── package.json             # Root package (Gemini AI dependency)
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### Local Development

1. **Clone the repo**
   ```bash
   git clone https://github.com/joypatel2x6-cell/Yatra-Guide.git
   cd Yatra-Guide
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file inside `backend/`:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Start the backend server**
   ```bash
   npm start
   ```

4. **Open the frontend**
   Open `frontend/index.html` in your browser (or use VS Code Live Server).

> ⚠️ For local development, the chat widget points to `http://localhost:5000/api/chat`. On Vercel, it automatically uses the serverless `/api/chat` route.

### Deploy to Vercel

1. Push the repo to GitHub (already done ✅)
2. Import the project on [vercel.com](https://vercel.com)
3. Add the environment variable:
   - `GEMINI_API_KEY` = your Google Gemini API key
4. Vercel will auto-deploy on every push to `main`

---

## 🔒 Privacy

- **No accounts required.** No sign-up, no login.
- **No external tracking.** No analytics, cookies, or third-party data collection.
- **All user data stays in your browser.** Route history, saved trips, and chat history are stored exclusively in `localStorage` and never sent to any server.
- The only network call is the AI chat request to the secure `/api/chat` Vercel function, which does not log or store any user messages.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ for India · No external APIs · All calculations are local</p>
