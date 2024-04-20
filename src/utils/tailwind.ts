import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Classess with a higher index overwrite classes with a lower index
 * * `cn( 'bg-red', 'bg-black' ) -> 'bg-black'`
 *
 * @param classes - Classes to merge
 * @returns Merged classes
 */
export const cn = (...classes: ClassValue[]) => {
  return twMerge(clsx(...classes));
};
