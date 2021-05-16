const { Board } = require("../util");
const next = {
  name: "minas",
  aliases: ["mines"],
  run: async (client, message, args = [8, 8]) => {
    try {
      if (args[0] === "help") {
        await message.channel.send(`Argumentos \n
    1.- Filas \n
    2.- Columnas \n
    3.- Numero de minas \n \n
el numero de minas maximo es igual a (filas*columnas)/2 \n \n
Cantidades maximas \n
    1.- filas = 11
    2.- columnas = 11
    3.- minas = 60
        `);
        return;
      }
      const parameters = args.map((arg) => {
        const parsed = parseInt(arg);
        return !isNaN(parsed) ? (parsed > 11 ? 11 : parsed) : 8;
      });
      const row = parameters[0];
      const col = parameters[1];
      let mines = parameters[2] ? parameters[2] : 5;
      const maxMines = (row * col) / 2;
      mines = mines > maxMines ? maxMines : mines;
      const rows = row ? row : 8;
      const columns = col ? col : row;

      const board = new Board(rows, columns);
      board.mineBoard(mines);
      board.calculateMined();
      const boardMessage = board.boardToText();
      await message.channel.send(boardMessage);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = next;
