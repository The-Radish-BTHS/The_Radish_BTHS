import { Text } from "@chakra-ui/react";
import Link from "@components/link";
import { useCanAccess } from "@hooks/useCanAccess";
import { useRouter } from "next/router";
import { ITab } from "./tabs";

export const Tab: React.FC<{ tab: ITab }> = ({ tab }) => {
  const router = useRouter();
  const { canAccess } = useCanAccess();

  return canAccess(tab.perm ?? "") ? (
    <Link href={tab.route ?? ""}>
      <Text
        fontSize={{ base: "1.2rem", md: "1rem" }}
        fontWeight={router.pathname === tab.route ? 600 : 400}>
        {" "}
        {tab.name}
      </Text>
    </Link>
  ) : (
    <></>
  );
};
