# Glumina Frontend

Glumina is a dual-track diabetes risk prediction system built to make machine learning results easier to understand for non-technical users. Instead of only displaying a prediction label, Glumina connects user health inputs with model confidence, contributing factors, risk level, and personalized recommendations.

The system provides two prediction modes: Pre-Lab Screening for users who do not have laboratory results yet, and Post-Lab Analysis for users who already have HbA1c and blood glucose values.

## Live Demo

Frontend: https://glumina.vercel.app  
Backend API: https://ollyne-glumina-backend.hf.space

## Overview

Glumina was developed as a practical machine learning project that focuses not only on diabetes risk prediction, but also on how the prediction result is communicated to users. The frontend allows users to input health-related data, send it to the backend model, and receive an interpretable result that includes risk level, model confidence, contributing factors, and recommendation.

The project is designed around the idea that different users may have different levels of available health data. Users without lab results can still access early risk awareness through Pre-Lab Screening, while users with HbA1c and blood glucose values can receive a more clinically grounded analysis through Post-Lab Analysis.

## Key Features

- Dual prediction modes: Pre-Lab Screening and Post-Lab Analysis
- Accessible input flow for users with or without laboratory results
- Diabetes risk level output: Low, Medium, or High
- Model confidence and contributing factor display
- Personalized recommendation based on prediction result
- Responsive frontend interface connected to a deployed machine learning backend

## Tech Stack

- React
- Vite
- Tailwind CSS
- Axios
- Lucide React
- Vercel

## Project Structure

```text
glumina-frontend/
├── public/
├── src/
├── .env.example
├── .gitignore
├── README.md
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

## How to Run Locally

Install the required dependencies:

```bash
npm install
```

Run the frontend development server:

```bash
npm run dev
```

After running the command, open the local URL shown in the terminal to view Glumina in your browser.

## Build

Create a production build:

```bash
npm run build
```

## Deployment

The Glumina frontend is deployed on Vercel and connected to a FastAPI backend hosted on Hugging Face Spaces. The frontend handles the user interface, input form, and result visualization, while the backend processes the submitted health data, runs the machine learning models, and returns the prediction result.

## Backend Repository

Backend: https://huggingface.co/spaces/ollyne/glumina-backend

## Medical Disclaimer

Glumina is designed for diabetes risk awareness and screening support. The prediction result should be used as an early insight, not as a final medical diagnosis. Users are encouraged to consult healthcare professionals and complete proper laboratory testing for clinical evaluation.
