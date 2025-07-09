import { FC, useEffect, useRef, useState } from "react";
import { useGames } from "../hooks";
import { Button, Header, Image } from "../components";
import { classNames } from "../utils";
import { motion } from "framer-motion";

const maxWidth = "max-w-[1140px] mx-auto md:px-8 sm:px-6 px-4 xl:px-0";

export const GamesSlider: FC = () => {
  const { useGameSlider, useGameDetail } = useGames();
  const { gamesSlider } = useGameSlider();

  const [selectedGameId, setSelectedGameId] = useState<number | undefined>();
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>();
  const [, setCurrentIndex] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { gameDetail } = useGameDetail(selectedGameId) as any;

  useEffect(() => {
    if (gamesSlider && gamesSlider.length > 0) {
      const initialGame = gamesSlider[0];
      setSelectedGameId(initialGame.id);
      setBackgroundImage(initialGame.background_image || undefined);
      setCurrentIndex(0);
    }
  }, [gamesSlider]);

  useEffect(() => {
    if (!gamesSlider || gamesSlider.length === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % gamesSlider.length;
        const nextGame = gamesSlider[nextIndex];
        setSelectedGameId(nextGame.id);
        setBackgroundImage(nextGame.background_image);
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(intervalRef.current!);
  }, [gamesSlider]);

  const selectedGameHandler = (
    gameId: number,
    imgUrl: string,
    index: number
  ) => {
    setSelectedGameId(gameId);
    setBackgroundImage(imgUrl);
    setCurrentIndex(index);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % gamesSlider.length;
        const nextGame = gamesSlider[nextIndex];
        setSelectedGameId(nextGame.id);
        setBackgroundImage(nextGame.background_image);
        return nextIndex;
      });
    }, 5000);
  };

  if (!gamesSlider) return null;

  return (
    <div
      className="relative lg:h-screen sm:h-[640px] xs:h-[520px] h-[460px] w-full py-6 transition-all duration-1000"
      style={{
        backgroundImage: `
      linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.5)),url('${backgroundImage}')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={classNames(maxWidth, "flex flex-col gap-16")}>
        <Header />
        <div className="flex flex-col justify-between">
          <div className="flex items-start gap-2">
            {gamesSlider.map((game: any, index: number) => (
              <div key={game.id} className="relative flex items-end group">
                <Image
                  imgUrl={game.background_image}
                  styles={classNames(
                    "rounded-3xl object-cover cursor-pointer transition-all duration-500 ease-in-out transform",
                    selectedGameId === game.id
                      ? "w-40 h-40 shadow-lg border-2 border-white p-1 scale-105"
                      : "w-28 h-28 opacity-80 scale-100"
                  )}
                  effect="opacity"
                  onClick={() =>
                    selectedGameHandler(game.id, game.background_image, index)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {gameDetail && (
          <motion.div
            key={gameDetail.id}
            className="mt-auto flex items-end justify-between"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
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
              <motion.div
                key={gameDetail.background_image}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  imgUrl={gameDetail.background_image}
                  styles="w-52 h-60 rounded-lg object-cover transition-all duration-300"
                  effect="blur"
                />
              </motion.div>
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
          </motion.div>
        )}
      </div>
    </div>
  );
};
