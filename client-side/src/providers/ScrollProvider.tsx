import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ProviderProps } from "../types";
import { useNavScrollTrigger } from "../utils";

export const ScrollProvider = ({ children }: ProviderProps) => {
  const { pathname } = useLocation();
  const { setNavScrollTrigger } = useNavScrollTrigger();

  const triggerPoint = 50;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition >= triggerPoint) {
        setNavScrollTrigger(true);
      } else {
        setNavScrollTrigger(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, [setNavScrollTrigger]);

  return children;
};
