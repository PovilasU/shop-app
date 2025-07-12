import { fetchCollections, Collection } from "../fetchCollections";

describe("fetchCollections", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns collections when fetch is successful", async () => {
    const mockResponse = {
      data: {
        collections: {
          edges: [
            { node: { id: "1", title: "Collection 1" } },
            { node: { id: "2", title: "Collection 2" } },
          ],
        },
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const collections: Collection[] = await fetchCollections();

    expect(collections).toEqual([
      { id: "1", title: "Collection 1" },
      { id: "2", title: "Collection 2" },
    ]);

    expect(global.fetch).toHaveBeenCalledWith("https://mock.shop/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: expect.any(String),
    });

    // Optional: check that the query contains "collections(first: 10)"
    const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    expect(body.query).toContain("collections(first: 10)");
  });

  it("throws error if no collections are returned", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: {} }),
    });

    await expect(fetchCollections()).rejects.toThrow("No collections returned");
  });
});
