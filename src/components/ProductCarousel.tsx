import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useProductPagination } from "../hooks/useProductPagination";

import "swiper/css";
import "swiper/css/pagination";
import "./product-carousel.css";

const ProductCarousel: React.FC = () => {
  const { products, hasNextPage, loading, loadMore } = useProductPagination();

  const [modalProduct, setModalProduct] = useState<typeof products[0] | null>(null);
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((q) => Math.min(q + 1, 99));
  const decrement = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleAddToCart = () => {
    alert(`Added ${quantity} of "${modalProduct?.title}" to cart.`);
    setModalProduct(null);
    setQuantity(1);
  };

  const handleReachEnd = () => {
    if (hasNextPage) {
      loadMore();
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto py-8 text-center">
        <div className="text-lg text-gray-500">Loading featured products...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      <div className="mb-6 text-left w-full lg:w-1/2">
        <p className="text-gray-500 mt-1 uppercase text-[12px] lg:text-[14px]">// spring summer 25</p>
        <h2 className="font-bold text-gray-800 uppercase leading-tight text-[32px] lg:text-[64px] max-w-full lg:max-w-[20ch]">
          Shake up your summer look
        </h2>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        pagination={{
          el: ".custom-swiper-pagination",
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
        {products.map((product) => {
          const price = product.variants?.edges?.[0]?.node?.price?.amount || "N/A";

          return (
            <SwiperSlide key={product.id}>
              <div
                onClick={() => setModalProduct(product)}
                className="relative rounded-xl overflow-hidden shadow hover:shadow-lg transition h-[400px] w-[280px] cursor-pointer"
              >
                <img
                  src={`${product.featuredImage?.url}&width=600`}
                  alt={product.title}
                  loading="lazy"
                  className="object-contain h-full w-full"
                  style={{ backgroundColor: "#f0f0f0" }}
                />
                <div className="absolute top-4 left-4 right-4">
                  <h2 className="text-black text-lg font-semibold truncate">{product.title}</h2>
                  <p className="text-black text-sm mt-1">${parseFloat(price).toFixed(2)}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="custom-swiper-pagination mt-4 text-center" />

      {modalProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => {
            setModalProduct(null);
            setQuantity(1);
          }}
        >
          <div
            className="bg-white rounded-lg max-w-[90vw] max-h-[90vh] w-full flex flex-col items-center p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setModalProduct(null);
                setQuantity(1);
              }}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition text-2xl font-bold"
            >
              &times;
            </button>

            <img
              src={`${modalProduct.featuredImage?.url}&width=600`}
              alt={modalProduct.title}
              className="max-w-full max-h-[70vh] object-contain"
              loading="lazy"
            />
            <h2 className="mt-6 text-2xl font-bold text-center">{modalProduct.title}</h2>
            <p className="text-gray-600 mt-2 text-center">
              ${parseFloat(modalProduct.variants?.edges?.[0]?.node.price.amount || "0").toFixed(2)}
            </p>

            <div className="mt-6 flex items-center space-x-4">
              <div className="flex items-center border rounded overflow-hidden select-none">
                <button
                  onClick={decrement}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                  type="button"
                >
                  –
                </button>
                <input
                  type="text"
                  readOnly
                  value={quantity}
                  className="w-12 text-center border-x border-gray-300"
                />
                <button
                  onClick={increment}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                  type="button"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition"
                type="button"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
