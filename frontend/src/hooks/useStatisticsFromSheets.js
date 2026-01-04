import { useQuery } from "@tanstack/react-query";
import { getStatisticsFromSheets } from "../api/api";

const useStatisticsFromSheets = () => {
  return useQuery({
    queryKey: ["statistics-sheets"],
    queryFn: getStatisticsFromSheets,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useStatisticsFromSheets;
