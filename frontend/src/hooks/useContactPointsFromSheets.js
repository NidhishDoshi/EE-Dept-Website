import { useQuery } from "@tanstack/react-query";
import { getContactPointsFromSheets } from "../api/api";

const useContactPointsFromSheets = () => {
  return useQuery({
    queryKey: ["contact-points-sheets"],
    queryFn: getContactPointsFromSheets,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useContactPointsFromSheets;
