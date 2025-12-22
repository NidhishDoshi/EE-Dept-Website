import { useQuery } from "@tanstack/react-query";
import { getResearchProjectsData } from "../api/api";

export default function useResearchProjectsData() {
	return useQuery({
		queryKey: ["researchProjectsData"],
		queryFn: getResearchProjectsData,
		staleTime: 5 * 60 * 1000,
	});
}
