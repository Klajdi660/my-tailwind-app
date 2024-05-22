import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavScrollTrigger } from "../utils";
import { ProviderProps } from "../types";

const triggerPoint = 50;

export const ScrollProvider = ({ children }: ProviderProps) => {
  const { pathname } = useLocation();
  const { setNavScrollTrigger } = useNavScrollTrigger();

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
