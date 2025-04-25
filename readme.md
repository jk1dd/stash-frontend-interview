# Lodging Lookabout

A mobile-friendly, responsive hotel search interface built with React and TypeScript and styled with Tailwind CSS. It remembers your search filters (via Zustand) and even shows the current weather for each property in your search results.

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** ≥ 8.0.0

### Installation

1. Clone the repo

   ```bash
   git clone https://github.com/jk1dd/stash-frontend-interview.git
   cd stash-frontend-interview
   ```

2. Install dependencies

   ```bash
   npm install
   ```

### Running in Development

```bash
npm run dev
```

And visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## Tech Stack

- **Vite** as dev server and build tool - super fast
- **React** + **TypeScript**
- **Tailwind CSS** for styling - responsive styles within the markup and I've been curious to experiment with this library
- **React Router** for client-side routing
- **Zustand** for state management - lightweight and seems suited to this project, also new to me
- **wttr.in JSON API** and a **custom caching layer** to provide a somewhat hacky live weather feature

---

## Possible Improvements

- **Add testing**: Vitest, React Testing Library. MSW for network tests. Cypress or somesuch for End to End
- **SEO & Accessibility**
- **Storybook**: catalog of components for visual review, collaboration with designers
- **Live weather strategy**: come up with a more robust solution
- **Internationalization**: strings and currency
- **Housekeeping in the repo**: extract shared components for re-use, enforce linting rules, CSS organization
