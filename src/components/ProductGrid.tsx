import { useEffect, useState } from "react";
import { fetchProducts } from "../api/fetchProducts";
import ProductCard from "./ProductCard";

// 

type Product = {
  id: string;
  title: string;
  featuredImage: { url: string };
  variants: { edges: [{ node: { price: { amount: string } } }] };
};


export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    const priceA = parseFloat(a.variants.edges[0].node.price.amount);
    const priceB = parseFloat(b.variants.edges[0].node.price.amount);
    return sort === "asc" ? priceA - priceB : priceB - priceA;
  });

  // Slice to only show visible products
  const visibleProducts = sortedProducts.slice(0, visibleCount);

  // Load more handler
  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div className="px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Explore the Range</h1>
        <select
          onChange={(e) => setSort(e.target.value as "asc" | "desc")}
          className="border border-gray-300 rounded px-3 py-1"
          aria-label="Sort products"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleProducts.map((product) => (
            <ProductCard
            key={product.id}
            title={product.title}
            image={product.featuredImage?.url || ""}
            price={product.variants.edges[0].node.price.amount}
            />
        ))}
        </div>
      {visibleCount < sortedProducts.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="bg-black text-white rounded-full px-8 py-2 font-semibold hover:bg-gray-800 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
