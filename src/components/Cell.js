class Cell {
  #x;

  #y;

  #$cell;

  #tile;

  #tileToMerge = null;

  constructor(x, y, tile = null) {
    this.#x = x;
    this.#y = y;
    this.#tile = tile;
    this.#$cell = document.createElement('div');

    this.#initProps();
  }

  getX() { return this.#x; }

  getY() { return this.#y; }

  getCoords() {
    return {
      x: this.#x,
      y: this.#y,
    };
  }

  getTile() { return this.#tile; }

  getTileToMerge() { return this.#tileToMerge; }

  getElement() { return this.#$cell; }

  setX(x) {
    this.#x = x;

    this.#$cell.style.setProperty('--x', x);

    return this;
  }

  setY(y) {
    this.#y = y;

    this.#$cell.style.setProperty('--y', y);

    return this;
  }

  setCoords(x, y) {
    this.setX(x);
    this.setY(y);

    return this;
  }

  setTile(tile) {
    this.#tile = tile;

    if (tile !== null) {
      tile.setX(this.getX());
      tile.setY(this.getY());
    }

    return this;
  }

  setTileToMerge(tileToMerge) {
    this.#tileToMerge = tileToMerge;

    tileToMerge.setCoords(this.#tile.getX(), this.#tile.getY());
    tileToMerge.getElement().style.setProperty('z-index', '1');

    return this;
  }

  isEmpty() { return !this.#tile; }

  hasTileToMerge() { return this.#tileToMerge; }

  canAcceptTile(tile = null) {
    return !tile
      || !this.#tile
      || (this.#tile.getValue() === tile.getValue() && !this.hasTileToMerge());
  }

  mergeTiles() {
    if (this.hasTileToMerge()) {
      this.#tile.setValue(this.#tileToMerge.getValue() + this.#tile.getValue());
      this.#tileToMerge.remove();

      this.#tileToMerge = null;
    }

    return this;
  }

  #initProps() {
    this.#$cell.classList.add('cell');
    this.#$cell.style.setProperty('--x', this.#x);
    this.#$cell.style.setProperty('--y', this.#y);
  }
}

export default Cell;
