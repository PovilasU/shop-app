import { useEffect, useState } from "react";
import { fetchProducts } from "../api/fetchProducts";
import ProductCard from "./ProductCard";

type Product = {
  id: string;
  title: string;
  featuredImage: { url: string };
  variants: { edges: [{ node: { price: { amount: string } } }] };
};

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
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

  return (
    <div className="px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Explore the Range</h1>
        <select
          onChange={(e) => setSort(e.target.value as "asc" | "desc")}
          className="border border-gray-300 rounded px-3 py-1"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            image={product.featuredImage?.url}
            price={product.variants.edges[0].node.price.amount}
          />
        ))}
      </div>
    </div>
  );
}
