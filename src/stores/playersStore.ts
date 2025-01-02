import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Player } from "src/types";
import { PLAYER_KEY } from "../../constants";

interface PlayerStore {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  fetchPlayers: () => void;
  addPlayer: (player: Player) => void;
  editPlayer: (playerId: string, updatedPlayer: Partial<Player>) => void;
  deletePlayer: (playerId: string) => void;
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set) => ({
      players: [],
      setPlayers: (players) => set({ players: players }),
      fetchPlayers: () => {
        const storedPlayers = JSON.parse(
          localStorage.getItem(PLAYER_KEY) || "[]"
        );
        set({ players: storedPlayers.state?.players ?? [] });
      },
      addPlayer: (player) =>
        set((state) => {
          const updatedPlayers = [...state.players, player];
          localStorage.setItem("PLAYER_KEY", JSON.stringify(updatedPlayers));
          return { players: updatedPlayers };
        }),
      editPlayer: (playerId, updatedPlayer) =>
        set((state) => {
          const updatedPlayers = state.players.map((player) =>
            player.id === playerId ? { ...player, ...updatedPlayer } : player
          );
          localStorage.setItem("PLAYER_KEY", JSON.stringify(updatedPlayers));
          return { players: updatedPlayers };
        }),
      deletePlayer: (playerId) =>
        set((state) => {
          const updatedPlayers = state.players.filter(
            (player) => player.id !== playerId
          );
          localStorage.setItem("PLAYER_KEY", JSON.stringify(updatedPlayers));
          return { players: updatedPlayers };
        }),
    }),
    {
      name: PLAYER_KEY,
    }
  )
);
