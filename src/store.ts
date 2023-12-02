import { StoreApi, UseBoundStore, create } from "zustand";
import User from "./entities/User";
import { getUser } from "./hooks/useUsers";

interface EntryQuery {
  authorId?: string;
  timeFilterValue?: string;
  sortOrder?: string;
  searchText?: string;
}

interface UserQuery {
  sortOrder?: string;
  searchText?: string;
}

interface EntryQueryStore {
  entryQuery: EntryQuery;
  setAuthorId: (userId: string) => void;
  setSearchText: (searchText: string) => void;
  setTimeFilterValue: (filterText: string) => void;
  setSortOrder: (sortOrder: string) => void;
}

interface UserQueryStore {
  userQuery: UserQuery;
  setSearchText: (searchText: string) => void;
  setSortOrder: (sortOrder: string) => void;
}

interface AppStore {
  currentUser: User;
  entryQueryStore: UseBoundStore<StoreApi<EntryQueryStore>>;
  userQueryStore: UseBoundStore<StoreApi<UserQueryStore>>;
  setCurrentUser: (user: User) => void;
}

const useEntryQueryStore = create<EntryQueryStore>((set) => ({
  entryQuery: {},
  setAuthorId: (authorId) => set(() => ({ entryQuery: { authorId } })),
  setSearchText: (searchText) => set(() => ({ entryQuery: { searchText } })),
  setTimeFilterValue: (timeFilterValue) =>
    set((store) => ({
      entryQuery: { ...store.entryQuery, timeFilterValue },
    })),
  setSortOrder: (sortOrder) =>
    set((store) => ({ entryQuery: { ...store.entryQuery, sortOrder } })),
}));

const useUserQueryStore = create<UserQueryStore>((set) => ({
  userQuery: {},
  setSearchText: (searchText) => set(() => ({ userQuery: { searchText } })),
  setSortOrder: (sortOrder) =>
    set((store) => ({ userQuery: { ...store.userQuery, sortOrder } })),
}));

const dummyUser = getUser();
// const placeholderUserData = {
//   _id: "",
//   username: "",
//   password: "",
//   following: [],
//   followers: [],
//   timestamp: new Date(),
// };
const useAppStore = create<AppStore>((set) => ({
  currentUser: dummyUser,
  entryQueryStore: useEntryQueryStore,
  userQueryStore: useUserQueryStore,
  setCurrentUser: (user) => set(() => ({ currentUser: user })),
}));

export default useAppStore;
