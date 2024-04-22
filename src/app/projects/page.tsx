import * as React from 'react';
import { Metadata } from 'next';
import { countProjects, queryProjects } from '@lib/sanity/client';

import SearchUI from '@components/search';
import { ProjectCards } from '@components/searchcards';
import SearchPagination from '@components/search-pagination';

export const metadata: Metadata = {
  title: 'My Projects',
  description: 'Interested in what I have done so far? Check out my projects!',
};

interface PageParamProps {
  searchParams?: { query?: string; page?: string; tech?: string[] | string };
}
const ProjectsListPage = async ({ searchParams }: PageParamProps) => {
  const currentPage = Number(searchParams?.page ?? 1);

  const [totalItems, data] = await Promise.all([
    countProjects().catch((e) => {
      console.log(`Failed to count projects: ${e}`);
      return 0;
    }),
    queryProjects({
      orderByRecency: true,
      tech: searchParams?.tech,
      offset: 10 * (currentPage - 1),
      additionalConditionals: searchParams?.query
        ? [`[title, description.short] match "*${searchParams.query}*"`]
        : [],
    }).catch((e) => {
      console.log(`Failed to fetch projects: ${e}`);
      return [];
    }),
  ]);

  const skills = new Set<string>();
  data.forEach((tech) => {
    tech.technologies.forEach((skill) => skills.add(skill.name));
  });

  return (
    <div
      className="mt-16 flex min-h-screen min-w-full max-w-full flex-col items-center"
      style={{ minHeight: 'calc(100vh - 64px)' }}
    >
      {/* Filtering */}
      <SearchUI
        uri="/projects"
        skills={Array.from(skills)}
        placeholder="Search projects"
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
        <ProjectCards data={data} />
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
export default ProjectsListPage;
