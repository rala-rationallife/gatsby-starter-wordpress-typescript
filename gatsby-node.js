const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions

  createRedirect({
    fromPath: "/",
    toPath: "/blog/",
    redirectInBrowser: true,
    isPermanent: true,
  })

  const result = await graphql(`
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
  `)

  if (result.errors) {
    reporter.panicOnBuild(`GraphQLのクエリでエラーが発生しました`)
    return
  }

  result.data.allWpPage.edges.forEach(({ node }) => {
    createPage({
      path: `/${node.slug}/`,
      component: path.resolve("./src/templates/Page.tsx"),
      context: {
        id: node.id,
      },
    })
  })

  result.data.allWpPost.edges.forEach(({ node, previous, next }) => {
    createPage({
      path: `/blog/${node.slug}/`,
      component: path.resolve("./src/templates/Post.tsx"),
      context: {
        id: node.id,
        previous,
        next,
      },
    })
  })

  const postsPerPage = result.data.wp.readingSettings.postsPerPage
  const postsLength = result.data.allWpPost.edges.length
  const postListPages = Math.ceil(postsLength / postsPerPage)

  Array.from({ length: postListPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}/`,
      component: path.resolve("./src/templates/PostList.tsx"),
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
}
