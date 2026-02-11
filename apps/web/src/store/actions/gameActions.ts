import { useGameStore } from "@/store";
import { CODE_SNIPPETS } from "@/data/codes";

const LANGUAGES = Object.keys(CODE_SNIPPETS);

const getRandomSnippetAndOptions = () => {
  const correctLanguage = LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)];
  const snippets = CODE_SNIPPETS[correctLanguage as keyof typeof CODE_SNIPPETS];
  const snippet = snippets[Math.floor(Math.random() * snippets.length)];

  // Select 3 other random languages for options
  const otherLanguages = LANGUAGES.filter((lang) => lang !== correctLanguage);
  // Simple shuffle
  const shuffledOthers = [...otherLanguages].sort(() => 0.5 - Math.random());
  const wrongOptions = shuffledOthers.slice(0, 3);

  const options = [...wrongOptions, correctLanguage].sort(() => 0.5 - Math.random());

  return { snippet, correctLanguage, options };
};

export const gameActions = {
  startGame: () => {
    const { snippet, correctLanguage, options } = getRandomSnippetAndOptions();
    useGameStore.getState().setStartGame(snippet, correctLanguage, options);
  },

  submitGuess: (selectedLanguage: string) => {
    const { correctLanguage } = useGameStore.getState();
    
    // Simple scoring: 1000 if correct, 0 if wrong
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