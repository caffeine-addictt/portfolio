'use client';

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@components/ui/dropdown-menu';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { ScrollArea } from '@components/ui/scroll-area';

import { CaretDownIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { SkillsItem } from '@lib/sanity/schema';

interface PageParamProps {
  uri: string;
  placeholder: string;
  skills: SkillsItem[];
  searchParams?: { query?: string; page?: string; tech?: string[] };
}
const SearchUI = ({
  uri,
  searchParams,
  skills,
  placeholder,
}: PageParamProps) => {
  const router = useRouter();

  const [query, setQuery] = useState<string>(searchParams?.query || '');
  const [techList, setTechList] = useState<string[]>(searchParams?.tech || []);
  const originalTechParam: string[] | undefined = searchParams?.tech?.sort();

  const runSearch = (q?: string, t?: string[]) => {
    if ((q || query) === searchParams?.query) return;
    if (
      !!originalTechParam?.length &&
      !!(t || techList)?.length &&
      (t || techList).sort().every((tech, i) => originalTechParam?.[i] === tech)
    )
      return;

    const newParams = new URLSearchParams();
    if (q || query) newParams.append('query', q || query);
    if (searchParams?.page) newParams.append('page', searchParams?.page);
    if (!!(t || techList).length)
      (t || techList).forEach((tech) => newParams.append('tech', tech));

    router.push(`${uri}?${newParams.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runSearch(query);
    }
  };

  const handleClick = () => {
    runSearch(query);
  };

  return (
    <div className="my-8 max-w-2xl max-md:max-w-xl max-sm:max-w-[90%]">
      <div className="flex flex-row gap-2 max-sm:justify-center">
        <Input
          value={query}
          onKeyUp={handleEnter}
          type="search"
          placeholder={placeholder}
          className="w-screen"
          onChange={handleChange}
        />
        <Button
          type="button"
          onClick={handleClick}
          variant="outline"
          size="icon"
          className="px-2"
        >
          <MagnifyingGlassIcon className="size-6" />
        </Button>
      </div>

      <div className="mt-2 flex justify-center">
        <TechStackCheckbox
          skills={skills.sort((a, b) => a.name.localeCompare(b.name))}
          techList={techList}
          setTech={setTechList}
          runSearch={runSearch}
        />
      </div>
    </div>
  );
};
export default SearchUI;

interface TechStackCheckboxProps {
  skills: SkillsItem[];
  techList: string[];
  setTech: (tech: string[] | ((tech: string[]) => string[])) => void;
  runSearch: (q?: string, t?: string[]) => void;
}
const TechStackCheckbox = ({
  skills,
  techList,
  setTech,
  runSearch,
}: TechStackCheckboxProps) => (
  <DropdownMenu
    onOpenChange={(isOpen) => {
      if (isOpen) return;
      runSearch(undefined, techList);
    }}
  >
    <DropdownMenuTrigger className="group flex flex-row">
      <CaretDownIcon className="mr-1 size-6 transition-all group-data-[state=open]:rotate-180" />
      Filter
    </DropdownMenuTrigger>

    {/* Options */}
    <DropdownMenuContent align="center">
      <DropdownMenuLabel className="flex flex-row justify-between">
        Filter Technologies
        <span className="text-sm font-light">Press any key</span>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />

      <ScrollArea className="h-64">
        <div className="flex w-fit max-w-7xl flex-wrap gap-2 pr-2">
          {/* Split 4 columns most evenly possible */}
          {[...Array(3)].map((_, key) => {
            const totalOverflow = skills.length % 3;
            const itemsPerColum =
              Math.floor(skills.length / 3) + Math.max(totalOverflow - key, 0);
            const iterationOverflow = key >= totalOverflow ? totalOverflow : 0;

            const beginSlice = key * itemsPerColum + iterationOverflow;
            const endSlice =
              key * itemsPerColum + itemsPerColum + iterationOverflow;

            return (
              <div key={key} className="flex flex-initial flex-col">
                {skills.slice(beginSlice, endSlice).map((skill, key) => (
                  <DropdownItem
                    key={key}
                    techList={techList}
                    setTech={setTech}
                    name={skill.name}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </DropdownMenuContent>
  </DropdownMenu>
);

interface DropdownItemProps
  extends Omit<
    TechStackCheckboxProps,
    | 'skills'
    | 'runSearch'
    | 'filteredTechList'
    | 'setFilteredTechList'
    | 'filterQuery'
    | 'setFilterQuery'
  > {
  name: string;
}
const DropdownItem = ({ name, techList, setTech }: DropdownItemProps) => (
  <DropdownMenuCheckboxItem
    className="h-10 w-28 justify-end"
    onSelect={(e) => e.preventDefault()}
    checked={techList.includes(name)}
    onCheckedChange={(checked: boolean) =>
      setTech((prev) => {
        return checked ? prev.concat(name) : prev.filter((t) => t !== name);
      })
    }
  >
    {name}
  </DropdownMenuCheckboxItem>
);

export const SearchUISkeleton = ({
  query,
  placeholder,
}: {
  query: string;
  placeholder: string;
}) => (
  <div className="my-8 max-w-2xl max-md:max-w-xl max-sm:max-w-[90%]">
    <div className="flex flex-row gap-2 max-sm:justify-center">
      <Input
        value={query}
        onChange={() => {
          return;
        }}
        type="search"
        placeholder={placeholder}
        className="w-screen"
      />
      <Button type="button" variant="outline" size="icon" className="px-2">
        <MagnifyingGlassIcon className="size-6" />
      </Button>
    </div>

    <div className="mt-2 flex flex-row justify-center gap-2">
      <div className="group flex flex-row">
        <CaretDownIcon className="mr-1 size-6 transition-all group-data-[state=open]:rotate-180" />
        Filter
      </div>
    </div>
  </div>
);
