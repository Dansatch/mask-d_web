import { StoreApi, UseBoundStore, create } from "zustand";
import User from "./entities/User";

interface EntryQuery {
  authorId?: string;
  timeFilterValue?: string;
  sortOption?: string;
  searchText?: string;
}

interface UserQuery {
  sortOption?: string;
  searchText?: string;
}

interface EntryQueryStore {
  entryQuery: EntryQuery;
  setAuthorId: (userId: string) => void;
  setSearchText: (searchText: string) => void;
  setTimeFilterValue: (filterText: string) => void;
  setSortOption: (sortOption: string) => void;
}

interface UserQueryStore {
  userQuery: UserQuery;
  setSearchText: (searchText: string) => void;
  setSortOption: (sortOrder: string) => void;
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
  setSortOption: (sortOption) =>
    set((store) => ({
      entryQuery: { ...store.entryQuery, sortOption },
    })),
}));

const useUserQueryStore = create<UserQueryStore>((set) => ({
  userQuery: {},
  setSearchText: (searchText) => set(() => ({ userQuery: { searchText } })),
  setSortOption: (sortOption) =>
    set((store) => ({
      userQuery: { ...store.userQuery, sortOption },
    })),
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
