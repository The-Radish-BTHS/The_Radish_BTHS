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

  // https://github.com/netlify/netlify-cms/issues/325#issuecomment-354514547
  // https://github.com/gatsbyjs/gatsby/issues/2995#issuecomment-408072399
  const { frontmatter } = node
  if (frontmatter) {
   const { cover } = frontmatter
   if (cover && !cover.startsWith("../..")) {
     const rel_cover = "../../static/" + cover
     createNodeField({
       node,
       name: 'rel_cover',
       value: rel_cover
     })
   }
  }
}

// The highlighted issue's cards might not be from that issue
// const { graphql } = require(`gatsby`)
// const newest_issue = graqhql`
//   query newest_issue {
//     allMarkdownRemark(
//       sort: {order: DESC, fields: [frontmatter___date]}
//       limit: 1
//       filter: {fields: {slug: {regex: "^/issues/"}}}
//     ) {
//       edges {
//         node {
//           id
//         }
//       }
//     }
//   }
// `
// https://www.gatsbyjs.com/docs/creating-and-modifying-pages/#pass-context-to-pages
// exports.onCreatePage = ({ page, actions }) => {
//   const { createPage, deletePage } = actions
//   deletePage(page)
//   createPage({
//     ...page,
//     context: {
//       ...page.context,
//       house: `Gryffindor`,
//     },
//   })
// }

exports.createPages = async ({ graphql, actions }) => {
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
              issue
              title
            }
          }
        }
      }
    }
  `)

  const articleTemplate = path.resolve(`./src/templates/article.js`);
  const authorTemplate = path.resolve(`./src/templates/author.js`);
  const tagTemplate = path.resolve(`./src/templates/tag.js`);
  const aboutTemplate = path.resolve(`./src/templates/about.js`);
  const issueTemplate = path.resolve(`./src/templates/issue.js`);

  content.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component:
        node.fileAbsolutePath.includes('/articles/') ? articleTemplate
        : node.fileAbsolutePath.includes('/authors/') ? authorTemplate
        : node.fileAbsolutePath.includes('/tags/') ? tagTemplate
        : node.fileAbsolutePath.includes('/about/') ? aboutTemplate
        : issueTemplate,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        title: node.frontmatter.title,
        issue: node.frontmatter.issue,
      },
    })
  })
}
