module.exports = {
  title: `The Radish`, // Navigation and Site Title
  titleAlt: `The Radish`, // Title for JSONLD
  description: `Brooklyn Technical's first, worst, and only club.`,
  url: `https://theradishbths.com`,

  headline: "The Radish, Brooklyn Tech's first, worst, and only satirical website", // Headline for schema.org JSONLD
  logo: '/static/radimir.png', // Used for SEO

  // JSONLD / Manifest
  favicon: 'src/favicon.ico', // Used for manifest favicon generation
  shortName: 'The Radish', // shortname for manifest. MUST be shorter than 12 characters
  author: 'The Radish', // Author for schemaORGJSONLD
  skipNavId: 'reach-skip-nav', // ID for the "Skip to content" a11y feature
}
