import { motion } from "framer-motion";
import { FC, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { iconName } from "../../assets";
import { HomePageProps } from "../../types";
import { Image, Button, HomeFooter, PlatformIconList } from "../../components";
import { useGame, useGameSlider } from "../../hooks";
import { classNames } from "../../utils";

const getBackgroundStyle = (imageUrl: string | undefined) => ({
  backgroundImage: `url(${imageUrl})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  // backgroundBlendMode: "overlay",
  // backgroundColor: "rgba(0,0,0,0.6)",
});

export const HomePage: FC<HomePageProps> = () => {
  const { gamesSlider } = useGameSlider();

  const navigate = useNavigate();

  const [backgroundImage, setBackgroundImage] = useState<string | undefined>();
  const [selectedGameId, setSelectedGameId] = useState<number | undefined>();
  const [platformsIcon, setPlatformsIcon] = useState([]);

  const { gameDetail } = useGame(selectedGameId) as any;

  useEffect(() => {
    if (gamesSlider && gamesSlider.length > 0) {
      const initialBackgroundImage =
        gamesSlider[0].background_image || undefined;
      const initialGameId = gamesSlider[0].id || undefined;
      const platforms = gamesSlider[0].parent_platforms || [];

      setBackgroundImage(initialBackgroundImage);
      setSelectedGameId(initialGameId);
      setPlatformsIcon(platforms);
    }
  }, [gamesSlider]);

  const selectedGameHandler = (
    gameId: number,
    imgUrl: string,
    parent_platforms: any
  ) => {
    setSelectedGameId(gameId);
    setBackgroundImage(imgUrl);
    setPlatformsIcon(parent_platforms);
  };

  if (!gamesSlider) return null;

  return (
    <div
      className="w-full h-screen"
      style={getBackgroundStyle(backgroundImage)}
    >
      <div
        className="w-full h-screen"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(255, 255, 255, 0.3), rgba(0,0,0,0.8))",
        }}
      >
        <div className="flex h-navbar items-center justify-center">
          <div className="flex w-11/12 max-w-full items-center justify-between mt-10">
            <Link to="/">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Image imgUrl={iconName} name="App Logo" width={150} />
              </motion.div>
            </Link>
            <motion.div
              className="hover:brightness-110"
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
            >
              <Button
                className="w-24 bg-white bg-opacity-10 text-white"
                iconClassName="text-white"
                variant="none"
                label="Login"
                labelIcon="MdLogin"
                onClick={() => navigate("/login")}
              />
            </motion.div>
          </div>
        </div>
        <div className="flex h-auto items-center justify-center my-10">
          <div className="flex w-11/12 max-w-full items-center justify-between">
            <div className="flex md:flex-row flex-col items-start justify-end gap-2">
              {gamesSlider?.map((game: any, index: number) => (
                <div key={game.id} className="relative flex items-end">
                  <button
                    onClick={() =>
                      selectedGameHandler(
                        game.id,
                        game.background_image,
                        game.parent_platforms
                      )
                    }
                  >
                    <Image
                      imgUrl={game.background_image}
                      styles={classNames(
                        "rounded-xl object-cover transition-all duration-300",
                        selectedGameId === game.id
                          ? "w-36 h-36 shadow-lg border-2 border-white p-1"
                          : "w-24 h-24 opacity-80"
                      )}
                    />
                  </button>
                  {selectedGameId === game.id && (
                    <div
                      className={classNames(
                        // "absolute bottom-3 flex flex-row items-center gap-2",
                        "flex flex-row gap-2 items-center",
                        "fixed ml-40"
                        // index === gamesSlider.length - 1
                        //   ? "static mr-40"
                        //   : "fixed ml-40"
                      )}
                    >
                      <div className="flex gap-2 p-2 bg-white rounded-md">
                        <PlatformIconList
                          className="text-onNeutralBg"
                          platforms={platformsIcon.map((p: any) => p.platform)}
                        />
                      </div>
                      <p className="text-white text-2xl">{gameDetail?.name}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
