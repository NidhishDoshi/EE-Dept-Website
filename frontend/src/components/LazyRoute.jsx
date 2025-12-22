import React, { Suspense } from "react";
import PageSkeleton from "./LoadingSkeleton/PageSkeleton";

export default function LazyRoute({ element: Element }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Element />
    </Suspense>
  );
}
