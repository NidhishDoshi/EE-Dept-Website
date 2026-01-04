import { useQuery } from "@tanstack/react-query";
import { getCarouselFromSheets } from "../api/api";

export default function useCarouselFromSheets() {
  return useQuery({
    queryKey: ["carousel-sheets"],
    queryFn: async () => {
      const data = await getCarouselFromSheets();
      
      return data
        .filter((item) => item.Image && item.Image.url)
        .map((item) => ({
          id: item.documentId,
          url: item.Image.url,
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
        }));
    },
    staleTime: 5 * 60 * 1000,
  });
}
