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
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fileAbsolutePath
            fields {
              slug
            }
            frontmatter {
              date(formatString: "YYYY-MM")
            }
          }
        }
      }
    }
  `) 

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    let mindate = node.frontmatter.date;
    let maxdate = mindate.slice(5)+toString(Number(mindate.slice(-2))+1);
    createPage({
      path: node.fields.slug,
      component: node.fileAbsolutePath.includes('/articles/') ?  path.resolve(`./src/templates/article.js`) : path.resolve(`./src/templates/issue.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        mindate: mindate,
        maxdate: maxdate,
      },
    })
  })
}
