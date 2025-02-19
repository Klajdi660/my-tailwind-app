import { motion } from "framer-motion";
import { FC, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../data";
import { iconName } from "../../assets";
import { classNames } from "../../utils";
import { useGames } from "../../hooks";
import { useAppSelector } from "../../store";
import { Image, Button, PlatformIconList } from "../../components";

const getBackgroundStyle = (imageUrl: string | undefined) => ({
  backgroundImage: `url(${imageUrl})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});

export const HomePage: FC = () => {
  const { logIn, /*accountSaved,*/ home } = paths;

  const { useGameSlider, useGameDetail } = useGames();
  const { gamesSlider } = useGameSlider();

  const navigate = useNavigate();

  const [backgroundImage, setBackgroundImage] = useState<string | undefined>();
  const [selectedGameId, setSelectedGameId] = useState<number | undefined>();
  const [platformsIcon, setPlatformsIcon] = useState([]);

  const { gameDetail } = useGameDetail(selectedGameId) as any;

  const { saveAuthUserData } = useAppSelector((state) => state.user);

  // const navigateTo = saveAuthUserData.length > 0 ? accountSaved : logIn;
  const navigateTo = logIn;

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
        className="w-full h-screen p-12 flex flex-col gap-12"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(255, 255, 255, 0.3), rgba(0,0,0,0.8))",
        }}
      >
        <div className="flex items-center justify-between">
          <Link to={home}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Image
                imgUrl={iconName}
                name="App Logo"
                width={150}
                effect="opacity"
              />
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
              onClick={() => navigate(navigateTo)}
            />
          </motion.div>
        </div>
        <div className="flex items-center justify-start">
          <div className="flex md:flex-row flex-col items-start justify-start gap-2">
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
                    effect="opacity"
                  />
                </button>
                {selectedGameId === game.id && (
                  <div className="flex flex-row gap-2 items-center fixed ml-40">
                    <div className="flex gap-2 p-2 bg-white rounded-md">
                      <PlatformIconList
                        className="text-secondary"
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
        {/* Move the gameDetail section to the bottom */}
        {gameDetail && (
          <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col gap-16">
              <div className="flex text-white text-5xl font-newCenturySchoolbook">
                {gameDetail.name}
              </div>
              <div className="flex flex-row gap-6">
                <motion.div className="hover:brightness-110">
                  <Button
                    className="w-60 h-14 bg-white bg-opacity-10 text-white text-xl font-normal rounded-full"
                    iconClassName="text-white"
                    variant="none"
                    label="Buy Game"
                    labelIcon="CiShoppingTag"
                    size={25}
                  />
                </motion.div>
                <motion.div className="hover:brightness-110">
                  <Button
                    className="w-14 h-14 bg-white bg-opacity-10 text-white text-xl font-normal rounded-full"
                    iconClassName="text-white"
                    variant="none"
                    labelIcon="BsThreeDots"
                  />
                </motion.div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <Image
                imgUrl={gameDetail.background_image}
                styles={classNames(
                  "w-52 h-60 rounded-lg object-cover transition-all duration-300"
                )}
                effect="blur"
              />
              <div className="flex justify-between">
                <Button
                  className="w-20 h-10 bg-white bg-opacity-10 text-white text-lg font-normal rounded-xl"
                  iconClassName="text-white"
                  variant="none"
                  label={gameDetail.metacritic}
                  labelIcon="HiChartBar"
                />
                <Button
                  className="w-20 h-10 bg-white bg-opacity-10 text-white text-lg font-normal rounded-xl"
                  iconClassName="text-white"
                  variant="none"
                  label={`${gameDetail.playtime}h`}
                  labelIcon="FaClock"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
