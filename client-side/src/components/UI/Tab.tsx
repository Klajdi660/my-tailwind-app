import { FunctionComponent } from "react";
import { useStore } from "../../hooks";
import { TabProps } from "../../types";
import { classNames } from "../../utils";
import { Skeleton } from "../Skeleton/Skeleton";

export const Tab: FunctionComponent<TabProps> = (props) => {
  const { tabs, currentTab, setCurrentTab } = props;

  const { loading } = useStore();

  return (
    <>
      <ul className="flex gap-10 text-onNeutralBg text-lg justify-center">
        {loading ? (
          <>
            {tabs.map((tab) => (
              <Skeleton
                key={tab.id}
                className={classNames(
                  "w-[100px] mx-1 h-[40px] bg-card-skeleton rounded-full"
                )}
              />
            ))}
          </>
        ) : (
          <>
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  className={classNames(
                    "hover:text-primary transition duration-300 pb-1",
                    currentTab === tab.id &&
                      "font-medium -translate-y-2 border-b-2 border-primary text-primary"
                  )}
                  onClick={() => setCurrentTab(tab.id)}
                >
                  {tab.name}
                </button>
              </li>
            ))}
          </>
        )}
      </ul>
    </>
  );
};
