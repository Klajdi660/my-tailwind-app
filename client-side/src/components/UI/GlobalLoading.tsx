import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Paper, Box, LinearProgress } from "@mui/material";
// import { useEffect, useState } from "react";
import { iconName } from "../../assets";
import { GlobalLoadingProps } from "../../types";

export const GlobalLoading: FunctionComponent<GlobalLoadingProps> = () => {
  // const [isLoading, setIsLoading] = useState(false);

  const { loading } = useSelector((state: any) => state.auth);
  // const { globalLoading } = useSelector((state: any) => state.globalLoading);

  // useEffect(() => {
  //   if (globalLoading) {
  //     setIsLoading(true);
  //   } else {
  //     // setTimeout(() => {
  //     setIsLoading(false);
  //     // }, 1000);
  //   }
  // }, [globalLoading]);

  return (
    <>
      {loading && (
        <Paper
          sx={{
            // opacity: isLoading ? 1 : 0,
            pointerEvents: "none",
            transition: "all .3s ease",
            position: "fixed",
            width: "100vw",
            height: "100vh",
            zIndex: 999,
          }}
        >
          <LinearProgress />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* <Logo /> */}
            {iconName}
          </Box>
        </Paper>
      )}
    </>
  );
};
