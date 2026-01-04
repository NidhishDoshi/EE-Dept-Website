import { useQuery } from "@tanstack/react-query";
import { getTalksAndEventsFromSheets } from "../api/api";

const useTalksAndEventsFromSheets = () => {
  return useQuery({
    queryKey: ["talks-events-sheets"],
    queryFn: getTalksAndEventsFromSheets,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useTalksAndEventsFromSheets;
