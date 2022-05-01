import { GAMEBOARD_SIZE } from './Grid.constants';
import { canMove, getRandomBetween, slideTiles } from './Grid.utils';
import GridEventManager from './Grid.eventManager';
import Cell from './Cell';
import Tile from './Tile';

class Grid {
  #gridEventManager = new GridEventManager();

  #cells = [];

  #cellsGroupedByColumn = [];

  #cellsGroupedByRow = [];

  #size;

  #$gameBoard;

  constructor($gameBoard) {
    this.#$gameBoard = $gameBoard;
    this.#size = GAMEBOARD_SIZE;
    this.#cellsGroupedByColumn = Array(GAMEBOARD_SIZE).fill(-1).map(() => []);
    this.#cellsGroupedByRow = Array(GAMEBOARD_SIZE).fill(-1).map(() => []);

    this.#createCells();
    this.#createRandomTiles(2);
    this.#gridEventManager.subscribe(this.#gridEventHandler.bind(this));
  }

  async slideTilesLeft() {
    return this.#slideTilesHandler(this.#cellsGroupedByRow);
  }

  async slideTilesUp() {
    return this.#slideTilesHandler(this.#cellsGroupedByColumn);
  }

  async slideTilesRight() {
    return this.#slideTilesHandler(this.#cellsGroupedByRow.map((cells) => [...cells].reverse()));
  }

  async slideTilesDown() {
    return this.#slideTilesHandler(this.#cellsGroupedByColumn.map((cells) => [...cells].reverse()));
  }

  #createCells() {
    for (let i = 0; i < this.#size * this.#size; i += 1) {
      const x = Math.floor(i / this.#size);
      const y = i % this.#size;
      const cell = new Cell(x, y);

      this.#cellsGroupedByRow[x].push(cell);
      this.#cellsGroupedByColumn[y].push(cell);
      this.#cells.push(cell);
      this.#$gameBoard.appendChild(cell.getElement());
    }
  }

  #getRandomEmptyCells(num = 1) {
    // TODO throw error for num > 2

    const emptyCells = this.#cells.filter((cell) => cell.isEmpty());

    if (num === 1) { return [emptyCells[getRandomBetween(0, emptyCells.length - 1)]]; }

    const mid = Math.floor(emptyCells.length / 2);

    return [
      emptyCells[getRandomBetween(0, mid)],
      emptyCells[getRandomBetween(mid + 1, emptyCells.length - 1)],
    ];
  }

  #createRandomTiles(num = 1) {
    this.#getRandomEmptyCells(num).forEach((cell) => {
      const tile = new Tile(cell.getX(), cell.getY(), 2 ** getRandomBetween(1, 2));

      cell.setTile(tile);
      this.#$gameBoard.appendChild(tile.getElement());
    });
  }

  async #slideTilesHandler(cellGroup) {
    const { dirtyCells, transitions } = slideTiles(cellGroup);

    return Promise.all(transitions).then(() => {
      dirtyCells.forEach((cell) => cell.mergeTiles());
      this.#createRandomTiles();
    });
  }

  async #gridEventHandler(direction) {
    if (this.#canMoveInAnyDirection()) {
      switch (direction) {
        case 'ArrowLeft':
          if (this.#canMoveLeft()) { return this.slideTilesLeft(); }
          break;
        case 'ArrowUp':
          if (this.#canMoveUp()) { return this.slideTilesUp(); }
          break;
        case 'ArrowRight':
          if (this.#canMoveRight()) { return this.slideTilesRight(); }
          break;
        case 'ArrowDown':
          if (this.#canMoveDown()) { return this.slideTilesDown(); }
          break;
        default:
          return Promise.resolve();
      }
    } else { this.#gridEventManager.unsubscribe(); }

    return Promise.resolve();
  }

  #canMoveInAnyDirection() {
    return this.#canMoveLeft()
      || this.#canMoveUp()
      || this.#canMoveRight()
      || this.#canMoveDown();
  }

  #canMoveLeft() { return canMove(this.#cellsGroupedByRow); }

  #canMoveUp() { return canMove(this.#cellsGroupedByColumn); }

  #canMoveRight() {
    return canMove(this.#cellsGroupedByRow.map((cells) => [...cells].reverse()));
  }

  #canMoveDown() {
    return canMove(this.#cellsGroupedByColumn.map((cells) => [...cells].reverse()));
  }
}

export default Grid;
