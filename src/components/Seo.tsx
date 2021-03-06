import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Helmet } from "react-helmet"

type Props = {
  pagetitle?: string
  pagedesc?: string
  pagepath?: string
  pagetype?: string
  pageimg?: string
  blogimg?: string
  pageimgw?: any
  pageimgh?: any
  publishDate?: string
  updateDate?: string
}

type DataType = {
  site: {
    siteMetadata: {
      title: string
      description: string
      siteUrl: string
      lang: string
      locale: string
      twitter: string
    }
  }
  wp: {
    generalSettings: {
      title: string
      description: string
      language: string
    }
  }
}

export const Seo: React.VFC<Props> = props => {
  const data = useStaticQuery<DataType>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          lang
          locale
          twitter
        }
      }
      wp {
        generalSettings {
          title
          description
          language
        }
      }
    }
  `)

  const lang =
    data.wp.generalSettings.language || data.site.siteMetadata.lang || `ja`

  const siteName =
    data.wp.generalSettings.title ||
    data.site.siteMetadata.title ||
    `Site Title`

  const title = props.pagetitle
    ? `${props.pagetitle}`
    : data.wp.generalSettings.title ||
      data.site.siteMetadata.title ||
      `Site Title`

  const description = props.pagedesc
    ? `${props.pagedesc}`
    : data.wp.generalSettings.description ||
      data.site.siteMetadata.description ||
      ``

  const url = props.pagepath
    ? `${data.site.siteMetadata.siteUrl}${props.pagepath}`
    : data.site.siteMetadata.siteUrl

  const type = props.pagetype ? `${props.pagetype}` : `website`

  const imgurl = props.pageimg
    ? `${data.site.siteMetadata.siteUrl}${props.pageimg}`
    : props.blogimg || `${data.site.siteMetadata.siteUrl}/default_image.jpg`

  const imgw = props.pageimgw || `1920`
  const imgh = props.pageimgh || `1280`

  const publishDate = props.publishDate
    ? `${props.publishDate}`
    : `2022 ??? 01 ??? 01 ???`

  const updateDate = props.updateDate && `${props.updateDate}`

  const jsonLdConfigs = {
    "@context": "http://schema.org",
    "@type": "Article",
    headline: title,
    datePublished: publishDate,
    dateModified: updateDate,
    image: imgurl,
    url: url,
    author: {
      "@type": "Person",
      name: "Author",
      url: "https://example.com",
    },
  }

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={url} />

      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={data.site.siteMetadata.locale} />

      <meta name="thumbnail" content={imgurl} />

      <meta property="og:image" content={imgurl} />
      <meta property="og:image:width" content={imgw} />
      <meta property="og:image:height" content={imgh} />

      <meta name="twitter:card" content="summary_large_image" />
      {data.site.siteMetadata.twitter !== `@exampletwitter123` && (
        <meta name="twitter:site" content={data.site.siteMetadata.twitter} />
      )}
      {data.site.siteMetadata.twitter !== `@exampletwitter123` && (
        <meta name="twitter:creator" content={data.site.siteMetadata.twitter} />
      )}

      <script type="application/ld+json">
        {JSON.stringify(jsonLdConfigs)}
      </script>
    </Helmet>
  )
}
