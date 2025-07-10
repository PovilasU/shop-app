import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/fetchProducts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import './product-carousel.css';

interface Product {
  id: string;
  title: string;
  description: string;
  featuredImage: {
    id: string;
    url: string;
  } | null;
  variants: {
    edges: {
      node: {
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
  };
}

const ProductCarousel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(true);

  const loadProducts = async (afterCursor?: string) => {
    try {
      const { products: newProducts, nextCursor, hasNextPage: more } = await fetchProducts(afterCursor);

      // Deduplicate by ID
      setProducts((prev) => {
        const all = [...prev, ...newProducts];
        const unique = Array.from(new Map(all.map(p => [p.id, p])).values());
        return unique;
      });

      setCursor(nextCursor);
      setHasNextPage(more);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleReachEnd = () => {
    if (hasNextPage && cursor) {
      loadProducts(cursor);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto py-8 text-center">
        <div className="text-lg text-gray-500">Loading featured products...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      {/* Header */}
<div className="mb-6 text-left w-full lg:w-1/2">
  <p className="text-gray-500 mt-1 uppercase text-[12px] lg:text-[14px]">// spring summer 25</p>
  <h2 className="font-bold text-gray-800 uppercase leading-tight text-[32px] lg:text-[64px] max-w-full lg:max-w-[20ch]">
  Shake up your summer look
</h2>
</div>

      {/* Carousel */}
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        pagination={{
          el: '.custom-swiper-pagination',
          clickable: true,
        }}
        autoplay={{ delay: 4000 }}
        loop={false}
        onReachEnd={handleReachEnd}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          480: { slidesPerView: 1.5 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3.2 },
        }}
      >
      {products.map((product, index) => {
  const price = product.variants?.edges?.[0]?.node?.price?.amount || 'N/A';
  const productId = product.id.split('/').pop(); // Unique ID for key

  return (
<SwiperSlide key={product.id}>
  <div
    className="relative rounded-xl overflow-hidden shadow hover:shadow-lg transition h-[400px] w-[280px]"
  >
    <img
      src={`${product.featuredImage?.url}&width=600`}
      alt={product.title}
      loading="lazy"
      className="object-contain h-full w-full"
      style={{ backgroundColor: '#f0f0f0' }} // optional fallback bg color
    />
    <div className="absolute top-4 left-4 right-4">
      <h2 className="text-black text-lg font-semibold truncate">{product.title}</h2>
      <p className="text-black text-sm mt-1">
        ${parseFloat(price).toFixed(2)}
      </p>
    </div>
  </div>
</SwiperSlide>
  );
})}
      </Swiper>

      {/* Pagination */}
      <div className="custom-swiper-pagination mt-4 text-center" />
    </div>
  );
};

export default ProductCarousel;
