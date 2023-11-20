import entries from "../data/entries";
import { EntryDataToSubmit } from "../entities/Entry";

export const useEntry = (id: string) => {
  id;
  return Promise.resolve(entries[0]);
};

export const getTotalEntriesByUserName = (username: string) => {
  username;
  return Promise.resolve(2391);
};

export const createEntry = async (data: EntryDataToSubmit) => {
  // Convert to Entry
  return Promise.resolve(console.log(`Created ${data.title}`));
};

export const likeEntry = async (entryId: string) => {
  const userId = "userIdFromZustand";

  const entry = await useEntry(entryId);
  entry.likes.push(userId);
};
