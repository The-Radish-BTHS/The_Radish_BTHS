import { Center, Flex, Heading, Text, Textarea } from "@chakra-ui/react";
import Button from "@components/button";
import { trpc } from "@lib/trpc";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "@components/pages/submit/styles.module.css";
import { useIsMobile } from "@hooks/useIsMobile";
import InfoTooltip from "@components/info-tooltip";
import { ErrorMessage } from "@hookform/error-message";
import Layout from "@components/layout/layout";

interface NewUserData {
  name: string;
  gradYear: number;
  description: string;
}

const SignUpPage: NextPage = () => {
  const completeSignUp = trpc.person.update.useMutation();
  const { data: session } = useSession();
  const router = useRouter();
  const isMobile = useIsMobile();

  const { handleSubmit, register, setValue } = useForm<NewUserData>({
    criteriaMode: "all",
    defaultValues: {
      name: "",
      gradYear: new Date().getFullYear() + 4,
      description: "",
    },
  });

  useEffect(() => {
    setValue("name", session?.user?.name ?? "");
  }, [session, setValue]);

  if (!session?.user) return <Text>Loading</Text>;
  // TODO: callback urls
  if (session?.user.hasSignedUp) router.push("/");

  // TOOD: UI
  return (
    <Layout title="Sign Up!" alignItems="center">
      <Heading fontSize="3rem">Hello Newfound Radishian!</Heading>
      <Text fontSize="1.25rem">We see that you are new around here.</Text>
      <Text fontSize="1.25rem">Tell us a bit more about yourself!</Text>
      <Text fontSize="1.25rem">(You can always change this info later)</Text>

      <form
        autoComplete="off"
        onKeyDown={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
        onSubmit={handleSubmit(async (data) => {
          await completeSignUp.mutateAsync({
            ...data,
            gradYear: parseInt(data.gradYear.toString()),
            completeSignUp: true,
          });
          // TODO: callback urls
          router.push("/");
        })}
        className={styles["form-wrapper"]}
        style={{ width: isMobile ? "85vw" : "60vw" }}>
        <p>
          Your Name:<span style={{ color: "red" }}> *</span>
        </p>

        <input
          required
          placeholder="Name"
          {...register("name", {
            required: true,
          })}
          className={styles["form-element-margin"]}
        />

        <p>
          Graduation Year:<span style={{ color: "red" }}> *</span>
        </p>

        <input
          required
          type="number"
          placeholder="Graduation Year"
          {...register("gradYear", {
            required: true,
          })}
          className={styles["form-element-margin"]}
        />

        <p>Description:</p>

        <input
          placeholder="Description"
          {...register("description", {
            required: true,
          })}
          className={styles["form-element-margin"]}
        />

        <Button type="submit" mt="1rem">
          Join Now!
        </Button>
      </form>
    </Layout>
  );
};

export default SignUpPage;
