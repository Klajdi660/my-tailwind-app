import { useDispatch } from "react-redux";
import { GameParams } from "../types";
import { addToCart } from "../store";

export const useCart = () => {
  const dispatch = useDispatch();

  const addGameToCart = (game: GameParams) => {
    dispatch(addToCart(game));
  };

  return { addGameToCart };
};
