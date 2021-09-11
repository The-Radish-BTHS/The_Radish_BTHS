const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const fs = require('fs')

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

function createPaginationJSON(pathSuffix, pagePosts, collection) {
  const dir = "public/paginationJson/"
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  const filePath = dir+collection+pathSuffix+".json";
  const dataToSave = JSON.stringify(pagePosts);
  fs.writeFile(filePath, dataToSave, function(err) {
    if(err) {
      return console.log(err);
    }
  });
}

function paginateCollection(collection, allPosts, postsPerPage) {
  const posts = allPosts.filter(({node}) => node.fileAbsolutePath.includes(`/${collection}/`));

  const numPages = Math.ceil(posts.length / postsPerPage);
  for (var i = 0; i <= numPages; i++) {
    const pathSuffix = i+1;

    // Get posts for this page
    const startInclusive = i * postsPerPage;
    const endExclusive = startInclusive + postsPerPage;
    const pagePosts = posts.slice(startInclusive, endExclusive)

    createPaginationJSON(pathSuffix, pagePosts, collection);
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const content = await graphql(`
    query content {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            id
            fileAbsolutePath
            excerpt(pruneLength: 100)
            frontmatter {
              title
              description
              issue
              date(formatString: "MMMM YYYY")
              position
              former
              description
              authors {
                author
              }
              tags {
                tag
              }
            }
            fields {
              slug
              rel_cover {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED)
                }
              }
            }
          }
        }
      }
    }
  `)

  const allPosts = content.data.allMarkdownRemark.edges
  const postsPerPage = 5
  paginateCollection("articles", allPosts, postsPerPage)
  paginateCollection("authors", allPosts, postsPerPage)
  paginateCollection("issues", allPosts, postsPerPage)

  const articleTemplate = path.resolve(`./src/templates/article.js`);
  const authorTemplate = path.resolve(`./src/templates/author.js`);
  const tagTemplate = path.resolve(`./src/templates/tag.js`);
  const aboutTemplate = path.resolve(`./src/templates/about.js`);
  const issueTemplate = path.resolve(`./src/templates/issue.js`);

  allPosts.forEach(({ node }) => {
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
