import { FunctionComponent, useEffect } from "react";
import { OverlayProps } from "../../types";
import { classNames } from "../../utils";

export const Overlay: FunctionComponent<OverlayProps> = (props) => {
  const { isMobile, isOpen, handleIsOpen, className } = props;

  useEffect(() => {
    isOpen
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [isOpen, isMobile]);

  return (
    <>
      {isOpen && (
        <div
          className={classNames(
            "fixed top-0 left-0 h-screen w-screen",
            // !isOpen ? "bg-transparent" : "bg-glassmorphism",
            !isMobile ? "bg-transparent" : "bg-glassmorphism",
            className
          )}
          onClick={handleIsOpen}
        />
      )}
    </>
  );
};
