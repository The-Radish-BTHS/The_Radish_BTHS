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
  const articles_and_issues = await graphql(`
    query articles_and_issues {
      allMarkdownRemark(filter: {fields: {slug: {regex: "^/issues/|/articles/"}}}) {
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

  articles_and_issues.data.allMarkdownRemark.edges.forEach(({ node }) => {
    let mindate = node.frontmatter.date.slice(0, 7);

    let next_month = (Number(mindate.slice(5, 7))+1).toString();
    next_month = (next_month.length === 2) ? next_month : "0"+next_month;
    let maxdate = mindate.slice(0, 5)+next_month;

    createPage({
      path: node.fields.slug,
      component: node.fileAbsolutePath.includes('/articles/') ? path.resolve(`./src/templates/article.js`) : path.resolve(`./src/templates/issue.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        mindate: mindate,
        maxdate: maxdate,
      },
    })
  })

  // Author routing ------------------------------------------------------------
  const authors = await graphql(`
    query authors {
      allMarkdownRemark(filter: {fields: {slug: {regex: "^/authors/"}}}) {
        edges {
          node {
            fileAbsolutePath
            fields {
              slug
            }
            frontmatter {
              title # The name
            }
          }
        }
      }
    }
  `)

  authors.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/author.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        name: node.frontmatter.title,
      },
    })
  })
}
