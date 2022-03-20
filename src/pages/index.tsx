import * as React from "react"
import { graphql } from "gatsby"
import { Layout } from "../components/Layout"
import { Seo } from "../components/Seo"

const IndexPage = () => {
  return (
    <Layout>
      <Seo />
      <h1>Hello, world!</h1>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query GatsbyNode {
    wp {
      readingSettings {
        postsPerPage
      }
    }
    allWpPage {
      edges {
        node {
          id
          slug
        }
      }
    }
    allWpPost(sort: { fields: date, order: DESC }) {
      edges {
        node {
          id
          slug
        }
        previous {
          title
          slug
        }
        next {
          title
          slug
        }
      }
    }
    allWpCategory {
      edges {
        node {
          id
          slug
          name
          posts {
            nodes {
              title
            }
          }
        }
      }
    }
  }
`
