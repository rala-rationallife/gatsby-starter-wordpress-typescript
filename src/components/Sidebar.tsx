import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import styled from "styled-components"

type DataType = {
  wpUser?: {
    avatar: {
      url: string
      width: string
      height: string
    }
    name: string
    description: string
  }
  allWpPost: {
    edges: ReadonlyArray<{
      node: {
        id: string
        title: string
        slug: string
        featuredImage: {
          node: {
            localFile: {
              childImageSharp: {
                gatsbyImageData: IGatsbyImageData
              }
            }

            title: string
            mediaDetails: {
              width: string
              height: string
            }
          }
        }
      }
    }>
  }
}

const StyledSidebar = styled.aside`
  align-self: start;
  display: grid;
  row-gap: 30px;

  @media (min-width: 768px) {
    grid-column: 9 / span 4 !important;
  }

  & section {
    padding: 30px 10px;
    background-color: var(--white);
  }

  & .profile {
    display: grid;
    row-gap: 30px;
    padding: 30px;

    & figure {
      justify-self: center;

      & img {
        width: 140px;
        height: 140px;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    & strong {
      justify-self: center;
      font-size: var(--f3);
    }

    & p {
      font-size: var(--f5);
      margin: 0;
    }
  }

  & .recentPosts {
    display: grid;
    row-gap: 30px;

    & h2 {
      margin: 0;
      justify-self: center;
      font-size: var(--f3);
      font-weight: normal;
    }
  }

  & .postLink {
    display: grid;
    row-gap: 10px;

    & figure {
      aspect-ratio: 16/9;
    }

    & h3 {
      justify-self: center;
      margin: 0;
      font-size: var(--f5);
      font-weight: normal;
    }
  }
`

export const Sidebar: React.VFC = () => {
  const data = useStaticQuery<DataType>(graphql`
    query {
      wpUser {
        avatar {
          url
          width
          height
        }
        name
        description
      }
      allWpPost(sort: { fields: date, order: DESC }, limit: 6) {
        edges {
          node {
            id
            title
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
          }
        }
      }
    }
  `)

  return (
    <StyledSidebar>
      {data.wpUser?.description && (
        <section className="profile">
          <figure>
            <img
              src={data.wpUser.avatar.url}
              alt="profile"
              width={data.wpUser.avatar.width}
              height={data.wpUser.avatar.height}
            />
          </figure>
          <strong>{data.wpUser.name}</strong>
          <p>{data.wpUser.description}</p>
        </section>
      )}
      <section className="recentPosts">
        <h2>最近の記事</h2>
        {data.allWpPost.edges.length > 1 && (
          <>
            {data.allWpPost.edges.map(({ node }) => (
              <article key={node.id}>
                <Link to={`/blog/${node.slug}/`} className="postLink">
                  <figure>
                    <GatsbyImage
                      image={
                        node.featuredImage.node.localFile.childImageSharp
                          .gatsbyImageData
                      }
                      alt={node.title}
                      style={{ height: "100%" }}
                    />
                  </figure>
                  <h3>{node.title}</h3>
                </Link>
              </article>
            ))}
          </>
        )}
      </section>
    </StyledSidebar>
  )
}
