import { useEffect, useState } from "react";
import { fetchProducts } from "../api/fetchProducts";

export interface Product {
  id: string;
  title: string;
  description?: string;
  featuredImage: {
    id?: string;
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

interface UseProductPaginationResult {
  products: Product[];
  hasNextPage: boolean;
  loading: boolean;
  loadMore: () => void;
}

export function useProductPagination(): UseProductPaginationResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(true);

  const loadProducts = async (afterCursor?: string) => {
    setLoading(true);
    try {
      const { products: newProducts, nextCursor, hasNextPage: more } =
        await fetchProducts({ afterCursor });

      setProducts((prev) => {
        const combined = [...prev, ...newProducts];
        return Array.from(new Map(combined.map((p) => [p.id, p])).values());
      });

      setCursor(nextCursor);
      setHasNextPage(more);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasNextPage && cursor) {
      loadProducts(cursor);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return { products, hasNextPage, loading, loadMore };
}
