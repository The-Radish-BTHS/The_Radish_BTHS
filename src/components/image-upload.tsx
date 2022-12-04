import { Box, Center, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useIsMobile } from "@hooks/useIsMobile";
import { useRef, useState } from "react";

interface IImageUploadProps {
  name: string;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export const ImageUpload: React.FC<IImageUploadProps> = ({
  name,
  files,
  setFiles,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        name={name}
        id={name}
        accept="image/png"
        autoComplete="off"
        multiple
        style={{ display: "none" }}
        onChange={(evt) => {
          if (evt.target.files && evt.target.files[0]) {
            console.log(evt.target.files);
            setFiles(Array.from(evt.target.files));
          }
        }}
      />
      {files?.length && (
        <Text mb="0.5rem" fontWeight={700}>
          {files.length} Files Uploaded
        </Text>
      )}
      <Box
        position="relative"
        onClick={() => fileInputRef.current?.click()}
        sx={{
          "&:hover .overlay": {
            opacity: 1,
          },
        }}
      >
        <Flex
          border="1px solid black"
          w="100%"
          h="15rem"
          borderRadius="0.75rem"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Heading>
            {files?.length ? "Change your Graphics?" : "Upload Your Art!!!!"}
          </Heading>
          <Text>
            {files?.length ? "Need to switch it up?" : "1-877-Art-For-Toby"}
          </Text>
        </Flex>
        <Box
          _hover={{ cursor: "pointer" }}
          className="overlay"
          position="absolute"
          top={0}
          left={0}
          bottom={0}
          right={0}
          h="100%"
          w="100%"
          opacity={0}
          transition="0.2s ease-in"
          backdropFilter="brightness(110%)"
          borderRadius="16px"
        />
      </Box>
    </>
  );
};
