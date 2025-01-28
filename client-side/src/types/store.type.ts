import { GameParams } from "./general.type";
import { User } from "./user.type";

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
interface SaveAuthUserData {
  id: string;
  username: string;
  email: string;
  saveAuthUserToken: string;
  photo: any;
}

interface UserLastLoginData {
  id: string;
  lastLogin: string;
}

export interface UserState {
  user: User;
  saveAuthUserData: SaveAuthUserData[];
  currency: string;
  remember: boolean;
  userLastLogin: UserLastLoginData[];
}
