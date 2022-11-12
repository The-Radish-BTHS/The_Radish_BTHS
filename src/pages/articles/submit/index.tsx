import DefaultSubmit from "@components/submit/default-submit";
import EditorSubmit from "@components/submit/editor-submit";
import { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";

const Submit: NextPage<{ isEditing: boolean }> = ({ isEditing }) => {
  const { status } = useSession();
  const isEditor = status === "authenticated";

  return isEditing && isEditor ? <EditorSubmit /> : <DefaultSubmit />;
};

export default Submit;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mode = context.query.m === "1";

  return {
    props: { isEditing: mode },
  };
};
