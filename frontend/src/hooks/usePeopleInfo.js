import { useQuery } from "@tanstack/react-query";
import { getPeopleInfo } from "../api/api";

export default function usePeopleInfo() {
	return useQuery({
		queryKey: ["people-info"],
		queryFn: getPeopleInfo,
		staleTime: 5 * 60 * 1000,
	});
}
