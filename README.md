
# Shop App

A small React + TypeScript app demonstrating front-end development skills by consuming the [Mock Shop](https://mock.shop/) API.  
It features a responsive product catalog, carousel, filtering, sorting, and reusable components, styled with Tailwind CSS.

---

## Live Demo

[https://povilas-shop-app.netlify.app/](https://povilas-shop-app.netlify.app/)

## GitHub Repository

[https://github.com/PovilasU/shop-app](https://github.com/PovilasU/shop-app)

---

## Features

- **Reusable Components:**  
  Interactive carousel and responsive product catalog components.

- **Responsive CTA Grid:**  
  Displays a grid of products from the API, fully responsive with sorting by price.

- **API Consumption:**  
  Fetches data from the public Mock Shop API without authentication.

- **Styling:**  
  Tailwind CSS for modern and responsive UI design.

- **Performance Optimizations:**  
  Efficient data fetching and rendering to enhance performance.

- **Unit Tests:**  
  Includes unit tests for API calls and custom hooks to ensure reliability.

---

## Project Structure

```
src
├── api
│   ├── fetchCollections.ts
│   ├── fetchProducts.ts
│   └── __tests__
├── App.tsx
├── assets
│   └── react.svg
├── components
│   ├── FAQSection
│   ├── Footer
│   ├── ProductCarousel
│   └── ProductCatalog
├── declarations.d.ts
├── hooks
│   ├── __tests__
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

## Getting Started

1. Clone the repository  
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

3. Run the development server  
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

## Notes

- The app uses the Mock Shop API endpoint which requires no authentication.
- The code is modular, maintainable, and uses best practices with TypeScript and React hooks.
- Smooth UI animations and responsive layouts enhance user experience.
- Comments are included in complex sections for clarity.

---

Thank you for reviewing my submission!  
For questions or feedback, feel free to reach out.

---

*This project was built as part of a competency-based front-end development task.*