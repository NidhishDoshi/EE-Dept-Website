import { useQuery } from "@tanstack/react-query";
import { getAcademicRules } from "../api/api";

export default function useAcademicRules() {
	return useQuery({
		queryKey: ["academicRules"],
		queryFn: getAcademicRules,
		staleTime: 5 * 60 * 1000,
	});
}
