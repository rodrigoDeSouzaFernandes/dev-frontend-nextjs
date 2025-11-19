import { Skeleton } from "../ui/skeleton";

export default function EditProductDialogSkeleton({}) {
  return (
    <>
      <Skeleton className="h-8 w-1/3 rounded" />
      <Skeleton className="h-8 w-full rounded" />
      <Skeleton className="h-8 w-full rounded" />
      <Skeleton className="h-8 w-full rounded" />
      <Skeleton className="h-32 w-full rounded" />
      <Skeleton className="h-32 w-full rounded" />
      <div className="flex justify-end space-x-2">
        <Skeleton className="h-10 w-20 rounded" />
        <Skeleton className="h-10 w-20 rounded" />
        <Skeleton className="h-10 w-28 rounded" />
      </div>
    </>
  );
}
