import { FC, ChangeEvent, useRef } from "react";
import { SmallModal } from "./ModalContent";
import { useStore } from "../../../hooks";
import { useAppSelector } from "../../../store";
import { avatarProfileList } from "../../../data";
import { useProfileService } from "../../../services";
import { Image, Button, Icon } from "../../../components";

export const ChangeProfilePhotoModal: FC = () => {
  const { updateDisplayPicture } = useProfileService();
  const { setIsUpdatingProfileImg, setModalOpen, modals } = useStore();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { user } = useAppSelector((state) => state.user);

  const { avatar, firstName } = user.extra;

  const profilePhotoHeaderTitle = avatar ? "Profile photo" : "Add photo";

  const handleModalClose = () => {
    setModalOpen("changeProfilePhotoModal", false);
  };

  const handleFileClick = () => {
    fileInputRef?.current?.click();
    handleModalClose();
  };

  const changeProfileImg = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];

      if (file) {
        setIsUpdatingProfileImg(true);

        const formData = new FormData();
        formData.append("displayPicture", file);

        await updateDisplayPicture(formData);

        setIsUpdatingProfileImg(false);
      }
    } catch (error) {
      console.error(
        `change_profile_photo_modal_error ${JSON.stringify(error)}`
      );
    }
  };

  return (
    <SmallModal
      open={modals["changeProfilePhotoModal"]}
      closable={false}
      width={600}
    >
      <div className="modal-header flex_justify_between w-full text-xl text-onNeutralBg font-semibold">
        {profilePhotoHeaderTitle}
        <button
          type="button"
          className="p-2 rounded-full hover:bg-primary-opacity group"
          onClick={handleModalClose}
        >
          <Icon name="MdClear" className="group-hover:text-primary" />
        </button>
      </div>
      {avatar ? (
        <div className="modal-body flex flex-col pt-4 gap-6 text-onNeutralBg">
          {/* <Divider /> */}
          <p className="text-base text-center">
            {firstName}, help others recognize you!
          </p>
          <div className="flex_justify_center">
            <Image
              imgUrl={avatar}
              styles="w-40 h-40 rounded-full object-cover"
            />
          </div>
          <p className="text-center text-secondary">
            On GrooveIT, we require members to use their real identities, so
            take or upload a photo of yourself or any other photo.
          </p>
          <div className="flex_justify_end">
            <div className="group">
              <input
                className="hidden"
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={changeProfileImg}
              />
              <Button
                type="submit"
                variant="none"
                label="Change Photo"
                labelIcon="HiOutlineUpload"
                className="text-onNeutralBg rounded-3xl hover:bg-primary-opacity group-hover:text-primary"
                iconClassName="group-hover:text-primary"
                onClick={handleFileClick}
              />
            </div>

            <Button
              type="submit"
              variant="none"
              label="Remove photo"
              labelIcon="AiOutlineDelete"
              className="text-red-500 rounded-3xl hover:bg-primary-opacity"
              onClick={() => setModalOpen("removePhotoModal", true)}
            />
          </div>
        </div>
      ) : (
        <div className="modal-body flex flex-col pt-4 gap-6">
          <p className="text-base text-center">
            Having a profile picture helps others recognize you!
          </p>
          <div className="flex_justify_center gap-4">
            {avatarProfileList.map((img) => (
              <Image key={img.id} imgUrl={img.name} styles={img.size} />
            ))}
          </div>
          <p className="text-center text-secondary">
            On GrooveIT, we require members to use their real identities, so
            take or upload a photo of yourself or any other photo.
          </p>
          <div className="modal-footer flex_justify_end group">
            <input
              className="hidden"
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={changeProfileImg}
            />
            <Button
              variant="none"
              label="Upload photo"
              labelIcon="FiUpload"
              className="text-onNeutralBg rounded-3xl hover:bg-primary-opacity group-hover:text-primary"
              onClick={handleFileClick}
            />
          </div>
        </div>
      )}
    </SmallModal>
  );
};
