import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
// import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { icon } from "../assets";
import {
  // footerLink2,
  topFooter,
  bottomFooter,
  // resources,
  // plans,
  // community,
} from "../constants";
import { Image, Icon } from "./UI";

interface HomeFooterProps {}

export const HomeFooter: FunctionComponent<HomeFooterProps> = () => {
  return (
    <div className="bg-neutralBgOpacity backdrop-blur-[50px]">
      {/* <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-[1260px] text-onNeutalBg leading-6 mx-auto relative py-10">
        <div className="flex flex-row lg:flex-row w-full pb-5 border-b border-divider">
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-divider pl-3 lg:pr-5 gap-3">
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-onNeutalBg font-semibold text-base">
                Company
              </h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-secondary text-sm cursor-pointer hover:text-onNeutalBg transition-all duration-200"
                    >
                      <Link to={ele.toLowerCase()}>{ele}</Link>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 text-lg">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
              <div></div>
            </div>
            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-onNeutalBg font-semibold text-base">
                Resources
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                {resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-secondary text-sm cursor-pointer hover:text-onNeutalBg transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <h1 className="text-onNeutalBg font-semibold text-base mt-7">
                Support
              </h1>
              <div className="text-secondary text-sm cursor-pointer hover:text-onNeutalBg transition-all duration-200 mt-2">
                <Link to={"/help-center"}>Help Center</Link>
              </div>
            </div>
            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-onNeutalBg font-semibold text-base">Plans</h1>
              <div className="flex flex-col gap-2 mt-2">
                {plans.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-secondary text-sm cursor-pointer hover:text-onNeutalBg transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <h1 className="text-onNeutalBg font-semibold text-base mt-7">
                Community
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                {community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-secondary text-sm cursor-pointer hover:text-onNeutalBg transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
            {footerLink2.map((ele, i) => {
              return (
                <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                  <h1 className="text-onNeutalBg font-semibold text-base">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 mt-2">
                    {ele.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="text-secondary text-sm cursor-pointer hover:text-onNeutalBg transition-all duration-200"
                        >
                          <Link to={link.link}>{link.title}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div> */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-3 w-11/12 max-w-full mx-auto text-sm py-10 cursor-pointer">
        <div className="flex flex-col lg:flex-row text-secondary gap-3">
          {topFooter.map((ele, i) => (
            <div key={i}>
              <Link to="#">
                <Icon name={ele} className="text-secondary"/>
              </Link>
            </div>
          ))}
        </div>
        <div className="border border-2 border-onNeutralBg rounded-md p-1 hover:border-primary hover:border-2">
          <Icon name="SlArrowUp" />
        </div>
      </div>
      <div className="flex flex-col justify-between items-left w-11/12 max-w-full mx-auto text-xs text-secondary pb-10">
        <p className="w-[100%] lg:w-[50%] text-justify">
          © 2024, Epic Games, Inc. All rights reserved. Epic, Epic Games, the
          Epic Games logo, Fortnite, the Fortnite logo, Unreal, Unreal Engine,
          the Unreal Engine logo, Unreal Tournament, and the Unreal Tournament
          logo are trademarks or registered trademarks of Epic Games, Inc. in
          the United States of America and elsewhere. Other brands or product
          names are the trademarks of their respective owners.
          <br />
          Our websites may contain links to other sites and resources provided
          by third parties. These links are provided for your convenience only.
          Epic Games has no control over the contents of those sites or
          resources, and accepts no responsibility for them or for any loss or
          damage that may arise from your use of them.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-3 w-11/12 max-w-full mx-auto text-sm pb-10">
        <div className="flex flex-col lg:flex-row text-secondary gap-3">
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
