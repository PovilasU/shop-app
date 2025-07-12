# Shop App

A small React + TypeScript app demonstrating front-end development skills using the [Mock Shop API](https://mock.shop/). The app features a product carousel, responsive product grid with sorting, and more.

---

## Live Demo

[https://povilas-shop-app.netlify.app/](https://povilas-shop-app.netlify.app/)

## GitHub Repository

[https://github.com/PovilasU/shop-app](https://github.com/PovilasU/shop-app)

---

## Project Overview

This app is built to showcase competency in front-end development including:

- Fetching and displaying product data from a public API (Mock Shop).
- Implementing reusable components like product carousel and accordion.
- Responsive product grid layout with sorting by price.
- Clean TypeScript code using ES6+ features.
- Styling using Tailwind CSS.
- Smooth UI animations and interactions.
- Performance optimizations by limiting product fetching.
- Unit tests for API calls and hooks.

---

## Features

- **Reusable Components:** Carousel, Accordion, Product Cards.
- **Responsive Design:** Fully responsive grid and layout.
- **Sorting:** Sort products by price.
- **Modal Interaction:** Add to cart modal with quantity control.
- **Unit Tests:** Tests for API calls and custom hooks.

---

## Project Structure

```
src
├── api
│   ├── fetchCollections.ts
│   ├── fetchProducts.ts
│   └── __tests__
│       ├── fetchCollections.test.ts
│       └── fetchProducts.test.ts
├── App.tsx
├── assets
│   └── react.svg
├── components
│   ├── FAQSection
│   │   ├── Accordion.tsx
│   │   ├── FAQSection.tsx
│   │   └── index.ts
│   ├── Footer
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── ProductCarousel
│   │   ├── index.ts
│   │   ├── product-carousel.css
│   │   └── ProductCarousel.tsx
│   └── ProductCatalog
│       ├── index.ts
│       ├── ProductCard.tsx
│       └── ProductGrid.tsx
├── declarations.d.ts
├── hooks
│   ├── __tests__
│   │   ├── useCollections.test.tsx
│   │   ├── useHover.test.tsx
│   │   ├── useProductPagination.test.tsx
│   │   ├── useProducts.test.tsx
│   │   └── useQuantity.test.tsx
│   ├── useCollections.ts
│   ├── useHover.ts
│   ├── useProductPagination.ts
│   ├── useProducts.ts
│   └── useQuantity.ts
├── main.tsx
├── setupTests.ts
├── styles
│   └── index.css
└── vite-env.d.ts
```

---

## Technologies Used

- React 18 with TypeScript
- Vite as build tool
- Tailwind CSS for styling
- Swiper.js for carousel
- React Testing Library for unit tests
- Mock Shop API for product data

---

## Installation & Running

1. Clone the repo

```bash
git clone https://github.com/PovilasU/shop-app.git
cd shop-app
```

2. Install dependencies

```bash
npm install
# or
yarn
```

3. Run development server

```bash
npm run dev
# or
yarn dev
```

4. Run tests

```bash
npm test
# or
yarn test
```

---

## Notes on Best Practices

- Limited product fetching to improve performance rather than loading all products at once.
- Clean, modular and reusable components.
- Responsive and accessible UI.
- Unit tests covering hooks and API utilities.
- Tailwind CSS for rapid styling and responsive design.

---

## Contact

Created by PovilasU.  
Feel free to check the [GitHub repo](https://github.com/PovilasU/shop-app) or the [live demo](https://povilas-shop-app.netlify.app/).

---

Thank you for reviewing my project!