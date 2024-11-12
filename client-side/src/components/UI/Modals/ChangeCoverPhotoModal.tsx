import { FC, ChangeEvent, useRef } from "react";
import { SmallModal } from "./ModalContent";
import { useAppSelector } from "../../../store";
import { useProfileService } from "../../../services";
import { useAppModal, useProfilePhoto } from "../../../utils";
import { avatarProfileList } from "../../../data";
import { Image, Button } from "../../UI";
import { defaultCoverPhoto } from "../../../assets";

export const ChangeCoverPhotoModal: FC = () => {
  const { modals, setModalOpen } = useAppModal();
  const { setIsUpdatingProfileImg, photoType } = useProfilePhoto();
  const { updateDisplayPicture, removeDisplayPicture } = useProfileService();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { user } = useAppSelector((state) => state.user);

  const { avatar } = user.extra;

  const handleModalClose = () => {
    setModalOpen("changeCoverPhotoModal", false);
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

  const removeProfileImg = async () => {
    try {
      await removeDisplayPicture(photoType);

      handleModalClose();
    } catch (error) {
      console.error(`Failed to remove profile photo! ${error}`);
    }
  };

  return (
    <SmallModal
      open={modals["changeCoverPhotoModal"]}
      onCancel={handleModalClose}
      width={500}
    >
      <div className="modal-header w-full text-xl text-onNeutralBg font-semibold flex items-center">
        Add cover photo
      </div>

      {avatar ? (
        <div className="modal-body flex flex-col pt-4 gap-6 text-onNeutralBg">
          <hr className="w-full border-t border-divider" />

          <p className="text-base text-center">
            A good background photo will help you stand out
          </p>

          <div className="flex_justify_center">
            <Image imgUrl={defaultCoverPhoto} styles="w-80 rounded-xl" />
          </div>

          <p className="text-center text-secondary">
            Showcase your personality, interests, team moments or notable
            milestones.
          </p>

          <hr className="w-full border-t border-divider" />

          <div className="flex justify-end gap-2">
            <input
              className="hidden"
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={changeProfileImg}
            />
            <Button
              type="submit"
              label="Upload Photo"
              variant="contained"
              // className="text-onNeutralBg hover:bg-primary-opacity"
              onClick={handleFileClick}
            />
            <Button
              type="submit"
              label="Remove photo"
              variant="none"
              className="text-red-500 bg-primary-opacity hover:bg-red-100"
              onClick={removeProfileImg}
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

          <div className="modal-footer flex items-end justify-end gap-2">
            <Button
              type="button"
              label="Cancel"
              variant="outlined"
              className="hover:bg-primary-opacity"
              onClick={handleModalClose}
            />
            <input
              className="hidden"
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={changeProfileImg}
            />
            <Button
              type="button"
              label="Upload photo"
              variant="contained"
              onClick={handleFileClick}
            />
          </div>
        </div>
      )}
    </SmallModal>
  );
};
