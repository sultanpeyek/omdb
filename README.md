# OMDb

FE Engineer Exercise.

## How to Run on Local Machine

Create `.env.local` file in the project's root folder `/`. If you don't have the
api key, you can generate it here
[OMDb API](https://www.omdbapi.com/apikey.aspx).

```bash
NEXT_PUBLIC_OMDB_API_KEY=xxxxx
```

Run the following command to start the development server:

```bash
yarn
yarn dev
```

Development server is running at [http://localhost:3000](http://localhost:3000).

**Development Environment:**

- Node.js version: `v16.13.0`

## Features Checklist

- [x] Display List of movies
- [ ] Use Infinite Scroll without plugin if total results which exceed than 5
      **(Basic functionality has been implemented)**
- [x] Search movies by keyword
- [x] Single Page for Single Movie Detail
- [x] Show Movie Poster in a popup modal window when image from the list is
      clicked
- [ ] Unit test for components
- [x] Autocomplete search box implementation **(Still need more polishing)**
- [x] Login mechanism using connect wallet (token-gated)
- [x] Upload the code to Github account set as public.
- [x] Upload the result online to Vercel

## Highlighted Tech Stacks

- React
- Redux
- Next.js
- TypeScript
- React Hooks
- Axios
- Tailwind CSS
- Solana Web 3 JS SDK
- ESLint
- Prettier
