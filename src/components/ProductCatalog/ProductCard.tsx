import { useState } from "react";
import { useHover } from "../../hooks/useHover";
import { useQuantity } from "../../hooks/useQuantity";

type Props = {
  title: string;
  image: string;
  price: string;
  onAddToCart?: (quantity: number) => void; // optional callback for add to cart
};

// Utility to generate optimized Shopify image URLs
function getOptimizedImage(url: string, width: number = 400) {
  return `${url}?width=${width}`;
}

export default function ProductCard({
  title,
  image,
  price,
  onAddToCart,
}: Props) {
  const { isHovered, onMouseEnter, onMouseLeave } = useHover();
  const { quantity, increment, decrement } = useQuantity(1, 1, 99);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(quantity);
    setIsModalOpen(false); // close modal after adding
  };

  // On mobile, open modal on click anywhere
  const handleCardClick = () => {
    if (window.innerWidth < 640) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div
        className={`relative bg-white rounded-xl shadow transition p-4 cursor-pointer
          ${
            isHovered
              ? "border-2 border-black shadow-lg"
              : "border border-transparent"
          }`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={handleCardClick}
      >
        <div className="rounded-md mb-4 w-full h-48 overflow-hidden flex items-center justify-center bg-gray-100">
          <img
            src={getOptimizedImage(image, 400)}
            srcSet={`
              ${getOptimizedImage(image, 320)} 320w,
              ${getOptimizedImage(image, 480)} 480w,
              ${getOptimizedImage(image, 768)} 768w
            `}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            alt={title}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
            width={400}
            height={300}
          />
        </div>
        <h2 className="text-[14px] sm:text-[16px] font-semibold">{title}</h2>
        <p className="text-gray-600 mt-2 text-[12px] sm:text-[14px]">
          ${Number(price).toFixed(2)}
        </p>

        {/* View link only on desktop */}
        {isHovered && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent triggering card click on desktop
              setIsModalOpen(true);
            }}
            className="absolute bottom-4 right-4 hidden sm:flex items-center text-sm font-semibold text-black hover:text-gray-700 transition"
            type="button"
            style={{ fontSize: "14px" }}
          >
            View
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg max-w-[90vw] max-h-[90vh] w-full flex flex-col items-center p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close icon */}
            <button
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition text-2xl font-bold"
            >
              &times;
            </button>

            <img
              src={getOptimizedImage(image, 800)}
              srcSet={`
                ${getOptimizedImage(image, 400)} 400w,
                ${getOptimizedImage(image, 600)} 600w,
                ${getOptimizedImage(image, 800)} 800w
              `}
              sizes="(max-width: 768px) 100vw, 800px"
              alt={title}
              className="max-w-full max-h-[70vh] object-contain"
              loading="lazy"
              width={800}
              height={600}
            />
            <h2 className="mt-6 text-2xl font-bold text-center">{title}</h2>
            <p className="text-gray-600 mt-2 text-center">
              ${Number(price).toFixed(2)}
            </p>

            {/* Quantity selector and Add to Cart */}
            <div className="mt-6 flex items-center space-x-4">
              <div className="flex items-center border rounded overflow-hidden select-none">
                <button
                  onClick={decrement}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                  type="button"
                  aria-label="Decrease quantity"
                >
                  –
                </button>
                <input
                  type="text"
                  readOnly
                  value={quantity}
                  className="w-12 text-center border-x border-gray-300 focus:outline-none"
                  aria-label="Quantity"
                />
                <button
                  onClick={increment}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                  type="button"
                  aria-label="Increase quantity"
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
    </>
  );
}
