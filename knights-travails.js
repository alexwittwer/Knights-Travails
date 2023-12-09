class Chessboard {
  constructor() {
    this.board = this.drawBoard();
  }

  /**
   * Fills current chessboard as an array of true/false {default: all false}
   * @param {Number} SIZE - size of chessboard
   * @param {Number} i - iterator
   * @param {Number} j - iterator
   * @return {Array} - returns a chessboard array of false entries
   */
  drawBoard() {
    const SIZE = 8;
    const board = [];

    for (let i = 0; i < SIZE; i++) {
      board[i] = [];
      for (let j = 0; j < SIZE; j++) {
        board[i][j] = false;
      }
    }

    return board;
  }
}

class Knight {
  constructor({ x = 0, y = 0 }) {
    this.position = { x, y };
    this.board = new Chessboard();
    this.next = this.nextPossible();

    // Set current position as visited when class is initialized
    this.updateVisited(this.position.x, this.position.y);
  }

  /**
   *
   * @param {Number} x x-position on chessboard
   * @param {Number} y y-position on chessboard
   */
  moveTo(x, y) {
    if (x < 0 || y < 0 || x > 7 || y > 7) {
      throw new Error("Cannot move to position outside of board");
    } else if (this.checkVisited(x, y)) {
      throw new Error("Node already visited");
    } else {
      this.updateVisited(x, y);
      this.next = this.nextPossible(x, y);
      this.position = { x, y };
    }
  }

  /**
   * Returns a string with the shortest possible path from start -> target
   * @param {Array} param0 [x, y] start pos
   * @param {Array} param1 [x, y] end pos
   * @returns {String}
   */
  knightsPath([x1, y1], [x2, y2]) {
    if (!this.checkValid(x2, y2))
      throw new Error("Cannot path to invalid parameters");
    // reset board first
    this.reset();
    this.moveTo(x1, y1);
    const path = {};
    const q = [];

    this.updatePath(path);
    this.updateQueue(q);

    while (q.length > 0) {
      const [newX, newY] = q.shift();
      if (newX === x2 && newY === y2) {
        const finalPath = [];
        let current = `[${x2}, ${y2}]`;

        while (path[current]) {
          finalPath.unshift(current);
          current = path[current];
        }

        finalPath.unshift(`[${x1}, ${y1}]`);
        return (
          "Path found in " +
          `${finalPath.length - 1} moves: ` +
          finalPath.join(" -> ")
        );
      } else if (!this.checkVisited(newX, newY)) {
        this.moveTo(newX, newY);
        this.updatePath(path);
        this.updateQueue(q);
      }
    }
  }

  /**
   * Checks if [x, y] would be in the board
   * @param {Number} x x position
   * @param {Number} y y position
   * @returns {Boolean}
   */
  checkValid(x, y) {
    return x > 7 || y > 7 || x < 0 || y < 0 ? false : true;
  }

  /**
   * Generates a list of next possible [x, y] values from an [x, y] position
   * @param {Number} x x position {default: current x pos}
   * @param {Number} y y position {default: current y pos}
   * @returns {Array} array of [x, y] positions
   */
  nextPossible(x = this.position.x, y = this.position.y) {
    const possibleArray = [
      [x + 1, y + 2],
      [x + 2, y + 1],
      [x + 1, y - 2],
      [x + 2, y - 1],
      [x - 1, y + 2],
      [x - 2, y + 1],
      [x - 1, y - 2],
      [x - 2, y - 1],
    ];

    return possibleArray.filter((pair) => {
      const [x1, y1] = pair;
      return !this.checkVisited(x1, y1) && this.checkValid(x1, y1);
    });
  }

  /**
   * Checks if [x, y] has been visited on chessboard
   * @param {Number} x x pos
   * @param {Number} y y pos
   * @param {Array} gameBoard current chessboard
   * @returns {Boolean}
   */
  checkVisited(x, y, gameBoard = this.board.board) {
    if (gameBoard[x] !== undefined && gameBoard[x][y] !== undefined) {
      return gameBoard[x][y] ? true : false;
    }
  }

  /**
   * Updates chessboard with [x, y]
   * @param {Number} x x pos
   * @param {Number} y y pos
   * @param {Array} gameBoard current chessboard
   * @returns {Boolean}
   */
  updateVisited(x, y, gameBoard = this.board.board) {
    if (gameBoard[x] !== undefined && gameBoard[x][y] !== undefined) {
      gameBoard[x][y] = true;
      return true;
    }
    return false;
  }

  /**
   * Resets chessboard
   */
  reset() {
    this.position = { x: 0, y: 0 };
    this.board = new Chessboard();
    this.next = this.nextPossible();
  }

  /**
   * Updates the provided path object
   * @param {Object} path path of nodes visited in form [x1, y1]: "[x2, y2]"
   */
  updatePath(path) {
    this.next.forEach((item) => {
      const { x, y } = this.position;
      const key = `[${item[0]}, ${item[1]}]`;
      path[key] = `[${x}, ${y}]`;
    });
  }

  /**
   * Updates provided queue
   * @param {Array} queue current queue in form of [x, y] values
   */
  updateQueue(queue) {
    this.next.forEach((item) => {
      queue.push(item);
    });
  }
}

const knight = new Knight({ x: 0, y: 0 });
