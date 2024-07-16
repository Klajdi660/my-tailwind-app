import { FunctionComponent } from "react";
import { TopPlayCard } from "../Cards";
import { Title } from "../UI";
import { classNames } from "../../utils";

interface TopPlaySectionProps {
  gameList: any;
  listDivider?: boolean;
  imageDims?: string;
}

export const TopPlaySection: FunctionComponent<TopPlaySectionProps> = (
  props
) => {
  const { gameList, listDivider = true, imageDims = "16" } = props;

  return (
    <div className="topPlay-section">
      <Title name="Top Play Games" type="medium" divider={false} />
      <div className="">
        <div className={classNames("list_content")}>
          <ul className="flex flex-col w-full list-none">
            {gameList?.length &&
              gameList?.map((item: any) => {
                return (
                  <TopPlayCard
                    key={item.id}
                    item={item}
                    imageDims={imageDims}
                    listDivider={listDivider}
                  />
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};
