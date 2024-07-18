import { FunctionComponent, useState } from "react";
import dayjs from "dayjs";
import {
  ReadMore,
  PlatformIconList,
  DeveloperList,
  PublisherList,
} from "../Common";
import { dateFormatList } from "../../data";

interface GameTabDetailProps {
  gameDetail: any;
}

export const GameTabDetail: FunctionComponent<GameTabDetailProps> = (props) => {
  const { gameDetail } = props;
  const {
    description_raw,
    developers,
    publishers,
    parent_platforms,
    released,
  } = gameDetail;

  const [currentTab, setCurrentTab] = useState("overall");

  const tabButtons = ["overall", "cast", "reviews", "seasons"];

  const released_date = dayjs(released).format(dateFormatList[0]);

  return (
    <>
      <ul className="flex gap-10 text-secondary text-lg justify-center">
        {tabButtons.map((btnName: string, index: number) => (
          <li
            key={index}
            // className={detail?.media_type === "movie" ? "last:hidden" : ""}
          >
            <button
              onClick={() => setCurrentTab(btnName)}
              className={`hover:text-primary transition duration-300 pb-1 ${
                currentTab === btnName &&
                "font-medium -translate-y-2 border-b-2 border-primary text-onNeutralBg"
              }`}
            >
              {btnName[0].toUpperCase() + btnName.slice(1)}
            </button>
          </li>
        ))}
      </ul>
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
            <p className="flex gap-1">
              Developer: <DeveloperList developers={developers} />
            </p>
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
        {currentTab !== "overall" && (
          <ul className="flex text-primary text-2xl font-bold justify-center">
            <p>Coming soon</p>
          </ul>
        )}
      </div>
    </>
  );
};
