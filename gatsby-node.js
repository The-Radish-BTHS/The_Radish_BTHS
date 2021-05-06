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
              date
            }
          }
        }
      }
    }
  `)

  console.log("============================ DATES ============================")

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    let mindate = node.frontmatter.date.slice(0, 7);

    let next_month = (Number(mindate.slice(5, 7))+1).toString();
    next_month = (next_month.length === 2) ? next_month : "0"+next_month;
    let maxdate = mindate.slice(0, 5)+next_month;

    console.log("--------------------------------------------------------------")
    console.log("MIN:", mindate)
    console.log("MAX:", maxdate)
    console.log("--------------------------------------------------------------")

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
