import client from "@/cms/cms-data";
import { useState, useEffect } from "react";

export const useRadishLogoImage = () => {
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

  return image;
};
