import { Flex, FlexProps } from "@chakra-ui/react";
import Title from "./title";
import Topbar from "./topbar";
import { navigationTabs } from "./tabs/tabs";
import client from "@/cms/cms-data";
import { useEffect, useState } from "react";

interface LayoutProps extends FlexProps {
  pageIndex?: number;
  title?: string;
  header?: string;
  imgUrl?: string;
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  pageIndex,
  title,
  imgUrl,
  header,
  children,
  ...rest
}) => {
  const [image, setImage] = useState("/images/happyish.png");

  useEffect(() => {
    const getImage = async () => {
      const iconData =
        await client.fetch(`*[_type == 'fileData' && title == 'Icon'] {
        "image": file.asset->url
      }`);

      setImage(iconData[0].image);
    };

    getImage();
  }, []);

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      maxW="100vw"
      w="100vw"
      maxH="100vh"
      h="100vh"
      overflowY="scroll"
      overflowX="hidden"
    >
      <Title
        page={
          pageIndex !== undefined ? navigationTabs[pageIndex].name : title ?? ""
        }
        imgUrl={imgUrl}
      />
      <Topbar image={image} />
      <Flex
        w={{ base: "100%", lg: "65rem" }}
        flex={1}
        py="6rem"
        px={{
          base: "1rem",
          sm: "2rem",
          md: "5rem",
          lg: "2rem",
          xl: "0",
        }}
        flexDirection="column"
        {...rest}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;
