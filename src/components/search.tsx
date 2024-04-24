'use client';

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@utils/tailwind';
import { useMediaQuery } from './hooks';

import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@components/ui/dropdown-menu';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@components/ui/drawer';

import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { ScrollArea } from '@components/ui/scroll-area';
import { CaretDownIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Check } from 'lucide-react';

interface PageParamProps {
  uri: string;
  placeholder: string;
  skills: string[];
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

  return (
    <div className="my-8 max-w-2xl max-md:max-w-xl max-sm:max-w-[90%]">
      <div className="flex flex-row gap-2 max-sm:justify-center">
        <Input
          value={query}
          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              runSearch(query);
            }
          }}
          type="search"
          placeholder={placeholder}
          className="w-screen"
          onChange={handleChange}
        />
        <Button
          type="button"
          onClick={() => runSearch(query)}
          variant="outline"
          size="icon"
          className="px-2"
        >
          <MagnifyingGlassIcon className="size-6" />
        </Button>
      </div>

      <div className="mt-2 flex justify-center">
        <TechStackCheckbox
          skills={skills.sort((a, b) => a.localeCompare(b))}
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
  skills: string[];
  techList: string[];
  setTech: (tech: string[] | ((tech: string[]) => string[])) => void;
  runSearch: (q?: string, t?: string[]) => void;
}
const TechStackCheckbox = ({
  skills,
  techList,
  setTech,
  runSearch,
}: TechStackCheckboxProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('');
  const filtered = skills.filter((skill) =>
    skill.toLowerCase().startsWith(filter.toLowerCase()),
  );

  // Mobile
  if (!isDesktop) {
    return (
      <Drawer
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (isOpen) setFilter('');
          runSearch(undefined, techList);
        }}
      >
        <DrawerTrigger
          onClick={() => setOpen((prev) => !prev)}
          className="group flex flex-row"
        >
          <CaretDownIcon className="mr-1 size-6 transition-all group-data-[state=open]:rotate-180" />
          Filter
        </DrawerTrigger>

        <DrawerContent className="h-4/5 pb-4">
          <DrawerTitle className="mb-4 mt-2 w-full text-center text-xl">
            Filter skills
          </DrawerTitle>

          {/* Filter */}
          <Input
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            className="mx-auto w-10/12 rounded-md"
            placeholder="Search..."
          />

          {/* Render items */}
          <ScrollArea className="h-fit">
            <div className="mx-auto mt-4 flex h-2/5 w-10/12 flex-col gap-1">
              {filtered.length ? (
                <>
                  {filtered.map((skill, key) => {
                    const isSelected = techList.includes(skill);
                    return (
                      <Button
                        onClick={() =>
                          setTech((prev) =>
                            isSelected
                              ? prev.filter((t) => t !== skill)
                              : prev.concat(skill),
                          )
                        }
                        className={cn('flex w-full flex-row justify-start', {
                          'bg-neutral-300/40': isSelected,
                          'dark:bg-neutral-700/30': isSelected,
                        })}
                        key={key}
                        variant="outline"
                      >
                        {isSelected ? (
                          <Check className="size-4" />
                        ) : (
                          <div className="size-4" />
                        )}
                        <span className="ml-5">{skill}</span>
                      </Button>
                    );
                  })}
                </>
              ) : (
                <DrawerDescription className="text-center">
                  No skills found
                </DrawerDescription>
              )}
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop
  return (
    <DropdownMenu
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen) return setFilter('');
        runSearch(undefined, techList);
      }}
    >
      <DropdownMenuTrigger
        onClick={() => setOpen((prev) => !prev)}
        className="group flex flex-row"
      >
        <CaretDownIcon className="mr-1 size-6 transition-all group-data-[state=open]:rotate-180" />
        Filter
      </DropdownMenuTrigger>

      {/* Options */}
      <DropdownMenuContent align="center">
        <DropdownMenuLabel className="flex flex-row items-center justify-between">
          <Input
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            className="w-3/5"
            placeholder="Search..."
          />
          <span className="text-sm font-light">Press any key</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <ScrollArea className="h-fit pb-1">
          <div className="flex w-full max-w-96 flex-wrap pr-2 max-sm:max-w-[80vw] sm:w-fit sm:min-w-64">
            {filtered.length ? (
              <>
                {filtered.map((skill, key) => (
                  <DropdownItem
                    key={key}
                    techList={techList}
                    setTech={setTech}
                    name={skill}
                  />
                ))}
              </>
            ) : (
              <p className="w-full text-center text-sm font-thin">
                No skills found
              </p>
            )}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
