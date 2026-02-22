import { CODE_SNIPPETS } from "../data/codes";

export function getLanguagesList():Array<string> {
  return Object.keys(CODE_SNIPPETS).map(key =>
    key
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  )
}

export function getRandomQuestion() {
  const keys = Object.keys(CODE_SNIPPETS);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const randomEntry = {
    key: randomKey,
    value: CODE_SNIPPETS[randomKey as keyof typeof CODE_SNIPPETS]
  };
  return randomEntry
}

export function getFiveUniqueQuestions() {
  const keys = Object.keys(CODE_SNIPPETS);
  
  return keys
    .sort(() => 0.5 - Math.random())
    .slice(0, 5)
    .map(key => ({
      key,
      value: CODE_SNIPPETS[key as keyof typeof CODE_SNIPPETS]
    }));
}