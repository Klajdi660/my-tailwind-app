export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const addToCart = (game: any) => ({
  type: ADD_TO_CART,
  payload: game,
});

export const removeFromCart = (gameId: any) => ({
  type: REMOVE_FROM_CART,
  payload: gameId,
});
