import { Modal } from "antd";
import { FC, CSSProperties } from "react";
import { SmallModalProps, ModalDefaultStyles } from "../../../types";

export const SmallModal: FC<SmallModalProps> = (props) => {
  const {
    onOk,
    open,
    width,
    title,
    footer,
    height,
    styles,
    children,
    isMobile,
    onCancel,
    closable = true,
    okText = "btn_submit",
    destroyOnClose = false,
    cancelText = "btn_cancel",
    okButtonProps = { style: { display: "none" } },
    cancelButtonProps = { style: { display: "none" } },
  } = props;

  const defaultBodyStyle: CSSProperties = {
    // height: "40vh",
    // display: "flex",
    // flexDirection: "column",
  };

  const stylesObj: ModalDefaultStyles = styles
    ? { body: defaultBodyStyle, ...styles }
    : { body: defaultBodyStyle };

  return (
    <Modal
      centered
      open={open}
      onOk={onOk}
      title={title}
      footer={footer}
      okText={okText}
      styles={stylesObj}
      closable={closable}
      onCancel={onCancel}
      cancelText={cancelText}
      okButtonProps={okButtonProps}
      destroyOnClose={destroyOnClose}
      cancelButtonProps={cancelButtonProps}
      width={isMobile ? "50vw" : width || "60vw"}
    >
      {children}
    </Modal>
  );
};
