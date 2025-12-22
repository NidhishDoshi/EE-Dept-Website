import { useQuery } from "@tanstack/react-query";
import { getDepartmentStatistics } from "../api/api";

export function useDepartmentStatistics() {
  return useQuery({
    queryKey: ["departmentStatistics"],
    queryFn: async () => {
      const response = await getDepartmentStatistics();
      return response || null;
    },
  });
}
