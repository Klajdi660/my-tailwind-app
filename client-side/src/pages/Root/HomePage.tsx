import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../data";
import { iconName } from "../../assets";
import { classNames } from "../../utils";
import { useGames } from "../../hooks";
// import { useAppSelector } from "../../store";
import { Button, Image, PlatformIconList } from "../../components";

export const HomePage: FC = () => {
  const { LOGIN, /*ACCOUNT_SAVED,*/ HOME } = paths;

  const { useGameSlider, useGameDetail } = useGames();
  const { gamesSlider } = useGameSlider();

  const navigate = useNavigate();

  const [backgroundImage, setBackgroundImage] = useState<string | undefined>();
  const [selectedGameId, setSelectedGameId] = useState<number | undefined>();
  const [platformsIcon, setPlatformsIcon] = useState([]);

  const { gameDetail } = useGameDetail(selectedGameId) as any;

  // const { saveAuthUserData } = useAppSelector((state) => state.user);

  // const navigateTo = saveAuthUserData.length > 0 ? ACOUNT_SAVED : LOGIN;
  const navigateTo = LOGIN;

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
    <div className="w-full h-screen">
      <Image
        styles="fixed h-screen w-full object-cover"
        imgUrl={backgroundImage}
        name="/"
      />
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
      <div className="w-full h-screen flex flex-col justify-between py-10 px-40 absolute z-[100]">
        <div className="flex flex-col gap-10">
          <div className="flex_justify_between">
            <Link to={HOME}>
              <Image
                imgUrl={iconName}
                name="App Logo"
                width={150}
                effect="opacity"
              />
            </Link>
            <Button
              className="flex_justify_center w-24 h-10 bg-primary text-white hover:brightness-110"
              variant="none"
              label="Sign in"
              onClick={() => navigate(navigateTo)}
            />
          </div>
          <div className="w-full flex flex-row items-start justify-between">
            {gamesSlider.map((game: any, index: number) => (
              <div key={game.id} className="relative flex items-end group">
                <Image
                  imgUrl={game.background_image}
                  styles={classNames(
                    "rounded-3xl object-cover transition-all duration-300 cursor-pointer",
                    selectedGameId === game.id
                      ? "w-40 h-40 shadow-lg border-2 border-white p-1"
                      : "w-28 h-28 opacity-80"
                  )}
                  effect="opacity"
                  onClick={() =>
                    selectedGameHandler(
                      game.id,
                      game.background_image,
                      game.parent_platforms
                    )
                  }
                />
                {selectedGameId === game.id && (
                  <div
                    className={classNames(
                      "flex flex-row gap-2 items-center fixed",
                      index === gamesSlider.length - 1
                        ? "right-[330px]"
                        : "ml-[170px]"
                    )}
                  >
                    {index === gamesSlider.length - 1 ? (
                      <>
                        <p className="text-white text-2xl">
                          {gameDetail?.name}
                        </p>
                        <div className="flex gap-2 p-2 bg-white rounded-xl">
                          <PlatformIconList
                            className="text-secondary"
                            platforms={platformsIcon
                              .slice(0, 4)
                              .map((p: any) => p.platform)}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex gap-2 p-2 bg-white rounded-xl">
                          <PlatformIconList
                            className="text-secondary"
                            platforms={platformsIcon
                              .slice(0, 4)
                              .map((p: any) => p.platform)}
                          />
                        </div>
                        <p className="text-white text-2xl">
                          {gameDetail?.name}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          {gameDetail && (
            <div className="mt-auto flex items-end justify-between">
              <div className="flex flex-col gap-16">
                <div className="flex text-white text-5xl font-newCenturySchoolbook">
                  {gameDetail.name}
                </div>
                <div className="flex flex-row gap-6">
                  <div className="hover:brightness-110">
                    <Button
                      className="w-60 h-14 bg-white bg-opacity-10 text-white text-xl font-normal rounded-full"
                      iconClassName="text-white"
                      variant="none"
                      label="Buy Game"
                      labelIcon="CiShoppingTag"
                      size={25}
                    />
                  </div>
                  <div className="hover:brightness-110">
                    <Button
                      className="w-14 h-14 bg-white bg-opacity-10 text-white text-xl font-normal rounded-full"
                      iconClassName="text-white"
                      variant="none"
                      labelIcon="BsThreeDots"
                    />
                  </div>
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
    </div>
  );
};
