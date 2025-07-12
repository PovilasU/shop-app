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

interface Collection {
  id: string;
  title: string;
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [collectionId, setCollectionId] = useState<string | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);

  // Fetch collections on mount
  useEffect(() => {
    const loadCollections = async () => {
      try {
        const res = await fetch(
          "https://mock.shop/api?query={collections(first:10){edges{node{id title}}}}"
        );
        const json = await res.json();
        const fetchedCollections = json.data.collections.edges.map(
          (edge: any) => edge.node
        );
        setCollections(fetchedCollections);
      } catch (error) {
        console.error("Error loading collections:", error);
      }
    };
    loadCollections();
  }, []);

  // Load initial products whenever sort or collection changes
  useEffect(() => {
    const loadInitialProducts = async () => {
      setLoading(true);
      setProducts([]);
      setNextCursor(null);
      setHasNextPage(true);

      try {
        const result = await fetchProducts({
          collectionId: collectionId || undefined,
          sort,
        });
        setProducts(result.products);
        setNextCursor(result.nextCursor);
        setHasNextPage(result.hasNextPage);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialProducts();
  }, [collectionId, sort]);

  // Load more products for pagination
  const loadMoreProducts = async () => {
    if (loading || !hasNextPage) return;

    setLoading(true);
    try {
      const result = await fetchProducts({
        afterCursor: nextCursor || undefined,
        collectionId: collectionId || undefined,
        sort,
      });

      setProducts((prev) => {
        const newProducts = result.products.filter(
          (p) => !prev.some((existing) => existing.id === p.id)
        );
        return [...prev, ...newProducts];
      });

      setNextCursor(result.nextCursor);
      setHasNextPage(result.hasNextPage);
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-8">
      <div className="mb-6">
        <p className="text-gray-500 mt-1 uppercase text-[12px] lg:text-[14px] mb-1">
          // spring summer 25
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="font-bold text-[24px] lg:text-[40px]">Explore the Range</h1>

          <div className="flex gap-2">
            <select
              onChange={(e) => setSort(e.target.value as "asc" | "desc")}
              className="border border-gray-300 rounded px-3 py-1"
              aria-label="Sort products"
              value={sort}
            >
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>

            <select
              onChange={(e) =>
                setCollectionId(e.target.value === "all" ? null : e.target.value)
              }
              className="border border-gray-300 rounded px-3 py-1"
              aria-label="Filter by collection"
              value={collectionId || "all"}
            >
              <option value="all">All Collections</option>
              {collections.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            image={product.featuredImage?.url || ""}
            price={product.variants.edges[0].node.price.amount}
          />
        ))}
      </div>

      {loading && products.length === 0 && (
        <p className="text-center text-gray-500 mt-10">Loading products...</p>
      )}

      {!loading && products.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No products found.</p>
      )}

      {hasNextPage && products.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMoreProducts}
            disabled={loading}
            className="text-black text-[13px] font-bold rounded-full px-6 py-2 hover:bg-gray-100 transition disabled:opacity-50"
            style={{ border: "2px solid #CCCCCC" }}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
