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

import {
  CaretDownIcon,
  MagnifyingGlassIcon
} from '@radix-ui/react-icons'
import { SkillsItem } from '@lib/sanity/schema'




interface PageParamProps {
  uri: string;
  placeholder: string;
  skills: SkillsItem[];
  searchParams?: { query?: string; page?: string; tech?: string[] }
}
const SearchUI = ({ uri, searchParams, skills, placeholder }: PageParamProps) => {
  const [query, setQuery] = useState<string>(searchParams?.query || '')
  const [techList, setTechList] = useState<string[]>(searchParams?.tech || [])
  const originalTechParam: string[] | undefined = searchParams?.tech?.sort()

  const runSearch = (q?: string, t?: string[]) => {
    if ((q || query) === searchParams?.query) return
    if (
      !!originalTechParam?.length
      && !!(t || techList)?.length
      && (t || techList).sort().every((tech, i) => originalTechParam?.[i] === tech)
    ) return

    const newParams = new URLSearchParams()
    if (q || query) newParams.append('query', q || query)
    if (searchParams?.page) newParams.append('page', searchParams?.page)
    if (!!(t || techList).length) (t || techList).forEach(tech => newParams.append('tech', tech))

    window.location.href = `${uri}?${newParams.toString()}`
  }


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

  const debouncedSearch = useDebouncedCallback(runSearch, 1000)
  const wrappedSetTechList = (tech: string[] | ((tech: string[]) => string[])) => {
    setTechList(t => {
      let a = Array.isArray(tech) ? tech : tech(t)
      debouncedSearch(query, a)

      return a
    })
  }
  

  return (
    <div className='my-8 max-w-2xl max-md:max-w-xl max-sm:max-w-[90%]'>
      <div className='flex flex-row gap-2 max-sm:justify-center'>
        <Input value={query} onKeyUp={handleEnter} type='search' placeholder={placeholder} className='w-screen' onChange={handleChange} />
        <Button type='button' onClick={handleClick} variant='outline' size='icon' className='px-2'>
          <MagnifyingGlassIcon className='h-6 w-6' />
        </Button>
      </div>

      <div className='mt-2 flex justify-center'>
        <TechStackCheckbox techList={techList} setTech={setTechList} runSearch={runSearch} skills={skills} />
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
const TechStackCheckbox = ({ skills, techList, setTech }: TechStackCheckboxProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger className='group flex flex-row'>
      <CaretDownIcon className='mr-1 h-6 w-6 transition-all group-data-[state=open]:rotate-180'/>
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


interface DropdownItemProps extends Omit<TechStackCheckboxProps, 'skills'> { name: string }
const DropdownItem = ({ name, techList, setTech }: DropdownItemProps) => (
  <DropdownMenuCheckboxItem
    checked={techList.includes(name)}
    onCheckedChange={(checked: boolean) => setTech(prev => {
      return checked ? prev.concat(name) : prev.filter(t => t !== name).sort()
    })}
  >
    {name}
  </DropdownMenuCheckboxItem>
)




export const SearchUISkeleton = ({ query, placeholder }: { query: string, placeholder: string }) => (
  <div className='my-8 max-w-2xl max-md:max-w-xl max-sm:max-w-[90%]'>
    <div className='flex flex-row gap-2 max-sm:justify-center'>
      <Input value={query} onChange={() => {return}} type='search' placeholder={placeholder} className='w-screen' />
      <Button type='button' variant='outline' size='icon' className='px-2'>
        <MagnifyingGlassIcon className='h-6 w-6' />
      </Button>
    </div>

    <div className='mt-2 flex flex-row justify-center gap-2'>
      <div className='group flex flex-row'>
        <CaretDownIcon className='mr-1 h-6 w-6 transition-all group-data-[state=open]:rotate-180'/>
        Filter
      </div>
    </div>
  </div>
)
