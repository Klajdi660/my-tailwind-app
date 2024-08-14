import { FC } from "react";
import { ImageProps } from "../../types";

export const Image: FC<ImageProps> = (props) => {
  const { imgUrl, name, width, height, styles } = props;

  return (
    <img
      alt={name}
      src={imgUrl}
      width={width}
      height={height}
      className={styles}
    />
  );
};
