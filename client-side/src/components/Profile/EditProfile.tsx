import { FunctionComponent, useMemo, useState } from "react";
import { Form } from "../Auth";
import { ImgUploader } from "../UI";
import { editProfileList } from "../../data";
import { useAuth } from "../../hooks";
import { useProfileService } from "../../services";
import { EditProfileProps, EditProfileInput } from "../../types";
import { editProfileValidation } from "../../utils";

export const EditProfile: FunctionComponent<EditProfileProps> = () => {
  const { user } = useAuth();
  const { changeUsername } = useProfileService();

  const [files, setFiles] = useState(null);

  const hasProvider = user?.provider !== "Email";

  const listForm = useMemo(() => {
    return editProfileList;
  }, []);

  const handleOnSubmit = async (values: EditProfileInput) => {
    try {
      await changeUsername(values);
    } catch (error) {
      console.error(`Failed to login! ${error}`);
    }
  };

  return (
    <div className="relative p-4 rounded xs:p-6 bg-card">
      <div className="mb-4 header">
        <h5 className="text-lg font-semibold">Profile</h5>
      </div>
      <ImgUploader />
      <Form
        listForm={listForm}
        schema={editProfileValidation}
        files={files}
        setFiles={setFiles}
        hasProvider={hasProvider}
        onSubmit={handleOnSubmit}
        defaultValues={{
          username: user?.username,
          email: user?.email,
          image: user?.extra?.avatar,
        }}
      />
    </div>
  );
};
