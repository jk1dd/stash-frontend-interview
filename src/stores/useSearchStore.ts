import { create } from 'zustand';

type SearchParams = {
  query: string;
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
};

type SearchState = {
  searchParams: SearchParams;
  updateSearchParams: (params: Partial<SearchParams>) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  searchParams: {
    query: '',
    checkin: '',
    checkout: '',
    adults: 1,
    children: 0,
  },
  updateSearchParams: (params) =>
    set((state) => ({ searchParams: { ...state.searchParams, ...params } })),
}));
