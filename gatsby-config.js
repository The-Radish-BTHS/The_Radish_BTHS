/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `The Radish`,
    description: `Brooklyn Technical's first, worst, and only satirical newspaper.`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        // path: `/static/assets/`,
        path: `${__dirname}/static/assets/`,
        name: 'images',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {},
          },
        ],
      },
    },

    // IMAGES
    `gatsby-image`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    // OTHER
    `gatsby-plugin-netlify-cms`,
    // `gatsby-transformer-remark`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-typography`,

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
