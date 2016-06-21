type BoardType = Array<PlayerType>

declare class Board {
  constructor(board?: BoardType | Board): void;
  add(c: BoardPos, val: number): BoardPos;
  put(piece: PlayerType, pos: number): void;
  getFreePositions(): Array<number>;
  length: number;
  clear(): void;
  board: BoardType;
  pos(n: BoardPos): PlayerType;
  endOfGame(): boolean;
  toMove(): PlayerType;
  occupy(location: number): boolean;
  winnerWhere(player: PlayerType): Array<number>;
  winner(player: PlayerType): boolean;
  loser(player: PlayerType): boolean;
  utility(player: PlayerType): number;
}
