# OMDb

FE Engineer Exercise.

![mockup-preview](https://user-images.githubusercontent.com/84768757/188052614-d9b47ebc-ff72-42e6-8248-bdd4e2ae336b.png)

[Link to Demo](https://sultanpeyek-omdb.vercel.app/)

---

## Features Checklist

- [x] Display List of movies
- [x] Use Infinite Scroll without plugin if total results are exceed than 5
      **(Basic functionality has been implemented but still need more
      polishing)**
- [x] Search movies by keyword
- [x] Single Page for Single Movie Detail
- [x] Show Movie Poster in a popup modal window when image from the list is
      clicked
- [x] Unit test for components **(Only cover render checking at the moment and
      will be expanded more later)**
- [x] Autocomplete search box implementation
- [x] Login mechanism using connect wallet (token-gated)
- [x] Upload the code to Github account set as public.
- [x] Upload the result online to Vercel

## How to Run on Local Machine

Create `.env.local` file in the project's root folder `/`. If you don't have the
api key, you can generate it [here](https://www.omdbapi.com/apikey.aspx).

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

## Folder Structure

```
├── public
│   ├── assets
│   │   └── placeholder.png
│   ├── favicon.ico
├── src
│   ├── api
│   │   └── movies.tsx
│   ├── app
│   │   └── store.ts
│   ├── components
│   │   ├── common
│   │   │   ├── AppBar
│   │   │   │   ├── AppBar.tsx
│   │       │   ├── AppBar.spec.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Footer
│   │   │   ├── LoadingSpinner
│   │   │   ├── ModalPreview
│   │   │   └── WalletConnect
│   │   └── movies
│   │       ├── CardContainer
│   │       │   ├── CardContainer.tsx
│   │       │   ├── CardContainer.spec.tsx
│   │       │   └── index.ts
│   │       ├── CardItem
│   │       │   ├── CardItem.tsx
│   │       │   ├── CardItem.spec.tsx
│   │       │   └── index.ts
│   │       ├── Detail
│   │       ├── SearchAutoCompleteContainer
│   │       ├── SearchAutoCompleteItem
│   │       └── SearchForm
│   ├── constants
│   │   └── index.ts
│   ├── contexts
│   │   └── application.tsx
│   ├── features
│   │   └── movies
│   │       ├── Movies.spec.tsx
│   │       ├── index.tsx
│   │       └── moviesSlice.ts
│   ├── hooks
│   │   ├── useOnClickOutside.ts
│   │   └── ...
│   ├── layouts
│   │   └── main.tsx
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── index.tsx
│   │   └── movie
│   │       └── [id].tsx
│   ├── styles
│   │   └── globals.css
│   └── utils
│       └── index.ts
```

## Test Suites

![preview-testing](https://user-images.githubusercontent.com/84768757/188052404-bd2ca9be-1818-4136-a5dc-0f422317a0b5.png)

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
- Jest
