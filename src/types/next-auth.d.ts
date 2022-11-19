import { Person, PersonPerms } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      permission: PersonPerms;
      person: Person;
    } & DefaultSession["user"];
  }

  interface User extends DefaultSession["user"] {
    perms: Permission;
    person:
      | Person
      | {
          connectOrCreate: {
            where: {
              slug: string;
            };
            create: Person;
          };
        };
  }
}
