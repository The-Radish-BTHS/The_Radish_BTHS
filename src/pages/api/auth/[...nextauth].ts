import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma.server";
import { customSlugify } from "@lib/helpers.server";
import { Person } from "@prisma/client";
import { getPerson } from "@lib/getters/unique-getters.server";

const createPerson = async (personData: Person) => {
  const response = await fetch(
    `/api/create?type=person&&secret=${process.env.SECRET}`,
    {
      method: "post",
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(personData),
    }
  )
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((e) => {
      console.error(e);
      return e;
    });

  return response;
};

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // @ts-ignore
        session.user.person = await getPerson(user.personSlug);
        // @ts-ignore
        session.user.permission = user.permission;
      }
      return session;
    },
  },

  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      profile: async (profile, tokens) => {
        const slug = customSlugify(profile.name);
        const personData = {
          name: profile.name,
          image: "",
          gradYear: 2024,
          description: "",
          slug: slug,
          articles: {},
          position: "writer",
          isExec: false,
        };

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          perms: profile.perms,
          person: {
            connectOrCreate: {
              where: {
                slug: slug,
              },
              create: personData,
            },
          },
        };
      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
