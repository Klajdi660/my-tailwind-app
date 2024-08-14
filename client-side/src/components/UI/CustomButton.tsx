import { Button, Tooltip } from "antd";
import { FC } from "react";
import { CustomButtonProps } from "../../types";

export const CustomButton: FC<CustomButtonProps> = (props) => {
  const { sidebarLinks, activeLink, handleLinkClick } = props;

  return (
    <div className="flex flex-col items-center gap-1">
      {sidebarLinks.map((sidelink: any) => (
        <Tooltip
          key={sidelink.id}
          placement="right"
          title={sidelink.name}
          color="#2C333F"
          trigger={["hover"]}
          arrow={false}
        >
          <Button
            key={sidelink.id}
            className={`border border-transparent rounded-xl flex justify-center items-center ${activeLink && activeLink === sidelink.name ? "bg-richblack-700" : null} hover:bg-richblack-700`}
            style={{ width: "52px", height: "52px" }}
            onClick={() => handleLinkClick(sidelink)}
            icon={
              <div
                className={`text-2xl ${activeLink && activeLink === sidelink.name ? "text-orange-10" : "text-richblack-30"}`}
              >
                {sidelink.icon}
              </div>
            }
          />
        </Tooltip>
      ))}
    </div>
  );
};
