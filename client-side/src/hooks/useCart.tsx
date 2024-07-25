import { useDispatch } from "react-redux";
import { GameParams } from "../types";
import { addToCart, removeFromCart, removeSelectedGames } from "../store";

export const useCart = () => {
  const dispatch = useDispatch();

  const addGameToCart = (game: GameParams) => {
    dispatch(addToCart(game));
  };

  const removeGameFromCart = (gameId: number) => {
    dispatch(removeFromCart(gameId));
  };

  const removeGameSelected = (selections: number[]) => {
    dispatch(removeSelectedGames(selections));
  };

  return { addGameToCart, removeGameFromCart, removeGameSelected };
};
