import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type TravelTypeStore = {
  travelType: Travel;
  setCountry: (value: string) => void;
  setTheme: (value: string) => void;
  setSeason: (value: string) => void;
  setTravelMate: (value: string) => void;
  setTravel: (value: Travel) => void;
  clearTheme: (value: string) => void;
  clearSeason: (value: string) => void;
  clearTravelMate: (value: string) => void;
};
type Travel = {
  country: string;
  theme: string[];
  season: string[];
  travelMate: string[];
};

export const useTravelType = create<TravelTypeStore>()(
  immer((set) => ({
    travelType: {
      country: "",
      theme: [],
      season: [],
      travelMate: [],
    },
    setCountry: (country) => {
      set((state) => {
        state.travelType.country = country;
      });
    },
    setTheme: (theme) => {
      set((state) => {
        state.travelType.theme.push(theme);
      });
    },
    setSeason: (season) => {
      set((state) => {
        state.travelType.season.push(season);
      });
    },
    setTravelMate: (travelMate) => {
      set((state) => {
        state.travelType.travelMate.push(travelMate);
      });
    },
    setTravel: (travel) => {
      set((state) => {
        state.travelType = travel;
      });
    },
    clearTheme: (theme) => {
      set((state) => {
        state.travelType.theme = state.travelType.theme.filter(
          (item) => item !== theme
        );
      });
    },
    clearSeason: (season) => {
      set((state) => {
        state.travelType.season = state.travelType.season.filter(
          (item) => item !== season
        );
      });
    },
    clearTravelMate: (travelMate) => {
      set((state) => {
        state.travelType.travelMate = state.travelType.travelMate.filter(
          (item) => item !== travelMate
        );
      });
    },
  }))
);
