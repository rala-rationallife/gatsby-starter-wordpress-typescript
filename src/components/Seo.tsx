import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Helmet } from "react-helmet"

type SeoProps = {
  pagetitle?: string
  pagedesc?: string
  pagepath?: string
  pageimg?: string
  blogimg?: string
  pageimgw?: string
  pageimgh?: string
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
    }
  }
}

export const Seo: React.VFC<SeoProps> = props => {
  const data: DataType = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          lang
          locale
        }
      }
    }
  `)

  const title = props.pagetitle
    ? `${props.pagetitle}`
    : data.site.siteMetadata.title

  const description = props.pagedesc || data.site.siteMetadata.description

  const url = props.pagepath
    ? `${data.site.siteMetadata.siteUrl}${props.pagepath}`
    : data.site.siteMetadata.siteUrl

  const imgurl = props.pageimg
    ? `${data.site.siteMetadata.siteUrl}${props.pageimg}`
    : props.blogimg || `${data.site.siteMetadata.siteUrl}/ralacode_thumb.png`

  const imgw = props.pageimgw || `1280`
  const imgh = props.pageimgh || `640`

  const publishDate = props.publishDate
    ? `${props.publishDate}`
    : `2021 年 02 月 08 日`

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
      name: "Rala",
      url: "https://twitter.com/radiologis2",
    },
  }

  return (
    <Helmet>
      <html lang={data.site.siteMetadata.lang} />
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={url} />

      <meta property="og:site_name" content={data.site.siteMetadata.title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={data.site.siteMetadata.locale} />

      <meta name="thumbnail" content={imgurl} />

      <meta property="og:image" content={imgurl} />
      <meta property="og:image:width" content={imgw} />
      <meta property="og:image:height" content={imgh} />

      <meta name="twitter:card" content="summary_large_image" />

      <script type="application/ld+json">
        {JSON.stringify(jsonLdConfigs)}
      </script>
    </Helmet>
  )
}
