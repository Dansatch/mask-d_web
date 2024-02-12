import { StoreApi, UseBoundStore, create } from "zustand";
import User from "./entities/User";

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
  isLoggedIn: boolean;
  entryQueryStore: UseBoundStore<StoreApi<EntryQueryStore>>;
  userQueryStore: UseBoundStore<StoreApi<UserQueryStore>>;
  setCurrentUser: (user: User | undefined) => void;
  setLoggedIn: (value: boolean) => void;
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

const placeholderUserData: User = {
  _id: "",
  username: "",
  following: [],
  followers: [],
  isPrivate: false,
  timestamp: new Date(),
};

const useAppStore = create<AppStore>((set) => ({
  currentUser: placeholderUserData,
  isLoggedIn: false,
  entryQueryStore: useEntryQueryStore,
  userQueryStore: useUserQueryStore,
  setCurrentUser: (user) => set(() => ({ currentUser: user })),
  setLoggedIn: (value) => set(() => ({ isLoggedIn: value })),
}));

export default useAppStore;
