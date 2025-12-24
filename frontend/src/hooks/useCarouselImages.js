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
          const fullUrl = url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
          
          return {
            id: item.documentId,
            url: fullUrl,
            heading: item.Heading,
            description: item.Description,
            button1: {
              label: item.Button1Label,
              link: item.Button1Link
            },
            button2: {
              label: item.Button2Label,
              link: item.Button2Link
            }
          };
        });
    },
    staleTime: 5 * 60 * 1000,
  });
}
