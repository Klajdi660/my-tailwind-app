import { FunctionComponent } from "react";
import { ImageProps } from "../../types";

export const Image: FunctionComponent<ImageProps> = (props) => {
  const { imgUrl, name, width, height, styles } = props;

  return (
    <img
      src={imgUrl}
      alt={name}
      width={width}
      height={height}
      className={styles}
    />
  );
};
