import { FunctionComponent } from "react";
import { Tooltip, Button } from "antd";

interface SideMenuListPorps {
    sidebarLinks: any;
    activeLink: string;
    handleLinkClick: any;
    iconRef: any;
};

const SideMenuList: FunctionComponent<SideMenuListPorps> = (props) => {
    const { sidebarLinks, activeLink, handleLinkClick, iconRef } = props;

    return (
        <div className="sideMenuWrapper p-2">
            <div ref={iconRef}>
                {sidebarLinks.map((sidelink: any) => (
                    <Tooltip key={sidelink.id} placement="right" title={sidelink.name} color="#2C333F" trigger={["hover"]} /*arrow={false}*/>
                        <Button
                            key={sidelink.id}
                            className={`border border-transparent rounded-xl flex justify-center items-center mb-1 ${activeLink && activeLink === sidelink.name ? 'bg-richblack-700' : null} hover:bg-richblack-700`}
                            style={{ width: "52px", height: "52px" }}
                            onClick={() => handleLinkClick(sidelink)}
                            icon={
                                <div className={`text-2xl ${activeLink && activeLink === sidelink.name ? "text-orange-10" : "text-richblack-30" }`}>
                                    {sidelink.icon}
                                </div>
                            }
                        />
                    </Tooltip>
                ))}
            </div>
        </div>
    );
};

export default SideMenuList;
