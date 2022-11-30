import { UserPermission } from "@prisma/client";
import { useSession } from "next-auth/react";

export const useCanAccess = () => {
  const { data } = useSession();
  const permission = data?.user?.permission;

  const canAccess = (val: "exec" | "editor" | "artist" | "normie") => {
    if (permission === UserPermission.EXEC) {
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
