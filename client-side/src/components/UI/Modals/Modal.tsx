import { FunctionComponent, CSSProperties } from "react";
import { Modal } from "antd";
import { SmallModalProps, ModalDefaultStyles } from "../../../types";

export const SmallModal: FunctionComponent<SmallModalProps> = (props) => {
  const {
    open,
    children,
    footer,
    title,
    closable = true,
    isMobile,
    destroyOnClose = false,
    onOk,
    okText = "btn_submit",
    okButtonProps = { style: { display: "none" } },
    onCancel,
    cancelText = "btn_cancel",
    cancelButtonProps = { style: { display: "none" } },
    width,
    height,
    styles,
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
      open={open}
      title={title}
      styles={stylesObj}
      width={isMobile ? "50vw" : width || "60vw"}
      centered
      closable={closable}
      onCancel={onCancel}
      onOk={onOk}
      okText={okText}
      cancelText={cancelText}
      okButtonProps={okButtonProps}
      footer={footer}
      destroyOnClose={destroyOnClose}
      cancelButtonProps={cancelButtonProps}
    >
      {children}
    </Modal>
  );
};
