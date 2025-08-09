# iFarmer Assessment Project

A web application built with Next.js featuring two assignments: Tic-Tac-Toe game and Product Management System.

## Live Demo

[View Live Site](https://ifarmer-assessment.vercel.app/)

## Features

**Assignment 1: Tic-Tac-Toe Game**
- Interactive game board with player statistics
- Leaderboard and game results tracking

**Assignment 2: Product Management System**
- CRUD operations for products
- Search and category filtering
- Product details and image management

## Tech Stack

- Next.js 15.4
- TypeScript
- Tailwind CSS
- Redux Toolkit
- Axios

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── assignment-1/         # Tic-Tac-Toe game routes
│   │   ├── game/            # Game board page
│   │   ├── player-setup/    # Player configuration
│   │   ├── leaderboard/     # Statistics display
│   │   └── result/          # Game results
│   └── assignment-2/         # Product management routes
│       ├── add/             # Add new product
│       ├── edit/            # Edit existing product
│       └── product/[id]/    # Product details view
├── components/              # Reusable UI components
│   ├── common/             # Layout components
│   ├── features/           # Feature-specific components
│   │   ├── products/       # Product management components
│   │   └── tic-tac-toe/    # Game components
│   └── ui/                 # Base UI components
├── apis/                   # API configuration and services
├── lib/redux/             # Redux store and slices
├── types/                 # TypeScript type definitions
└── assets/               # Static assets
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/mesu-ai/ifarmer-assessment.git
cd ifarmer-assessment
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm start
```
