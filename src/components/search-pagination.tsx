'use client';

import { usePathname } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

export interface SearchPaginationProps extends React.ComponentProps<'nav'> {
  searchParams?: Record<string, unknown>;
  currentPage: number;
  totalPages: number;
  className?: string;
}
const SearchPagination = ({
  currentPage,
  totalPages,
  searchParams,
  className,
  ...props
}: SearchPaginationProps) => {
  const pathname = usePathname();

  // To redirect to new page
  const getNewPageURL = (i: number): string => {
    const newSearchParams = new URLSearchParams(searchParams as any);
    newSearchParams.set('page', i.toString());
    return `${pathname}?${newSearchParams.toString()}`;
  };

  const pageOrder: string[] = [];

  // Page number logic
  if (currentPage > totalPages) {
    // Render x(max-2) x(max-1) x(max) i if currentPage == total + 1
    // Render x(max-1) x(max) ... i if currentPage > total + 1
    const includeElipsis = currentPage - 1 !== totalPages;
    for (let i = totalPages - (includeElipsis ? 3 : 2); i <= totalPages; i++)
      if (i > 0) pageOrder.push(`${i}`);
    if (includeElipsis) pageOrder.push('...');
    pageOrder.push(`${currentPage}`);
  } else if (currentPage < totalPages) {
    // Render i x(min) x(min+1) x(min+2) if currentPage == 0
    // Render i ... x(min+1) x(min+2) if currentPage > 0
    const includeElipsis = currentPage !== 0;
    pageOrder.push(`${currentPage}`);
    if (includeElipsis) pageOrder.push('...');
    for (
      let i = 0;
      i < Math.max(1, Math.min(3, totalPages) - Number(includeElipsis));
      i++
    )
      pageOrder.push(`${i + 1}`);
  } else if (currentPage === 1 || currentPage < 3) {
    // Render i x(min) x(min+1) ... if totalPages > 3 + 1 or within 2
    // Render i x(min) x(min+1) x(min+2) if totalPages == 3 + 1 or within 2
    const includeElipsis = totalPages > 4;
    for (
      let i = 0;
      i < Math.max(1, Math.min(3, totalPages) - Number(includeElipsis));
      i++
    )
      pageOrder.push(`${i + 1}`);
    if (includeElipsis) pageOrder.push('...');
  } else if (currentPage === totalPages || currentPage > totalPages - 2) {
    // Render ... x(max-1) x(max-2) i if totalPages > 3 + 1 or within 2
    // Render x(max-2) x(max-1) x(max) i if totalPages == 3 + 1 or within 2
    const includeElipsis = totalPages > 4;
    if (includeElipsis) pageOrder.push('...');
    for (let i = totalPages - (includeElipsis ? 3 : 2); i <= totalPages; i++)
      if (i > 0) pageOrder.push(`${i}`);
    pageOrder.push(`${currentPage}`);
  } else {
    // Default
    // Render x(i-1) i x(i+1) ... if x(min) i is closer to x(min)
    pageOrder.push(
      `${currentPage - 1}`,
      `${currentPage}`,
      `${currentPage + 1}`,
      '...',
    );
  }

  const prevUrl =
    currentPage > 1 ? getNewPageURL(Math.max(currentPage - 1, 1)) : '#';
  const nextUrl =
    currentPage < totalPages
      ? getNewPageURL(Math.min(currentPage + 1, totalPages))
      : '#';

  return (
    <Pagination className={className} {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={prevUrl}
            replace={true}
            isActive={currentPage > 1}
          />
        </PaginationItem>

        {/* Max 4 */}
        {pageOrder.map((pageNum, i) => (
          <PaginationItem key={`page-${i}`}>
            {pageNum === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={getNewPageURL(Number(pageNum))}
                replace={true}
                isActive={Number(pageNum) === currentPage}
              >
                {pageNum}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={nextUrl}
            replace={true}
            isActive={currentPage < totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
SearchPagination.displayName = 'SearchPagination';
export default SearchPagination;
