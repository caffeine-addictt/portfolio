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
    <div className='mt-16 h-fit w-full'>

      <div className='mx-auto flex w-fit flex-col justify-center pb-16 max-sm:items-center max-sm:text-center' style={{ height: 'calc(100vh - 64px)' }}>
        {/* Introduction and what I do */}
        <p>Hi, I&apos;m Alex</p>
        <h1 className='mb-4 text-5xl font-bold'>I Bring <span className='text-accent-light dark:text-accent-dark'>Ideas</span> to Life</h1>
        <p className='break-normal text-lg max-sm:max-w-xs'>
          I&apos;m a <span className='text-xl font-medium text-black dark:text-white'>full-stack developer</span> and hobbist hacker based in Singapore.
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




      {/* About me */}
      <div id='about' className='flex h-screen w-full flex-col items-center justify-center gap-4'>
        <div className='flex w-[60%] flex-col items-center justify-center text-center text-lg max-md:w-[75%] max-sm:w-[97.5%]'>
          <h1 className='mb-8 text-5xl font-bold'>
            I AM <span className='text-accent-light dark:text-accent-dark'>PASSIONATE</span> AND
            <span className='text-accent-light dark:text-accent-dark'> ALWAYS LEARNING</span>
          </h1>

          <p className='mb-2 max-sm:max-w-[70%]'>
            I started my journey creating games
            <span className='font-bold text-accent-light dark:text-accent-dark'> { (new Date()).getUTCFullYear() - 2017 }+ years ago</span>.
          </p>
          <p className='mb-8 max-w-2xl'>
            Now I create software like <span className='font-bold text-accent-light dark:text-accent-dark'>this website</span> and web applications using
            <span className='font-bold text-accent-light dark:text-accent-dark'> React</span> and
            <span className='font-bold text-accent-light dark:text-accent-dark'> NextJS</span> and libraries in
            <span className='font-bold text-accent-light dark:text-accent-dark'> Python</span>.
          </p>

          <p>I&apos;m always looking for new and exciting projects to work on!</p>
          <Separator className='mb-4 mt-2 h-[1px] w-full max-w-[70%] md:max-w-[50%] lg:max-w-[30%]'/>

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
      <div id='skills' className='flex h-full min-h-screen w-full flex-col items-center justify-center gap-4'>
        <div className='flex w-[60%] flex-col items-center justify-center text-center text-lg max-md:w-[75%] max-sm:w-[97.5%]'>
          <h1 className='mb-8 text-5xl font-bold'>
            MY <span className='text-accent-light dark:text-accent-dark'>SKILLS</span>
          </h1>

          <div className='flex max-w-[70%] flex-wrap justify-center gap-2'>
            <RenderSkills />
          </div>

          <Separator className='mb-4 mt-8 h-[1px] w-full max-w-[70%] md:max-w-[50%] lg:max-w-[30%]'/>
          <div className='flex flex-wrap items-center gap-2'>
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
        <TooltipWrapper key={key} text={skill.name} asChild>
          <ExternalLink href={skill.href} size='icon' variant='outline' className='relative'>
            <Suspense fallback={<Skeleton className='relative h-full w-full' />}>
              {(skill?.icon?.dark && skill?.icon?.light) ? (
                <>
                  <Image
                    src={urlFor(skill.icon.light).url()}
                    alt='/images/dark.svg'
                    width={16}
                    height={16}
                    className='absolute h-6 w-6 scale-100 transition-all dark:scale-0'
                  />
                  <Image
                    src={urlFor(skill.icon.dark).url()}
                    alt='/images/light.svg'
                    width={16}
                    height={16}
                    className='absolute h-6 w-6 scale-0 transition-all dark:scale-100'
                  />
                </>
              ) : (
                <>
                  {(skill.icon?.dark || skill.icon?.light) ? (
                    <Image
                      src={skill.icon.dark ? urlFor(skill.icon.dark).url() : urlFor(skill.icon.light).url()}
                      alt='/images/dark.svg'
                      width={16}
                      height={16}
                      className='absolute h-6 w-6 scale-100 transition-all'
                    />

                  ) : (
                    <>
                      <Image
                        src='/images/dark.svg'
                        alt='/images/dark.svg'
                        width={16}
                        height={16}
                        className='absolute h-6 w-6 scale-100 transition-all dark:scale-0'
                      />
                      <Image
                        src='/images/light.svg'
                        alt='/images/light.svg'
                        width={16}
                        height={16}
                        className='absolute h-6 w-6 scale-0 transition-all dark:scale-100'
                      />
                    </>
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
