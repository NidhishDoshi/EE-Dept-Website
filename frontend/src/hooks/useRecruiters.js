import { useQuery } from "@tanstack/react-query";
import { getRecruiters } from "../api/api";

export function useRecruiters() {
  return useQuery({
    queryKey: ["recruiters"],
    queryFn: async () => {
      const data = await getRecruiters();
      return data || [];
    },
  });
}
