import * as React from 'react';
import { cn } from '@utils/tailwind';

const NextJSIcon = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & { className?: string }
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className={cn('size-6 fill-black dark:fill-white', className)}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z" />
    </svg>
  </div>
));
NextJSIcon.displayName = 'NextJSIcon';

const VercelIcon = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & { className?: string }
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className={cn('size-6 fill-black dark:fill-white', className)}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 528 528">
      <path fillRule="evenodd" d="M256,48,496,464H16Z" />
    </svg>
  </div>
));
VercelIcon.displayName = 'VercelIcon';

const RadixUIIcon = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & { className?: string }
>(({ className, ...props }, ref) => (
  <div ref={ref} {...props} className="size-6 fill-black dark:fill-white">
    <svg
      className="size-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 25"
    >
      <path
        d="M12 25a8 8 0 1 1 0-16v16zM12 0H4v8h8V0zM17 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
        fill="currentcolor"
      />
    </svg>
  </div>
));
RadixUIIcon.displayName = 'RadixUIIcon';

const ShadcnUIIcon = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & { className?: string }
>(({ className, ...props }, ref) => (
  <div ref={ref} {...props} className="size-6">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="none"></rect>
      <line
        x1="208"
        y1="128"
        x2="128"
        y2="208"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
      <line
        x1="192"
        y1="40"
        x2="40"
        y2="192"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></line>
    </svg>
  </div>
));
ShadcnUIIcon.displayName = 'ShadcnUIIcon';

const TailwindCSSIcon = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & { className?: string }
>(({ className, ...props }, ref) => (
  <div ref={ref} {...props} className={cn('size-6', className)}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <path
        d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0"
        fill="#38b2ac"
      />
    </svg>
  </div>
));
TailwindCSSIcon.displayName = 'TailwindCSSIcon';

export { NextJSIcon, VercelIcon, RadixUIIcon, ShadcnUIIcon, TailwindCSSIcon };
