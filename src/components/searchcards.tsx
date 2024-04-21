import * as React from 'react';
import { Suspense } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@utils/tailwind';
import { urlFor } from '@lib/sanity/client';
import { ProjectItem, BlogItem, SkillsItem } from '@lib/sanity/schema';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import { AspectRatio } from '@components/ui/aspect-ratio';
import { BookOpen } from 'lucide-react';
import { DotFilledIcon } from '@radix-ui/react-icons';

export const ImageRender = async ({
  icon,
  className,
}: {
  icon?: any;
  className?: string;
}) => {
  if (!!icon) {
    try {
      return (
        <Image
          src={urlFor(icon).url()}
          alt="Image"
          width={500}
          height={500}
          className={cn('size-full', className)}
        />
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Image
      src="/images/defaultCardPicture.png"
      alt="Image"
      width={500}
      height={500}
      className={cn('size-full', className)}
    />
  );
};

export const ProjectCards = async ({ data }: { data: ProjectItem[] }) => (
  <>
    {!!!data?.length ? (
      <p>Looks like no projects were found, try a different search term!</p>
    ) : (
      data.map((project, key) => (
        <RenderCard
          key={key}
          cardData={{
            title: project.title,
            shortDescription: project.description.short,
            icon: project.images?.icon,
            link: `/projects/${project.slug}`,
            technologies: project?.technologies,
          }}
          date={
            project.timeframe?.end ? new Date(project.timeframe.end) : 'Present'
          }
          renderReadingTime={false}
        />
      ))
    )}
  </>
);

export const BlogCards = async ({ data }: { data: BlogItem[] }) => (
  <>
    {!!!data?.length ? (
      <p>Looks like no blogs were found, try a different search term!</p>
    ) : (
      data.map((project, key) => (
        <RenderCard
          key={key}
          cardData={{
            title: project.title,
            shortDescription: project.description.short,
            icon: project.images?.icon,
            link: `/blog/${project.slug}`,
            technologies: project?.technologies,
          }}
          estimatedReadingTime={project.estimatedReadingTime}
          date={new Date(project.timeframe?.published)}
          renderReadingTime={true}
        />
      ))
    )}
  </>
);

interface RenderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  cardData: {
    title: string;
    shortDescription: string;
    link: string;
    icon?: any;
    technologies?: SkillsItem[];
  };
  estimatedReadingTime?: number;
  date: Date | string;
  renderReadingTime: boolean;
}
const RenderCard = React.forwardRef<HTMLDivElement, RenderCardProps>(
  ({ cardData, date, renderReadingTime, estimatedReadingTime, ...props }, ref) => (
    <Card
      ref={ref}
      {...props}
      className="relative flex h-[30rem] w-64 flex-col overflow-hidden rounded transition-all duration-300 hover:border-accent-light hover:shadow-lg dark:hover:border-accent-dark"
    >
      <AspectRatio ratio={1}>
        <Suspense fallback={<Skeleton className="size-64" />}>
          <ImageRender icon={cardData.icon} className="size-64" />
        </Suspense>
      </AspectRatio>

      {/* Hover */}
      <Link href={cardData.link} className="absolute inset-0 size-full" />

      {/* Title */}
      <CardHeader>
        <CardTitle>{cardData.title}</CardTitle>
      </CardHeader>

      {/* Desc */}
      <CardContent>
        <CardDescription>{cardData.shortDescription}</CardDescription>
      </CardContent>

      <CardFooter className="mb-0 mt-auto flex flex-row items-center gap-1">
        {/* Date */}
        <p className="w-fit text-sm font-light">
          {typeof date === 'string' ? date : `${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`}
        </p>

        {/* Separator */}
        <DotFilledIcon />

        {/* Technologies */}
        <p className="flex flex-row text-ellipsis text-xs font-light">
          {renderReadingTime && estimatedReadingTime ? (
            <>
              <BookOpen className="mr-1 size-4" /> ~{estimatedReadingTime} min{estimatedReadingTime > 1 ? 's' : ''}
            </>
          ) :
            !!cardData.technologies?.length ? cardData.technologies.slice(0, 2).map((tech) => tech.name).join(', ') + (cardData.technologies.length > 2 ? '...' : '') : 'Unspecified'
          }
        </p>
      </CardFooter>
    </Card>
  ),
);
RenderCard.displayName = 'RenderCard';

export const CardSkeleton = ({ cardCount }: { cardCount: number }) => (
  <>
    {[...Array(cardCount)].map((_, key) => (
      <Card key={key} className="h-fit w-64 overflow-hidden rounded">
        <AspectRatio ratio={1} asChild>
          <Skeleton className="size-64" />
        </AspectRatio>

        {/* Title */}
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-40" />
          </CardTitle>
        </CardHeader>

        {/* Desc */}
        <CardContent>
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            <Skeleton className="mb-1 h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-2">
          {/* Technologies */}
          <div className="flex flex-wrap gap-1">
            {[...Array(3)].map((tech, key) => (
              <Skeleton key={key} className="h-7 w-10" />
            ))}
          </div>

          {/* Date */}
          <Skeleton className="h-5 w-14" />
        </CardFooter>
      </Card>
    ))}
  </>
);
