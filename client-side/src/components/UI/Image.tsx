import { FunctionComponent } from "react";

interface ImageProps {
  imgUrl: string;
  name?: string;
  width?: number;
  styles?: string;
}

export const Image: FunctionComponent<ImageProps> = (props) => {
  const { imgUrl, name, width, styles } = props;

  return <img src={imgUrl} alt={name} width={width} className={styles} />;
};
