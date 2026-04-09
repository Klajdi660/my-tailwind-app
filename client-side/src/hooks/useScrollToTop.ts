import { useCallback, useEffect, useState } from "react";

const DEFAULT_THRESHOLD_PX = 320;

/**
 * Tracks scroll position and exposes a smooth scroll-to-top action.
 * Reuse on any page that needs “back to top” behavior.
 */
export function useScrollToTop(
  thresholdPx: number = DEFAULT_THRESHOLD_PX,
): { visible: boolean; scrollToTop: () => void } {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > thresholdPx);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [thresholdPx]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return { visible, scrollToTop };
}
