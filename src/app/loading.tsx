'use client';

import * as React from 'react';
import { SymbolIcon } from '@radix-ui/react-icons';

const LoadingPage = () => (
  <div
    className="mt-16 flex min-h-screen min-w-full max-w-full flex-col items-center justify-center"
    style={{ minHeight: 'calc(100vh - 64px)' }}
  >
    <SymbolIcon className="size-10 animate-spin transition-transform before:rotate-0 after:rotate-180" />
  </div>
);
export default LoadingPage;
