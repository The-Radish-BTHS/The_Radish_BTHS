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

const PfpSection: React.FC = () => {
  const { data, status } = useSession();
  const authed = status === "authenticated";
  const theme = useTheme();
  const bg = theme.styles.global.body.bg;
  const { canAccess } = useCanAccess();

  return authed ? (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        bg="transparent"
        color="black"
        _hover={{ background: "rgba(222, 222, 222, 0.8)" }}
        _active={{ background: "transparent" }}>
        {data?.user?.name}
      </MenuButton>
      <MenuList bg={bg} border="1px solid black">
        <MenuItem as={Link} href="/account">
          Account
        </MenuItem>
        <MenuItem as={Link} href="/articles/submit">
          Submit an article
        </MenuItem>
        {canAccess("editor") && (
          <MenuItem as={Link} href="/editor-dashboard">
            Editor Dashboard
          </MenuItem>
        )}
        {canAccess("artist") && (
          <MenuItem as={Link} href="/artsy-dashboard">
            Artsy Dashboard
          </MenuItem>
        )}
        {canAccess("exec") && (
          <MenuItem as={Link} href="/eggsex">
            Exec Dashboard
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <button
      style={{ textDecoration: "underline" }}
      onClick={() => signIn("google")}>
      Login
    </button>
  );
};

export default PfpSection;
