import { FunctionComponent } from "react";
import { Tooltip } from "antd";
import { Button, Icon, Image } from "../UI";
// import { useStore } from "../../hooks";
import { classNames, useMobileResponsive } from "../../utils";

interface GameDetailProps {
  gameDetail: any;
}

export const GameDetail: FunctionComponent<GameDetailProps> = (props) => {
  const { gameDetail } = props;

  const { background_image, background_image_additional, name, genres } =
    gameDetail;

  // const { loading } = useStore();
  const isMobile = useMobileResponsive();

  console.log("gameDetail :>> ", gameDetail);
  return (
    <div className="game_detail flex flex-col md:flex-row">
      <div className="flex-grow min-h-screen">
        <div
          style={{
            backgroundImage: `url(${background_image_additional})`,
          }}
          className="bg-cover bg-center bg-no-repeat md:h-[400px] h-[300px] rounded-2xl relative"
        >
          <div className="bg-gradient-to-br from-transparent to-black/70 h-full rounded-2xl">
            <div className="flex flex-col items-center md:flex-row bottom-[-85%] md:bottom-[-20%] tw-absolute-center-horizontal w-full max-w-[1000px]">
              <div className="flex gap-5 items-end">
                <div className="shrink-0">
                  <Image
                    imgUrl={background_image}
                    name="game-details-cover"
                    styles="w-[185px] h-[260px] object-cover rounded-md"
                  />
                </div>
                <div className="mb-5">
                  {isMobile && (
                    <Button
                      label="WATCH"
                      variant="contained"
                      labelIcon="BsFillPlayFill"
                      className="w-[140px] rounded-full"
                    />
                  )}
                </div>
              </div>
              <div className="flex-grow md:ml-14 ml-6 space-y-2 mb-10">
                <h1 className="text-primary text-4xl font-bold leading-tight">
                  {name}
                </h1>
                <div className="flex gap-4">
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
                <div className="flex gap-5">
                  <Button
                    label="WATCH"
                    variant="contained"
                    labelIcon="BsFillPlayFill"
                    className="w-[150px] rounded-full"
                  />
                  <Button
                    label="BUY NOW"
                    variant="contained"
                    labelIcon="CiShoppingTag"
                    className="w-[150px] rounded-full"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-3 absolute top-[5%] right-[3%]">
              <Tooltip title="Add to Wishlist" trigger={["hover"]}>
                <button
                  // onClick={bookmarkedHandler}
                  className={classNames(
                    "tw-flex-center h-12 w-12 rounded-full border-2 border-white shadow-lg hover:border-red-500 transition duration-300 group"
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
                  // onClick={bookmarkedHandler}
                  className={classNames(
                    "tw-flex-center h-12 w-12 rounded-full border-2 border-white shadow-lg hover:border-primary transition duration-300 group"
                    // isBookmarked && "!border-primary"
                  )}
                >
                  <Icon
                    name="FaOpencart"
                    size={20}
                    className={classNames(
                      "text-white group-hover:text-primary transition duration-300"
                      // isBookmarked && "!text-primary"
                    )}
                  />
                </button>
              </Tooltip>

              {/* {!isMobile && (
                <>
                  <button className="tw-flex-center h-12 w-12 rounded-full border-[3px] border-white shadow-lg hover:border-primary transition duration-300 group">
                    <BsShareFill
                      size={20}
                      className="text-white group-hover:text-primary transition duration-300"
                    />
                  </button>
                  <button className="tw-flex-center h-12 w-12 rounded-full border-[3px] border-white shadow-lg hover:border-primary transition duration-300 group">
                    <BsThreeDots
                      size={20}
                      className="text-white group-hover:text-primary transition duration-300"
                    />
                  </button>
                </>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
