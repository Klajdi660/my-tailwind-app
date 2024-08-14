import { FC, useEffect } from "react";
import { classNames } from "../../utils";
import { OverlayProps } from "../../types";

export const Overlay: FC<OverlayProps> = (props) => {
  const { isMobile, isOpen, handleIsOpen, className } = props;

  useEffect(() => {
    isOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className={classNames(
            "fixed top-0 left-0 h-screen w-screen",
            !isOpen ? "bg-transparent" : "bg-glassmorphism",
            // !isMobile ? "bg-transparent" : "bg-glassmorphism",
            className
          )}
          onClick={handleIsOpen}
        />
      )}
    </>
  );
};
