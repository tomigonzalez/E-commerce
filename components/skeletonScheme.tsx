import { Skeleton } from "./ui/skeleton";

type SkeletonSchemeProps = {
  grid: number;
};

const SkeletonScheme = ({ grid }: SkeletonSchemeProps) => {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {Array.from({ length: grid }).map((_, index) => (
        <div key={index} className="flex flex-col gap-3 mx-auto">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonScheme;
