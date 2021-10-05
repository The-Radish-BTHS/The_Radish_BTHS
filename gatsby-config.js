/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const website = require('./config/website')

module.exports = {
  siteMetadata: {
    title: website.title,
    titleAlt: website.titleAlt,
    description: website.description,
    mainUrlNameChangedBcFckGatsby: website.url,
    siteUrl: website.url,
    banner: website.logo,
    headline: website.headline,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sitemap`,
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/assets/`,
        name: "assets",
      },
    },

    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     // path: `/static/assets/`,
    //     path: `${__dirname}/static/assets/`,
    //     name: 'images',
    //   },
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `content`,
    //     path: `${__dirname}/content/`,
    //   },
    // },
    // {
    //   resolve: `gatsby-transformer-remark`,
    //   options: {
    //     plugins: [
    //       `gatsby-remark-relative-images`,
    //       {
    //         resolve: `gatsby-remark-images`,
    //         options: {},
    //       },
    //     ],
    //   },
    // },

    // IMAGES
    // `gatsby-image`,
    // `gatsby-plugin-image`,
    // `gatsby-transformer-sharp`,
    // `gatsby-plugin-sharp`,
    `gatsby-remark-images`,

    // OTHER
    `gatsby-plugin-netlify-cms`,
    // `gatsby-transformer-remark`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-typography`,
    `react-use-flexsearch`,

    {
      // https://www.gatsbyjs.com/plugins/gatsby-plugin-local-search/
      resolve: 'gatsby-plugin-local-search',
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: 'pages',

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: 'flexsearch',

        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        // Note: Only the flexsearch engine supports options.
        engineOptions: 'speed',

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
        {
          allMarkdownRemark {
            nodes {
              id
              frontmatter {
                title
                description
                date(formatString: "MMMM DD, YYYY")
              }
              fields {
                slug
              }
              rawMarkdownBody
              excerpt(pruneLength: 100)
            }
          }
        }
        `,
        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: ['id', 'title', 'slug', 'excerpt', 'date', 'description'],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map((node) => ({
            id: node.id,
            slug: node.fields.slug,
            title: node.frontmatter.title,
            date: node.frontmatter.date,
            body: node.rawMarkdownBody,
            excerpt: node.excerpt,
            description: node.frontmatter.description,
          })),
      },
    },

    // {
    //   resolve: `gatsby-transformer-remark`,
    //   options: {
    //     plugins: [
    //       'gatsby-remark-relative-images',
    //       {
    //         resolve: `gatsby-remark-images`,
    //       },
    //     ],
    //   },
    // },
  ],
}
