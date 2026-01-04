import { useQuery } from "@tanstack/react-query";
import { getResearchProjectsFromSheets } from "../api/api";

const useResearchProjectsFromSheets = () => {
  return useQuery({
    queryKey: ["research-projects-sheets"],
    queryFn: getResearchProjectsFromSheets,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useResearchProjectsFromSheets;
