import { GameParams, User } from "./general.type";

// gameCart
export interface CartState {
  items: GameParams[];
}

// settingCard
export interface Card {
  id: number;
  cardNr: string;
  cardName: string;
  cardValidThru: string;
  cardCvvNr: string;
}

export interface CardState {
  cardItems: Card[];
}

// user
export interface UserState {
  user: User;
  saveAuthUserData: {
    id: string;
    username: string;
    email: string;
    saveAuthUserToken: string;
    photo: any;
  }[];
  currency: string;
  remember: boolean;
  userLastLogin: {
    id: string;
    lastLogin: string;
  }[];
}
