import type { GatsbyNode } from "gatsby"
import path from "path"

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage, createRedirect } = actions

  createRedirect({
    fromPath: `/`,
    toPath: `/blog/`,
    redirectInBrowser: true,
    isPermanent: true,
  })

  const result = await graphql<GatsbyTypes.GatsbyNodeQuery>(`
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
  `)

  if (result.errors) {
    reporter.panicOnBuild(`GraphQLのクエリでエラーが発生しました`)
    return
  }

  result.data?.allWpPage.edges.forEach(({ node }) => {
    createPage({
      path: `/${node.slug}/`,
      component: path.resolve(`src/templates/Page.tsx`),
      context: {
        id: node.id,
      },
    })
  })

  result.data?.allWpPost.edges.forEach(({ node, previous, next }) => {
    createPage({
      path: `/blog/${node.slug}/`,
      component: path.resolve(`src/templates/Post.tsx`),
      context: {
        id: node.id,
        previous,
        next,
      },
    })
  })

  const postsPerPage = result.data?.wp?.readingSettings?.postsPerPage || 6
  const postsLength = result.data?.allWpPost.edges.length

  if (!postsLength) {
    throw new Error("There is no file match gatsby-astronaut")
  }

  const postListPages = Math.ceil(postsLength / postsPerPage)

  Array.from({ length: postListPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}/`,
      component: path.resolve(`src/templates/PostList.tsx`),
      context: {
        skip: postsPerPage * i,
        limit: postsPerPage,
        pages: postListPages,
        currentPage: i + 1,
        isFirst: i + 1 === 1,
        isLast: i + 1 === postListPages,
      },
    })
  })

  result.data?.allWpCategory.edges.forEach(({ node }) => {
    const catPostsPerPage = result.data?.wp?.readingSettings?.postsPerPage || 6
    const catPostsLength = node.posts?.nodes?.length

    if (!catPostsLength) {
      throw new Error("There is no file match gatsby-astronaut")
    }

    const catPages = Math.ceil(catPostsLength / catPostsPerPage)

    Array.from({ length: catPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/category/${node.slug}/`
            : `/category/${node.slug}/${i + 1}/`,
        component: path.resolve(`src/templates/CatList.tsx`),
        context: {
          catId: node.id,
          catName: node.name,
          catSlug: node.slug,
          pages: catPages,
          skip: catPostsPerPage * i,
          limit: catPostsPerPage,
          currentPage: i + 1,
          isFirst: i + 1 === 1,
          isLast: i + 1 === catPages,
        },
      })
    })
  })
}
