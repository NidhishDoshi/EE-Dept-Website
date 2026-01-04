import { useQuery } from "@tanstack/react-query";
import { getResearchLabsFromSheets } from "../api/api";

const useResearchLabsFromSheets = () => {
  return useQuery({
    queryKey: ["research-labs-sheets"],
    queryFn: getResearchLabsFromSheets,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useResearchLabsFromSheets;
