// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
// We should at some point use typescript
// import type { Topics } from '../../helpers/topics'
import { slugWithType } from '../objects/slugWithType'

// export default ({ topicPrefix, title }: { topicPrefix: Topics; title: string }) => {
export default (topicPrefix, title) => {
  return {
    type: 'document',
    name: `${topicPrefix}_page`,
    title: `${title} Page`,
    fieldsets: [
      {
        title: 'Slug',
        name: 'slug',
        description: 'Some clever description of the slug woo',
        options: {
          collapsible: true,
          collapsed: false,
        },
      },
    ],
    fields: [
      {
        name: 'topicPrefix',
        initialValue: `${topicPrefix}`,
        type: 'string',
        hidden: true,
      },
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'topicSlug',
        type: 'string',
        title: 'Topic slug',
        placeholder: 'E.g. "Experienced professionals"',
        description: 'The unique part of the URL for this topic page. Should probably be something like the title.',
        validation: (Rule) => Rule.max(200),
        fieldset: 'slug',
      },
      slugWithType(topicPrefix, 'topicSlug', 'slug'),
    ],
  }
}