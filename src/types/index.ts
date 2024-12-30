export type GamePlayerInput = {
  playerId: string;
  name: string;
  deposit: number;
  withdraw: number;
};

export type GamePlayer = GamePlayerInput & { gameId: string };

export type Player = {
  id: string;
  name: string;
  games: GamePlayer[];
};

export type Game = {
  id: string;
  players: GamePlayer[];
  deposit: number;
  withdraw: number;
  comission: number;
  date: Date;
};
