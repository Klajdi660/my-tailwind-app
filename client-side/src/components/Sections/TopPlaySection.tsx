import { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  Title,
  TopPlayCard,
  TitleSkeleton,
  ShowMoreButton,
  TrackCardSkeleton,
} from "../../components";
import { paths } from "../../data";
import { useStore } from "../../hooks";
import { classNames } from "../../utils";
import { TopPlaySectionProps } from "../../types";

export const TopPlaySection: FC<TopPlaySectionProps> = (props) => {
  const {
    gameList,
    imageDims = "16",
    listDivider = true,
    enableTitle = true,
    skeletonItemNumber = 5,
  } = props;

  const { BROWSE } = paths;

  const { loading } = useStore();

  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <div className="animate_skeleton">
          {enableTitle && <TitleSkeleton type="top-pick" />}
          <TrackCardSkeleton
            number={skeletonItemNumber}
            imageDims={imageDims}
          />
        </div>
      ) : (
        <div className="topPlay-section">
          <Title
            name="Top Play Games"
            type="medium"
            divider={false}
            className="px-3 mt-2"
          />
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
          <div className="flex items-center justify-center group">
            <ShowMoreButton onClick={() => navigate(BROWSE)} />
          </div>
        </div>
      )}
    </>
  );
};
