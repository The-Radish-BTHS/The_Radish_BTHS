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
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  pageIndex,
  title,
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
      maxW="100vw"
      w="100vw"
      maxH="100vh"
      h="100vh"
      overflowX="hidden">
      <Title
        page={
          pageIndex !== undefined ? navigationTabs[pageIndex].name : title ?? ""
        }
      />
      <Topbar image={image} />
      <Flex
        w="100%"
        maxH="100%"
        flex={1}
        padding="6rem 2rem 5rem 2rem"
        px="10rem"
        flexDirection="column"
        overflowY="scroll"
        overflowX="hidden"
        {...rest}>
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;
