import { useDepartmentStatistics } from "./useDepartmentStatistics";

export function usePlacementStatistics() {
  // Placement stats are part of department statistics
  const { data, ...rest } = useDepartmentStatistics();
  return { data, ...rest };
}
