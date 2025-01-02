import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Player, Game } from "src/types";
import { GAME_KEY } from "../../constants";

interface GameStore {
  games: Game[];
  setGames: (games: Game[]) => void;
  fetchGames: () => void;
  addGame: (game: Game) => void;
  deleteGame: (gameId: string) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      games: [],
      fetchGames: () => {
        const storedGames = JSON.parse(localStorage.getItem(GAME_KEY) || "[]");
        set({ games: storedGames });
      },
      setGames: (games) => set({ games }),
      addGame: (game) =>
        set((state) => ({
          games: [...state.games, game],
        })),
      deleteGame: (gameId) =>
        set((state) => ({
          games: state.games.filter((game) => game.id !== gameId),
        })),
    }),
    {
      name: GAME_KEY,
    }
  )
);
