import { Rule } from 'sanity';

export const TestimonialSchema = {
  name: 'testimonials',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name of the person',
      validate: (e: Rule) => e.required().error('Name is required'),
    },
    {
      name: 'occupation',
      type: 'string',
      title: 'Occupation',
      description: 'Occupation of the person at the time',
      validation: (e: Rule) => e.required().error('Occupation is required'),
    },
    {
      name: 'quote',
      type: 'text',
      title: 'Quote',
      description: 'Quote of the person',
      validation: (e: Rule) => e.required().error('Quote is required'),
    },
    {
      name: 'issued_at',
      type: 'datetime',
      title: 'Issued At',
      description: 'Date when the quote was issued',
      validation: (e: Rule) => e.required().error('Date is required'),
    },
  ],
};
