import * as React from 'react'
import Image from 'next/image'
import { Suspense } from 'react'

import { urlFor, getAllSkills } from '@lib/sanity/client'

import { Skeleton } from '@components/ui/skeleton'
import { Separator } from '@components/ui/separator'
import { TooltipWrapper } from '@components/ui/tooltip'
import { ExternalLink, InternalLink } from '@components/ui/button'
import { SmoothScroll } from '@components/ui/clientbutton'

import { BackpackIcon, ArrowTopRightIcon, FileTextIcon } from '@radix-ui/react-icons'


const HomePage = () => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center' style={{ minHeight: 'calc(100vh - 64px)' }}>

      <div className='flex flex-col justify-center max-sm:items-center max-sm:text-center' style={{ minHeight: 'calc(100vh - 64px)' }}>
        {/* Introduction and what I do */}
        <h1 className='mb-4 text-5xl font-bold'>Hi, I&apos;m <span className='text-accent-light dark:text-accent-dark'>Alex</span></h1>
        <p className='break-normal text-lg max-sm:max-w-xs'>
          I&apos;m a <span className='text-black dark:text-white underline text-xl'>full-stack developer</span> and hobbist hacker based in Singapore.
        </p>

        {/* Links */}
        <div className='mt-6 flex w-fit flex-wrap gap-4'>
          <Separator className='mb-0'/>

          <TooltipWrapper text='More about me!' asChild>
            <SmoothScroll variant='outline' toId='about'>
              About Me
            </SmoothScroll>
          </TooltipWrapper>

          <TooltipWrapper text='View my projects!' asChild>
            <InternalLink href='/projects' variant='outline'>
              My Projects <ArrowTopRightIcon className='ml-2' />
            </InternalLink>
          </TooltipWrapper>
        </div>
      </div>

      {/* Filler to center */}
      <div className='invisible block h-16 w-full self-end'>This is a filler block to center the main content</div>




      {/* About me */}
      <div id='about' className='flex h-full w-full min-h-screen flex-col gap-4 items-center justify-center'>
        <div className='flex w-[60%] flex-col items-center justify-center max-sm:w-[97.5%] max-md:w-[75%] text-center text-lg'>
          <h1 className='text-5xl font-bold mb-8'>
            I AM <span className='text-accent-light dark:text-accent-dark'>PASSIONATE</span> AND
            <span className='text-accent-light dark:text-accent-dark'> ALWAYS LEARNING</span>
          </h1>

          <p className='mb-2 max-sm:max-w-[70%]'>
            I started my journey creating games
            <span className='text-accent-light dark:text-accent-dark font-bold'> { (new Date()).getUTCFullYear() - 2017 }+ years ago</span>.
          </p>
          <p className='mb-8 max-w-2xl'>
            Now I create software like <span className='text-accent-light dark:text-accent-dark font-bold'>this website</span> and web applications using
            <span className='text-accent-light dark:text-accent-dark font-bold'> React</span> and
            <span className='text-accent-light dark:text-accent-dark font-bold'> NextJS</span> and libraries in
            <span className='text-accent-light dark:text-accent-dark font-bold'> Python</span>.
          </p>

          <p>I&apos;m always looking for new and exciting projects to work on!</p>
          <Separator className='mt-2 mb-4 h-[1px] w-full max-w-[70%] md:max-w-[50%] lg:max-w-[30%]'/>

          <div className='flex flex-row gap-2'>
            <SmoothScroll variant='outline' toId='skills'>
              My Skills
            </SmoothScroll>

            <InternalLink href='/contact' variant='outline'>
              <BackpackIcon className='mr-2' />
              Hire me
            </InternalLink>
          </div>
        </div>
      </div>




      {/* My Skills */}
      <div id='skills' className='flex h-full w-full min-h-screen flex-col gap-4 items-center justify-center'>
        <div className='flex w-[60%] flex-col items-center justify-center max-sm:w-[97.5%] max-md:w-[75%] text-center text-lg'>
          <h1 className='text-5xl font-bold mb-8'>
            MY <span className='text-accent-light dark:text-accent-dark'>SKILLS</span>
          </h1>

          <div className='flex flex-wrap gap-2 max-w-[70%]'>
            <RenderSkills />
          </div>

          <Separator className='mt-8 mb-4 h-[1px] w-full max-w-[70%] md:max-w-[50%] lg:max-w-[30%]'/>
          <div className='flex flex-wrap gap-2 items-center'>
            <TooltipWrapper text='View my blog!' asChild>
              <InternalLink href='/blog' variant='outline'>
                <FileTextIcon className='mr-2 h-4 w-4 rotate-0 scale-100' />
                My Blog
              </InternalLink>
            </TooltipWrapper>
            <TooltipWrapper text='See how I used my skills!' asChild>
              <InternalLink href='/projects' variant='outline'>
                My Projects <ArrowTopRightIcon className='ml-2' />
              </InternalLink>
            </TooltipWrapper>
          </div>
        </div>
      </div>
    </div>
  )
}
export default HomePage




const RenderSkills = async () => {
  const skills = await getAllSkills()

  return (
    <>
      {skills.map((skill, key) => (
        <TooltipWrapper text={skill.name} asChild>
          <ExternalLink href={skill.href} key={key} size='icon' variant='outline'>
            <Suspense fallback={<Skeleton className='w-full h-full relative' />}>
              {skill?.icon?.dark && skill?.icon?.light ? (
                <>
                  <Image
                    src={urlFor(skill.icon.light).url()}
                    alt={skill.name}
                    width={16}
                    height={16}
                    className='w-full h-full absolute inset-0 object-cover scale-100 dark:scale-0 transition-all'
                  />
                  <Image
                    src={urlFor(skill.icon.dark).url()}
                    alt={skill.name}
                    width={16}
                    height={16}
                    className='w-full h-full absolute inset-0 object-cover scale-0 dark:scale-100 transition-all'
                  />
                </>
              ) : (
                <>
                  {skill.icon?.dark || skill.icon?.light ? (
                    <Image
                      src={skill.icon.dark ? urlFor(skill.icon.dark).url() : urlFor(skill.icon.light).url()}
                      alt={skill.name}
                      width={16}
                      height={16}
                      className='w-full h-full absolute inset-0 object-cover scale-100 dark:scale-0 transition-all'
                    />

                  ) : (
                    <Skeleton className='w-full h-full relative' />
                  )}
                </>
              )}
            </Suspense>
          </ExternalLink>
        </TooltipWrapper>
      ))}
    </>
  )
}
