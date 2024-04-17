import { useSelector } from "react-redux";
import { Paper, Box, LinearProgress, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { iconName } from "../../assets";

export const GlobalLoading = () => {
  // const { globalLoading } = useSelector((state: any) => state.globalLoading);
  // const [isLoading, setIsLoading] = useState(false);
  // console.log("globalLoading :>> ", globalLoading);
  // useEffect(() => {
  //   if (globalLoading) {
  //     console.log("HYRI 111");
  //     setIsLoading(true);
  //   } else {
  //     // setTimeout(() => {
  //     console.log("HYRI 222");
  //     setIsLoading(false);
  //     // }, 1000);
  //   }
  // }, [globalLoading]);
  // console.log("isLoading :>> ", isLoading);
  const { loading } = useSelector((state: any) => state.auth);
  console.log("loading :>> ", loading);
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
          {/* <Toolbar /> */}
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
