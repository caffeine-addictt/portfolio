import { Rule } from 'sanity';
import highlighter from '../highlighter';

export const ProjectsSchema = {
  name: 'projects',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Slug of the project',
      options: {
        source: 'title',
        maxLength: 40,
      },
      validation: (e: Rule) => e.required().error('Slug is required'),
    },

    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title of the project',
      validation: (e: Rule) => [
        e.required().error('Title is required'),
        e.max(40).warning('Best to keep the title under 40 characters'),
      ],
    },
    {
      name: 'description',
      type: 'object',
      title: 'Description of the project',
      fields: [
        {
          name: 'short',
          type: 'string',
          title: 'Short',
          description: 'Rendered as preview text',
          validation: (e: Rule) => [
            e.required().error('Short description is required'),
            e.max(60).warning('Best to keep the title under 60 characters'),
          ],
        },
        {
          name: 'long',
          type: 'array',
          of: [
            { type: 'image' },
            {
              type: 'block',
              marks: {
                decorators: [
                  { title: 'Emphasis', value: 'em' },
                  { title: 'Strong', value: 'strong' },
                  { title: 'Code', value: 'code' },
                  { title: 'Underline', value: 'underline' },
                  { title: 'Strike', value: 'strike-through' },
                  {
                    title: 'Highlight',
                    value: 'highlight',
                    icon: () => 'H',
                    component: highlighter,
                  },
                ],
              },
            },
            {
              name: 'code',
              type: 'code',
              title: 'Code Block',
              options: { withFilename: true, highlightedLines: true },
            },
          ],
          title: 'Long',
          description: 'Long description of the blog post',
          validation: (e: Rule) =>
            e.required().error('Long description is required'),
        },
      ],
    },

    {
      name: 'images',
      type: 'object',
      title: 'Images',
      description:
        'The project LCP images (e.g. https://www.google.com/someimage.png)',
      fields: [
        {
          name: 'icon',
          type: 'image',
          title: 'Icon',
          description:
            'Rendered as a small square image on /projects (e.g. https://www.google.com/someicon.png)',
        },
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          description:
            'Rendered as a large image header (e.g. https://www.google.com/someimage.png)',
        },
      ],
    },

    {
      name: 'links',
      type: 'object',
      title: 'Links',
      description: 'Links for the project',
      fields: [
        {
          name: 'repo',
          type: 'url',
          title: 'Repository',
          description: 'Link to the repository',
          validation: (e: Rule) =>
            e.uri({ scheme: ['https'] }).error('Only HTTPS is allowed'),
        },
        {
          name: 'demo',
          type: 'url',
          title: 'Demo',
          description: 'Link to the demo',
          validation: (e: Rule) =>
            e.uri({ scheme: ['https'] }).error('Only HTTPS is allowed'),
        },
        {
          name: 'extra',
          type: 'array',
          title: 'Extra',
          description: 'Extra links',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  type: 'string',
                  title: 'Title',
                  description: 'Title of the extra link',
                  validation: (e: Rule) =>
                    e.required().error('Title is required'),
                },
                {
                  name: 'url',
                  type: 'url',
                  title: 'URL',
                  description: 'Link to the extra link',
                  validation: (e: Rule) => [
                    e.required().error('URL is required'),
                    e.uri({ scheme: ['https'] }).error('Only HTTPS is allowed'),
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    {
      name: 'technologies',
      type: 'array',
      title: 'Technologies',
      description: 'Technologies used in the project',
      of: [{ type: 'reference', to: [{ type: 'skills' }] }],
    },

    {
      name: 'timeframe',
      type: 'object',
      title: 'Timeframe',
      description: 'The project timeframe',
      fields: [
        {
          name: 'start',
          type: 'datetime',
          title: 'Start',
          initialValue: () => new Date().toISOString().substring(0, 10),
          validation: (e: Rule) => e.required().error('Start date is required'),
        },
        {
          name: 'end',
          type: 'datetime',
          title: 'End',
          validation: (e: Rule) =>
            e
              .min(e.valueOfField('start'))
              .error('End date cannot be earlier than start date'),
        },
      ],
    },
  ],
};
