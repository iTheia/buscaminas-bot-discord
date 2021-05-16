exports.Board = class Board {
  board = [];
  rows = 0;
  columns = 0;
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push({ isMine: false, minedNeighbours: 0 });
      }
      this.board.push(row);
    }
  }
  mineBoard(mines) {
    while (mines > 0) {
      const cords = {
        row: genRandom(this.rows),
        column: genRandom(this.columns),
      };
      const field = this.board[cords.row][cords.column];
      if (!field.isMine) {
        field.isMine = true;
        this.board[cords.row][cords.column] = field;
        mines--;
      }
    }
  }
  calculateMined() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const field = this.board[i][j];
        if (field.isMine) {
          continue;
        }
        this.calculateNeighbords(i, j);
      }
    }
  }
  calculateNeighbords(row, column) {
    let values = [
      [0, 1],
      [0, -1],
      [1, 0],
      [1, 1],
      [1, -1],
      [-1, 0],
      [-1, 1],
      [-1, -1],
    ];
    const neighboards = values
      .filter(
        ([h, j]) =>
          h + row >= 0 &&
          h + row < this.board.length &&
          j + column >= 0 &&
          j + column < this.board[0].length
      )
      .map(([h, j]) => this.board[h + row][j + column]);

    let mined = 0;
    neighboards.forEach(({ isMine }) => {
      if (isMine) {
        mined++;
      }
    });
    this.board[row][column].minedNeighbours = mined;
  }
  boardToText() {
    let text = "";
    const values = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
    ];
    for (let i = 0; i < this.rows; i++) {
      let row = "";
      for (let j = 0; j < this.columns; j++) {
        row += `||${
          this.board[i][j].isMine
            ? ":boom:"
            : `:${values[this.board[i][j].minedNeighbours]}:`
        }||`;
      }
      text += row + "\n";
    }
    return text;
  }
};

function genRandom(max = 10, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
}
