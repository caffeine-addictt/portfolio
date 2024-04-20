'use client';

import * as React from 'react';

import { useToast } from '@components/ui/use-toast';
import { TooltipWrapper } from '@components/ui/tooltip';
import { ModeToggle } from '@components/theme-provider';
import { InternalLink, ExternalLink, Button } from '@components/ui/button';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@components/ui/dropdown-menu';
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  FileTextIcon,
  CodeIcon,
  HamburgerMenuIcon,
  Cross2Icon,
  EnvelopeOpenIcon,
} from '@radix-ui/react-icons';

const Navbar = () => {
  const { toast } = useToast();

  return (
    <nav className="fixed z-50 flex h-16 w-full justify-center bg-white/60 shadow-sm backdrop-blur-sm transition-all will-change-scroll dark:bg-black/60">
      <div className="mb-2 mt-4 flex h-full w-[95%] flex-row justify-between gap-1 self-center">
        {/* Left */}
        <div className="flex flex-row gap-1 self-center">
          <TooltipWrapper text="Home page" asChild>
            <InternalLink
              href="/"
              variant="link"
              className="my-auto text-lg font-bold"
            >
              <CodeIcon className="mr-2 size-6 rotate-0 scale-100" />
              Portfolio
            </InternalLink>
          </TooltipWrapper>

          <TooltipWrapper text="View my projects!" asChild>
            <InternalLink
              href="/projects"
              variant="link"
              className="my-auto text-sm font-normal max-sm:hidden"
            >
              Projects
            </InternalLink>
          </TooltipWrapper>

          <TooltipWrapper text="View my blog!" asChild>
            <InternalLink
              href="/blog"
              variant="link"
              className="my-auto text-sm font-normal max-sm:hidden"
            >
              Blog
            </InternalLink>
          </TooltipWrapper>
        </div>

        {/* Right */}
        <div className="flex flex-row gap-1 self-center">
          <TooltipWrapper text="View my blog!" asChild>
            <InternalLink
              href="/contact"
              variant="outline"
              className="my-auto max-md:hidden"
            >
              <EnvelopeOpenIcon className="mr-2 size-4 rotate-0 scale-100" />
              Contact Me
            </InternalLink>
          </TooltipWrapper>

          <TooltipWrapper text="My Resume" asChild>
            <Button
              variant="outline"
              className="my-auto max-md:hidden"
              onClick={() =>
                toast({
                  title: 'Coming soon!',
                  description: 'My Resume will be available soon.',
                  variant: 'destructive',
                })
              }
            >
              <FileTextIcon className="mr-2 size-4 rotate-0 scale-100" />
              My Resume
            </Button>
          </TooltipWrapper>

          <TooltipWrapper text="LinkedIn" asChild>
            <ExternalLink
              href="https://www.linkedin.com/in/ngjx/"
              variant="outline"
              size="icon"
              className="my-auto max-sm:hidden"
            >
              <LinkedInLogoIcon className="size-[1.2rem] rotate-0 scale-100" />
            </ExternalLink>
          </TooltipWrapper>

          <TooltipWrapper text="Github" asChild>
            <ExternalLink
              href="https://github.com/caffeine-addictt"
              variant="outline"
              size="icon"
              className="my-auto max-sm:hidden"
            >
              <GitHubLogoIcon className="size-[1.2rem] rotate-0 scale-100" />
            </ExternalLink>
          </TooltipWrapper>

          <ModeToggle className="my-auto" />

          {/* Mobile dropdown */}
          <MobileDropdown toast={toast} />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

const MobileDropdown = ({
  toast,
}: {
  toast: ReturnType<typeof useToast>['toast'];
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="group" asChild>
      <Button
        variant="outline"
        size="icon"
        className="relative flex items-center justify-center md:hidden"
      >
        <HamburgerMenuIcon className="absolute size-6 rotate-0 scale-100 transition-all group-data-[state=open]:-rotate-180 group-data-[state=open]:scale-0" />
        <Cross2Icon className="absolute size-6 rotate-0 scale-0 transition-all group-data-[state=open]:-rotate-180 group-data-[state=open]:scale-100" />
        <span className="sr-only">Toggle menu</span>
      </Button>
    </DropdownMenuTrigger>

    {/* Options */}
    <DropdownMenuContent align="end">
      <DropdownMenuLabel className="text-center text-base">
        Important Links
      </DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuItem>
        <InternalLink href="/blog" variant="link" className="w-full">
          <FileTextIcon className="mr-2 size-4" />
          My Blog
        </InternalLink>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <InternalLink href="/projects" variant="link" className="w-full">
          <CodeIcon className="mr-2 size-6" />
          My Projects
        </InternalLink>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Button
          variant="link"
          className="w-full"
          onClick={() =>
            toast({
              title: 'Coming soon!',
              description: 'My Resume will be available soon.',
              variant: 'destructive',
            })
          }
        >
          <FileTextIcon className="mr-2 size-4 rotate-0 scale-100" />
          My Resume
        </Button>
      </DropdownMenuItem>

      <DropdownMenuItem>
        <ExternalLink
          href="https://github.com/caffeine-addictt"
          variant="link"
          className="w-full"
        >
          <GitHubLogoIcon className="mr-2 size-4" />
          My Github
        </ExternalLink>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <ExternalLink
          href="https://www.linkedin.com/in/ngjx/"
          variant="link"
          className="w-full"
        >
          <LinkedInLogoIcon className="mr-2 size-4" />
          My LinkedIn
        </ExternalLink>
      </DropdownMenuItem>

      <DropdownMenuItem>
        <InternalLink href="/contact" variant="link" className="w-full">
          <EnvelopeOpenIcon className="mr-2 size-4" />
          Contact Me
        </InternalLink>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
