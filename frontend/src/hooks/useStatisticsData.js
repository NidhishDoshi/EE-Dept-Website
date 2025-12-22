import { useQuery } from "@tanstack/react-query";
import { getDepartmentStatistics } from "../api/api";

export const useStatisticsData = () => {
  return useQuery({
    queryKey: ["departmentStatistics"],
    queryFn: getDepartmentStatistics,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
