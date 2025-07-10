import { useEffect, useState } from "react";
import { fetchProducts } from "../api/fetchProducts";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  title: string;
  featuredImage: { url: string } | null;
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

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  // Load initial products
  useEffect(() => {
    loadMoreProducts();
  }, []);

  // Load more products function with duplicate filtering
  const loadMoreProducts = async () => {
    if (loading || !hasNextPage) return;

    setLoading(true);
    try {
      const result = await fetchProducts(nextCursor || undefined);

      console.log("Next cursor:", result.nextCursor);

      setProducts((prev) => {
        // Filter out duplicates by product id
        const newProducts = result.products.filter(
          (p) => !prev.some((existing) => existing.id === p.id)
        );
        return [...prev, ...newProducts];
      });

      setNextCursor(result.nextCursor);
      setHasNextPage(result.hasNextPage);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sort products in memory
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
          aria-label="Sort products"
          value={sort}
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            image={product.featuredImage?.url || ""}
            price={product.variants.edges[0].node.price.amount}
          />
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMoreProducts}
            disabled={loading}
            className="bg-black text-white rounded-full px-8 py-2 font-semibold hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
