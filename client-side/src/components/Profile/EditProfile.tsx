import { FunctionComponent, useMemo, useState } from "react";
import { Form } from "../Auth";
import { PatternBg } from "../UI";
import { profileList } from "../../data";
import { useAuth } from "../../hooks";
import { EditProfileProps, EditProfileSave } from "../../types";
import { editProfileValidation } from "../../utils";

export const EditProfile: FunctionComponent<EditProfileProps> = () => {
  const { user } = useAuth();

  const [files, setFiles] = useState(null);

  const hasProvider = user?.provider !== "Email";

  const listForm = useMemo(() => {
    return profileList;
  }, []);

  const handleOnSubmit = async (values: EditProfileSave) => {};

  return (
    <div className="relative p-4 rounded xs:p-6 bg-card overflow-hidden">
      <PatternBg />
      <div className="mb-4 header">
        <h5 className="text-lg font-semibold">Profile</h5>
      </div>
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
          // image: imgUrl,
        }}
      />
    </div>
  );
};
