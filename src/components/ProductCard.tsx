import { useState } from "react";

type Props = {
  title: string;
  image: string;
  price: string;
};

export default function ProductCard({ title, image, price }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative bg-white rounded-xl shadow transition p-4 cursor-pointer
        ${isHovered ? "border-2 border-black shadow-lg" : "border border-transparent"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image}
        alt={title}
        className="rounded-md mb-4 w-full object-cover h-48"
      />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600 mt-2">${price}</p>

      {/* View button */}
      {isHovered && (
        <button
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
          type="button"
        >
          View
        </button>
      )}
    </div>
  );
}
