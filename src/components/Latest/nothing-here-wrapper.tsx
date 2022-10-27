import { FlexProps } from "@chakra-ui/react";
import NothingHere from "./nothing-here";

interface NothingHereWrapperProps extends FlexProps {
  valid: boolean;
}

const NothingHereWrapper: React.FC<
  React.PropsWithChildren<NothingHereWrapperProps>
> = ({ valid, children, ...rest }) => {
  return valid ? <>{children}</> : <NothingHere {...rest} />;
};

export default NothingHereWrapper;
