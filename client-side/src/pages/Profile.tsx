import { FunctionComponent } from "react";
import { Typography } from "antd";

interface ProfileProps {};

const { Title } = Typography;

const Profile: FunctionComponent<ProfileProps> = () => {
    return (
        <div className="flex-grow pt-7 md:pl-10 px-3">
            <div className="pb-4 border-b border-[#49494b]">
            <h1 className="text-[35px] text-white font-semibold uppercase">
                Account settings
            </h1>
            </div>
        </div>
    );
};

export default Profile;
