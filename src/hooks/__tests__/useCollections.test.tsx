// src/hooks/__tests__/useCollections.test.tsx
import { renderHook } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useCollections } from "../useCollections";
import * as api from "../../api/fetchCollections";

describe("useCollections", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should fetch collections successfully", async () => {
    const mockCollections = [
      { id: "1", title: "Collection 1" },
      { id: "2", title: "Collection 2" },
    ];
    vi.spyOn(api, "fetchCollections").mockResolvedValue(mockCollections);

    const { result } = renderHook(() => useCollections());

    // Initially loading is true
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.collections).toEqual([]);

    // Wait until loading becomes false
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.collections).toEqual(mockCollections);
  });

  it("should handle error when fetching collections fails", async () => {
    const error = new Error("Failed to fetch");
    vi.spyOn(api, "fetchCollections").mockRejectedValue(error);

    const { result } = renderHook(() => useCollections());

    // Initially loading is true
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toEqual(error);
    expect(result.current.collections).toEqual([]);
  });
});
