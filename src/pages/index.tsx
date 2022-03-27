import * as React from "react"
import { graphql } from "gatsby"
import { Layout } from "../components/Layout"
import { Seo } from "../components/Seo"
import { Main } from "../components/parts/Main"
import { Sidebar } from "../components/Sidebar"

const IndexPage: React.VFC = () => {
  return (
    <Layout>
      <Seo />
      <Main>
        <div className="myGrid">
          <Sidebar />
        </div>
      </Main>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
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
