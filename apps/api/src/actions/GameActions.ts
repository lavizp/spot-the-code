import type { RoundStates } from "../types/game";
import { getFiveUniqueQuestions } from "../utils/data-urils";

export class GameActions{
  static createNewGame():RoundStates[] {
    const questions = getFiveUniqueQuestions().map((item) => ({
      snippet: item.value, 
      correctAnswer: item.key 
    }));
  return questions
  }
}