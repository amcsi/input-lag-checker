# Input Lag Checker

A simple web application to measure input lag for monitors and input devices (mouse, keyboard, gamepad).

## Features

- Measures input lag in milliseconds and frames (assuming 60 FPS)
- Supports mouse clicks, keyboard presses, and gamepad button presses
- Proper Gamepad API integration with efficient polling
- Randomized timing to prevent anticipation (1-2 second delay)
- Clean, responsive interface
- Ready for Netlify deployment

## How it Works

1. Click "Start Test" to begin
2. Wait for the background color to change (randomized 1-2 second delay)
3. Click, press any key, or press any gamepad button as quickly as possible when the color changes
4. View your input lag results in milliseconds and frames (with 2 decimal precision)

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
