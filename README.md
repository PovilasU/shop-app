# Mock Shop Product Carousel

A small React app demonstrating front-end skills by consuming the [Mock Shop](https://mock.shop/) public API to display a responsive product carousel with modal product details and add-to-cart functionality.

**Live Demo:** [https://povilas-shop-app.netlify.app/](https://povilas-shop-app.netlify.app/)

---

## Project Overview

This project showcases a **responsive product carousel** component fetching product data from the Mock Shop API. It highlights:

- Usage of a **reusable interactive carousel** component.
- Responsive design with Tailwind CSS.
- Modal with product details and quantity controls.
- Basic add-to-cart alert interaction.
- API integration with pagination (optional load more disabled for performance).
- Clean TypeScript code and modern React practices.

Check out the live demo here: [https://povilas-shop-app.netlify.app/](https://povilas-shop-app.netlify.app/)

---

## Features

- **Reusable ProductCarousel component** with Swiper.js slider.
- Responsive carousel layout adapting to various screen sizes.
- Modal popup showing product details, image, and quantity selector.
- Pagination and autoplay controls on the slider.
- Footer with configurable GitHub and LinkedIn links.
- Optimized for performance with limited data fetch (no infinite loading on scroll end).
- Tailwind CSS for styling and responsive UI.

---

## Tech Stack

- React + TypeScript
- Tailwind CSS
- Swiper.js for carousel/slider
- Custom React hooks for data fetching (`useProductPagination`)
- Mock Shop API (no authentication required)

---

## Installation & Running Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/PovilasU/shop-app.git
   cd shop-app
