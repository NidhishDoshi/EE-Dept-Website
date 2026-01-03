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
        threshold: 0.4,
        distance: 100,
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

      const queryLower = query.trim().toLowerCase();
      const queryWords = queryLower.split(/\s+/);
      
      results[collectionName] = hits
        .map((hit) => {
          const item = hit.item;
          let bestScore = hit.score ?? 1;
          let bestMatchType = 'fuzzy';
          let matchedFieldWeight = 1;
          let matchPosition = Infinity;
          let matchedFieldName = '';
          
          // Evaluate each searchable field
          keys.forEach(keyConfig => {
            const keyName = keyConfig.name || keyConfig;
            const fieldWeight = keyConfig.weight || 1;
            const keyParts = keyName.split('.');
            let value = item;
            
            // Navigate nested properties
            for (const part of keyParts) {
              value = value?.[part];
            }
            
            if (value && typeof value === 'string') {
              const valueLower = value.toLowerCase();
              const valueWords = valueLower.split(/\s+/);
              
              // 1. Exact field match (score: 0.0001)
              if (valueLower === queryLower) {
                const score = 0.0001 / fieldWeight;
                if (score < bestScore) {
                  bestScore = score;
                  bestMatchType = 'exact';
                  matchedFieldWeight = fieldWeight;
                  matchPosition = 0;
                  matchedFieldName = keyName;
                }
              }
              // 2. Exact word match (score: 0.001)
              else if (valueWords.includes(queryLower)) {
                const score = 0.001 / fieldWeight;
                const pos = valueLower.indexOf(queryLower);
                if (score < bestScore || (score === bestScore && pos < matchPosition)) {
                  bestScore = score;
                  bestMatchType = 'word_exact';
                  matchedFieldWeight = fieldWeight;
                  matchPosition = pos;
                  matchedFieldName = keyName;
                }
              }
              // 3. Starts with query (score: 0.01)
              else if (valueLower.startsWith(queryLower)) {
                const score = 0.01 / fieldWeight;
                if (score < bestScore) {
                  bestScore = score;
                  bestMatchType = 'startswith';
                  matchedFieldWeight = fieldWeight;
                  matchPosition = 0;
                  matchedFieldName = keyName;
                }
              }
              // 4. Word starts with query (score: 0.02)
              else if (valueWords.some(word => word.startsWith(queryLower))) {
                const score = 0.02 / fieldWeight;
                const pos = valueLower.indexOf(queryLower);
                if (score < bestScore || (score === bestScore && pos < matchPosition)) {
                  bestScore = score;
                  bestMatchType = 'word_startswith';
                  matchedFieldWeight = fieldWeight;
                  matchPosition = pos;
                  matchedFieldName = keyName;
                }
              }
              // 5. Contains query (score: 0.05)
              else if (valueLower.includes(queryLower)) {
                const pos = valueLower.indexOf(queryLower);
                const score = (0.05 + (pos / value.length) * 0.05) / fieldWeight;
                if (score < bestScore || (score === bestScore && pos < matchPosition)) {
                  bestScore = score;
                  bestMatchType = 'contains';
                  matchedFieldWeight = fieldWeight;
                  matchPosition = pos;
                  matchedFieldName = keyName;
                }
              }
              // 6. Multi-word match (all query words present)
              else if (queryWords.length > 1 && queryWords.every(qw => valueLower.includes(qw))) {
                const score = 0.08 / fieldWeight;
                if (score < bestScore) {
                  bestScore = score;
                  bestMatchType = 'multiword';
                  matchedFieldWeight = fieldWeight;
                  matchPosition = valueLower.indexOf(queryWords[0]);
                  matchedFieldName = keyName;
                }
              }
            }
          });
          
          // Use fuzzy score if no better match found, adjusted by best field weight
          if (bestMatchType === 'fuzzy') {
            bestScore = (hit.score ?? 1) / matchedFieldWeight;
          }
          
          return {
            ...item,
            _searchScore: bestScore,
            _matches: hit.matches ?? [],
            _matchType: bestMatchType,
            _matchPosition: matchPosition,
            _matchedFieldName: matchedFieldName,
            _fieldWeight: matchedFieldWeight,
          };
        })
        .sort((a, b) => {
          // Primary: Sort by score (lower is better)
          if (Math.abs(a._searchScore - b._searchScore) > 0.00001) {
            return a._searchScore - b._searchScore;
          }
          // Secondary: Sort by match type priority
          const typePriority = { 
            exact: 0, 
            word_exact: 1, 
            startswith: 2, 
            word_startswith: 3, 
            contains: 4, 
            multiword: 5, 
            fuzzy: 6 
          };
          const typeComp = (typePriority[a._matchType] || 6) - (typePriority[b._matchType] || 6);
          if (typeComp !== 0) return typeComp;
          
          // Tertiary: Sort by field weight (higher weight = better match)
          if (a._fieldWeight !== b._fieldWeight) {
            return b._fieldWeight - a._fieldWeight;
          }
          
          // Quaternary: Sort by match position (earlier is better)
          return (a._matchPosition || 0) - (b._matchPosition || 0);
        });
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
