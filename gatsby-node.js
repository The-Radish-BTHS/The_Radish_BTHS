const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = ({ node, getNode, actions }) => {
  // console.log(`node data:${JSON.stringify(node, null, 2)}`);
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// path.resolve(`./src/templates/issue.js`)
// https://www.gatsbyjs.com/docs/tutorial/part-seven/
// node.fields.label == "Article" ?  path.resolve(`./src/templates/article.js`) : path.resolve(`./src/templates/issue.js`)
exports.createPages = async ({ graphql, actions }) => {
  // Articles and issue routing ------------------------------------------------
  const { createPage } = actions
  const content = await graphql(`
    query content {
      allMarkdownRemark {
        edges {
          node {
            fileAbsolutePath
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  content.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component:
        node.fileAbsolutePath.includes('/articles/') ? path.resolve(`./src/templates/article.js`)
        : node.fileAbsolutePath.includes('/authors/') ? path.resolve(`./src/templates/author.js`)
        : node.fileAbsolutePath.includes('/tags/') ? path.resolve(`./src/templates/tag.js`)
        : path.resolve(`./src/templates/issue.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        title: node.frontmatter.title,
      },
    })
  })

  // Author routing ------------------------------------------------------------
  // const authors = await graphql(`
  //   query authors {
  //     allMarkdownRemark(filter: {fields: {slug: {regex: "^/authors/"}}}) {
  //       edges {
  //         node {
  //           fileAbsolutePath
  //           fields {
  //             slug
  //           }
  //           frontmatter {
  //             title # The name
  //           }
  //         }
  //       }
  //     }
  //   }
  // `)
  //
  // authors.data.allMarkdownRemark.edges.forEach(({ node }) => {
  //   createPage({
  //     path: node.fields.slug,
  //     component: path.resolve(`./src/templates/author.js`),
  //     context: {
  //       // Data passed to context is available
  //       // in page queries as GraphQL variables.
  //       slug: node.fields.slug,
  //       name: node.frontmatter.title,
  //     },
  //   })
  // })
}
