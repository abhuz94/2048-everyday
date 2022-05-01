class Tile {
  #x;

  #y;

  #value;

  #$tile = document.createElement('div');

  constructor(x, y, value = null) {
    this.#x = x;
    this.#y = y;
    this.#value = value;

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

  getValue() { return this.#value; }

  getElement() { return this.#$tile; }

  setX(x) {
    this.#x = x;

    this.#$tile.style.setProperty('--x', x);

    return this;
  }

  setY(y) {
    this.#y = y;

    this.#$tile.style.setProperty('--y', y);

    return this;
  }

  setCoords(x, y) {
    this.setX(x);
    this.setY(y);

    return this;
  }

  setValue(value) {
    this.#value = value;

    this.#$tile.innerText = value;

    return this;
  }

  remove() {
    this.#$tile.remove();

    return this;
  }

  delayTransition() {
    return new Promise((resolve) => {
      this.#$tile.addEventListener('transitionend', resolve, { once: true });
    });
  }

  #initProps() {
    this.#$tile.classList.add('tile');
    this.#$tile.style.setProperty('--x', this.#x);
    this.#$tile.style.setProperty('--y', this.#y);

    this.#$tile.innerText = this.#value;
  }
}

export default Tile;
