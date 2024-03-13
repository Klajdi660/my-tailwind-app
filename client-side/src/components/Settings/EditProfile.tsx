import { FunctionComponent, useMemo, useState } from "react";
import { Form } from "../Auth/Form";
import { PatternBg, Button } from "../UI";
import { profileList } from "../../constants";
import { editProfileValidation } from "../../utils/validations";

interface EditProfileProps {
    email: string | any;
    username: string | any;
    imgUrl: string | any;
};

export const EditProfile: FunctionComponent<EditProfileProps> = (props) => {
    const { email, username, imgUrl } = props;
    const [files, setFiles] = useState(null);

    const lists = useMemo(() => {
        return profileList;
    }, []);
        

    return (
        <div className="relative p-4 overflow-hidden rounded xs:p-6 bg-card">
            <PatternBg />
            <div className="mb-4 header">
                <h5 className="text-lg font-semibold">Profile</h5>
            </div>
            <Form
                lists={lists}
                schema={editProfileValidation}
                files={files}
                setFiles={setFiles}
                defaultValues={{
                    username,
                    email,
                    image: imgUrl,
                }}
            /> 
        </div>
    );
};
