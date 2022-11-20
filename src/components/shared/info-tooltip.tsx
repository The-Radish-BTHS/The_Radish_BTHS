import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";

const InfoTooltip: React.FC<{ text: string }> = ({ text }) => (
  <Tooltip
    label={text}
    placement="top"
    bg="#ebeae5"
    border="1px solid black"
    color="black"
    borderRadius="0.25rem">
    <InfoOutlineIcon />
  </Tooltip>
);

export default InfoTooltip;
