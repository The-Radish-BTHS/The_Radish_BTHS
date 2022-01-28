module.exports = {
  title: `The Radish`, // Navigation and Site Title
  titleAlt: `The Radish`, // Title for JSONLD
  description: `The Radish BTHS is Brooklyn Tech's first, worst, and only monthly satirical newspaper. Every month, The Radish delivers a fresh batch of articles to the hungry mouths of Brooklyn Technical High School students everywhere.`,
  url: `https://theradishbths.com`,

  headline: "The Radish BTHS is Brooklyn Tech's first, worst, and only monthly satirical newspaper.", // Headline for schema.org JSONLD
  logo: '/static/radimir.png', // Used for SEO

  // JSONLD / Manifest
  favicon: 'src/favicon.ico', // Used for manifest favicon generation
  shortName: 'The Radish', // shortname for manifest. MUST be shorter than 12 characters
  author: 'The Radish', // Author for schemaORGJSONLD
  skipNavId: 'reach-skip-nav', // ID for the "Skip to content" a11y feature
}
