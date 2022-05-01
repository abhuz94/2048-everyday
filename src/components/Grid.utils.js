export const noop = () => {};

export const canMove = (cellGroup) => cellGroup.some((cells) => cells.some((cell, index) => {
  if (index === 0) { return false; }
  if (cell.isEmpty()) { return false; }

  const prevCell = cells[index - 1];

  return prevCell.canAcceptTile(cell.getTile());
}));

export const slideTiles = (cellGroup) => {
  const dirtyCells = [];
  const transitions = [];

  cellGroup.forEach((cells) => {
    for (let i = 1; i < cells.length; i += 1) {
      const currCell = cells[i];
      let lastValidCell = null;

      // eslint-disable-next-line no-continue
      if (currCell.isEmpty()) { continue; }

      for (let j = i - 1; j >= 0; j -= 1) {
        const nextCell = cells[j];

        if (!nextCell.canAcceptTile(currCell.getTile())) { break; }

        lastValidCell = nextCell;
      }

      if (lastValidCell !== null) {
        if (lastValidCell.isEmpty()) {
          lastValidCell.setTile(currCell.getTile());
        } else {
          transitions.push(currCell.getTile().delayTransition());
          lastValidCell.setTileToMerge(currCell.getTile());
          dirtyCells.push(lastValidCell);
        }

        currCell.setTile(null);
      }
    }
  });

  return { dirtyCells, transitions };
};

export const getRandomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
