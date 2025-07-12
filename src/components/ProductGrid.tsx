import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductCard from "./ProductCard";
import { useCollections } from "../hooks/useCollections";
import { useProducts, type Product } from "../hooks/useProducts";

export default function ProductGrid() {
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [collectionId, setCollectionId] = useState<string | null>(null);

  const { collections, loading: collectionsLoading, error: collectionsError } = useCollections();
  const { products, loading, error, hasNextPage, loadMore } = useProducts({ collectionId, sort });

  return (
    <div className="px-4 py-8">
      <div className="mb-6">
        <p className="text-gray-500 mt-1 uppercase text-[12px] lg:text-[14px] mb-1">{/* optional subtitle */}</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="font-bold text-[24px] lg:text-[40px]">Explore the Range</h1>

          <div className="flex gap-4 flex-wrap items-center">
            {/* Sorting dropdown */}
            <select
              onChange={(e) => setSort(e.target.value as "asc" | "desc")}
              className="border border-gray-300 rounded px-3 py-1"
              aria-label="Sort products"
              value={sort}
            >
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>

            {/* Collection pills with Swiper on mobile */}
            <div className="sm:hidden w-full">
              <Swiper spaceBetween={8} slidesPerView="auto" freeMode={true}>
                <SwiperSlide style={{ width: "auto" }}>
                  <button
                    onClick={() => setCollectionId(null)}
                    className={`px-4 py-1 rounded-full border ${
                      collectionId === null
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300"
                    }`}
                  >
                    All Collections
                  </button>
                </SwiperSlide>
                {collections.map((col) => (
                  <SwiperSlide key={col.id} style={{ width: "auto" }}>
                    <button
                      onClick={() => setCollectionId(col.id)}
                      className={`px-4 py-1 rounded-full border ${
                        collectionId === col.id
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-gray-300"
                      }`}
                    >
                      {col.title}
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Pills for desktop */}
            <div className="hidden sm:flex flex-wrap gap-2">
              <button
                onClick={() => setCollectionId(null)}
                className={`px-4 py-1 rounded-full border ${
                  collectionId === null
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300"
                }`}
              >
                All Collections
              </button>
              {collections.map((col) => (
                <button
                  key={col.id}
                  onClick={() => setCollectionId(col.id)}
                  className={`px-4 py-1 rounded-full border ${
                    collectionId === col.id
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300"
                  }`}
                >
                  {col.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Loading & error handling */}
      {loading && products.length === 0 && (
        <div className="text-center py-8 text-gray-600">Loading products...</div>
      )}

      {error && (
        <div className="text-center py-8 text-red-600">
          Error loading products: {error.message}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-8 text-gray-600">No products found.</div>
      )}

      {/* Products grid */}
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

      {/* Load More button */}
      {hasNextPage && !loading && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="text-black text-[13px] font-bold rounded-full px-6 py-2 hover:bg-gray-100 transition disabled:opacity-50"
            style={{ border: "2px solid #CCCCCC" }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
