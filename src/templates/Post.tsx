import * as React from "react"
import { graphql, Link, PageProps } from "gatsby"
import { Layout } from "../components/Layout"
import { Seo } from "../components/Seo"
import { Main } from "../components/parts/Main"
import styled from "styled-components"
import { IGatsbyImageData } from "gatsby-plugin-image"
import { Content } from "../components/parts/Content"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { Sidebar } from "../components/Sidebar"
import { ArticleHead } from "../components/parts/ArticleHead"
import { Eyecatch } from "../components/parts/Eyecatch"

type WpPostType = {
  readonly wpPost: {
    title: string
    excerpt: string
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

type ContextType = {
  id: string
  next: {
    title: string
    slug: string
  }
  previous: {
    title: string
    slug: string
  }
}

type PostTemplateType = PageProps<WpPostType, ContextType>

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

    & .cat {
      justify-self: center;
      display: grid;
      grid-auto-flow: column;
      column-gap: 10px;
      margin: 0;
      padding: 0;
      list-style-type: none;
    }

    & .catLink {
      justify-self: center;
      display: block;
      padding: 3px 10px;
      border-radius: 20px;
      box-shadow: 0 0 10px var(--blue);
      font-size: var(--f6);
    }
  }

  & .eyecatch {
    aspect-ratio: 16/9;
  }
`

const StyledPostNavigation = styled.nav`
  padding-inline: 10px;

  @media (min-width: 768px) {
    padding-inline: 30px;
  }

  & .nav-links {
    display: grid;
    row-gap: 10px;

    & a {
      display: grid;
      grid-auto-flow: column;
      justify-content: start;
      align-items: center;
      column-gap: 10px;
      border: solid 1px currentColor;
      padding: 10px;
    }
  }

  /* & .nav-previous {
    & span {
      justify-self: start;
    }
  } */

  & .nav-next {
    & a {
      justify-content: end;

      span {
        justify-self: end;
      }
    }
  }
`

const Post = ({ data, location, pageContext }: PostTemplateType) => {
  const {
    date,
    dateJP,
    modified,
    modifiedJP,
    title,
    excerpt,
    categories,
    featuredImage,
    content,
  } = data.wpPost

  return (
    <Layout>
      <Seo
        pagetitle={title}
        pagepath={location.pathname}
        pagedesc={excerpt
          ?.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "")
          .slice(0, 100)}
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
            <ArticleHead
              date={date}
              dateJP={dateJP}
              modified={modified}
              modifiedJP={modifiedJP}
              title={title}
              categories={categories.nodes}
            />

            <figure className="eyecatch">
              <Eyecatch featuredImage={featuredImage} alt={title} />
            </figure>

            <Content content={content} />

            <StyledPostNavigation
              className="post-navigation"
              role="navigation"
              aria-label="投稿"
            >
              <h2 className="screen-reader-text">投稿ナビゲーション</h2>
              <div className="nav-links">
                {pageContext.next && (
                  <div className="nav-previous">
                    <Link to={`/blog/${pageContext.next.slug}/`} rel="prev">
                      <FontAwesomeIcon icon={faChevronLeft} />
                      <span>{pageContext.next.title}</span>
                    </Link>
                  </div>
                )}
                {pageContext.previous && (
                  <div className="nav-next">
                    <Link to={`/blog/${pageContext.previous.slug}/`} rel="next">
                      <span>{pageContext.previous.title}</span>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                  </div>
                )}
              </div>
            </StyledPostNavigation>
          </StyledArticle>
          <Sidebar />
        </div>
      </Main>
    </Layout>
  )
}

export default Post

export const query = graphql`
  query ($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      excerpt
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
      categories {
        nodes {
          slug
          name
          id
        }
      }
    }
  }
`
