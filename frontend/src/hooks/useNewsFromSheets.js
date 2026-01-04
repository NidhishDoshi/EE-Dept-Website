import { useQuery } from "@tanstack/react-query";
import { getNewsFromSheets } from "../api/api";

export default function useNewsFromSheets() {
	return useQuery({
		queryKey: ["news-sheets"],
		queryFn: getNewsFromSheets,
		staleTime: 5 * 60 * 1000,
	});
}
