import type { RoundStates } from "../types/game";
import { getFiveUniqueQuestions } from "../utils/data-urils";

export class GameActions{
  static createNewGame(): RoundStates[] {
      return getFiveUniqueQuestions().map((item) => {
        const randomIndex = Math.floor(Math.random() * item.value.length);
        return {
          snippet: item.value[randomIndex] as string,
          correctAnswer: item.key,
        };
      });
    }
}