import { authOptions } from "@/pages/api/auth/[...nextauth]";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { unstable_getServerSession, User } from "next-auth";
import prisma from "../db/prisma.server";

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  let user: User | undefined;

  const session = await unstable_getServerSession(
    opts.req,
    opts.res,
    authOptions
  );
  user = session?.user;

  return {
    user,
    prisma,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
