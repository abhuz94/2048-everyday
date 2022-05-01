import Grid from './components/Grid';

(function bootstrapGame() {
  document.documentElement.style.setProperty('--main-background-color', '#2E251A');
  document.documentElement.style.setProperty('--game-board-background-color', '#83786E');
  document.documentElement.style.setProperty('--cell-background-color', '#A99E94');
  document.documentElement.style.setProperty('--grid-size', '4');
  document.documentElement.style.setProperty('--cell-size', '20vmin');
  document.documentElement.style.setProperty('--cell-gap', '2vmin');
  document.documentElement.style.setProperty('--default-font-family', '\'Quicksand\', Helvetica Neue, Helvetica, Arial, sans');
  document.documentElement.style.setProperty('--default-font-size', '7.5vmin');
}());

export default new Grid(document.getElementById('game-board'));
