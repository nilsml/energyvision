/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStaticProps, GetStaticPaths } from 'next'
import { sanityClient, getClient } from '../lib/sanity.server'
import { groq } from 'next-sanity'
import { getQueryFromSlug } from '../lib/queryFromSlug'
import ErrorPage from 'next/error'
import dynamic from 'next/dynamic'
import { usePreviewSubscription } from '../lib/sanity'

const HomePage = dynamic(() => import('../tempcomponents/pages/Home'))
const TopicPage = dynamic(() => import('../tempcomponents/pages/TopicPage'))

export default function Page({ data, preview }: any) {
  const { data: pageData } = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    initialData: data?.pageData,
    enabled: preview,
  })
  console.log('docType in page', data?.docType)
  if (data?.docType === 'home') {
    return <HomePage />
  }

  if (!data) {
    return <ErrorPage statusCode={418} />
  }

  return <div>{data?.docType === 'page' && <TopicPage data={pageData.content} />}</div>
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
  if (params && !params.slug) {
    return {
      props: {
        docType: 'home',
      },
    }
  }

  const { query, queryParams, docType } = getQueryFromSlug(params?.slug as string[])
  const pageData = await getClient(preview).fetch(query, queryParams)
  console.log('data', pageData)
  return {
    props: {
      data: { query, queryParams, pageData, docType },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pageQueries = await sanityClient.fetch(groq`*[_type in ["news"] && defined(slug.current)][].slug.current`)

  return {
    paths: pageQueries.map((slug: string) => ({
      params: { slug: slug.split('/').filter((p) => p) },
    })),
    fallback: true,
  }
}