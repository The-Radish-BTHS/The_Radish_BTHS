import { signIn, signOut, useSession } from "next-auth/react";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Text,
  Button,
  useTheme,
  Divider,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

const options = ["one", "two", "three"];
const defaultOption = options[0];

const PfpSection: React.FC = () => {
  const { data, status } = useSession();
  const authed = status === "authenticated";
  const theme = useTheme();
  const bg = theme.styles.global.body.bg;

  return authed ? (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        border="1px solid black"
        bg="transparent"
        color="black"
        _hover={{ background: "rgba(222, 222, 222, 0.8)" }}
        _active={{ background: "transparent" }}>
        Actions
      </MenuButton>
      <MenuList bg={bg} border="1px solid black">
        <MenuItem>Account</MenuItem>
        <MenuItem>Submit an article</MenuItem>
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
