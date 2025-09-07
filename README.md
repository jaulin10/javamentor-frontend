JavaMentor

A modern Java learning platform with an AI assistant, designed to help developers progress from beginner to expert.

Table of Contents

Overview

Features

Architecture

Technologies Used

Installation

Project Structure

Demo

Development

Overview

JavaMentor is a full-stack web application that combines a conversational AI assistant with a hands-on exercise platform for learning Java. The project includes a robust FastAPI backend and a modern React frontend with smooth animations and a glassmorphism design.

Key Features:

Conversational AI assistant tailored to the user’s level

Interactive exercise system with multiple difficulty levels

Modern UI with Framer Motion animations

Complete JWT authentication

Multilingual support (French/English)

Responsive design optimized for mobile and desktop

Features
JavaMentor AI Assistant

Personalized conversations based on user level (beginner, intermediate, advanced)

Explanations of Java concepts with code examples

Adaptive exercise generation

Code correction and feedback

Multi-conversation history

Exercise System

Exercise catalog organized by difficulty and topic

Advanced filtering and search

Covers variables, loops, OOP, collections, exceptions

Points system and progression tracking

User Management

Secure authentication with JWT

User profiles with statistics

Personalized progress tracking

Learning level management

Modern Interface

Glassmorphism design with advanced visual effects

Smooth animations and micro-interactions

Multilingual support (FR/EN)

Responsive and accessible UI

Architecture
Backend (FastAPI)
javamentor-backend/
├── app/
│ ├── main.py # FastAPI entry point
│ ├── database.py # PostgreSQL configuration
│ ├── models/ # SQLAlchemy models
│ ├── schemas/ # Pydantic schemas
│ ├── routers/ # API endpoints
│ ├── services/ # Business logic
│ └── utils/ # Utilities

Frontend (React)
javamentor-frontend/
├── src/
│ ├── components/ # Reusable components
│ ├── pages/ # Main pages
│ ├── context/ # React contexts
│ ├── services/ # API services
│ ├── hooks/ # Custom hooks
│ └── utils/ # Utilities and translations

Technologies Used
Backend

FastAPI – Modern, fast web framework

PostgreSQL – Relational database

SQLAlchemy – Python ORM

Pydantic – Data validation

JWT – Secure authentication

OpenAI API – Artificial intelligence (simulated for demo)

Frontend

React 18 – UI library with Concurrent Features

Tailwind CSS – Utility-first CSS framework

Framer Motion – Advanced animations

React Router – Client-side navigation

Axios – HTTP client

Context API – Global state management

Development Tools

Docker – Containerization

ESLint/Prettier – Code quality

Git – Version control

Installation
Prerequisites

Node.js 16+

Python 3.9+

PostgreSQL 13+

Docker (optional)

Backend Setup

Clone the repository

git clone https://github.com/your-username/javamentor.git
cd javamentor/javamentor-backend

Create a virtual environment

python -m venv venv
source venv/bin/activate # Linux/Mac

# or

venv\Scripts\activate # Windows

Install dependencies

pip install -r requirements.txt

Database setup

# Start PostgreSQL with Docker

docker-compose up -d postgres

# Or configure PostgreSQL manually

# Create a database 'javamentor'

Environment variables

cp .env.example .env

# Edit .env with your configurations

Start the server

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

Frontend Setup

Navigate to frontend

cd ../javamentor-frontend

Install dependencies

npm install

Start the app

npm start

App will be available at http://localhost:3000

Project Structure
Backend – Main Endpoints

POST /api/auth/register – User registration

POST /api/auth/login – User login

GET /api/auth/me – User profile

POST /api/chat/send – Send a message to the bot

GET /api/chat/conversations – Fetch conversations

GET /api/exercises – List exercises

POST /api/exercises/seed – Seed exercises database

Frontend – Main Pages

/ – Landing page

/login – Login page

/register – Registration page

/chat – Chat interface with JavaMentor

/exercises – Exercise catalog

/profile – User profile and stats

Demo
Demo Features

Simulated authentication – Login with any username/password

Smart AI assistant – Contextual responses based on keywords

Multiple conversations – History and navigation between chats

Interactive exercises – Filterable catalog with progress tracking

Multilingual interface – Switch between FR/EN in real-time

Test Data

User: Any username

Password: Any password (6+ characters)

Exercises: 8 pre-configured from beginner to advanced

Development
Available Scripts

Backend:

uvicorn app.main:app --reload # Dev server
python -m pytest # Unit tests
black app/ # Code formatting
flake8 app/ # Linting

Frontend:

npm start # Dev server
npm run build # Production build
npm test # Unit tests
npm run lint # ESLint linting

Component Architecture
src/components/
├── ui/ # Reusable UI components
│ ├── Button.jsx # Button with variants & animations
│ ├── Input.jsx # Input with visual validation
│ └── LoadingSpinner.jsx
├── auth/ # Authentication components
│ ├── LoginForm.jsx
│ └── RegisterForm.jsx
├── chat/ # Chat interface
│ └── MessageBubble.jsx
└── pages/ # Main pages
├── Home.jsx # Landing page
├── Chat.jsx # Chat interface
├── Exercises.jsx # Exercise catalog
└── Profile.jsx # User profile

Global State (Context API)

AuthContext – User authentication management

LanguageContext – FR/EN multilingual support

Translation System
// Usage in a component
const { language } = useLanguage();
const { t } = useTranslation(language);

return <h1>{t('welcomeTitle')}</h1>;

Design System
Color Palette

Primary: Orange → Red gradient (Java-inspired)

Secondary: Blue → Purple gradient

Background: Dark gradient with glassmorphism effects

Accents: Bright colors for active states

UI Components

Consistent design system with Tailwind CSS

Smooth animations via Framer Motion

Glassmorphism and blur effects

Mobile-first responsive design

Metrics & Advanced Features
Performance

Automatic code splitting with React Router

Optimized images and assets

GPU-accelerated animations

Lazy loading components

Accessibility

Full keyboard navigation

Optimized color contrast

Proper ARIA labels

Screen reader support

SEO & Meta

Optimized meta tags

Semantic HTML5 structure

Readable, consistent URLs

Future Enhancements

Real OpenAI integration – Replace simulation with OpenAI API

Integrated code editor – Monaco Editor for exercises

Badge system – Advanced gamification

Collaborative mode – Share solutions among users

Automated testing – Full test suite

Cloud deployment – Scalable infrastructure

Contribution

This project is designed as a demonstration of modern full-stack skills, combining:

Robust backend architecture with FastAPI

Modern UI with React

Conversational AI integration

Exceptional UX/UI design

Professional development practices

Built with passion to showcase excellence in modern full-stack development ⚡
