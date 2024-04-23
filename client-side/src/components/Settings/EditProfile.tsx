import { FunctionComponent, useMemo, useState } from "react";
import { Form } from "../Auth/Form";
import { profileList } from "../../data";
import { editProfileValidation } from "../../utils/validations";

interface EditProfileProps {
  email: string | any;
  username: string | any;
  imgUrl: string | any;
  provider: string | any;
  user: any;
}

interface EditProfileSave {
  username: string;
  email: string;
  image: string;
}

export const EditProfile: FunctionComponent<EditProfileProps> = (props) => {
  const { email, username, imgUrl, provider, user } = props;
  const [files, setFiles] = useState(null);

  const hasProvider = provider !== "Email";

  const lists = useMemo(() => {
    return profileList;
  }, []);

  const handleOnSubmit = async (values: EditProfileSave) => {};

  return (
    <div className="relative p-4 rounded xs:p-6 bg-card">
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
        onSubmit={handleOnSubmit}
        defaultValues={{
          username,
          email,
          image: imgUrl,
        }}
      />
    </div>
  );
};
