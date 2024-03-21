import { FunctionComponent, useEffect } from "react";
import { classNames } from "../../utils";

interface OverlayProps {
  isOpen: boolean;
  handleIsOpen: (value: boolean) => void;
  transparent?: boolean;
  className?: string;
  isMobile?: boolean;
}

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
            // transparent ? "bg-transparent" : "bg-glassmorphism",
            !isMobile ? "bg-transparent" : "bg-glassmorphism",
            className
          )}
          onClick={() => handleIsOpen(false)}
        />
      )}
    </>
  );
};
