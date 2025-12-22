import { useQuery } from "@tanstack/react-query";
import { getAcademicFaq } from "../api/api";

export default function useAcademicFaq() {
	return useQuery({
		queryKey: ["academicFaq"],
		queryFn: getAcademicFaq,
		staleTime: 5 * 60 * 1000,
	});
}
