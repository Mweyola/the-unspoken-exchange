# The Unspoken Exchange

A communication-first marketplace MVP by Viridian Network LLC.

## Overview

The Unspoken Exchange is a React-based marketplace prototype focused on improving buyer and seller communication before a transaction begins. The app combines marketplace listings, structured buyer inquiry forms, seller trust signals, and community intelligence threads.

## Purpose

The MVP is designed to reduce low-intent buyer interactions, ghosting, vague messages, lowballing, and wasted seller communication. Instead of encouraging generic messages, buyers submit structured intent details such as readiness, offer amount, transportation, meetup availability, and payment method.

## Core Features

- Marketplace listing grid with seller trust badges
- Listing detail pages with item details, seller info, safety notes, and inquiry forms
- Structured buyer inquiry workflow saved in localStorage for MVP testing
- Seller dashboard placeholder showing listings, inquiry intent, offers, meetup availability, and readiness indicators
- Marketplace intelligence section for safety, pricing, scam checks, inspections, and negotiation topics
- Mobile-friendly navigation and responsive layouts

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui-style components
- React Router
- localStorage for temporary MVP inquiry persistence

## Local Development

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Open the local URL printed by Vite, commonly:

```text
http://127.0.0.1:8080/
```

If that port is in use, Vite will choose the next available port.

## Build

Create a production build:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

Run lint checks:

```sh
npm run lint
```

## Deployment Notes for HostGator

This is currently a static frontend MVP. Run `npm run build` and upload the generated `dist` folder contents to the HostGator web root or the target subdirectory.

For client-side routing to work on HostGator, configure the server to route unknown paths back to `index.html`. When the PHP and MySQL backend is added later, keep the frontend build separate from backend API routes.

## Project Status

Frontend MVP ready for first user testing. Backend authentication, real listings, real inquiry storage, seller accounts, moderation, and PHP/MySQL integration are planned future work.
