import { FunctionComponent } from "react";
import { TopPlayCard } from "../Cards";
import { Title } from "../UI";
import { useStore } from "../../hooks";
import { classNames } from "../../utils";
import { TrackCardSkeleton, TitleSkeleton } from "../Skeleton";

interface TopPlaySectionProps {
  gameList: any;
  listDivider?: boolean;
  imageDims?: string;
  skeletonItemNumber?: number;
  enableTitle?: boolean;
}

export const TopPlaySection: FunctionComponent<TopPlaySectionProps> = (
  props
) => {
  const {
    gameList,
    listDivider = true,
    imageDims = "16",
    skeletonItemNumber = 5,
    enableTitle = true,
  } = props;

  const { loading } = useStore();

  return (
    <>
      {loading && (
        <div className="animate_skeleton">
          {enableTitle && <TitleSkeleton type="top-pick" />}
          <TrackCardSkeleton
            number={skeletonItemNumber}
            imageDims={imageDims}
          />
        </div>
      )}
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
    </>
  );
};
