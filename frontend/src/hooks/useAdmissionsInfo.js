import { useQuery } from "@tanstack/react-query";
import { getAdmissionsInfo } from "../api/api";

export default function useAdmissionsInfo() {
	return useQuery({
		queryKey: ["admissionInfo"],
		queryFn: getAdmissionsInfo,
		staleTime: 5 * 60 * 1000,
	});
}
