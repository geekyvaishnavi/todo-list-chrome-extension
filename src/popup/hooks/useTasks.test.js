import { renderHook } from "@testing-library/react";
import { useTasks } from "./useTasks";

test("should initialize with empty tasks", () => {
  const { result } = renderHook(() => useTasks());
  expect(result.current.tasks).toEqual([]);
});