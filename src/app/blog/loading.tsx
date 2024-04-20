'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';

import { SearchUISkeleton } from '@components/search';
import { CardSkeleton } from '@components/searchcards';

const FullPageSkeleton = () => {
  const params = useSearchParams();
  return (
    <div
      className="mb-4 mt-16 flex min-h-screen min-w-full max-w-full flex-col items-center"
      style={{ minHeight: 'calc(100vh - 64px)' }}
    >
      <SearchUISkeleton
        query={params?.get('query') || ''}
        placeholder="Search blogs"
      />

      <div className="flex w-4/5 flex-wrap justify-center gap-2 max-sm:w-[97.5%]">
        <CardSkeleton cardCount={4} />
      </div>
    </div>
  );
};
export default FullPageSkeleton;
