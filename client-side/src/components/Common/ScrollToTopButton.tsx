import { FC } from "react";
import { useScrollToTop } from "../../hooks";
import { classNames } from "../../utils";
import { Icon } from "../UI/Icon";

export interface ScrollToTopButtonProps {
  /** Pixels scrolled before the button appears */
  threshold?: number;
  className?: string;
}

export const ScrollToTopButton: FC<ScrollToTopButtonProps> = ({
  threshold,
  className,
}) => {
  const { visible, scrollToTop } = useScrollToTop(threshold);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={classNames(
        "fixed bottom-6 right-4 z-[100] flex h-12 w-12 items-center justify-center rounded-full border border-white/35 bg-black/70 text-white shadow-lg backdrop-blur-md transition hover:border-white/55 hover:bg-black/85 sm:bottom-8 sm:right-8",
        className,
      )}
      aria-label="Scroll to top"
    >
      <Icon name="MdKeyboardArrowUp" size={28} className="!text-white" />
    </button>
  );
};
