import { motion } from "framer-motion";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { iconName } from "../../assets";
import { HomePageProps } from "../../types";
import { Image, Button, HomeFooter } from "../../components";

export const HomePage: FC<HomePageProps> = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex h-navbar items-center justify-center bg-neutralBgOpacity backdrop-blur-[50px]">
        <div className="flex w-11/12 max-w-full items-center justify-between my-4">
          <Link to="/">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Image imgUrl={iconName} name="App Logo" width={100} />
            </motion.div>
          </Link>
          <motion.div
            className="hover:brightness-110"
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
          >
            <Button
              className="w-25"
              variant="outlined"
              label="Login"
              labelIcon="MdLogin"
              onClick={() => navigate("/login")}
            />
          </motion.div>
        </div>
      </div>
      <div></div>
      <HomeFooter />
    </>
  );
};
