type BoardType = Array<number>

declare class Board {
  constructor(board?: BoardType | Board): void;
  put(piece: number, pos: number): void;
  getFreePositions(): Array<number>;
  length: number;
  clear(): void;
  board: BoardType;
  pos(n: number): number;
  endOfGame(): boolean;
  toMove(): PlayerType;
  occupy(location: number): boolean;
  winnerWhere(player: PlayerType): Array<number>;
  winner(player: PlayerType): boolean;
  loser(player: PlayerType): boolean;
  utility(player: PlayerType): number;
}
