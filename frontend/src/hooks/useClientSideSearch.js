import { useQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";
import { useMemo } from "react";
import axiosInstance from "../api/axiosInstance"; // Ensure this path is correct
import searchData from "../searchData"; // Import static search data

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
    {
      key: "events",
      url: "/talk-and-events?populate=*&pagination[limit]=1000",
    },
    // Add other collections here if needed
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
  const apiData = responses.reduce((acc, curr) => {
    acc[curr.key] = curr.data;
    return acc;
  }, {});

  // Add static search data for navigation
  apiData.navigation = searchData;

  return apiData;
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

    // Helper function to configure Fuse for each collection with advanced fuzzy matching
    const performSearch = (collectionName, keys) => {
      const items = allData[collectionName];
      if (!items || items.length === 0) return;

      const fuse = new Fuse(items, {
        keys,
        threshold: 0.4, // Allow some typos
        distance: 200,
        minMatchCharLength: 2,
        ignoreLocation: true,
        findAllMatches: true,
        useExtendedSearch: true,
        includeScore: true,
        includeMatches: true,
        shouldSort: true,
      });

      const hits = fuse.search(query.trim());
      if (hits.length === 0) return;

      results[collectionName] = hits
        .map((hit) => ({
          ...hit.item,
          _searchScore: hit.score ?? 1,
          _matches: hit.matches ?? [],
        }))
        .sort((a, b) => a._searchScore - b._searchScore);
    };

    // --- CONFIGURE YOUR SEARCH FIELDS HERE ---
    // Collection Name (must match keys in fetchAllData) -> Fields to search
    performSearch("peoples", [
      { name: "attributes.Name", weight: 2 },
      { name: "attributes.Designation", weight: 1.5 },
      { name: "attributes.Role", weight: 1.5 },
      { name: "attributes.Email", weight: 1 },
      { name: "attributes.Domain", weight: 1 },
    ]);

    performSearch("news", [
      { name: "attributes.Title", weight: 2 },
      { name: "attributes.description", weight: 1 },
    ]);

    performSearch("research", [
      { name: "attributes.Name", weight: 2 },
      { name: "attributes.Type", weight: 1.5 },
      { name: "attributes.description", weight: 1 },
    ]);

    performSearch("events", [
      { name: "attributes.Title", weight: 2 },
      { name: "attributes.Speaker", weight: 1.5 },
      { name: "attributes.description", weight: 1 },
      { name: "attributes.venue", weight: 0.8 },
    ]);

    // Search static navigation data (pages, sections)
    performSearch("navigation", [
      { name: "title", weight: 2 },
      { name: "page", weight: 1.5 },
      { name: "content", weight: 1 },
    ]);

    return results;
  }, [query, allData]);

  return { data: searchResults, isLoading };
}
