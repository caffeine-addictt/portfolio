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
      name: 'Icon',
      type: 'url',
      title: 'Icon URL',
      description: 'Rendered as a small square image (e.g. https://www.google.com/someicon.png)',
      validation: (e: Rule) => e.uri({ scheme: ['https'] }).error('Only HTTPS is allowed')
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
