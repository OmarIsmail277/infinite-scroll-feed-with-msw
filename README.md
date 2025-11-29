# 🛍️ Infinite Scroll Product Feed

A responsive infinite scroll product catalog built with React, TypeScript, React Query, and Mock Service Worker (MSW).

🔗 **Live Demo:** [https://your-app-name.netlify.app](https://your-app-name.netlify.app)  
📦 **Repository:** [https://github.com/OmarIsmail277/infinite-scroll-feed-with-msw](https://github.com/OmarIsmail277/infinite-scroll-feed-with-msw)

---

## ✨ Features

### Core Features ✅

- Infinite scroll (20 items per page, 131+ total products)
- Pagination handled through `useInfiniteQuery`
- Mock API using MSW with simulated network delays (300–1000ms)
- Fully responsive design (mobile, tablet, desktop)
- Loading states and error handling with retry
- TypeScript for full type safety

### Bonus Features 🎁

- Search functionality with **3-character minimum**
- Enter key support + search button for manual triggering
- Category filtering
- Active filter display
- Clear filters button
- Clean and modern UI using Tailwind CSS

---

## 🛠️ Tech Stack

- React 18 + TypeScript
- React Query (TanStack Query)
- MSW (Mock Service Worker)
- Tailwind CSS
- Vite
- Axios
- Intersection Observer API

---

## 🎯 Key Implementation Details

### Infinite Scroll

- Uses Intersection Observer API for smooth performance
- Avoids scroll event listeners for efficiency

### React Query

- `useInfiniteQuery` handles:
  - Pagination (`pageParam`)
  - Caching and deduplication
  - Loading, error, and retry states
- Race conditions fixed with null checks and safe rendering

### MSW Mock API

- Intercepts requests to `/api/products?page={n}`
- Returns paginated results with:
  - Simulated latency
  - Search and category filtering
- ⚠️ Note: Chrome may unload service workers after ~5 minutes of inactivity, causing MSW to stop until refreshed

### Search & Filter Logic

- Search triggers only when:
  - Input is empty, or
  - Input length ≥3 characters
- Supports Enter key + search button
- Clear button resets search, category, and infinite scroll
- Fixed issues:
  - Input binding prevented typing
  - Pagination logic now uses filtered products

---

## 🧠 Time Spent (Approx. 7 Hours) - Most of the time spent was on the bonus feature (search/filter)

- 🧠 Planning architecture (infinite scroll, pagination, API flow)
- 🧪 Setting up MSW with realistic delays
- 🎁 Implementing bonus features:
  - Search (min-length, Enter key support, clear button)
  - Category filtering
- ⚙️ Ensuring filters interact correctly with pagination & infinite scroll
- 🐛 Fixing React Query race conditions & Chrome/MSW idle behavior
- 🎨 UI/UX improvements with Tailwind CSS
- Ensuring clean, scalable, production-like structure

---

## 📦 Setup

```bash
# Clone repository and install dependencies
git clone https://github.com/OmarIsmail277/infinite-scroll-feed-with-msw
cd infinite-scroll-feed-with-msw
npm install

# Initialize MSW
npx msw init public/ --save

# Run development server
npm run dev
```
