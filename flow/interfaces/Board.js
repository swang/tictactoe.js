type BoardType = Array<PlayerType>

declare class Board {
  constructor(board?: BoardType | Board): void;
  add(c: BoardPos, val: number): BoardPos;
  put(piece: PlayerType, pos: number): void;
  getFreePositions(): Array<BoardPos>;
  length: number;
  clear(): void;
  board: BoardType;
  pos(n: BoardPos): PlayerType;
  endOfGame(): boolean;
  getTurn(): PlayerType;
  occupy(location: number): boolean;
  winnerPos(player: PlayerType): Tuple;
  isWinner(player: PlayerType): boolean;
  isLoser(player: PlayerType): boolean;
  getScore(player: PlayerType): number;
}
