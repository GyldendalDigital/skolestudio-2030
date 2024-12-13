import { Content } from "./types";

export const getLocalUserId = () => {
  let userId = localStorage.getItem("userId");
  if (userId) {
    return userId;
  }

  userId = Math.random().toString(36).substring(7);
  localStorage.setItem("userId", userId);
  return userId;
};

export const getLocalContent = (): Content[] => {
  try {
    return JSON.parse(localStorage.getItem("content") || "[]");
  } catch (error) {
    return [];
  }
};

export const createLocalContent = (data: Content) => {
  const existingContent = getLocalContent().filter((x) => x.slug !== data.slug);
  localStorage.setItem("content", JSON.stringify([...existingContent, data]));
};

export const deleteLocalContent = () => {
  localStorage.setItem("content", JSON.stringify([]));
};

export const createEmptyContent = () =>
  ({
    slug:
      convertToSlug("Nytt innhold") +
      "-" +
      Math.random().toString(36).substring(7),
    title: "Nytt innhold",
    description: "",
    body: "",
    subjects: [],
    lectureTypes: [],
    contentTypes: [],
    formats: [],
    topics: [],
    createdAt: new Date().toISOString(),
    createdBy: getLocalUserId(),
  }) satisfies Content;

const convertToSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
