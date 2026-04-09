import { FC } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../data";
import { iconName } from "../../assets";
import { Button, Image } from "../../components";

export const HomeHeader: FC = () => {
  const navigate = useNavigate();

  return (
    <header className="flex_justify_between">
      <Link to={paths.HOME}>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Image
            imgUrl={iconName}
            name="App Logo"
            width={140}
            effect="opacity"
          />
        </motion.div>
      </Link>
      <Button
        type="button"
        variant="contained"
        label="Sign in"
        onClick={() => navigate(paths.LOGIN)}
      />
    </header>
  );
};
