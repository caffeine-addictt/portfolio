import * as React from 'react'
import { Metadata } from 'next'
import { getAllSkills, queryProjects } from '@lib/sanity/client'

import SearchUI from '@components/search'
import { ProjectCards } from '@components/searchcards'




export const metadata: Metadata = {
  title: 'My Projects',
  description: 'Interested in what I have done so far? Check out my projects!'
}


interface PageParamProps { searchParams?: { query?: string; page?: string; tech?: string[] | string } }
const ProjectsListPage = async ({ searchParams }: PageParamProps) => {
  const [skills, data] = await Promise.all([
    getAllSkills().catch(() => {throw new Error('Failed to fetch skills')}),
    queryProjects({
      orderByRecency: true,
      tech: searchParams?.tech,
      offset: ((Number(searchParams?.page) || 1) - 1),
      additionalConditionals: searchParams?.query ? [`[title, description.short] match "*${searchParams.query}*"`] : []
    }).catch(() => {throw new Error('Failed to fetch projects')})
  ])

  return (
    <div className='mt-16 flex min-h-screen min-w-full max-w-full flex-col items-center' style={{ minHeight: 'calc(100vh - 64px)' }}>

      {/* Filtering */}
      <SearchUI
        uri='/projects'
        skills={skills}
        placeholder='Search projects'
        searchParams={{
          ...searchParams,
          tech: !!searchParams?.tech ? Array.from(Array.isArray(searchParams?.tech) ? searchParams?.tech : [searchParams?.tech]) : undefined
        }}
      />

      <div className='mb-4 flex w-[80%] flex-wrap justify-center gap-2 self-center max-sm:w-[97.5%]'>
        <ProjectCards data={data} />
      </div>
    </div>
  )
}
export default ProjectsListPage
