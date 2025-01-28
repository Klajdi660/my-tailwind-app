import { FC, useState } from "react";
import dayjs from "dayjs";
import { GameTabReviews } from "./GameTabReviews";
import {
  Tab,
  ReadMore,
  DeveloperList,
  PublisherList,
  PlatformIconList,
} from "../../components";
import { GameTabDetailProps } from "../../types";
import { dateFormatList, gameTabsButton } from "../../data";

export const GameTabDetail: FC<GameTabDetailProps> = (props) => {
  const { gameDetail, gameReviews } = props;
  const {
    released,
    developers,
    publishers,
    description_raw,
    parent_platforms,
  } = gameDetail;

  const [currentTab, setCurrentTab] = useState("overall");

  const released_date = dayjs(released).format(dateFormatList[0]);

  return (
    <>
      <Tab
        tabs={gameTabsButton}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <div className="mt-10 text-lg text-onNeutralBg">
        {currentTab === "overall" && (
          <>
            <p className="text-onNeutralBg font-medium mb-3">STORY</p>
            <ReadMore
              limitTextLength={250}
              className="text-secondary text-justify"
            >
              {description_raw}
            </ReadMore>
            <p className="font-medium mt-8 mb-3">DETAILS</p>
            {/* <p className="flex gap-1">
              Developer: <DeveloperList developers={developers} />
            </p> */}
            <p className="flex gap-1">
              Publisher: <PublisherList publishers={publishers} />
            </p>
            <p className="flex gap-1">
              Release Date:
              <span className="text-secondary">{released_date}</span>
            </p>
            <p className="flex flex-raw gap-1 items-center">
              Platform:
              <PlatformIconList
                platforms={parent_platforms.map((p: any) => p.platform)}
              />
            </p>
          </>
        )}
        {currentTab === "reviews" && (
          <GameTabReviews gameReviews={gameReviews} />
        )}
        {currentTab === "developer" && (
          <DeveloperList developers={developers} publishers={publishers} />
        )}
      </div>
    </>
  );
};
