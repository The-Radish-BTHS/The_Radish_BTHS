import { Tooltip } from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const InfoTooltip: React.FC<{ text: string }> = ({ text }) => (
  <Tooltip
    label={text}
    placement="top"
    bg="#ebeae5"
    border="1px solid black"
    color="black"
    borderRadius="0.25rem">
    <AiOutlineInfoCircle />
  </Tooltip>
);

export default InfoTooltip;
