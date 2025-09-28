# Input Lag Checker

A simple web application to measure input lag for monitors and input devices (mouse, keyboard, gamepad).

## Features

- Measures input lag in milliseconds and frames (assuming 60 FPS)
- Supports mouse clicks, keyboard presses, and gamepad button presses
- Randomized timing to prevent anticipation
- Clean, responsive interface
- Ready for Netlify deployment

## How it Works

1. Click "Start Test" to begin
2. Wait for the background color to change (randomized 1-5 second delay)
3. Click or press any key as quickly as possible when the color changes
4. View your input lag results in milliseconds and frames

## Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Format code
pnpm format
```

## Deployment

This project is configured for easy deployment to Netlify:

1. Push your code to a Git repository
2. Connect the repository to Netlify
3. The build settings are already configured in `netlify.toml`
4. Deploy!

## Technology Stack

- TypeScript
- Vite
- CSS3 with modern features
- pnpm package manager
- Prettier for code formatting
