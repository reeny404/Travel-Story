import { TAGS } from "@/constants/tags";

export const getRandomTags = () => {
  const randomTags = TAGS.sort(() => 0.5 - Math.random());
  return randomTags.slice(0, 4);
};
