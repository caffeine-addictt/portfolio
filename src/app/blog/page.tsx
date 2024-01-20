import * as React from 'react'
import { Metadata } from 'next'
import { queryBlogs, getAllSkills } from '@lib/sanity/client'

import SearchUI from '@components/search'
import { BlogCards } from '@components/searchcards'




export const metadata: Metadata = {
  title: 'My Blog',
  description: 'Interested in what I have to say? Check out my blog!'
}


interface PageParamProps { searchParams?: { query?: string; page?: string; tech?: string[] | string } }
const BlogsListPage = async ({ searchParams }: PageParamProps) => {
  const [skills, data] = await Promise.all([
    getAllSkills().catch(() => {throw new Error('Failed to fetch skills') }),
    queryBlogs({
      orderByRecency: true,
      tech: searchParams?.tech,
      offset: ((Number(searchParams?.page) || 1) - 1),
      additionalConditionals: searchParams?.query ? [`[title, description.short] match "*${searchParams.query}*"`] : []
    }).catch(() => {throw new Error('Failed to fetch blogs') })
  ])


  return (
    <div className='mt-16 flex min-h-screen min-w-full max-w-full flex-col items-center' style={{ minHeight: 'calc(100vh - 64px)' }}>

      {/* Filtering */}
      <SearchUI
        uri='/blog'
        skills={skills}
        placeholder='Search blogs'
        searchParams={{
          ...searchParams,
          tech: !!searchParams?.tech ? Array.from(Array.isArray(searchParams?.tech) ? searchParams?.tech : [searchParams?.tech]) : undefined
        }}
      />

      <div className='mb-4 flex w-[80%] flex-wrap justify-center gap-2 self-center max-sm:w-[97.5%]'>
        <BlogCards data={data} />
      </div>
    </div>
  )
}
export default BlogsListPage
