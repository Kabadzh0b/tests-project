import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Game } from "src/types";
import { GAME_KEY } from "../../constants";

interface GameStore {
  games: Game[];
  setGames: (games: Game[]) => void;
  fetchGames: () => Promise<void>;
  addGame: (game: Game) => void;
  deleteGame: (gameId: string) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      games: [],
      fetchGames: async () => {
        const storedGames = await AsyncStorage.getItem(GAME_KEY);
        const games = storedGames ? JSON.parse(storedGames) : [];
        set({ games });
      },
      setGames: (games) => set({ games }),
      addGame: (game) => {
        set((state) => {
          const updatedGames = [...state.games, game];
          AsyncStorage.setItem(GAME_KEY, JSON.stringify(updatedGames));
          return { games: updatedGames };
        });
      },
      deleteGame: (gameId) => {
        set((state) => {
          const updatedGames = state.games.filter((game) => game.id !== gameId);
          AsyncStorage.setItem(GAME_KEY, JSON.stringify(updatedGames));
          return { games: updatedGames };
        });
      },
    }),
    {
      name: GAME_KEY,
      storage: {
        getItem: async (key) => {
          const value = await AsyncStorage.getItem(key);
          if (!value) {
            return [];
          }
          const games = JSON.parse(value).games ?? [];
          return games;
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value.state.games));
        },
        removeItem: async (key) => {
          await AsyncStorage.removeItem(key);
        },
      },
    }
  )
);
