import * as React from 'react'

import { Metadata } from 'next'
import { getAllProjects } from '@lib/sanity/client'


export const metadata: Metadata = {
  title: 'My Projects',
  description: 'Interested in what I have done so far? Check out my projects!'
}


const ProjectsListPage = async () => {
  const data = await getAllProjects()
  return (
    <div>
      {data.map((project, key) => (
        <div key={key}>
          <h1>{project.title}</h1>
        </div>
      ))}
    </div>
  )
}
export default ProjectsListPage
