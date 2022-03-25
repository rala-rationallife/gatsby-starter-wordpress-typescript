import * as React from "react"
import { graphql, Link, PageProps } from "gatsby"
import { Layout } from "../components/Layout"
import { Seo } from "../components/Seo"
import { Main } from "../components/parts/Main"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import { Sidebar } from "../components/Sidebar"
import styled from "styled-components"
import { DefaultImage } from "../components/parts/DefaultImage"
import { Content } from "../components/parts/Content"

type WpPageType = {
  readonly wpPage: {
    title: string
    content: any
    date: string
    dateJP: string
    modified: string
    modifiedJP: string
    readonly featuredImage?: {
      readonly node: {
        readonly localFile: {
          readonly childImageSharp: {
            gatsbyImageData: IGatsbyImageData
          }
          url: string
        }
        readonly mediaDetails: {
          width: string
          height: string
        }
      }
    }
    readonly categories: {
      readonly nodes: ReadonlyArray<{
        slug: string
        name: string
        id: string
      }>
    }
  }
}

type PageTemplateType = PageProps<WpPageType>

const StyledArticle = styled.article`
  display: grid;
  align-self: start;
  row-gap: 30px;
  background-color: var(--white);
  padding-block: 30px;

  @media (min-width: 768px) {
    grid-column: 1 / span 8 !important;
  }

  & .postHead {
    display: grid;
    row-gap: 30px;
    padding-inline: 10px;

    & .date {
      justify-self: center;
    }

    & .title {
      justify-self: center;
      font-size: var(--f3);
      margin: 0;
      padding: 0;
      text-align: center;

      @media (min-width: 768px) {
        font-size: var(--f2);
      }
    }
  }

  & .eyecatch {
    aspect-ratio: 16/9;
  }
`

const Page = ({ data, location }: PageTemplateType) => {
  const { date, dateJP, modified, modifiedJP, title, featuredImage, content } =
    data.wpPage

  return (
    <Layout>
      <Seo
        pagetitle={title}
        pagepath={location.pathname}
        pagedesc={content
          ?.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "")
          .slice(0, 70)}
        pagetype={`article`}
        blogimg={featuredImage?.node.localFile.url}
        pageimgw={featuredImage?.node.mediaDetails.width}
        pageimgh={featuredImage?.node.mediaDetails.height}
        publishDate={date}
        updateDate={modified}
      />
      <Main>
        <div className="myGrid">
          <StyledArticle>
            <div className="postHead">
              <div className="date">
                <time dateTime={date}>{dateJP}</time>
                {dateJP !== modifiedJP && (
                  <time
                    dateTime={data.wpPage?.modified}
                  >{`（更新日: ${modifiedJP}）`}</time>
                )}
              </div>
              <h1 className="title">{title}</h1>
            </div>

            <figure className="eyecatch">
              {featuredImage ? (
                <GatsbyImage
                  image={
                    featuredImage.node.localFile.childImageSharp.gatsbyImageData
                  }
                  alt={title}
                  style={{ height: "100%" }}
                />
              ) : (
                <DefaultImage />
              )}
            </figure>

            <Content content={content} />
          </StyledArticle>
          <Sidebar />
        </div>
      </Main>
    </Layout>
  )
}

export default Page

export const query = graphql`
  query ($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      content
      date
      dateJP: date(formatString: "YYYY/MM/DD")
      modified
      modifiedJP: modified(formatString: "YYYY/MM/DD")
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
            url
          }
          mediaDetails {
            width
            height
          }
        }
      }
    }
  }
`
