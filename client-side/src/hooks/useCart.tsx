import { useDispatch } from "react-redux";
import { GameParams } from "../types";
import { addToCart } from "../store";

// import { addToCart } from "../store/redux/action";

export const useCart = () => {
  const dispatch = useDispatch();

  const addGameToCart = (game: GameParams) => {
    dispatch(addToCart(game));
  };

  return { addGameToCart };
};
