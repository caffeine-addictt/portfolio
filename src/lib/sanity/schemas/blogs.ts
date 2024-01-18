import { Rule } from 'sanity'

export const BlogsSchema = {
  name: 'blogs',
  title: 'blogs',
  type: 'document',
  fields: [
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Slug of the blog post',
      options: {
        source: 'title',
        maxLength: 40
      },
      validation: (e: Rule) => e.required().error('Slug is required')
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title of the blog post',
      validation: (e: Rule) => e.required().error('Title is required')
    },
    {
      name: 'description',
      type: 'object',
      title: 'Description',
      description: 'Description of the blog post',
      fields: [
        {
          name: 'short',
          type: 'string',
          title: 'Short',
          description: 'Short description of the blog post',
          validation: (e: Rule) => e.required().error('Short description is required')
        },
        {
          name: 'long',
          type: 'array',
          of: [{ type: 'block' }, { type: 'image' }],
          title: 'Long',
          description: 'Long description of the blog post',
          validation: (e: Rule) => e.required().error('Long description is required')
        }
      ]
    },


    {
      name: 'timeframe',
      type: 'object',
      title: 'Timeframe',
      description: 'The blog post timeframe',
      fields: [
        {
          name: 'published',
          type: 'date',
          title: 'Published',
          description: 'Published date of the blog post',
          initialValue: () => (new Date()).toISOString().substring(0, 10),
          validation: (e: Rule) => e.required().error('Published date is required')
        },
        {
          name: 'updated',
          type: 'date',
          title: 'Updated',
          description: 'Updated date of the blog post',
          initialValue: () => (new Date()).toISOString().substring(0, 10),
          validation: (e: Rule) => e.required().error('Updated date is required')
        }
      ]
    },


    {
      name: 'images',
      type: 'object',
      title: 'Images',
      description: 'Images of the blog post',
      fields: [
        {
          name: 'icon',
          type: 'image',
          title: 'Icon',
          description: 'Icon of the blog post',
        },
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          description: 'Image of the blog post',
        }
      ]
    },


    {
      name: 'technologies',
      type: 'array',
      title: 'Technologies',
      description: 'Technologies used in the blog post',
      of: [{ type: 'reference', to: [{ type: 'skills' }] }]
    }
  ]
}