import NextAuth, { type NextAuthOptions } from "next-auth";
import prisma from "@/server/db/prisma.server";
import GoogleProvider from "next-auth/providers/google";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { customSlugify } from "@lib/helpers.server";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;

        const person = await prisma.person.findUnique({
          where: { id: user.personId },
        });
        if (!person) throw Error("User does not have a person.");
        session.user.person = person;

        session.user.permission = user.permission;
        session.user.lastTopicCreation = user.lastTopicCreation;
        session.user.lastArticleSubmission = user.lastArticleSubmission;
        session.user.hasSignedUp = user.hasSignedUp;
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
      // @ts-ignore
      profile: async (profile, _tokens) => {
        const slug = customSlugify(profile.name);

        const hasNameCollision = await prisma.person.findUnique({
          where: { slug },
        });
        let count = 2;
        // check if a person with the slug already exists
        if (hasNameCollision) {
          while (true) {
            if (
              !(await prisma.person.findUnique({
                where: { slug: slug + "-" + count.toString() },
              }))
            ) {
              break;
            }
            count++;
          }
        }

        const personData = {
          name: profile.name,
          image: "",
          gradYear: 0,
          description: "",
          slug: hasNameCollision ? slug + "-" + count.toString() : slug,
          articles: {},
          position: "writer",
          isExec: false,
        };

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          permission: profile.perms,
          person: {
            create: personData,
          } as any,
        };
      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
