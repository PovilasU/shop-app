export interface Collection {
  id: string;
  title: string;
}

export const fetchCollections = async (): Promise<Collection[]> => {
  const query = `
    {
      collections(first: 10) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;

  const res = await fetch("https://mock.shop/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();

  if (!json.data.collections) throw new Error("No collections returned");

  return json.data.collections.edges.map((edge: any) => edge.node);
};
