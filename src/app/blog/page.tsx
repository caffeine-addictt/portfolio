import * as React from 'react';
import { Metadata } from 'next';
import { queryBlogs, countBlogs } from '@lib/sanity/client';

import SearchUI from '@components/search';
import { BlogCards } from '@components/searchcards';
import SearchPagination from '@components/search-pagination';

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'Interested in what I have to say? Check out my blog!',
};

interface PageParamProps {
  searchParams?: { query?: string; page?: string; tech?: string[] | string };
}
const BlogsListPage = async ({ searchParams }: PageParamProps) => {
  const currentPage = Number(searchParams?.page ?? 1);

  const [totalItems, data] = await Promise.all([
    countBlogs().catch((e) => {
      console.log(`Failed to count blogs: ${e}`);
      return 0;
    }),
    queryBlogs({
      orderByRecency: true,
      tech: searchParams?.tech,
      offset: 10 * (currentPage - 1),
      additionalConditionals: searchParams?.query
        ? [`[title, description.short] match "*${searchParams.query}*"`]
        : [],
    }).catch((e) => {
      console.log(`Failed to fetch blogs: ${e}`);
      return [];
    }),
  ]);

  const skills = new Set<string>();
  data.forEach((tech) => {
    tech.technologies.forEach((skill) => {
      skills.add(skill.name);
    });
  });

  return (
    <div
      className="mt-16 flex min-h-screen min-w-full max-w-full flex-col items-center"
      style={{ minHeight: 'calc(100vh - 64px)' }}
    >
      {/* Filtering */}
      <SearchUI
        uri="/blog"
        skills={Array.from(skills)}
        placeholder="Search blogs"
        searchParams={{
          ...searchParams,
          tech: !!searchParams?.tech
            ? Array.from(
                Array.isArray(searchParams?.tech)
                  ? searchParams?.tech
                  : [searchParams?.tech],
              )
            : undefined,
        }}
      />

      <div className="mb-4 flex w-4/5 flex-wrap justify-center gap-2 self-center max-sm:w-[97.5%]">
        <BlogCards data={data} />
      </div>

      <SearchPagination
        className="mx-auto mb-10 mt-auto"
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / 10)}
        searchParams={searchParams}
      />
    </div>
  );
};
export default BlogsListPage;
