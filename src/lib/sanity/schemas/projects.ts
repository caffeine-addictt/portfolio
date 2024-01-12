import { Rule } from 'sanity'

export const ProjectsSchema = {
  name: 'projects',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title of the project',
      validation: (e: Rule) => [
        e.required().error('Title is required'),
        e.max(40).warning('Best to keep the title under 40 characters')
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
            e.max(60).warning('Best to keep the title under 60 characters')
          ],
        },
        {
          name: 'long',
          type: 'array',
          of: [{ type: 'block' }],
          title: 'Long',
          description: 'Rendered as dropdown text',
          validation: (e: Rule) => e.required().error('Description is required'),
        },
      ]
    },


    {
      name: 'icon',
      type: 'url',
      title: 'Icon URL',
      description: 'Rendered as a small square image (e.g. https://www.google.com/someicon.png)',
      validation: (e: Rule) => e.uri({ scheme: ['https'] }).error('Only HTTPS is allowed')
    },
    {
      name: 'repository_link',
      type: 'url',
      title: 'Repository Link',
      description: 'Link to the repository',
      validation: (e: Rule) => e.uri({ scheme: ['https'] }).error('Only HTTPS is allowed')
    },
    {
      name: 'demo_link',
      type: 'url',
      title: 'Demo Link',
      description: 'Link to the demo',
      validation: (e: Rule) => e.uri({ scheme: ['https'] }).error('Only HTTPS is allowed')
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
          initialValue: () => (new Date()).toISOString(),
          validation: (e: Rule) => [
            e.required().error('Start date is required'),
            e.max(e.valueOfField('end')).error('Start date cannot be later than end date')
          ]
        },
        {
          name: 'end',
          type: 'datetime',
          title: 'End',
          validation: (e: Rule) => e.min(e.valueOfField('start')).error('End date cannot be earlier than start date')
        }
      ]
    }
  ]
}
