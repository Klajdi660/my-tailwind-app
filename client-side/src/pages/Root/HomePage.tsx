import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../data";
import { iconName } from "../../assets";
import { classNames } from "../../utils";
import { useGames } from "../../hooks";
// import { useAppSelector } from "../../store";
import { Button, Image } from "../../components";

export const HomePage: FC = () => {
  const { LOGIN, /*ACCOUNT_SAVED,*/ HOME } = paths;

  const { useGameSlider, useGameDetail } = useGames();
  const { gamesSlider } = useGameSlider();

  const navigate = useNavigate();

  const [backgroundImage, setBackgroundImage] = useState<string | undefined>();
  const [selectedGameId, setSelectedGameId] = useState<number | undefined>();
  const { gameDetail } = useGameDetail(selectedGameId) as any;

  // const { saveAuthUserData } = useAppSelector((state) => state.user);

  // const navigateTo = saveAuthUserData.length > 0 ? ACOUNT_SAVED : LOGIN;
  const navigateTo = LOGIN;

  useEffect(() => {
    if (gamesSlider && gamesSlider.length > 0) {
      const initialBackgroundImage =
        gamesSlider[0].background_image || undefined;
      const initialGameId = gamesSlider[0].id || undefined;
      setBackgroundImage(initialBackgroundImage);
      setSelectedGameId(initialGameId);
    }
  }, [gamesSlider]);

  const selectedGameHandler = (
    gameId: number,
    imgUrl: string,
    _parent_platforms: any,
  ) => {
    setSelectedGameId(gameId);
    setBackgroundImage(imgUrl);
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
      <div className="w-full h-screen flex flex-col justify-between px-4 pt-6 pb-8 sm:px-6 sm:py-8 md:px-12 md:py-10 lg:px-24 xl:px-40 absolute z-[100] min-h-0">
        <div className="flex flex-col gap-6 md:gap-10 shrink-0">
          <div className="flex_justify_between items-center gap-4">
            <Link to={HOME} className="shrink-0">
              <Image
                imgUrl={iconName}
                name="App Logo"
                styles="w-[100px] h-auto sm:w-[120px] md:w-[150px] object-contain"
                effect="opacity"
              />
            </Link>
            <Button
              className="flex_justify_center shrink-0 min-h-10 w-24 bg-primary text-white hover:brightness-110"
              variant="none"
              label="Sign in"
              onClick={() => navigate(navigateTo)}
            />
          </div>
          <div className="w-full flex flex-row flex-nowrap items-start gap-3 sm:gap-4 overflow-x-auto overscroll-x-contain pb-1 -mx-1 px-1 md:overflow-visible md:justify-between md:gap-2 lg:gap-4 [scrollbar-width:thin]">
            {gamesSlider.map((game: any) => (
              <div
                key={game.id}
                className="relative flex items-end group shrink-0"
              >
                <Image
                  imgUrl={game.background_image}
                  styles={classNames(
                    "rounded-2xl md:rounded-3xl object-cover transition-all duration-300 cursor-pointer touch-manipulation",
                    selectedGameId === game.id
                      ? "w-24 h-24 p-1 sm:w-32 sm:h-32 sm:p-1.5 md:w-40 md:h-40 md:p-2 bg-white bg-opacity-10"
                      : "w-[4.5rem] h-[4.5rem] sm:w-24 sm:h-24 md:w-28 md:h-28 opacity-80",
                  )}
                  effect="opacity"
                  onClick={() =>
                    selectedGameHandler(
                      game.id,
                      game.background_image,
                      game.parent_platforms,
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto min-h-0 shrink pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {gameDetail && (
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-6 lg:gap-10">
              <div className="flex flex-col gap-6 md:gap-12 lg:gap-16 min-w-0 md:max-w-[min(100%,42rem)]">
                <div className="text-white text-3xl sm:text-4xl md:text-5xl font-newCenturySchoolbook leading-tight break-words">
                  {gameDetail.name}
                </div>
                <div className="flex flex-row flex-wrap items-center gap-3 sm:gap-6">
                  <div className="hover:brightness-110 w-full xs:w-auto min-w-0">
                    <Button
                      className="w-full xs:w-60 h-12 sm:h-14 bg-white bg-opacity-10 text-white text-lg sm:text-xl font-normal rounded-full justify-center"
                      iconClassName="text-white"
                      variant="none"
                      label="Buy Game"
                      labelIcon="CiShoppingTag"
                      size={25}
                    />
                  </div>
                  <div className="hover:brightness-110 shrink-0">
                    <Button
                      className="w-12 h-12 sm:w-14 sm:h-14 bg-white bg-opacity-10 text-white text-xl font-normal rounded-full"
                      iconClassName="text-white"
                      variant="none"
                      labelIcon="BsThreeDots"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:gap-6 w-full xs:w-auto xs:max-w-[13rem] sm:max-w-none mx-auto md:mx-0 md:w-auto shrink-0 items-center md:items-end">
                <Image
                  imgUrl={gameDetail.background_image}
                  styles={classNames(
                    "w-full max-w-[208px] xs:max-w-none sm:w-52 aspect-[208/240] sm:aspect-auto sm:h-60 rounded-lg object-cover transition-all duration-300",
                  )}
                  effect="blur"
                />
                <div className="flex justify-between gap-3 w-full max-w-[208px] sm:max-w-none sm:w-52">
                  <Button
                    className="min-w-0 flex-1 h-10 bg-white bg-opacity-10 text-white text-sm sm:text-lg font-normal rounded-xl px-2"
                    iconClassName="text-white"
                    variant="none"
                    label={gameDetail.metacritic}
                    labelIcon="HiChartBar"
                  />
                  <Button
                    className="min-w-0 flex-1 h-10 bg-white bg-opacity-10 text-white text-sm sm:text-lg font-normal rounded-xl px-2"
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
