import { randomPrompts } from "../constants";

export function getRandomPrompt(prompt: string) {
  const randomIndex = Math.floor(Math.random() * randomPrompts.length);

  const randomPrompt = randomPrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}
