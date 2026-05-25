# Unfilteredqa

Unfilteredqa is a communication-first marketplace MVP focused on improving buyer and seller interactions before a transaction begins. It combines marketplace listings, structured buyer inquiry forms, seller trust signals, and community intelligence threads.

Built by Viridian Network LLC.

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS

## Local Setup

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

## Production Build

Create the production build:

```sh
npm run build
```

The generated static site will be written to `dist`.

## HostGator Deployment

1. Run `npm run build`.
2. Open the generated `dist` directory.
3. Upload the contents of `dist` into HostGator `public_html`.

Upload the files and folders inside `dist`, not the `dist` folder itself.

The `public/.htaccess` file is included so Vite/React client-side routes resolve through `index.html` on Apache/cPanel hosting.
