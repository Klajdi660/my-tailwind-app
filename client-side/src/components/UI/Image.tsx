import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { noImg } from "../../assets";
import { ImageProps } from "../../types";

export const Image: FC<ImageProps> = (props) => {
  const { imgUrl, name, width, height, styles, effect, onClick } = props;

  const img = imgUrl ? imgUrl : noImg;

  return (
    <LazyLoadImage
      alt={name}
      src={img}
      width={width}
      height={height}
      className={styles}
      effect={effect}
      onClick={onClick}
    />
  );
};
