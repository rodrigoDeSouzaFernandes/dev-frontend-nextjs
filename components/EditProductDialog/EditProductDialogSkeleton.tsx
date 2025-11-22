import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function EditProductDialogSkeleton(): React.ReactElement {
  return (
    <>
      <Skeleton data-testid="skeleton" className="h-8 w-1/3 rounded" />
      <Skeleton data-testid="skeleton" className="h-8 w-full rounded" />
      <Skeleton data-testid="skeleton" className="h-8 w-full rounded" />
      <Skeleton data-testid="skeleton" className="h-8 w-full rounded" />
      <Skeleton data-testid="skeleton" className="h-32 w-full rounded" />
      <Skeleton data-testid="skeleton" className="h-32 w-full rounded" />
      <div className="flex justify-end space-x-2">
        <Skeleton data-testid="skeleton" className="h-10 w-20 rounded" />
        <Skeleton data-testid="skeleton" className="h-10 w-20 rounded" />
        <Skeleton data-testid="skeleton" className="h-10 w-28 rounded" />
      </div>
    </>
  );
}
