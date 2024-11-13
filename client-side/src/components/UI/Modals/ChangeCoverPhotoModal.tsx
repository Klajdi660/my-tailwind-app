import { FC, ChangeEvent, useRef } from "react";
import { SmallModal } from "./ModalContent";
import { Image, Button } from "../../UI";
import { useAppSelector } from "../../../store";
import { defaultCoverPhoto } from "../../../assets";
import { useProfileService } from "../../../services";
import { useAppModal, useProfilePhoto } from "../../../utils";

export const ChangeCoverPhotoModal: FC = () => {
  const { modals, setModalOpen } = useAppModal();
  const { photoType } = useProfilePhoto();
  const { updateDisplayPicture } = useProfileService();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { user } = useAppSelector((state) => state.user);

  const { cover } = user.extra;

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
        const formData = new FormData();
        formData.append("displayPicture", file);

        await updateDisplayPicture(formData, photoType);
      }
    } catch (error) {
      console.error(`Failed to upload cover photo! ${error}`);
    }
  };

  return (
    <SmallModal
      open={modals["changeCoverPhotoModal"]}
      onCancel={handleModalClose}
      width={500}
    >
      <div className="modal-header w-full text-xl text-onNeutralBg font-semibold flex items-center">
        Edit cover photo
      </div>

      {cover ? (
        <div className="modal-body flex flex-col pt-4 gap-6 text-onNeutralBg">
          <hr className="w-full border-t border-divider" />

          <Image imgUrl={cover} styles="w-full h-52 rounded py-4" />

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
              label="Remove photo"
              labelIcon="AiOutlineDelete"
              variant="none"
              className="text-red-500 rounded-3xl hover:bg-red-100"
              onClick={() => setModalOpen("removePhotoModal", true)}
            />
          </div>
        </div>
      ) : (
        <div className="modal-body flex flex-col pt-4 gap-6">
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
              className="text-onNeutralBg rounded-3xl hover:bg-primary-opacity group-hover:text-primary"
              label="Upload photo"
              labelIcon="FiUpload"
              onClick={handleFileClick}
            />
          </div>
        </div>
      )}
    </SmallModal>
  );
};
