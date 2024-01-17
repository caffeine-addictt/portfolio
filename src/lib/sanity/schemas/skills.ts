import { Rule } from 'sanity'

export const SkillsSchema = {
  name: 'skills',
  title: 'Skills',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Skill Name',
      description: 'Rendered as tooltip (e.g. JavaScript)',
      validation: (e: Rule) => [
        e.required().error('Skill name is required'),
        e.max(30).warning('Shorter skill names are better')
      ]
    },
    {
      name: 'start_time',
      type: 'datetime',
      title: 'Start Time',
      description: 'Start time of the skill',
      initialValue: () => (new Date()).toISOString().substring(0, 10),
      validation: (e: Rule) => e.required().error('Start time is required')
    },
    {
      name: 'icon',
      type: 'object',
      title: 'Icon URLs',
      description: 'Rendered as a small square image (e.g. https://www.google.com/someicon.png)',
      fields: [
        {
          name: 'dark',
          type: 'url',
          title: 'Dark Mode',
          validation: (e: Rule) => e.uri({ scheme: ['https'] }).error('Only HTTPS is allowed')
        },
        {
          name: 'light',
          type: 'url',
          title: 'Light Mode',
          validation: (e: Rule) => e.uri({ scheme: ['https'] }).error('Only HTTPS is allowed')
        }
      ]
    },
    {
      name: 'href',
      type: 'url',
      title: 'Link URL',
      description: 'Href of the clicked link (e.g. https://www.google.com)',
      validation: (e: Rule) => e.uri({ scheme: ['https'] }).error('Only HTTPS is allowed')
    }
  ],
}
