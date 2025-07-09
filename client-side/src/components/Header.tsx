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

// {
//   /* {selectedGameId === game.id && (
//                   <div
//                     className={classNames(
//                       "flex flex-row gap-2 items-center fixed",
//                       index === gamesSlider.length - 1
//                         ? "right-[330px]"
//                         : "ml-[170px]"
//                     )}
//                   >
//                     {index === gamesSlider.length - 1 ? (
//                       <>
//                         <p className="text-white text-2xl">
//                           {gameDetail?.name}
//                         </p>
//                         <div className="flex gap-2 p-2 bg-white rounded-xl">
//                           <PlatformIconList
//                             className="text-secondary"
//                             platforms={platformsIcon
//                               .slice(0, 4)
//                               .map((p: any) => p.platform)}
//                           />
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <div className="flex gap-2 p-2 bg-white rounded-xl">
//                           <PlatformIconList
//                             className="text-secondary"
//                             platforms={platformsIcon
//                               .slice(0, 4)
//                               .map((p: any) => p.platform)}
//                           />
//                         </div>
//                         <p className="text-white text-2xl">
//                           {gameDetail?.name}
//                         </p>
//                       </>
//                     )}
//                   </div>
//                 )} */
// }
