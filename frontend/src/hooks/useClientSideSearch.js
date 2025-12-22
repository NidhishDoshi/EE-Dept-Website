import { useQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";
import { useMemo } from "react";
import axiosInstance from "../api/axiosInstance"; // Ensure this path is correct

// 1. DATA FETCHER
// Fetches all data from your collections at once.
// pagination[limit]=1000 ensures we grab everything for the search index.
const fetchAllData = async () => {
  const endpoints = [
    { key: "peoples", url: "/people?populate=*&pagination[limit]=1000" },
    { key: "news", url: "/news?populate=*&pagination[limit]=1000" },
    {
      key: "research",
      url: "/research-labs?populate=*&pagination[limit]=1000",
    },
    // Add other collections here if needed (e.g., /events, /recruiters)
  ];

  // Run all requests in parallel
  const responses = await Promise.all(
    endpoints.map(async (ep) => {
      try {
        const res = await axiosInstance.get(ep.url);
        return {
          key: ep.key,
          data: res.data?.data || [],
        };
      } catch (err) {
        console.warn(`Search fetch failed for ${ep.key}`, err);
        return { key: ep.key, data: [] };
      }
    })
  );

  // Transform array into a single object: { peoples: [...], news: [...] }
  return responses.reduce((acc, curr) => {
    acc[curr.key] = curr.data;
    return acc;
  }, {});
};

export default function useClientSideSearch(query) {
  // 2. QUERY: Fetch & Cache Data
  // We cache this for 1 hour (staleTime) so it doesn't hit the API on every keystroke
  const { data: allData, isLoading } = useQuery({
    queryKey: ["globalSearchData"],
    queryFn: fetchAllData,
    staleTime: 60 * 60 * 1000, // 1 hour cache
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // 3. SEARCH LOGIC (Fuse.js)
  // useMemo ensures we only re-run the search when 'query' or 'allData' changes
  const searchResults = useMemo(() => {
    if (!query || !query.trim() || !allData) return null;

    const results = {};

    // Helper function to configure Fuse for each collection
    const performSearch = (collectionName, keys) => {
      const items = allData[collectionName];
      if (!items || items.length === 0) return;

      const fuse = new Fuse(items, {
        keys: keys, // Which fields to search (e.g., Name, Title)
        threshold: 0.3, // 0.0=Perfect Match, 1.0=Match Anything. 0.3 is good for typos.
        distance: 100, // How close the match needs to be
        minMatchCharLength: 2,
      });

      const hits = fuse.search(query);

      if (hits.length > 0) {
        // Un-nest the data so the UI gets a clean object
        results[collectionName] = hits.map((hit) => {
          const item = hit.item;
          const attrs = item.attributes || item; // Handle Strapi structure

          return {
            id: item.id,
            ...attrs,
            // Create a consistent 'slug' or identifier for navigation
            slug: attrs.slug || attrs.Slug || item.id,
          };
        });
      }
    };

    // --- CONFIGURE YOUR SEARCH FIELDS HERE ---
    // Collection Name (must match keys in fetchAllData) -> Fields to search
    performSearch("peoples", [
      "attributes.Name",
      "attributes.Designation",
      "attributes.Role",
    ]);
    performSearch("news", ["attributes.Title", "attributes.Description"]);
    performSearch("research", ["attributes.Name", "attributes.Type"]);

    return results;
  }, [query, allData]);

  return { data: searchResults, isLoading };
}
