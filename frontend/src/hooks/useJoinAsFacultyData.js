import { useQuery } from "@tanstack/react-query";
import { getJoinAsFacultyData } from "../api/api";

export default function useJoinAsFacultyData() {
	return useQuery({
		queryKey: ["join-as-faculty-data"],
		queryFn: getJoinAsFacultyData,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}