import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Icon, Button } from "../UI";
import { useStore } from "../../hooks";
import { useMobileResponsive } from "../../utils";

interface GameDetailProps {
  gameDetail: any;
}

export const GameDetail: FunctionComponent<GameDetailProps> = (props) => {
  const { gameDetail } = props;

  const { background_image, background_image_additional, name, genres } =
    gameDetail;

  const { loading } = useStore();
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
            <div className="flex flex-col md:flex-row bottom-[-85%] md:bottom-[-20%]  items-start tw-absolute-center-horizontal w-full max-w-[1000px]">
              <div className="flex gap-5 items-center">
                <div className="shrink-0 w-[185px] ml-3 md:ml-0">
                  <LazyLoadImage
                    src={background_image}
                    effect="opacity"
                    className="w-full h-full object-cover rounded-md"
                    alt="Poster"
                    width={185}
                    height={260}
                  />
                </div>
                {isMobile && (
                  // <Link to="#" className="group">
                  //   <div className="flex gap-4 items-center pl-5 pr-12 py-3 rounded-full bg-primary text-white group-hover:brightness-110 transition duration-300 mt-24">
                  //     <Icon
                  //       name="BsFillPlayFill"
                  //       size={25}
                  //       className="text-white"
                  //     />
                  //     <span className="text-lg font-medium">WATCH</span>
                  //   </div>
                  // </Link>
                  <Button
                    label="WATCH"
                    variant="contained"
                    // labelIcon="BsFillPlayFill"
                    className="rounded-full"
                  />
                )}
              </div>
              <div className="flex-grow md:ml-14 ml-6 mt-6 md:mt-0">
                <div className="md:h-28 flex items-end">
                  <h1 className="text-white text-4xl font-bold leading-tight">
                    {name}
                  </h1>
                </div>
                <ul className="flex gap-3 flex-wrap md:mt-2 mt-3 cursor-pointer">
                  {genres.slice(0, 3).map((genre: any) => (
                    <li key={genre.id} className="mb-3">
                      <div
                        // to={`/explore?genre=${genre.id}`}
                        className="md:px-5 px-3 md:py-2 py-1 rounded-full uppercase font-medium border border-gray-300 md:text-white hover:brightness-75 transition duration-300"
                      >
                        {genre.name}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* WATCH NOW */}
              {!isMobile && (
                // <Link to="#" className="group">
                //   <div className="flex gap-4 items-center pl-6 pr-12 py-3 rounded-full bg-primary text-white group-hover:brightness-110 transition duration-300 mt-24">
                //     <Icon
                //       name="BsFillPlayFill"
                //       size={25}
                //       className="text-white "
                //     />
                //     <span className="text-lg font-medium">WATCH</span>
                //   </div>
                // </Link>
                <div className="flex">
                  <Button
                    label="WATCH"
                    variant="contained"
                    labelIcon="BsFillPlayFill"
                    className="w-[150px] rounded-full"
                  />
                </div>
              )}
            </div>

            {/* BOOKMARK BUTTONS */}
            {/* <div className="flex gap-3 absolute top-[5%] right-[3%]">
              <button
                onClick={bookmarkedHandler}
                className={`tw-flex-center h-12 w-12 rounded-full border-[3px] border-white shadow-lg hover:border-primary transition duration-300 group ${
                  isBookmarked && "!border-primary"
                }`}
              >
                <AiFillHeart
                  size={20}
                  className={`text-white group-hover:text-primary transition duration-300 ${
                    isBookmarked && "!text-primary"
                  }`}
                />
              </button>
              {!isMobile && (
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
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
