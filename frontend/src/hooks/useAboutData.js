import { useQuery } from "@tanstack/react-query";
import { getAboutPageData } from "../api/api";

export default function useAboutData() {
	return useQuery({
		queryKey: ["about"],
		queryFn: getAboutPageData,
		staleTime: 5 * 60 * 1000,
	});
}
