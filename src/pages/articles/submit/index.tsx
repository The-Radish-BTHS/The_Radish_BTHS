import ArticleType from "@/types/article";
import DefaultSubmit from "@components/submit/default-submit";
import EditorSubmit from "@components/submit/editor-submit";
import { getArticle } from "@lib/getters/unique-getters.server";
import { PersonPerms } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";

const Submit: NextPage<{ isEditing: boolean; article: ArticleType | null }> = ({
  isEditing,
  article,
}) => {
  const { data } = useSession();
  const isEditor = data?.user?.permission !== PersonPerms.NORMIE;

  return isEditing && isEditor ? (
    <EditorSubmit article={article} />
  ) : (
    <DefaultSubmit name={data?.user?.name ?? ""} />
  );
};

export default Submit;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mode = context.query.m === "1";

  const slug = context.query.slug?.toString();
  const article = await (slug ? getArticle(slug) : null);

  return {
    props: { isEditing: mode, article },
  };
};
