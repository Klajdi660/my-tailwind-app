import { FunctionComponent, useMemo, useState } from "react";
import { Form } from "../Auth/Form";
import { PatternBg } from "../UI";
import { profileList } from "../../constants";
import { editProfileValidation } from "../../utils/validations";
// import Form from "../Form";
interface EditProfileProps {
  email: string | any;
  username: string | any;
  imgUrl: string | any;
  provider: string | any;
  user: any;
}

export const EditProfile: FunctionComponent<EditProfileProps> = (props) => {
  const { email, username, imgUrl, provider, user } = props;

  const [files, setFiles] = useState(null);

  const hasProvider = provider !== "Email";

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
        hasProvider={hasProvider}
        user={user}
        defaultValues={{
          username,
          email,
          image: imgUrl,
        }}
      />
    </div>
  );
};
