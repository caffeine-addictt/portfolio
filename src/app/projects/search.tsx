'use client'

import * as React from 'react'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem
} from '@components/ui/dropdown-menu'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { Skeleton } from '@components/ui/skeleton'

import {
  CaretDownIcon,
  MagnifyingGlassIcon
} from '@radix-ui/react-icons'
import { SkillsItem } from '@lib/sanity/schema'




interface PageParamProps { skills: SkillsItem[]; searchParams?: { query?: string; page?: string; tech?: string[] } }
const SearchUI = ({ searchParams, skills }: PageParamProps) => {
  const [query, setQuery] = useState<string>(searchParams?.query || '')
  const [techList, setTechList] = useState<string[]>(searchParams?.tech || [])

  const runSearch = useDebouncedCallback((q?: string) => {
    if (
      ((q || query) === searchParams?.query)
      && ( techList === searchParams?.tech )
    ) return

    const newParams = new URLSearchParams()
    if (q || query) newParams.append('query', q || query)
    if (searchParams?.page) newParams.append('page', searchParams?.page)
    if (!!techList) techList.forEach(tech => newParams.append('tech', tech))

    window.location.href = `/projects?${newParams.toString()}`
  }, 1000)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runSearch(query)
    }
  }

  const handleClick = () => {
    runSearch(query)
  }


  return (
    <div className='max-w-2xl max-sm:max-w-[90%] max-md:max-w-xl my-8'>
      <div className='flex flex-row max-sm:justify-center gap-2'>
        <Input value={query} onKeyUp={handleEnter} type='search' placeholder='Search projects' className='w-screen' onChange={handleChange} />
        <Button type='button' onClick={handleClick} variant='outline' size='icon' className='px-2'>
          <MagnifyingGlassIcon className='h-6 w-6' />
        </Button>
      </div>

      <div className='flex flex-row gap-2 mt-2 justify-center'>
        <TechStackCheckbox techList={techList} setTech={setTechList} skills={skills} />
      </div>
    </div>
  )
}
export default SearchUI




interface TechStackCheckboxProps {
  skills: SkillsItem[]
  techList: string[]
  setTech: (tech: string[] | ((tech: string[]) => string[])) => void
}
const TechStackCheckbox = ({ skills, techList, setTech }: TechStackCheckboxProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex flex-row group'>
        <CaretDownIcon className='h-6 w-6 transition-all mr-1 group-data-[state=open]:rotate-180'/>
        Filter
      </DropdownMenuTrigger>


      {/* Options */}
      <DropdownMenuContent align='center' loop>
        <DropdownMenuLabel>Technologies</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {skills.map((skill, key) => (
          <DropdownItem
            key={key}
            techList={techList}
            setTech={setTech}
            name={skill.name}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


interface DropdownItemProps extends Omit<TechStackCheckboxProps, 'skills'> { name: string }
const DropdownItem = ({ name, techList, setTech }: DropdownItemProps) => {
  return (
    <DropdownMenuCheckboxItem
      checked={techList.includes(name)}
      onCheckedChange={(checked: boolean) => setTech(prev => {
        return checked ? prev.concat(name) : prev.filter(t => t !== name).sort()
      })}
    >
      {name}
    </DropdownMenuCheckboxItem>
  )
}




export const SearchUISkeleton = ({ query }: { query: string }) => (
  <div className='max-w-2xl max-sm:max-w-[90%] max-md:max-w-xl my-8'>
    <div className='flex flex-row max-sm:justify-center gap-2'>
      <Input value={query} onChange={() => {}} type='search' placeholder='Search projects' className='w-screen' />
      <Button type='button' variant='outline' size='icon' className='px-2'>
        <MagnifyingGlassIcon className='h-6 w-6' />
      </Button>
    </div>

    <div className='flex flex-row gap-2 mt-2 justify-center'>
      <div className='flex flex-row group'>
        <CaretDownIcon className='h-6 w-6 transition-all mr-1 group-data-[state=open]:rotate-180'/>
        Filter
      </div>
    </div>
  </div>
)
