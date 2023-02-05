import Head from "next/head";

const description =
  "The Radish BTHS is Brooklyn Tech's first, worst, and only monthly satirical newspaper. Every month, The Radish delivers a fresh batch of articles to the hungry mouths of Brooklyn Technical High School students everywhere.";

const Title: React.FC<{ page?: string; imgUrl?: string }> = ({
  page = "",
  imgUrl,
}) => {
  const title = `${page && `${page} | `}Radish`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="theme-color" content="#ad1507" />
      <meta property="og:site_name" content="The Radish" />
      <meta property="og:title" content="The Radish" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content=" " />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imgUrl} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imgUrl} />
    </Head>
  );
};

export default Title;
