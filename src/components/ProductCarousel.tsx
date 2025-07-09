import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/fetchProducts';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import './product-carousel.css'; // custom CSS for pagination styles

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto py-8 text-center">
        <div className="text-lg text-gray-500">Loading featured products...</div>
      </div>
    );
  }

  const topProducts = products.slice(0, 8);

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
        <p className="text-gray-500 mt-1">Discover top picks from our store</p>
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
        loop
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {topProducts.map((product, index) => {
          const price = product.variants?.edges?.[0]?.node?.price?.amount || 'N/A';

          return (
            <SwiperSlide key={product.id}>
              <div
                className={`bg-white rounded-xl shadow hover:shadow-lg transition p-4 h-full ${
                  index % 2 === 1 ? 'mt-6' : ''
                }`}
              >
                {product.featuredImage && (
                  <div className="w-full h-48 overflow-hidden rounded-md mb-4">
                    <img
                      src={`${product.featuredImage.url}&width=400`}
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-600 mt-2">
                  ${parseFloat(price).toFixed(2)}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Pagination below */}
      <div className="custom-swiper-pagination mt-4 text-center" />
    </div>
  );
};

export default ProductCarousel;
