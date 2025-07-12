import { useEffect, useState } from "react";
import { fetchCollections, type Collection } from "../api/fetchCollections";

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCollections = async () => {
      setLoading(true);
      try {
        const data = await fetchCollections();
        setCollections(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadCollections();
  }, []);

  return { collections, loading, error };
}
