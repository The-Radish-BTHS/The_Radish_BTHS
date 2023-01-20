import { Tooltip } from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const InfoTooltip: React.FC<{ text: string }> = ({ text }) => (
  <Tooltip
    label={text}
    placement="top"
    bg="custom.bg"
    border="1px solid black"
    color="black"
    borderRadius="0.25rem">
    <div>
      <AiOutlineInfoCircle />
    </div>
  </Tooltip>
);

export default InfoTooltip;
