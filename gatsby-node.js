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
     const rel_cover = "../.." + cover
     createNodeField({
       node,
       name: 'rel_cover',
       value: rel_cover
     })
   }
  }
}

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
}
