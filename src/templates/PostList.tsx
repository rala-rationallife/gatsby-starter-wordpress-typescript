import * as React from "react"
import { graphql, Link, PageProps } from "gatsby"
import { Layout } from "../components/Layout"
import { Seo } from "../components/Seo"
import { Main } from "../components/parts/Main"
import { Sidebar } from "../components/Sidebar"
import styled from "styled-components"
import { IGatsbyImageData } from "gatsby-plugin-image"
import { Pagination } from "../components/parts/Pagination"
import { ArticleHead } from "../components/parts/ArticleHead"
import { Eyecatch } from "../components/parts/Eyecatch"

type AllWpPostType = {
  allWpPost: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        id: string
        slug: string
        readonly featuredImage: {
          readonly node: {
            readonly localFile: {
              readonly childImageSharp: {
                gatsbyImageData: IGatsbyImageData
              }
            }
            title: string
            readonly mediaDetails: {
              width: string
              height: string
            }
          }
        }
        date: string
        dateJP: string
        modified: string
        modifiedJP: string
        title: string
        excerpt: string
        readonly categories: {
          readonly nodes: ReadonlyArray<{
            id: string
            slug: string
            name: string
          }>
        }
      }
    }>
  }
}

type ContextType = {
  pages: number
  currentPage: number
  isFirst: number
  isLast: number
}

type PostListTemplateType = PageProps<AllWpPostType, ContextType>

const StyledPostList = styled.div`
  display: grid;
  row-gap: 30px;

  @media (min-width: 768px) {
    grid-column: 1 / span 8 !important;
  }

  & .articleLink {
    display: grid;
    row-gap: 30px;
    padding-block: 30px;
    background-color: var(--white);
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

  & .figureLink {
    &:hover {
      opacity: 1;
    }
  }

  & .excerpt {
    padding-inline: 10px;

    @media (min-width: 768px) {
      padding-inline: 30px;
    }

    & p {
      margin: 0;
    }
  }

  & .more {
    justify-self: center;
    border: solid 1px currentColor;
    padding: 15px 30px;

    @media (min-width: 768px) {
      font-size: var(--f4);
    }
  }
`

const PostList = ({ data, location, pageContext }: PostListTemplateType) => {
  return (
    <Layout>
      <Seo pagepath={location.pathname} />
      <Main>
        <div className="myGrid">
          <StyledPostList>
            {data.allWpPost.edges.map(({ node }) => (
              <article key={node.id} className="articleLink">
                <ArticleHead
                  date={node.date}
                  dateJP={node.dateJP}
                  modified={node.modified}
                  modifiedJP={node.modifiedJP}
                  title={node.title}
                  slug={`/blog/${node.slug}/`}
                  categories={node.categories.nodes}
                />
                <Link to={`/blog/${node.slug}/`} className="figureLink">
                  <Eyecatch
                    featuredImage={node.featuredImage}
                    alt={node.title}
                  />
                </Link>
                <div
                  className="excerpt"
                  dangerouslySetInnerHTML={{
                    __html: node.excerpt,
                  }}
                />
                <Link to={`/blog/${node.slug}/`} className="more">
                  ???????????????
                </Link>
              </article>
            ))}
            {pageContext.pages > 1 && (
              <Pagination
                first={pageContext.isFirst}
                last={pageContext.isLast}
                current={pageContext.currentPage}
                preSlug={`blog`}
              />
            )}
          </StyledPostList>
          <Sidebar />
        </div>
      </Main>
    </Layout>
  )
}

export default PostList

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    allWpPost(sort: { order: DESC, fields: date }, skip: $skip, limit: $limit) {
      edges {
        node {
          id
          slug
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData(layout: FULL_WIDTH)
                }
              }
              title
              mediaDetails {
                width
                height
              }
            }
          }
          date
          dateJP: date(formatString: "YYYY/MM/DD")
          modified
          modifiedJP: modified(formatString: "YYYY/MM/DD")
          title
          excerpt
          categories {
            nodes {
              id
              slug
              name
            }
          }
        }
      }
    }
  }
`
