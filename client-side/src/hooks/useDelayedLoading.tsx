import { useState } from "react";
import { useAppSelector } from "../store";

export const useDelayedLoading = () => {
  const { loading } = useAppSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (loading && !isLoading) {
    setIsLoading(true);
    // if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  if (
    !loading &&
    isLoading
    // && !timeoutRef.current
  ) {
    // timeoutRef.current = setTimeout(() => {
    //   setIsLoading(false);
    //   timeoutRef.current = null;
    // }, 5000);
    setIsLoading(false);
  }

  return isLoading;
};

// export const useDelayedLoading = () => {
//   const { loading } = useAppSelector((state) => state.auth);

//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   if (loading && !isLoading) {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//   }

//   if (!loading && isLoading && !timeoutRef.current) {
//     timeoutRef.current = setTimeout(() => {
//       setIsLoading(false);
//       timeoutRef.current = null;
//     }, 5000);
//   }

//   return isLoading;
// };
