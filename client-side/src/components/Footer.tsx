import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Image } from "./UI";
import {
  facebookIcon,
  instagramIcon,
  tiktokIcon,
  youtubeIcon,
} from "../assets/img";

interface FooterProps {}

const downloadBtnList = [
  {
    name: "facebook",
    icon: facebookIcon,
  },
  {
    name: "instagram",
    icon: instagramIcon,
  },
  {
    name: "tiktok",
    icon: tiktokIcon,
  },
  {
    name: "youtube",
    icon: youtubeIcon,
  },
];

const pageLink = [
  { name: "About", link: "/" },
  { name: "Contact", link: "/" },
  { name: "Legal", link: "/" },
  { name: "Policy", link: "/" },
];

export const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <div className="footer">
      <div className="py-4 border-t border-divider">
        <div className="flex flex-row justify-center gap-5 download_buttons">
          {downloadBtnList.map((item) => (
            <button className="w-12 h-12 rounded bg-divider flex_justify_center hover:bg-primary-opacity">
              {/* <Icon name={item.icon} size={22} /> */}
              <Image imgUrl={item.icon} name="social logo" styles="w-7 h-7" />
            </button>
          ))}
        </div>
        <div className="footer_links">
          <div className="flex justify-center gap-2 mt-4">
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
              Copyright © 2023{" "}
              <span className="text-primary font-bold">GrooveIT</span>. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
