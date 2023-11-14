import { Entry } from "../entities/Entry";

export const getTotalEntriesByUserName = (username: string) => {
  username;
  return Promise.resolve(2391);
};

export const createEntry = async (data: Entry) => {
  return Promise.resolve(console.log(`Created ${data.title}`));
};
