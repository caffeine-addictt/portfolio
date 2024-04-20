import * as React from 'react';
import { Metadata } from 'next';
import { ContactForm } from './form';

export const metadata: Metadata = {
  title: 'Contact Me!',
  description:
    'Have any feedback you want to share with me? Fill out the form below and I will get back to you as soon as possible!',
};

const ContactPage = () => (
  <div
    className="mb-4 mt-16 flex h-full w-full flex-col items-center"
    style={{ minHeight: 'calc(100vh - 64px)' }}
  >
    <h1 className="my-8 text-5xl font-bold text-accent-light dark:text-accent-dark">
      Contact Me
    </h1>
    <ContactForm />
  </div>
);
export default ContactPage;
