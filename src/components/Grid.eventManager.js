import { noop } from './Grid.utils';

class GridEventManager {
  #isPaused = false;

  #boundedKeydownHandler = this.#keydownHandler.bind(this);

  #callback;

  subscribe(callback = noop) {
    this.#callback = callback;

    window.addEventListener('keydown', this.#boundedKeydownHandler);
  }

  unsubscribe() {
    window.removeEventListener('keydown', this.#boundedKeydownHandler);
  }

  async #keydownHandler(ev) {
    if (this.#isPaused) { return; }

    this.#isPaused = true;

    await this.#callback(ev.key);

    this.#isPaused = false;
  }
}

export default GridEventManager;
