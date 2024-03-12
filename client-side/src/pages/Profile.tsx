import { FunctionComponent } from "react";
import { Title, PatternBg, ImgUploader, Icons } from "../components/UI";
import { useAuth } from "../hooks";

interface ProfileProps {};

const EditProfile = ({ details }: any) => {
    const { email, username, imgUrl } = details;

    return (
        <div className="relative p-4 overflow-hidden rounded xs:p-6 bg-card">
            <PatternBg />
            <div className="mb-4 header">
                <h5 className="text-lg font-semibold">Profile</h5>
            </div>
            <ImgUploader
                blobUrl={imgUrl}
                //   onImageDelete={() => {}}
                //   imageRef={imageRef}
                containerDims = "h-32 w-32"
                borderType = "rounded-full"            
            />
            <button className="w-32 h-10 mt-2 rounded-xl flex_justify_center items-center bg-primary-opacity hover:bg-primary group hover:text-white">
                <Icons name="LuUpload" className="group-hover:!text-white mr-2" size={18}/>
                Upload photo
            </button>
        </div>
    );
};

const Profile: FunctionComponent<ProfileProps> = () => {
    const { user } = useAuth();

    return (
        <section className="account_page">
            <Title 
                name="Account"
                desc="Discover your sound identity. Share your musical journey in a vibrant profile."
                type="large"
            />
            <div className="flex flex-col gap-y-10 text-onNeutralBg">
                <EditProfile 
                    details={{
                        email: user?.email,
                        username: user?.username,
                        imgUrl: user?.avatar,
                    }}
                />
            </div>
        </section>
    );
};

export default Profile;
