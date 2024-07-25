import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Tooltip, Progress } from "antd";
import { GameTabDetail } from "./GameTabDetail";
import { HeaderBannerSkeleton } from "../Skeleton";
import { Button, Icon, Image } from "../UI";
import { useStore, useCart } from "../../hooks";
import { GameDetailProps } from "../../types";
import { classNames, useMobileResponsive } from "../../utils";

export const GameDetail: FunctionComponent<GameDetailProps> = (props) => {
  const { gameDetail, gameVideos, gameReviews } = props;

  const {
    background_image,
    background_image_additional,
    name,
    genres,
    rating,
    playtime,
    id,
  } = gameDetail;

  const { results: gameVideoResults } = gameVideos;

  const { loading } = useStore();
  const isMobile = useMobileResponsive();
  const { addGameToCart } = useCart();

  const cart = useSelector((state: any) => state.cart.items);

  const gameInCart = cart.find((item: any) => item.id === id);

  const getColor = (rating: number) => {
    if (rating >= 4) return "green";
    if (rating >= 2) return "#0077B5";
    return "red";
  };

  const addToCartHandler = () => {
    addGameToCart(gameDetail);
  };

  return (
    <div className="game_detail flex flex-col md:flex-row">
      <div className="flex-grow min-h-screen">
        {loading && (
          <div className="animate_skeleton">
            <HeaderBannerSkeleton type="game-detail" />
          </div>
        )}
        {!loading && (
          <div
            style={{
              backgroundImage: `url(${background_image_additional})`,
            }}
            className="bg-cover bg-center bg-no-repeat md:h-[400px] h-[300px] rounded-2xl relative"
          >
            <div className="bg-gradient-to-br from-transparent to-black/70 h-full rounded-2xl">
              <div className="flex flex-col items-center md:flex-row absolute bottom-[-85%] md:bottom-[-20%] left-[10%] right-[3%]">
                <div className="flex gap-5 items-center">
                  <div className="shrink-0 z-40">
                    <Image
                      imgUrl={background_image}
                      name="game-details-cover"
                      styles="w-[185px] h-[260px] object-cover rounded-md"
                    />
                  </div>
                  {isMobile && (
                    <Button
                      label="BUY NOW"
                      variant="contained"
                      labelIcon="CiShoppingTag"
                      className="w-[150px] rounded-full"
                    />
                  )}
                </div>
                <div className="flex-grow md:ml-10 ml-6 mt-6 md:mt-0 mb-10 z-40">
                  <h1 className="text-primary text-4xl font-bold leading-tight">
                    {name}
                  </h1>

                  <div className="flex gap-3 flex-wrap mt-3">
                    {genres.slice(0, 3).map((genre: any) => (
                      <Button
                        key={genre.id}
                        label={genre.name}
                        variant="outlined"
                        className="rounded-full border-primary text-primary hover:brightness-75 transition duration-300"
                      />
                    ))}
                  </div>
                </div>
                {!isMobile && (
                  <Button
                    label="BUY NOW"
                    variant="contained"
                    labelIcon="CiShoppingTag"
                    className="w-[150px] rounded-full"
                  />
                )}
              </div>
              <div className="flex gap-3 absolute top-[5%] right-[3%]">
                <Tooltip title="Add to Wishlist" trigger={["hover"]}>
                  <button
                    // onClick={bookmarkedHandler}
                    className={classNames(
                      "flex_justify_center h-12 w-12 rounded-full border-2 border-white shadow-lg hover:border-red-500 transition duration-300 group"
                      // isBookmarked && "!border-primary"
                    )}
                  >
                    <Icon
                      name="AiFillHeart"
                      size={20}
                      className={classNames(
                        "text-white group-hover:text-red-500 transition duration-300"
                        // isBookmarked && "!text-primary"
                      )}
                    />
                  </button>
                </Tooltip>
                <Tooltip title="Add to Cart" trigger={["hover"]}>
                  <button
                    onClick={addToCartHandler}
                    className={classNames(
                      "flex_justify_center h-12 w-12 rounded-full border-2 border-white shadow-lg hover:border-primary transition duration-300 group",
                      gameInCart && "!border-primary"
                    )}
                  >
                    <Icon
                      name="FaOpencart"
                      size={20}
                      className={classNames(
                        "text-white group-hover:text-primary transition duration-300",
                        gameInCart && "!text-primary"
                      )}
                    />
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
        )}
        <div className="flex z-20 relative flex-col md:flex-row mt-32 md:mt-0 bg-switch">
          {!isMobile && (
            <div className="shrink-0 md:max-w-[150px] w-full flex items-center md:flex-col justify-center flex-row gap-20 mt-20 md:border-r border-divider pt-16">
              <div className="flex flex-col gap-6 items-center">
                <p className="text-onNeutralBg font-medium text-lg">RATING</p>
                {!isMobile && (
                  <div className="w-16">
                    <Progress
                      type="circle"
                      size="small"
                      strokeColor={getColor(rating)}
                      percent={(rating / 5) * 100}
                      format={() => rating.toFixed(1)}
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3 items-center">
                <p className="text-onNeutralBg font-medium text-lg">
                  PLAY TIME
                </p>
                <div className="flex gap-2 items-center text-secondary">
                  <p className="text-2xl">{playtime}</p>
                  <span>hour</span>
                </div>
              </div>
            </div>
          )}
          <div className="flex-grow min-h-[500px] md:border-r border-divider md:px-16 px-5 md:py-7 pt-40">
            <GameTabDetail gameDetail={gameDetail} gameReviews={gameReviews} />
          </div>
          <div className="shrink-0 md:max-w-[300px] w-full px-6 pt-6">
            <p className="text-onNeutralBg font-medium text-lg mb-5">MEDIA</p>
            <ul className="flex flex-col md:gap-[30px] gap-6">
              {gameVideoResults.length > 0 &&
                gameVideoResults.slice(0, 2).map((video: any) => {
                  return (
                    <li key={video.id}>
                      <div className="relative h-0 pb-[56.25%]">
                        <iframe
                          frameBorder="0"
                          allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          title="Video trailer"
                          width="100%"
                          height="100%"
                          // src={`https://www.youtube.com/embed/${video.id}?enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A3000&amp;widgetid=1`}
                          src={video.data["max"]}
                          id="widget2"
                          className="absolute top-0 left-0 !w-full !h-full"
                        ></iframe>
                      </div>
                      <p className="mt-3 text-lg whitespace-nowrap overflow-hidden text-ellipsis">
                        {video.name}
                      </p>
                    </li>
                  );
                })}
              {!gameVideoResults.length && (
                <p className="text-primary text-xl font-bold text-center">
                  No media found
                </p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
