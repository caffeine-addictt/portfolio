'use client';

import * as React from 'react';
import { Button, InternalLink } from '@components/ui/button';
import { TooltipWrapper } from '@components/ui/tooltip';

import { ArrowTopRightIcon } from '@radix-ui/react-icons';

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <>
      <div className="mt-16 flex min-h-screen min-w-full max-w-full flex-col items-center justify-center pb-16">
        <h1 className="mb-8 text-5xl font-bold">
          Looks like something went wrong!
        </h1>

        <div className="flex flex-row gap-2 max-sm:flex-wrap">
          <TooltipWrapper text="Go back home!" asChild>
            <InternalLink href="/">Go back home</InternalLink>
          </TooltipWrapper>
          <TooltipWrapper text="Try again!" asChild>
            <Button onClick={() => reset()}>Try again?</Button>
          </TooltipWrapper>
        </div>
      </div>

      {/* Report */}
      <div className="absolute bottom-0 right-0 mb-8 flex h-fit w-fit flex-col items-center gap-4 sm:mr-[2.5%]">
        <TooltipWrapper text="Report an issue!" asChild>
          <InternalLink variant="outline" href="/contact">
            Report an issue
            <ArrowTopRightIcon className="ml-2" />
          </InternalLink>
        </TooltipWrapper>
      </div>
    </>
  );
};
export default ErrorPage;
