import { configureBlockContent } from '../editors/blockContentType'

const blockContentType = configureBlockContent()
const ingressBlockContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: false,
  attachment: false,
  lists: true,
})

const validateIngress = (value) => {
  if (!value || value.length === 0) {
    return 'Required'
  }

  const count = value[0].children.reduce((total, current) => total + current.text.length, 0)

  if (count > 400) {
    return `Ingress cannot be longer than 400 characters. Currently ${count} characters long.`
  }

  return true
}

export default {
  title: 'News',
  type: 'document',
  name: 'news',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Publication date and time',
      description: 'Date and time of when the article will be published',
      name: 'publishDateTime',
      type: 'datetime',
      options: {
        timeStep: 15,
        calendarTodayLabel: 'Today',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      // TODO: Figure out a way to run a slugify function before publish
      // so that users don't have to add hyphens and such themselves
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: "Danger zone! Be sure that you know what you're doing!",
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          if (slug && slug.current.match(/[A-Z]/g)) {
            return 'No uppercase letters are allowed'
          } else if (slug && slug.current.match(/\s+/g)) {
            return 'No spaces are allowed, use "-" instead'
          }
          return true
        }),
    },
    {
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.',
          options: {
            isHighlighted: true,
          },
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
        {
          name: 'attribution',
          type: 'string',
          title: 'Attribution',
        },
      ],
    },
    {
      name: 'ingress',
      title: 'Ingress',
      description: 'Lead paragraph. Shown in article and on cards. Max 400 characters',
      type: 'array',
      of: [ingressBlockContentType],
      validation: (Rule) => Rule.custom((value) => validateIngress(value)),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [blockContentType, { type: 'blockQuote' }, { type: 'imageWithAltAndCaption' }, { type: 'factbox' }],
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value || value.length === 0) {
            return 'Required'
          }
          return true
        }),
    },
  ],
}
