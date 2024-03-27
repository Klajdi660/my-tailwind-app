import { FunctionComponent } from "react";
import { Modal } from "antd";

interface SmallModalProps {
  open: boolean;
  children?: any;
  footer?: any;
  title?: string;
  closable?: boolean;
  isMobile?: boolean;
  destroyOnClose?: boolean;
  onOk?: any;
  okText?: string;
  okButtonProps?: any;
  onCancel?: any;
  cancelText?: string;
  width?: any;
  bodyStyle?: any;
}

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
    okButtonProps = { type: "primary" },
    onCancel,
    cancelText = "btn_cancel",
    width,
    bodyStyle,
  } = props;
  const defaultBodyStyle = {
    height: "40vh",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <Modal
      open={open}
      title={title}
      bodyStyle={
        bodyStyle ? { ...defaultBodyStyle, ...bodyStyle } : defaultBodyStyle
      }
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
    >
      {children}
    </Modal>
  );
};
