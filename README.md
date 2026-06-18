# Glumina Frontend

Glumina is a dual-track diabetes risk prediction system designed to make machine learning results more understandable for users. The system provides two prediction modes: Pre-Lab Screening for users without laboratory results, and Post-Lab Analysis for users who already have HbA1c and blood glucose values.

## Live Demo

Frontend: https://glumina.vercel.app  
Backend API: https://ollyne-glumina-backend.hf.space

## Overview

Glumina helps users estimate diabetes risk based on the type of health data they currently have. Instead of only showing a prediction label, the system also presents risk level, model confidence, contributing factors, and personalized recommendations to make the result easier to understand.

## Key Features

- Pre-Lab Screening using accessible non-lab inputs
- Post-Lab Analysis using HbA1c and blood glucose values
- Diabetes risk level output: Low, Medium, or High
- Model confidence and contributing factor display
- Personalized recommendation based on prediction result
- Responsive user interface for live web access

## Tech Stack

- React
- Vite
- Tailwind CSS
- Axios
- Lucide React
- Vercel

## Project Structure

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

## Environment Variable

Create a `.env` file based on `.env.example`.

VITE_API_URL=https://ollyne-glumina-backend.hf.space

## How to Run Locally

npm install
npm run dev

## Build

npm run build

## Deployment

The frontend is deployed on Vercel and connected to a FastAPI backend hosted on Hugging Face Spaces.

## Backend Repository

Backend: https://huggingface.co/spaces/ollyne/glumina-backend

## Medical Disclaimer

Glumina is designed for diabetes risk awareness and screening support. It is not a replacement for professional medical diagnosis, laboratory testing, or consultation with healthcare professionals.
