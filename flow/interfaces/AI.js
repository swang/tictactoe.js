interface AI {
	board: Board;
  constructor(board: Board): void;
	getBoard(): Board;
	choose(player: PlayerType): [PlayerType, number, BoardPos, void];
}
