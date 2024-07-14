import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { iconName } from "../../assets";
import { Image, Button, HomeFooter } from "../../components";
import { HomePageProps } from "../../types";

export const HomePage: FunctionComponent<HomePageProps> = () => {
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

export default HomePage;
