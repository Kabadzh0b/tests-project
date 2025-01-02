import { Game, Player, GamePlayerInput } from "src/types";
import { PLAYER_KEY } from "../../../constants";

export const updatePlayers = (
  players: Player[],
  game: Game,
  setPlayers: (players: Player[]) => void
) => {
  const gamePlayers = game.players;
  players.forEach((p) => {
    p.games.push(...gamePlayers.filter((gp) => gp.playerId === p.id));
  });
  localStorage.setItem(PLAYER_KEY, JSON.stringify(players));
  setPlayers([...players]);
};

export const getGame = (enteredPlayers: GamePlayerInput[]) => {
  const deposit = enteredPlayers.reduce((acc, p) => acc + p.deposit, 0);
  const withdraw = enteredPlayers.reduce((acc, p) => acc + p.withdraw, 0);

  const newGame: Game = {
    id: Date.now().toString(),
    players: enteredPlayers.map((p) => ({
      ...p,
      gameId: Date.now().toString(),
    })),
    deposit,
    withdraw,
    comission: deposit - withdraw,
    date: new Date(),
  };

  return newGame;
};
