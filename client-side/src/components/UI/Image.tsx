import { FunctionComponent } from "react";

interface ImageProps {
  imgUrl: string;
  name?: string;
  width?: number;
  height?: number;
  styles?: string;
}

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
