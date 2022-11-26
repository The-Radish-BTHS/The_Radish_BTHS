import { UserPermission } from "@prisma/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import SubmitEdited from "@components/pages/submit/submit-edited";
import ArticleSubmit from "@components/pages/submit/article-submit";
import { useRouter } from "next/router";

export type InputData = {
  title: string;
  content: string;
};

const Submit: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const isEditing =
    sessionData &&
    sessionData?.user?.permission !== UserPermission.NORMIE &&
    router.query.m?.toString() === "1";

  return isEditing ? <SubmitEdited /> : <ArticleSubmit />;
};

export default Submit;
