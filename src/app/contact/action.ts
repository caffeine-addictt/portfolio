'use server'

import { Resend } from 'resend'
import { escapeQueryString } from '@utils/strings'

import * as z from 'zod'
import { formSchema } from './form'

const resend = new Resend(process.env.RESEND_API_KEY)

export const onSubmit = async (values: z.infer<typeof formSchema>): Promise<boolean> => {
  try {
    const filteredType = escapeQueryString(values.type)
    const filteredSubject = escapeQueryString(values.subject)
    const filteredMessage = escapeQueryString(values.message)

    resend.emails.send({
      from: 'feedback@contact.ngjx.org',
      to: 'contact@ngjx.org',
      subject: filteredSubject,
      text: filteredMessage,
      html: `
        <h1>${filteredType} from ${values.email}</h1>
        <p>${filteredMessage}</p>
      `
    })
  } catch (err) {
    console.log(`Failed to send email: ${err}`)
    return false
  }

  return true
}
