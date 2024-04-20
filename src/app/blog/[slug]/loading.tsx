'use client';

import * as React from 'react';
import { Skeleton } from '@components/ui/skeleton';
import { Separator } from '@components/ui/separator';

const FullPageSkeleton = () => (
  <div
    className="mt-16 flex min-h-screen min-w-full max-w-full flex-col items-center"
    style={{ minHeight: 'calc(100vh - 64px)' }}
  >
    <div className="mt-8 flex w-4/5 flex-col items-center max-sm:w-[97.5%]">
      {/* Header */}
      <div className="mx-auto flex w-fit flex-col items-center gap-4 sm:w-1/2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-12 w-60" />
      </div>

      {/* Time */}
      <Skeleton className="mt-3 h-6 w-40" />

      {/* Separator */}
      <Separator className="my-4 w-[30%]" />

      {/* Technology stack */}
      <div className="mb-4 flex w-fit flex-wrap gap-2">
        <Separator className="size-10 overflow-hidden rounded-md" />
        <Separator className="size-10 overflow-hidden rounded" />
      </div>

      {/* Short description */}
      <Skeleton className="h-7 w-20" />

      {/* Image */}
      <div className="mt-8 flex aspect-video h-96 max-h-96 w-auto items-center overflow-hidden rounded-lg border">
        <Skeleton className="h-96 w-screen" />
      </div>

      {/* Content */}
      <div className="mb-8 mt-12 flex w-4/5 flex-col items-center gap-1 max-sm:w-[97.5%]">
        <Skeleton className="h-5 w-64" />
        <Skeleton className="h-5 w-72" />
        <Skeleton className="h-5 w-60" />
        <Skeleton className="h-5 w-72" />
        <Skeleton className="h-5 w-80" />
        <Skeleton className="h-5 w-80" />
        <Skeleton className="h-5 w-96" />
      </div>
    </div>
  </div>
);
export default FullPageSkeleton;
