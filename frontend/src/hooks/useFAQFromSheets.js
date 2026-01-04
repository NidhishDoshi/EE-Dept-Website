import { useQuery } from "@tanstack/react-query";
import { getFAQFromSheets } from "../api/api";

const useFAQFromSheets = () => {
  return useQuery({
    queryKey: ["faq-sheets"],
    queryFn: getFAQFromSheets,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useFAQFromSheets;
