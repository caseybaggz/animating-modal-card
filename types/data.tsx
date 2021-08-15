import { LayoutRectangle } from "react-native";

export interface CardData {
  items: CardId[];
  results: CardDataResults;
}

export interface Card {
  content: string;
  headline: string;
  id: CardId;
  image: CardImg;
}

export interface CardDataResults {
  [key: string]: Card;
}

export interface CardImg {
  uri: string;
}

// Types

export type CardId = keyof CardDataResults;

export type ModalPos = LayoutRectangle & Card;
