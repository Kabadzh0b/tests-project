import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Player } from "src/types";
import { PLAYER_KEY } from "../../constants";

interface PlayerStore {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  fetchPlayers: () => Promise<void>;
  addPlayer: (player: Player) => void;
  editPlayer: (playerId: string, updatedPlayer: Partial<Player>) => void;
  deletePlayer: (playerId: string) => void;
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set) => ({
      players: [],
      setPlayers: (players) => set({ players }),
      fetchPlayers: async () => {
        const storedPlayers = await AsyncStorage.getItem(PLAYER_KEY);
        const players = storedPlayers ? JSON.parse(storedPlayers) : [];
        set({ players });
      },
      addPlayer: (player) => {
        set((state) => {
          const updatedPlayers = [...(state.players || []), player];
          AsyncStorage.setItem(PLAYER_KEY, JSON.stringify(updatedPlayers));
          return { players: updatedPlayers };
        });
      },
      editPlayer: (playerId, updatedPlayer) => {
        set((state) => {
          const updatedPlayers = state.players?.map((player) =>
            player.id === playerId ? { ...player, ...updatedPlayer } : player
          );
          AsyncStorage.setItem(PLAYER_KEY, JSON.stringify(updatedPlayers));
          return { players: updatedPlayers };
        });
      },
      deletePlayer: (playerId) => {
        set((state) => {
          const updatedPlayers = state.players?.filter(
            (player) => player.id !== playerId
          );
          AsyncStorage.setItem(PLAYER_KEY, JSON.stringify(updatedPlayers));
          return { players: updatedPlayers };
        });
      },
    }),
    {
      name: PLAYER_KEY,
      storage: {
        getItem: async (key) => {
          const value = await AsyncStorage.getItem(key);
          if (!value) {
            return [];
          }
          const players = JSON.parse(value).players ?? [];
          return players;
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value.state.players));
        },
        removeItem: async (key) => {
          await AsyncStorage.removeItem(key);
        },
      },
    }
  )
);
