import { useQuery } from "@tanstack/react-query";
import { getPeopleFromSheets } from "../api/api";

export default function usePeopleFromSheets() {
	return useQuery({
		queryKey: ["people-sheets"],
		queryFn: getPeopleFromSheets,
		staleTime: 5 * 60 * 1000,
	});
}
