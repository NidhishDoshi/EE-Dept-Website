import { useQuery } from "@tanstack/react-query";
import { getAboutPageDataFromSheets } from "../api/api";

export default function useAboutDataFromSheets() {
	return useQuery({
		queryKey: ["about-sheets"],
		queryFn: getAboutPageDataFromSheets,
		staleTime: 5 * 60 * 1000,
	});
}
