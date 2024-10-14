import { FC } from "react";
import { ImageProps } from "../../types";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Image: FC<ImageProps> = (props) => {
  const { imgUrl, name, width, height, styles, effect } = props;

  return (
    <LazyLoadImage
      alt={name}
      src={imgUrl}
      width={width}
      height={height}
      className={styles}
      effect={effect}
    />
  );
};
