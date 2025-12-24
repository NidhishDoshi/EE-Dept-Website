import { useQuery } from "@tanstack/react-query";
import { getGalleryImages } from "../api/api";
import { constant } from "../constant/constant";

const STRAPI_ROOT = constant.baseURL.replace("/api", "");

export default function useGalleryImages() {
  return useQuery({
    queryKey: ["GalleryImages"],
    queryFn: async () => {
      const data = await getGalleryImages();

      return data
        .filter((item) => item.Image && item.Image.url)
        .map((item) => {
          const url = item.Image.url;
          return {
            // If URL is relative, prepend Strapi base URL
            url: url.startsWith("http") ? url : `${STRAPI_ROOT}${url}`,
            description: item.Description || "No description available",
          };
        });
    },
    staleTime: 5 * 60 * 1000,
  });
}
