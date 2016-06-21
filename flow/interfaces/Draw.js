declare class Draw {

  constructor(board?: BoardType | Board): void;
  setCanvas(cnvs: HTMLCanvasElement): void;
  setContext(ctxt: CanvasRenderingContext2D): void;
  board(): void;
  newGameButton(): void;
  getPos(location: number): Tuple;
  cross(location: number): void;
  nought(location: number): void;
  stamp(text: string, color: string): void;
  connectLine(where: Tuple, color: string): void;
  clear(): void;
}
