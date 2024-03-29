import { signIn, signOut, useSession } from "next-auth/react";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useTheme,
  Divider,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import Link from "next/link";
import { useCanAccess } from "@hooks/useCanAccess";
import { accountTabs } from "./tabs/tabs";
import { useRouter } from "next/router";

const PfpSection: React.FC = () => {
  const { data, status } = useSession();
  const theme = useTheme();
  const { canAccess } = useCanAccess();
  const router = useRouter();
  const bg = theme.styles.global.body.bg;
  const authed = status === "authenticated";

  return authed ? (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        bg="transparent"
        color="black"
        _hover={{ background: "rgba(222, 222, 222, 0.8)" }}
        _active={{ background: "transparent" }}
      >
        {data?.user?.name}
      </MenuButton>
      <MenuList bg={bg} border="1px solid black">
        {accountTabs.map((tab, i) =>
          canAccess(tab.perm || "") ? (
            <MenuItem as={Link} href={tab.route} key={i}>
              {tab.name}
            </MenuItem>
          ) : (
            <></>
          )
        )}
        <Divider />
        <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <button
      style={{ textDecoration: "underline" }}
      onClick={() =>
        signIn("google", {
          callbackUrl: `/sign-up?redirect=${encodeURIComponent(router.asPath)}`,
        })
      }
    >
      Login
    </button>
  );
};

export default PfpSection;
