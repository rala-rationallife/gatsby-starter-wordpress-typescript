import * as React from "react"
import { graphql, Link, PageProps } from "gatsby"
import { Layout } from "../components/Layout"
import { Seo } from "../components/Seo"
import { Main } from "../components/parts/Main"
import { Sidebar } from "../components/Sidebar"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import styled from "styled-components"
import { DefaultImage } from "../components/parts/DefaultImage"
import { Pagination } from "../components/parts/Pagination"

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
  catName: string
  catSlug: string
}

type CatListTemplateType = PageProps<AllWpPostType, ContextType>

const StyledCatList = styled.div`
  display: grid;
  row-gap: 30px;

  @media (min-width: 768px) {
    grid-column: 1 / span 8 !important;
  }

  & .catTitle {
    font-size: var(--f3);

    @media (min-width: 768px) {
      font-size: var(--f2);
    }
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

      & h1 {
        font-size: var(--f3);
        margin: 0;
        padding: 0;
        text-align: center;

        @media (min-width: 768px) {
          font-size: var(--f2);
        }
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

const CatList = ({ data, location, pageContext }: CatListTemplateType) => {
  return (
    <Layout>
      <Seo
        pagetitle={`「${pageContext.catName}」に関する記事`}
        pagedesc={`「${pageContext.catName}」に関する記事一覧です`}
        pagepath={location.pathname}
      />
      <Main>
        <div className="myGrid">
          <StyledCatList>
            <div className="catTitle">{`「${pageContext.catName}」に関する記事`}</div>
            {data.allWpPost.edges.map(({ node }) => (
              <article key={node.id} className="articleLink">
                <div className="postHead">
                  <div className="date">
                    <time dateTime={node.date}>{node.dateJP}</time>
                    {node.dateJP !== node.modifiedJP && (
                      <time
                        dateTime={node.modified}
                      >{`（更新日: ${node.modifiedJP}）`}</time>
                    )}
                  </div>
                  <Link to={`/blog/${node.slug}/`} className="title">
                    <h1>{node.title}</h1>
                  </Link>
                  <ul className="cat">
                    {node.categories.nodes.map(cat => (
                      <li key={cat?.id}>
                        <Link
                          to={`/category/${cat?.slug}/`}
                          className="catLink"
                        >
                          {cat?.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to={`/blog/${node.slug}/`}>
                  <figure className="eyecatch">
                    {node.featuredImage ? (
                      <GatsbyImage
                        image={
                          node.featuredImage.node.localFile.childImageSharp
                            .gatsbyImageData
                        }
                        alt={node.title}
                        style={{ height: "100%" }}
                      />
                    ) : (
                      <DefaultImage />
                    )}
                  </figure>
                </Link>
                <div
                  className="excerpt"
                  dangerouslySetInnerHTML={{
                    __html: node.excerpt,
                  }}
                />
                <Link to={`/blog/${node.slug}/`} className="more">
                  記事を読む
                </Link>
              </article>
            ))}
            {pageContext.pages > 1 && (
              <Pagination
                first={pageContext.isFirst}
                last={pageContext.isLast}
                current={pageContext.currentPage}
                preSlug={`${pageContext.catSlug}`}
              />
            )}
          </StyledCatList>
          <Sidebar />
        </div>
      </Main>
    </Layout>
  )
}

export default CatList

export const query = graphql`
  query ($skip: Int!, $limit: Int!, $catId: String!) {
    allWpPost(
      sort: { order: DESC, fields: date }
      skip: $skip
      limit: $limit
      filter: { categories: { nodes: { elemMatch: { id: { eq: $catId } } } } }
    ) {
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
