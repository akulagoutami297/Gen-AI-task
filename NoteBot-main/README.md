# 📝 NoteBot Premium — AI Study Platform

> An intelligent, premium study companion that transforms raw text and PDFs into structured summaries, customizable flashcards, interactive quizzes, and beautiful PDF exports. Designed with a stunning, modern glassmorphism dark theme.

---

## ✨ Features

- **🧠 Intelligent Note Summarization**: Choose between fast TF-IDF extractive summarization or advanced abstractive pipeline models (BART) to condense lecture notes instantly.
- **📄 PDF Document Processing**: Upload lecture slides or textbook chapters to extract text automatically using the high-performance PyMuPDF engine.
- **⚡ Automated Flashcard Generator**: Automatically generates study flashcards (definition, fact, composition, or cloze-style Q&A cards) directly from your content.
- **📝 Interactive Multiple Choice Quizzes**: Generates conceptual MCQ tests dynamically to evaluate your learning progress, with difficulty assessment.
- **📥 Premium PDF Export**: Download beautiful, formatted summary sheets containing your highlights, tags, and keywords generated with ReportLab.
- **💎 Surgical UI/UX Overhaul**: State-of-the-art glassmorphism user interface featuring:
  - **4-Layer Glass Depth System**: Deep sidebar glass panels (`glass-panel`), raised elevated interactive components (`glass-raised`), clean surface cards (`glass-card`), and deep inset input zones (`glass-inset`).
  - **Premium Color Palette**: Harmonious tailwind extended HSL-tailored colors (`void`, `deep`, `canvas`, `surface`, `lift`).
  - **Live NLP Backend Monitor**: Real-time status heartbeat checker in the sidebar monitoring Flask server responsiveness.
  - **Cinematic Preloader**: Animated orbital spinning rings and fine grid particles that render seamlessly as assets compile.
  - **Spaced Repetition Engine**: Flip-animated cards with smooth 3D perspective depth and micro-animations via Framer Motion.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion (animations), Zustand (state management), custom HTML SVG icons |
| **Backend** | Flask (Python 3), spaCy NLP pipeline (`en_core_web_sm`), PyMuPDF (PDF parser), ReportLab (PDF generator), Flask-Cors, Python-Dotenv |

---

## 🚀 Quick Start Guide

### 📋 Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v18.0.0 or higher)
- **Python** (v3.10 or higher)

---

### ⚙️ 1. Backend Setup

From the root directory, navigate to the `backend` folder:

```bash
cd backend
```

#### Windows (PowerShell)
```powershell
# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install required dependencies
pip install -r requirements.txt

# Run the backend Flask server
python run.py
```

#### macOS / Linux
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install required dependencies
pip install -r requirements.txt

# Run the backend Flask server
python run.py
```

The Flask server will start on **`http://localhost:5000`**.

---

### 🎨 2. Frontend Setup

Open a new terminal window or tab, navigate to the `frontend` folder from the root:

```bash
cd frontend
```

#### Windows / macOS / Linux
```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

The frontend application will start on **`http://localhost:5173`**.

---

## 📂 Project Architecture

```
Bot/
├── backend/
│   ├── app/
│   │   ├── routes/          # API route definitions (summarize, flashcards, quiz, export, upload)
│   │   ├── services/        # Natural Language Processing & generation logic
│   │   └── __init__.py      # Flask application context & dependency checking
│   ├── requirements.txt     # Python dependencies
│   ├── run.py               # Flask server entry point
│   └── .env                 # Server configuration env variables
├── frontend/
│   ├── public/              # Static assets (images, logos)
│   ├── src/
│   │   ├── components/      # UI, Layout, and Feature-specific React components
│   │   ├── store/           # Zustand global state (noteStore.js)
│   │   ├── styles/          # Tailwind & custom CSS variables
│   │   ├── utils/           # Axios API wrappers and configuration
│   │   ├── App.jsx          # Main application router and shell
│   │   └── main.jsx         # React application entry point
│   ├── vite.config.js       # Vite server configuration & API proxying
│   ├── tailwind.config.js   # Tailwinds color theme, fonts, & animations
│   ├── postcss.config.js    # PostCSS configuration
│   └── package.json         # Node.js scripts & dependencies
└── README.md                # Premium platform documentation
```

---

## ⚡ API Endpoint Reference

- `GET  /api/health` - Check backend service health status.
- `POST /api/upload/` - Upload a PDF document and extract clean plaintext.
- `POST /api/summarize/` - Generate structured bullet summaries and tag keywords.
- `POST /api/flashcards/` - Create a deck of Q&A conceptual flashcards.
- `POST /api/quiz/` - Build an interactive conceptual MCQ assessment.
- `POST /api/export/pdf` - Package generated summaries and keywords into an elegant, formatted PDF.

---

## 🚀 Render Deployment
- Python 3.12.8
- Updated PyMuPDF for compatibility
