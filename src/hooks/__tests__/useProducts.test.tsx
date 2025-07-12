// src/hooks/__tests__/useProducts.test.tsx
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { useProducts, type UseProductsParams } from "../useProducts";
import * as api from "../../api/fetchProducts";


vi.mock("../../api/fetchProducts");


const mockedFetchProducts = api.fetchProducts as unknown as Mock;

describe("useProducts", () => {
  beforeEach(() => {
    mockedFetchProducts.mockReset();
  });

  it("fetches products initially", async () => {
    const mockData = {
      products: [
        { id: "1", title: "Product 1", featuredImage: { url: "url1" }, variants: { edges: [] } },
      ],
      nextCursor: "cursor1",
      hasNextPage: true,
    };
    mockedFetchProducts.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useProducts({ sort: "asc" }));

    // Initially loading is true
    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual(mockData.products);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("loads more products when loadMore is called", async () => {
    const initialData = {
      products: [{ id: "1", title: "Product 1", featuredImage: { url: "url1" }, variants: { edges: [] } }],
      nextCursor: "cursor1",
      hasNextPage: true,
    };
    const moreData = {
      products: [{ id: "2", title: "Product 2", featuredImage: { url: "url2" }, variants: { edges: [] } }],
      nextCursor: null,
      hasNextPage: false,
    };

    mockedFetchProducts.mockResolvedValueOnce(initialData);

    const { result } = renderHook(() => useProducts({ sort: "asc" }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    mockedFetchProducts.mockResolvedValueOnce(moreData);

    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.products).toHaveLength(2);
    expect(result.current.products.find((p) => p.id === "2")).toBeDefined();
    expect(result.current.hasNextPage).toBe(false);
  });

  it("handles errors during initial fetch", async () => {
    const error = new Error("Failed fetch");
    mockedFetchProducts.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useProducts({ sort: "asc" }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toEqual(error);
    expect(result.current.products).toEqual([]);
  });

  it("handles errors during loadMore", async () => {
    const initialData = {
      products: [{ id: "1", title: "Product 1", featuredImage: { url: "url1" }, variants: { edges: [] } }],
      nextCursor: "cursor1",
      hasNextPage: true,
    };
    mockedFetchProducts.mockResolvedValueOnce(initialData);

    const { result } = renderHook(() => useProducts({ sort: "asc" }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    const error = new Error("Load more failed");
    mockedFetchProducts.mockRejectedValueOnce(error);

    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.error).toEqual(error);
  });

  it("resets and refetches on collectionId or sort change", async () => {
    const data1 = {
      products: [{ id: "1", title: "Product 1", featuredImage: { url: "url1" }, variants: { edges: [] } }],
      nextCursor: "cursor1",
      hasNextPage: true,
    };
    const data2 = {
      products: [{ id: "2", title: "Product 2", featuredImage: { url: "url2" }, variants: { edges: [] } }],
      nextCursor: null,
      hasNextPage: false,
    };

    mockedFetchProducts.mockResolvedValueOnce(data1);

    // Correctly typed initialProps for the hook
    const initialProps: UseProductsParams = { collectionId: null, sort: "asc" };

    const { result, rerender } = renderHook(
      (props: UseProductsParams) => useProducts(props),
      { initialProps }
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    mockedFetchProducts.mockResolvedValueOnce(data2);

    // Rerender with new props, properly typed literals
    rerender({ collectionId: "123", sort: "desc" });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual(data2.products);
  });
});
