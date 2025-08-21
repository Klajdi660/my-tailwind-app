import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../data";
import { Image } from "../../components";
import { GenreCardProps } from "../../types";

export const GenreCard: FC<GenreCardProps> = (props) => {
  const { genreId, genreName, genreImg, genreCount } = props;

  const { BROWSE } = paths;

  const navigate = useNavigate();

  const handleGenreClick = (
    id: number,
    name: string,
    filterName: string,
    filterId: string
  ) => {
    const params = new URLSearchParams();
    params.set(filterName, name);
    params.set(filterId, id.toString());
    navigate(`${BROWSE}?${params.toString()}`);
  };

  const cleanedGenreName = genreName.replace(/games/i, "").trim();

  return (
    <button
      type="button"
      onClick={() => handleGenreClick(genreId, genreName, "genre", "genreId")}
      className="flex items-center gap-4 bg-card rounded-xl p-4 w-full hover:bg-primary-opacity hover:brightness-110 group"
    >
      <Image
        name={genreName}
        imgUrl={genreImg}
        styles="w-20 h-16 rounded object-cover"
        effect="blur"
      />
      <div className="flex flex-col items-start">
        <span className="font-semibold group-hover:text-primary">
          {cleanedGenreName}
        </span>
        <span className="text-secondary">{genreCount} games</span>
      </div>
    </button>
  );
};
