import { UserPermission } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const useCanAccess = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const permission = data?.user?.permission;

  if (
    !data?.user?.hasSignedUp &&
    status === "authenticated" &&
    router.pathname !== "/sign-up"
  )
    router.push(`/sign-up?redirect=${encodeURIComponent(router.asPath)}`);

  const canAccess = (val: "exec" | "editor" | "artist" | "normie" | "") => {
    if (permission === UserPermission.EXEC || val === "") {
      return true;
    }
    if (val === "editor") {
      return (
        permission === UserPermission.EDITOR ||
        permission === UserPermission.TEAMS_MEMBER
      );
    } else if (val === "artist") {
      return (
        permission === UserPermission.ARTIST ||
        permission === UserPermission.TEAMS_MEMBER
      );
    } else if (val === "normie") {
      return !!data;
    }

    return false;
  };

  return { canAccess };
};
