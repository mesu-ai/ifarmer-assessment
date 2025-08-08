# iFarmer Assessment Project

A comprehensive web application built with Next.js 15.4 featuring two main assignments: a Tic-Tac-Toe game with statistics tracking and a complete Product Management System with CRUD operations.

## 🌐 Live Demo

**🚀 [View Live Site](https://ifarmer-assessment.vercel.app/)**

Experience the application in action with both assignments fully functional and deployed on Vercel.

## 🚀 Features

### Assignment 1: Tic-Tac-Toe Game
- **Interactive Game Board**: Classic 3x3 Tic-Tac-Toe with smooth animations
- **Player Management**: Custom player setup with name validation
- **Game Statistics**: Track wins, losses, draws, and win percentages
- **Leaderboard**: Sortable statistics table with player performance
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Redux State Management**: Centralized game state with persistence

### Assignment 2: Product Management System
- **Product CRUD Operations**: Create, Read, Update, Delete products
- **Advanced Search**: Real-time search with debounce functionality
- **Category Filtering**: Filter products by categories with visual indicators
- **Responsive Product Table**: Sortable table with pagination
- **Product Details View**: Comprehensive product information display
- **Image Management**: Multiple image support with gallery view
- **Form Validation**: Client-side validation with error handling
- **API Integration**: Full integration with Platzi Fake Store API

## 🛠️ Technology Stack

- **Framework**: Next.js 15.4 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS v4 for modern, responsive design
- **State Management**: Redux Toolkit for complex state management
- **HTTP Client**: Axios for API communications
- **UI Components**: Custom reusable component library
- **Image Optimization**: Next.js Image component for performance

## 📁 Project Structure

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

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mesu-ai/ifarmer-assessment.git
cd ifarmer-assessment
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Application Routes

### Main Navigation
- `/` - Home page with assignment overview
- `/assignment-1` - Tic-Tac-Toe game hub
- `/assignment-2` - Product management dashboard

### Assignment 1 Routes
- `/assignment-1/player-setup` - Configure player names
- `/assignment-1/game` - Play Tic-Tac-Toe
- `/assignment-1/result` - View game results
- `/assignment-1/leaderboard` - Player statistics

### Assignment 2 Routes
- `/assignment-2` - Product list with search and filters
- `/assignment-2/add` - Create new product
- `/assignment-2/edit?id={id}` - Edit existing product
- `/assignment-2/product/{id}` - View product details

## 🔧 Key Features Explained

### Product Management System
- **Search Functionality**: Debounced search with URL parameter management
- **Category Filtering**: Dynamic category-based product filtering
- **CRUD Operations**: Complete product lifecycle management
- **Image Gallery**: Support for multiple product images with error handling
- **Responsive Design**: Mobile-first approach with desktop enhancements

### Tic-Tac-Toe Game
- **Game Logic**: Intelligent win detection and draw handling
- **Player Statistics**: Persistent statistics across game sessions
- **Interactive UI**: Smooth animations and visual feedback
- **Game Flow**: Structured game flow from setup to results

## 🎨 UI Components

### Reusable Components
- `Button` - Standardized button component with variants
- `InputField` - Form input with validation and error display
- `InputSelect` - Dropdown selection component
- `InputTextarea` - Multi-line text input
- `InputImage` - Image upload and preview component
- `SearchBar` - Advanced search with debounce
- `Pagination` - Table pagination controls

## 🌐 API Integration

The application integrates with the [Platzi Fake Store API](https://fakeapi.platzi.com/) for product data:

- **Products**: CRUD operations for product management
- **Categories**: Category listing and filtering
- **Images**: Product image management

## 📊 State Management

### Redux Store Structure
```typescript
store/
├── features/
│   └── game/
│       └── gameSlice.ts    # Tic-Tac-Toe game state
└── hooks.ts                # Typed Redux hooks
```

## 🎯 Performance Optimizations

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Search Debouncing**: Reduced API calls with custom debounce
- **Responsive Images**: Multiple image sizes for different viewports
- **Error Boundaries**: Graceful error handling throughout the application

## 🧪 Development

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with Next.js recommended rules
- **Component Architecture**: Atomic design principles
- **Error Handling**: Comprehensive error boundaries and validation

### Build and Deploy
```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🚀 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with each push

Alternative deployment options:
- **Netlify**: Static site deployment
- **AWS Amplify**: Full-stack deployment
- **Docker**: Containerized deployment

## 📝 License

This project is developed as part of an assessment and is for educational purposes.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
