import { useEffect, useState } from "react";
import { fetchProducts } from "../api/fetchProducts";

export interface Product {
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

export interface UseProductsParams {
  collectionId?: string | null;
  sort: "asc" | "desc";
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: Error | null;
  hasNextPage: boolean;
  loadMore: () => Promise<void>;
}

export function useProducts({ collectionId, sort }: UseProductsParams): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch products on collectionId or sort change (reset)
  useEffect(() => {
    setNextCursor(null);
    setHasNextPage(true);

    const loadInitial = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchProducts({
          afterCursor: undefined,
          collectionId: collectionId || undefined,
          sort,
        });
        setProducts(result.products);
        setNextCursor(result.nextCursor);
        setHasNextPage(result.hasNextPage);
      } catch (err) {
        setError(err as Error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadInitial();
  }, [collectionId, sort]);

  const loadMore = async () => {
    if (loading || !hasNextPage) return;
    setLoading(true);
    setError(null);

    try {
      const result = await fetchProducts({
        afterCursor: nextCursor || undefined,
        collectionId: collectionId || undefined,
        sort,
      });

      setProducts((prev) => {
        const newProducts = result.products.filter(
          (p: { id: string; }) => !prev.some((existing) => existing.id === p.id)
        );
        return [...prev, ...newProducts];
      });

      setNextCursor(result.nextCursor);
      setHasNextPage(result.hasNextPage);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, hasNextPage, loadMore };
}
