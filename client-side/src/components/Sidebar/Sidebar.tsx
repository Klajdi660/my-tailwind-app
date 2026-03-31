import { Tooltip } from "antd";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarList } from "../../data";
import { classNames } from "../../utils";
import { useAppSelector } from "../../store";
import { Icon, Overlay } from "../../components";
import { useMediaResponsive, useStore } from "../../hooks";
import { defaultThemeConfig, themeConfig } from "../../configs";

export const Sidebar: FC = () => {
  const { pathname } = useLocation();
  const { isMobile } = useMediaResponsive();

  const [toggleNav, setToggleNav] = useState(false);
  const { toggleMenu, setToggleMenu } = useStore();

  const navigate = useNavigate();

  const themeStorage = useAppSelector((state) => state.theme);

  const { sidebar } = themeStorage || defaultThemeConfig;
  const isFolded = sidebar === "folded";

  const handleLinkClick = (link: any) => {
    navigate(link.to);
  };

  useEffect(() => {
    setToggleMenu && setToggleMenu(false);
  }, [pathname]);

  const hoverWidth = themeConfig.sidebars.full;

  return (
    <section
      className={classNames(
        "sidebar_section z-[10] fixed top-0 h-full",
        isMobile &&
          classNames(
            "transition-all duration-500",
            toggleMenu ? "left-0" : "-left-sidebar",
          ),
      )}
    >
      <Overlay isOpen={toggleMenu} handleIsOpen={setToggleMenu} />
      <div
        {...(toggleNav && { style: { width: `${hoverWidth}px` } })}
        className="nav-list overflow-auto hide_scrollbar relative top-navbar sidebar_height w-sidebar duration-500 transition-all pb-[100px] bg-sidebar"
      >
        <div
          className={classNames(
            "relative text-white text-base",
            isFolded ? "mt-4" : "mt-0",
          )}
        >
          {sidebarList.map((list) => (
            <div key={list.name}>
              {(!isFolded || toggleNav) && (
                <span
                  className={classNames(
                    "block p-3 mx-3 text-gray-400 text-sm uppercase",
                  )}
                >
                  {list.name}
                </span>
              )}
              <ul>
                {list.subList.map((sbList) => (
                  <li
                    key={sbList.name}
                    className={classNames(
                      `dropdown_${sbList.id}`,
                      "relative px-[10px] group pb-1",
                    )}
                  >
                    <Tooltip
                      placement="right"
                      title={isFolded && sbList.name}
                      arrow={true}
                      // color="var(--switchBg)"
                      trigger={["hover"]}
                    >
                      <button
                        className={classNames(
                          "flex flex-row items-center gap-2 h-12 w-full outline-0 border-none pl-[20px] hover:bg-primary-opacity rounded",
                          pathname.includes(sbList.to) &&
                            "rounded bg-primary-opacity",
                        )}
                        onClick={() => handleLinkClick(sbList)}
                      >
                        <Icon
                          name={sbList.icon}
                          className={classNames(
                            "text-onNeutralBg group-hover:!text-primary",
                            pathname.includes(sbList.to) && "!text-primary",
                          )}
                          size={20}
                        />
                        <div
                          className={classNames(
                            "group-hover:text-primary text-sm flex items-center gap-3 whitespace-nowrap",
                            pathname.includes(sbList.to)
                              ? "text-primary"
                              : "text-onNeutralBg",
                            !(isFolded && !isMobile) || toggleNav
                              ? "opacity-100 transition-opacity duration-1000"
                              : "invisible w-0 opacity-0",
                          )}
                        >
                          {sbList.name}
                        </div>
                      </button>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
