import { FC } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../data";
import { iconName } from "../assets";
import { Button, Image } from "../components";

export const Header: FC = () => {
  const { HOME, LOGIN } = paths;

  const navigate = useNavigate();

  return (
    <header className="flex_justify_between">
      <Link to={HOME}>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Image
            imgUrl={iconName}
            name="App Logo"
            width={150}
            effect="opacity"
          />
        </motion.div>
      </Link>
      <Button
        className="flex_justify_center w-24 h-10 bg-primary text-white hover:brightness-110"
        variant="none"
        label="Sign in"
        onClick={() => navigate(LOGIN)}
      />
    </header>
  );
};
