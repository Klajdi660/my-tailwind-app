import { Link } from "react-router-dom";
import { FC } from "react";
import { Icon } from "./UI";
import { FooterProps } from "../types";
import { pageLink, downloadBtnList } from "../data";

export const Footer: FC<FooterProps> = () => {
  return (
    <div className="footer">
      <div className="py-4 border-t border-divider">
        <div className="flex flex-row justify-center gap-5 download_buttons">
          {downloadBtnList.map((item) => (
            <div className="relative group" key={item.name}>
              <button className="w-12 h-12 rounded flex_justify_center group-hover:bg-primary-opacity">
                <Icon name={item.icon} className="text-secondary" />
              </button>
            </div>
          ))}
        </div>
        <div className="footer_links">
          <div className="flex justify-center gap-2 mt-2">
            {pageLink.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className="text-sm text-onNeutralBg hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-2 footer_copyright">
            <p className="text-xs text-secondary">
              Copyright © 2024{" "}
              <span className="text-primary font-bold">GrooveIT</span>. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
