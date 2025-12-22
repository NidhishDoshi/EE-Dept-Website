import { useQuery } from "@tanstack/react-query";
import { getCarouselImages } from "../api/api";

const STRAPI_URL = "http://localhost:1337";

export default function useCarouselImages() {
  return useQuery({
    queryKey: ["carouselImages"],
    queryFn: async () => {
      const data = await getCarouselImages();
      // return data.map((item) => item.Image.url);
      return data
        .filter((item) => item.Image && item.Image.url)
        .map((item) => {
          const url = item.Image.url;
          // If URL is relative, prepend Strapi base URL
          return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
        });
    },
    staleTime: 5 * 60 * 1000,
  });
}
