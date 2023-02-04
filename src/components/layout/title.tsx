import Head from "next/head";

const Title: React.FC<{ page?: string; imgUrl?: string }> = ({
  page = "",
  imgUrl,
}) => {
  const title = `${page && `${page} | `}Radish`;
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content="The Radish" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content=" " />
      <meta
        property="og:description"
        content="The Radish BTHS is Brooklyn Tech's first, worst, and only monthly satirical newspaper. Every month, The Radish delivers a fresh batch of articles to the hungry mouths of Brooklyn Technical High School students everywhere."
      />
      <meta name="theme-color" content="#ad1507" />
      <meta content={imgUrl} property="twitter:card" />
      <meta content={imgUrl} property="og:image" />
    </Head>
  );
};

export default Title;
