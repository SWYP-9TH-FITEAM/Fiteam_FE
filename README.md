# Fiteam

## Project Environment Setup

### Requirements

- Node.js v20 or higher
- npm v10 or higher

### Installation

1. Clone the repository

```bash
git clone https://github.com/SWYP-9TH-FITEAM/Fiteam_FE.git
cd Fiteam_FE
```

2. Install dependencies

```bash
npm install
```

3. Setup `.env.local` file

Copy the `.env.example` file to create a new `.env.local` file and fill in your environment variables:

```bash
cp .env.example .env.local
```

Then edit the `.env.local` file with your actual values.

## How to Run

### Development Server

```bash
npm run dev
```

- The development server runs at http://localhost:5173 by default.

### Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## Tech Stack

- React v19
- TypeScript
- Vite
- React Router
- Zod
- React Hook Form
