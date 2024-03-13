import { FunctionComponent } from "react";
import { useAuth } from "../hooks";
import { DeleteAccount, EditProfile, ChangePassword, Title, PersonalDetails } from "../components";

interface ProfileProps {};

const Profile: FunctionComponent<ProfileProps> = () => {
    const { user } = useAuth();

    return (
        <section className="account_page">
            <Title 
                name="Account Settings"
                desc="Here you can edit public information about yourself."
                type="large"
            />
            <div className="flex flex-col gap-y-10 text-onNeutralBg">
                <EditProfile 
                    email={user?.email}
                    username={user?.username}
                    imgUrl={user?.avatar}
                    provider={user?.provider}
                />
                <PersonalDetails />
                <ChangePassword provider={user?.provider} />
                <DeleteAccount />
            </div>
        </section>
    );
};

export default Profile;
