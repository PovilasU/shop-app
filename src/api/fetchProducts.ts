interface FetchProductsOptions {
  afterCursor?: string;
  collectionId?: string;
  sort?: "asc" | "desc";
}

export const fetchProducts = async ({
  afterCursor,
  collectionId,
  sort = "asc",
}: FetchProductsOptions) => {
  const sortKey = "PRICE";
  const reverse = sort === "desc";

  const cursorStr = afterCursor ? `, after: "${afterCursor}"` : "";

  let query;

  if (collectionId) {
    query = `
      {
        collection(id: "${collectionId}") {
          products(first: 8${cursorStr}, sortKey: ${sortKey}, reverse: ${reverse}) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                id
                title
                featuredImage {
                  url(transform: {maxWidth: 400, maxHeight: 400})
                }
                variants(first: 1) {
                  edges {
                    node {
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
  } else {
    query = `
      {
        products(first: 8${cursorStr}, sortKey: ${sortKey}, reverse: ${reverse}) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              title
              featuredImage {
                url(transform: {maxWidth: 400, maxHeight: 400})
              }
              variants(first: 1) {
                edges {
                  node {
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
  }

  const res = await fetch("https://mock.shop/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();

  const data = collectionId
    ? json.data.collection?.products
    : json.data.products;

  if (!data) throw new Error("No products returned");

  return {
    products: data.edges.map((edge: any) => edge.node),
    nextCursor: data.pageInfo.endCursor,
    hasNextPage: data.pageInfo.hasNextPage,
  };
};
