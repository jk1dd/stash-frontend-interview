import { create } from "zustand"

export type Hotel = {
  name: string
  city: string
  daily_rate: number
  id: number
  has_member_rate: boolean
  image: string
}

type HotelState = {
  hotels: Hotel[];
  fetchHotels: () => Promise<void>;
  getHotelById: (id: number) => Hotel | undefined;
};

export const useHotelStore = create<HotelState>((set, get) => ({
  hotels: [],
  fetchHotels: async () => {
    const response = await fetch('/data.json');
    const data = await response.json();
    set({ hotels: data });
  },
  getHotelById: (id) => {
    const { hotels } = get();
    return hotels.find((hotel) => hotel.id === id);
  },
}));