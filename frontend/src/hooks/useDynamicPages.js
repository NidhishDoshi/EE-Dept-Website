import { useQuery } from "@tanstack/react-query";
import { getDynamicPages, getDynamicPageBySlug } from "../api/api";

/**
 * Hook to fetch list of all available dynamic pages
 */
export const useDynamicPages = () => {
  return useQuery({
    queryKey: ["dynamicPages"],
    queryFn: getDynamicPages,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    cacheTime: 10 * 60 * 1000,
  });
};

/**
 * Hook to fetch content for a specific dynamic page by slug
 */
export const useDynamicPageContent = (slug) => {
  return useQuery({
    queryKey: ["dynamicPage", slug],
    queryFn: () => getDynamicPageBySlug(slug),
    enabled: !!slug, // Only run if slug is provided
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};
