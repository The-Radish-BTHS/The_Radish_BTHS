// https://github.com/LekoArts/gatsby-starter-prismic/blob/master/src/components/SEO/SEO.jsx

import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

// Complete tutorial: https://www.gatsbyjs.org/docs/add-seo-component/

const Seo = ({ title, desc, banner, pathname, collection, node }) => {
  const { site } = useStaticQuery(query)

  const {
    buildTime,
    siteMetadata: {
      siteUrl,
      defaultTitle,
      defaultDescription,
      headline,
      defaultBanner,
    },
  } = site

  const seo = {
    title: title || defaultTitle,
    description: desc || defaultDescription,
    image: `${siteUrl}${banner || ''}`,
    url: `${siteUrl}${pathname || ''}`,
  }

  // schema.org in JSONLD format
  // https://developers.google.com/search/docs/guides/intro-structured-data
  // You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')

  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    url: siteUrl,
    headline,
    mainEntityOfPage: siteUrl,
    description: defaultDescription,
    name: defaultTitle,
    dateModified: (node !== null ? node.date : buildTime),
    image: {
      '@type': 'ImageObject',
      url: `${siteUrl}${defaultBanner}`,
    },
  }

  // Initial breadcrumb list

  const itemListElement = [
    {
      '@type': 'ListItem',
      item: {
        '@id': siteUrl,
        name: 'Homepage',
      },
      position: 1,
    },
  ]

  let schemaCollection = null

  if (collection) {
    schemaCollection = {
      '@context': 'http://schema.org',
      '@type': 'Article',
      publisher: {
        '@type': 'Organization',
        name: "The Radish",
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}`,
        },
      },
      datePublished: (node !== null ? node.date : null),
      description: seo.description,
      headline: seo.title,
      url: seo.url,
      name: seo.title,
      image: {
        '@type': 'ImageObject',
        url: seo.image,
      },
      mainEntityOfPage: seo.url,
    }
    // Push current blogpost into breadcrumb list
    itemListElement.push({
      '@type': 'ListItem',
      item: {
        '@id': seo.url,
        name: seo.title,
      },
      position: 2,
    })
  }

  const breadcrumb = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    description: 'Breadcrumbs list',
    name: 'Breadcrumbs',
    itemListElement,
  }

  return (
    <Helmet title={seo.title}>
      <html lang="en" />

      <meta property="og:type" content="website" />
      <title property="og:title">{seo.title}</title>
      <meta property="og:description" name="description" content={seo.description} />
      <meta property="og:image" name="image" content={seo.image} />
      <meta property="og:site_name" content="The Radish" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* <meta name="site-name" content="The Radish BTHS" /> */}
      <meta name="theme-color" content="#ad1507" />

      {/* Insert schema.org data conditionally (webpage/collection) + everytime (breadcrumbs) */}
      {!collection && <script type="application/ld+json">{JSON.stringify(schemaOrgWebPage)}</script>}
      {collection && <script type="application/ld+json">{JSON.stringify(schemaCollection)}</script>}
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
    </Helmet>
  )
}

export default Seo

Seo.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  banner: PropTypes.string,
  pathname: PropTypes.string,
  collection: PropTypes.bool,
  node: PropTypes.object,
}

Seo.defaultProps = {
  title: null,
  desc: null,
  banner: null,
  pathname: null,
  collection: false,
  node: null,
}

const query = graphql`
  query SEO {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        siteUrl
        defaultTitle: title
        defaultDescription: description
        defaultBanner: banner
        headline
      }
    }
  }
`
