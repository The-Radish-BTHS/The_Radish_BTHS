// exports.createPages = async ({ actions, graphql, reporter }) => {
//   const { createPage } = actions
//
//   const Article = require.resolve(`./src/templates/article.js`)
//
//   const result = await graphql(`
//     {
//       allMarkdownRemark(
//         sort: { order: DESC, fields: [frontmatter___date] }
//         limit: 1000
//       ) {
//         edges {
//           node {
//             fields {
//               slug
//             }
//           }
//         }
//       }
//     }
//   `)
//
//   // Handle errors
//   if (result.errors) {
//     reporter.panicOnBuild(`Error while running GraphQL query.`)
//     return
//   }
//
//   result.data.allMarkdownRemark.edges.forEach(({ node }) => {
//     // console.log("===========================================================================================================");
//     // console.log("===========================================================================================================");
//     // console.log(node.fields.slug);
//     // console.log(node.fields.title)
//     // console.log(JSON.stringify(node.fields, null, 2));
//     // console.log(JSON.stringify(node.frontmatter, null, 2));
//     // console.log(JSON.stringify(node, null, 4));
//     // console.log("===========================================================================================================");
//     // console.log("===========================================================================================================");
//
//     createPage({
//       path: node.fields.slug,
//       component: Article,
//       context: {
//         // additional data can be passed via context
//         slug: node.fields.slug,
//       },
//     })
//   })
// }

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
