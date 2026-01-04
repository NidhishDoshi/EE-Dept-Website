import { useQuery } from "@tanstack/react-query";
import { getGalleryFromSheets } from "../api/api";

const useGalleryFromSheets = () => {
  return useQuery({
    queryKey: ["gallery-sheets"],
    queryFn: async () => {
      const data = await getGalleryFromSheets();

      return data
        .filter((item) => item.Image && item.Image.url)
        .map((item) => ({
          url: item.Image.url,
          description: item.Description || "No description available",
        }));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useGalleryFromSheets;
