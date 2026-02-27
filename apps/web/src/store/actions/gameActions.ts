import { CODE_SNIPPETS } from "@/data/codes";
import { useGameStore } from "@/store";

const LANGUAGES = Object.keys(CODE_SNIPPETS);

const getRandomSnippetAndOptions = () => {
  const correctLanguage = LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)];
  const snippets = CODE_SNIPPETS[correctLanguage as keyof typeof CODE_SNIPPETS];
  const snippet = snippets[Math.floor(Math.random() * snippets.length)];

  return { snippet, correctLanguage, options: LANGUAGES };
};

export const gameActions = {
  startGame: () => {
    const { snippet, correctLanguage, options } = getRandomSnippetAndOptions();
    useGameStore.getState().setStartGame(snippet, correctLanguage, options);
  },

  submitGuess: (selectedLanguage: string) => {
    const { correctLanguage } = useGameStore.getState();
    
    const isCorrect = selectedLanguage === correctLanguage;
    const roundScore = isCorrect ? 1000 : 0;

    useGameStore.getState().setGuessResult(selectedLanguage, roundScore);
  },

  nextRound: () => {
    const { currentRound, totalRounds } = useGameStore.getState();
    if (currentRound >= totalRounds) {
      useGameStore.getState().setGameOver();
    } else {
      const { snippet, correctLanguage, options } = getRandomSnippetAndOptions();
      useGameStore.getState().setNextRound(snippet, correctLanguage, options);
    }
  },

  resetGame: () => {
    gameActions.startGame();
  }
}