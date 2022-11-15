import ArticleType from "@/types/article";
import DefaultSubmit from "@components/submit/default-submit";
import EditorSubmit from "@components/submit/editor-submit";
import {
  getArticleSlugs,
  getPeople,
  getTopics,
} from "@lib/getters/many-getters.server";
import { getArticle } from "@lib/getters/unique-getters.server";
import { Person, PersonPerms, Topic } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";

const Submit: NextPage<{
  isEditing: boolean;
  article: ArticleType | null;
  topics: Topic[];
  people: Person[];
  articleSlugs: string[];
}> = ({ isEditing, article, topics, people, articleSlugs }) => {
  const { data } = useSession();
  const isEditor = data?.user?.permission !== PersonPerms.NORMIE;

  return isEditing && isEditor ? (
    <EditorSubmit article={article} topics={topics} people={people} />
  ) : (
    <DefaultSubmit
      name={data?.user?.name ?? ""}
      topics={topics}
      people={people}
      articleSlugs={articleSlugs}
    />
  );
};

export default Submit;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mode = context.query.m === "1";

  const slug = context.query.slug?.toString();
  const article = await (slug ? getArticle(slug) : null);

  const topics = await getTopics();
  const people = await getPeople();
  const articleSlugs = await getArticleSlugs();

  return {
    props: { isEditing: mode, article, topics, people, articleSlugs },
  };
};
