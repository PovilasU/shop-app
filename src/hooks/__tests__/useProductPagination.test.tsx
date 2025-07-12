// src/hooks/__tests__/useProductPagination.test.tsx
import { renderHook, act, waitFor } from "@testing-library/react";
import { useProductPagination } from "../useProductPagination";
import * as api from "../../api/fetchProducts";

vi.mock("../../api/fetchProducts");

import { vi, type Mock } from "vitest";

// Then use:
(vi.fn() as Mock)

const mockProducts = [
  {
    id: "1",
    title: "Product 1",
    featuredImage: { url: "url1" },
    variants: {
      edges: [
        { node: { price: { amount: "10.00", currencyCode: "USD" } } },
      ],
    },
  },
  {
    id: "2",
    title: "Product 2",
    featuredImage: { url: "url2" },
    variants: {
      edges: [
        { node: { price: { amount: "20.00", currencyCode: "USD" } } },
      ],
    },
  },
];

describe("useProductPagination", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should fetch products on mount", async () => {
    (api.fetchProducts as Mock).mockResolvedValue({
      products: mockProducts,
      nextCursor: "cursor123",
      hasNextPage: true,
    });

    const { result } = renderHook(() => useProductPagination());

    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.hasNextPage).toBe(true);
  });

  it("should load more products when loadMore is called", async () => {
    (api.fetchProducts as Mock)
      .mockResolvedValueOnce({
        products: mockProducts,
        nextCursor: "cursor123",
        hasNextPage: true,
      })
      .mockResolvedValueOnce({
        products: [
          {
            id: "3",
            title: "Product 3",
            featuredImage: { url: "url3" },
            variants: {
              edges: [
                { node: { price: { amount: "30.00", currencyCode: "USD" } } },
              ],
            },
          },
        ],
        nextCursor: null,
        hasNextPage: false,
      });

    const { result } = renderHook(() => useProductPagination());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.loadMore();
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products.length).toBe(3);
    expect(result.current.hasNextPage).toBe(false);
  });

  it("should handle fetch error gracefully", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    (api.fetchProducts as Mock).mockRejectedValue(new Error("Failed fetch"));

    const { result } = renderHook(() => useProductPagination());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual([]);
    expect(result.current.hasNextPage).toBe(true); // still true as default
    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to fetch products:",
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
