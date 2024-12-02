import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  sideBarOpen: false,
  toggleSideBar: () => set((state) => ({ sideBarOpen: !state.sideBarOpen })),
  closeSideBar: () => set((state) => ({ sideBarOpen: false })),

  filterBarOpen: false,
  toggleFilterBar: () =>
  set((state) => ({ filterBarOpen: !state.filterBarOpen })),
  closeFilterBar: () => set((state) => ({ filterBarOpen: false })),

  searchOpen: false,
  toggleSearch: () => set((state) =>({searchOpen: !state.searchOpen})),
  closeSearch:  () => set((state) => ({ searchOpen: false })),
}));
