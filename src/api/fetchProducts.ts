export const fetchProducts = async (afterCursor?: string) => {
  const query = `
    {
      products(first: 8${afterCursor ? `, after: "${afterCursor}"` : ''}) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            featuredImage {
              url
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

  const res = await fetch('https://mock.shop/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  const data = json.data.products;

  return {
    products: data.edges.map((edge: any) => edge.node),
    nextCursor: data.pageInfo.endCursor,
    hasNextPage: data.pageInfo.hasNextPage,
  };
};
