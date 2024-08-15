import { motion } from "framer-motion";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { iconName } from "../../assets";
import { HomePageProps } from "../../types";
import { Image, Button, HomeFooter } from "../../components";
import { useGames } from "../../hooks/useGames";

export const HomePage: FC<HomePageProps> = () => {
  const navigate = useNavigate();

  const { data, error, isLoading, fetchNextPage, hasNextPage } = useGames();

  const initialBackgroundImage =
    data && data.pages.length > 0 && data.pages[0].results.length > 0
      ? data.pages[0].results[0].background_image
      : undefined;

  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(
    initialBackgroundImage
  );
  const [selectedGame, setSelectedGame] = useState<{
    id: number;
    name: string;
    background_image: string;
  } | null>(null);

  if (!data) return null;

  const handleImageChange = (game: {
    id: number;
    name: string;
    background_image: string;
  }) => {
    setBackgroundImage(game.background_image);
    setSelectedGame(game);
  };

  return (
    <div
      className="w-full h-screen"
      style={{
        background: `linear-gradient(to top, rgba(255, 255, 255, 0.3), rgba(0,0,0,0.8)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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
              className="w-25 bg-white bg-opacity-10 text-white"
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
          {data.pages &&
            data.pages.map((page, index) => (
              <div
                key={index}
                className="flex flex-row items-start justify-end gap-2"
              >
                {page.results.slice(0, 10).map((game) => (
                  <div key={game.id} className="relative">
                    <button
                      onClick={() =>
                        handleImageChange({
                          id: game.id,
                          name: game.name,
                          background_image: game.background_image,
                        })
                      }
                    >
                      <Image
                        imgUrl={game.background_image}
                        styles={`rounded-xl object-cover transition-all duration-300 ${
                          selectedGame?.id === game.id
                            ? "w-32 h-32 shadow-lg"
                            : "w-20 h-20 opacity-80 hover:opacity-100"
                        }`}
                      />
                    </button>
                    {selectedGame?.id === game.id && (
                      <p className="text-white absolute bottom-0 right-0 left-10 bg-black bg-opacity-50 px-2 py-1">
                        {selectedGame.name}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
