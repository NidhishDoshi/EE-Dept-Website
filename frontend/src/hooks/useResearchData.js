import { useQuery } from "@tanstack/react-query";
import { getResearchData } from "../api/api";

export default function useResearchData() {
	return useQuery({
		queryKey: ["researchData"],
		queryFn: getResearchData,
		staleTime: 5 * 60 * 1000,
	});
}
