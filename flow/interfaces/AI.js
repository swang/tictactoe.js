interface AI {
	board: Board;
	getBoard(): Board;
	choose(player: PlayerType): [PlayerType, number, BoardPos, void];
}
