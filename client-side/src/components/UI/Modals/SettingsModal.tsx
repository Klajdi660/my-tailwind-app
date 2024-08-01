import { FunctionComponent, useState } from "react";
import { SmallModal } from "./ModalContent";
import { useAppModal, classNames } from "../../../utils";
import { SettingsModalProps } from "../../../types";
import { settingsLinks } from "../../../data";
import { Icon } from "../Icon";
import {
  PaymentSetting,
  GeneralSetting,
  ShippingAddrSetting,
} from "../../Settings";

export const SettingsModal: FunctionComponent<SettingsModalProps> = () => {
  const { modals, setModalOpen } = useAppModal();

  const [selectedSetting, setSelectedSetting] = useState(settingsLinks[0].id);

  const handleModalClose = () => {
    setModalOpen("settingsModal", false);
  };

  const renderSettingsContent = () => {
    switch (selectedSetting) {
      case "general":
        return <GeneralSetting />;
      case "shipping":
        return <ShippingAddrSetting />;
      case "payment":
        return <PaymentSetting />;
      default:
        return <div>Select a setting from the left menu</div>;
    }
  };

  return (
    <SmallModal
      open={modals["settingsModal"]}
      onCancel={handleModalClose}
      closable={true}
      width={800}
    >
      <div className="modal-header w-full text-xl text-onNeutralBg font-semibold">
        Settings
      </div>
      <div className="modal-body mt-4 flex flex-row gap-4">
        <div className="modal-body-left w-[30%] flex flex-col gap-2">
          {settingsLinks.map((settingLink) => {
            return (
              <div
                key={settingLink.id}
                className={classNames(
                  `dropdown_${settingLink.id}`,
                  "flex items-center group"
                )}
              >
                <button
                  className={classNames(
                    "flex flex-row items-center gap-2 p-2 w-full outline-0 border-none hover:bg-primary-opacity rounded",
                    selectedSetting.includes(settingLink.id) &&
                      "bg-primary-opacity"
                  )}
                  onClick={() => setSelectedSetting(settingLink.id)}
                >
                  <Icon
                    name={settingLink.icon}
                    className={classNames(
                      "group-hover:!text-primary",
                      selectedSetting.includes(settingLink.id) && "text-primary"
                    )}
                    size={20}
                  />
                  <div
                    className={classNames(
                      "group-hover:text-primary text-sm flex items-center gap-3 whitespace-nowrap",
                      selectedSetting.includes(settingLink.id)
                        ? "text-primary"
                        : "text-onNeutralBg"
                    )}
                  >
                    {settingLink.name}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
        <div className="modal-body-right w-[70%]">
          {/* <p className="text-onNeutralBg bg-primary-opacity p-2 w-full"> */}
          {renderSettingsContent()}
          {/* </p> */}
        </div>
      </div>
    </SmallModal>
  );
};
