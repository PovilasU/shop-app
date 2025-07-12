// src/api/__tests__/fetchProducts.test.ts
import { describe, it, expect, beforeEach, afterEach, vi, type Mock } from "vitest";
import { fetchProducts } from "../fetchProducts";

describe("fetchProducts", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("fetches products for a given collectionId", async () => {
    const mockResponse = {
      data: {
        collection: {
          products: {
            pageInfo: {
              hasNextPage: true,
              endCursor: "cursor123",
            },
            edges: [
              {
                node: {
                  id: "prod1",
                  title: "Product 1",
                  featuredImage: { url: "http://image1.jpg" },
                  variants: {
                    edges: [
                      {
                        node: {
                          price: {
                            amount: "10.00",
                            currencyCode: "USD",
                          },
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      },
    };

    (global.fetch as unknown as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchProducts({
      collectionId: "collection123",
      sort: "desc",
      afterCursor: "abc",
    });

    expect(result).toEqual({
      products: [
        {
          id: "prod1",
          title: "Product 1",
          featuredImage: { url: "http://image1.jpg" },
          variants: {
            edges: [
              {
                node: {
                  price: {
                    amount: "10.00",
                    currencyCode: "USD",
                  },
                },
              },
            ],
          },
        },
      ],
      nextCursor: "cursor123",
      hasNextPage: true,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://mock.shop/api",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: expect.any(String),
      })
    );

    const fetchCall = (global.fetch as unknown as Mock).mock.calls[0];
    const fetchOptions = fetchCall[1];
    const body = JSON.parse(fetchOptions.body);
    expect(body.query).toContain('collection(id: "collection123")');
  });

  it("fetches products without collectionId", async () => {
    const mockResponse = {
      data: {
        products: {
          pageInfo: {
            hasNextPage: false,
            endCursor: "cursor456",
          },
          edges: [
            {
              node: {
                id: "prod2",
                title: "Product 2",
                featuredImage: { url: "http://image2.jpg" },
                variants: {
                  edges: [
                    {
                      node: {
                        price: {
                          amount: "20.00",
                          currencyCode: "USD",
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    };

    (global.fetch as unknown as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchProducts({
      sort: "asc",
    });

    expect(result).toEqual({
      products: [
        {
          id: "prod2",
          title: "Product 2",
          featuredImage: { url: "http://image2.jpg" },
          variants: {
            edges: [
              {
                node: {
                  price: {
                    amount: "20.00",
                    currencyCode: "USD",
                  },
                },
              },
            ],
          },
        },
      ],
      nextCursor: "cursor456",
      hasNextPage: false,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://mock.shop/api",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: expect.any(String),
      })
    );

    const fetchCall = (global.fetch as unknown as Mock).mock.calls[0];
    const fetchOptions = fetchCall[1];
    const body = JSON.parse(fetchOptions.body);
    expect(body.query).toContain("products");
  });
});
