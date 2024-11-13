import { FC, ChangeEvent, useRef } from "react";
import { SmallModal } from "./ModalContent";
import { useAppSelector } from "../../../store";
import { useProfileService } from "../../../services";
import { useAppModal, useProfilePhoto } from "../../../utils";
import { Image, Button } from "../../UI";
import { avatarProfileList } from "../../../data";

export const ChangeProfilePhotoModal: FC = () => {
  const { modals, setModalOpen } = useAppModal();
  const { setIsUpdatingProfileImg, photoType } = useProfilePhoto();
  const { updateDisplayPicture } = useProfileService();

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

        await updateDisplayPicture(formData, photoType);

        setIsUpdatingProfileImg(false);
      }
    } catch (error) {
      console.error(`Failed to upload display picture! ${error}`);
    }
  };

  return (
    <SmallModal
      open={modals["changeProfilePhotoModal"]}
      onCancel={handleModalClose}
      width={500}
    >
      <div className="modal-header w-full text-xl text-onNeutralBg font-semibold flex items-center">
        {profilePhotoHeaderTitle}
      </div>

      {avatar ? (
        <div className="modal-body flex flex-col pt-4 gap-6 text-onNeutralBg">
          <hr className="w-full border-t border-divider" />

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

          <hr className="w-full border-t border-divider" />

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
          <hr className="w-full border-t border-divider" />

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

          <hr className="w-full border-t border-divider" />

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
