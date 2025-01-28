import { Link } from "react-router-dom";
import { FC } from "react";
import { icon } from "../assets";
import { Image, Icon } from "../components";
import { topFooter, bottomFooter } from "../data";

export const HomeFooter: FC = () => {
  return (
    <div
      className=""
      // className="bg-neutralBgOpacity backdrop-blur-[50px]"
    >
      <div className="flex flex-col lg:flex-row justify-between items-center gap-3 w-11/12 max-w-full mx-auto text-sm py-10 cursor-pointer">
        <div className="flex flex-row justify-center text-secondary gap-3">
          {topFooter.map((ele, i) => (
            <div key={i}>
              <Link to="#">
                <Icon name={ele} className="text-secondary" />
              </Link>
            </div>
          ))}
        </div>
        <button className="w-10 h-10 transition-colors duration-500 rounded-full flex_justify_center bg-primary-opacity hover:bg-primary group">
          <Icon
            name="SlArrowUp"
            size={16}
            className="group-hover:!text-white"
          />
        </button>
      </div>
      <div className="flex flex-col justify-between items-left w-11/12 max-w-full mx-auto text-xs text-secondary pb-10">
        <p className="w-[100%] lg:w-[50%] text-justify">
          © 2024, GrooveIT, Inc. All rights reserved. Epic, Epic Games, the
          Epic Games logo, Fortnite, the Fortnite logo, Unreal, Unreal Engine,
          the Unreal Engine logo, Unreal Tournament, and the Unreal Tournament
          logo are trademarks or registered trademarks of Epic Games, Inc. in
          the United States of America and elsewhere. Other brands or product
          names are the trademarks of their respective owners.
          <br />
          Our websites may contain links to other sites and resources provided
          by third parties. These links are provided for your convenience only.
          GrooveIT has no control over the contents of those sites or resources,
          and accepts no responsibility for them or for any loss or damage that
          may arise from your use of them.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-3 w-11/12 max-w-full mx-auto text-sm pb-10">
        <div className="flex flex-col lg:flex-row text-secondary gap-3 items-center">
          {bottomFooter.map((ele, i) => (
            <div key={i}>
              <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                {ele}
              </Link>
            </div>
          ))}
        </div>
        <Image imgUrl={icon} name="footer_logo" width={60} height={60} />
      </div>
    </div>
  );
};
