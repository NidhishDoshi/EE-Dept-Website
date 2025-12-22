import { useQuery } from "@tanstack/react-query";
import { getGalleryImages } from "../api/api";

const STRAPI_URL = "http://localhost:1337";

export default function useGalleryImages() {
  return useQuery({
    queryKey: ["GalleryImages"],
    queryFn: async () => {
      const data = await getGalleryImages();

      // return data.map((item) => ({
      //   url: item.Image?.url,
      //   description: item.description || "No description available",
      // }));
      return data
        .filter((item) => item.Image && item.Image.url)
        .map((item) => {
          const url = item.Image.url;
          return {
            // If URL is relative, prepend Strapi base URL
            url: url.startsWith("http") ? url : `${STRAPI_URL}${url}`,
            description: item.Description || "No description available",
          };
        });
    },
    staleTime: 5 * 60 * 1000,
  });
}
