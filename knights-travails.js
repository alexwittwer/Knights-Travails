class Knight {
  constructor({ x = 0, y = 0 }) {
    this.position = { x, y };
    this.visited = this.drawBoard();
    this.next = this.nextPossible();

    // Set current position as visited when class is initialized
    this.updateVisited(this.position.x, this.position.y);
  }

  /** Fills chessboard as an array of 1/0s {default: all 0s}*/
  drawBoard() {
    const SIZE = 8;
    const board = [];

    for (let i = 0; i < SIZE; i++) {
      board[i] = [];
      for (let j = 0; j < SIZE; j++) {
        board[i][j] = 0;
      }
    }

    return board;
  }

  /** sets knight at (x, y) position on chessboard */
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

  /** Returns a string with the shortest possible path from start -> target */
  knightsPath([x1, y1], [x2, y2]) {
    if (!this.checkValid(x2, y2))
      throw new Error("Cannot path to invalid parameters");

    // reset board with [x1, y1]
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
        this.moveTo(x2, y2);
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

  /** Checks if [x, y] would be in the board*/
  checkValid(x, y) {
    return x > 7 || y > 7 || x < 0 || y < 0 ? false : true;
  }

  /** Generates a list of next possible [x, y] values from an [x, y] position */
  nextPossible(x = this.position.x, y = this.position.y) {
    if (x === null || y === null) return null;
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

  /** Checks if [x, y] has been visited on chessboard */
  checkVisited(x, y, gameBoard = this.visited) {
    if (gameBoard[x] !== undefined && gameBoard[x][y] !== undefined) {
      return gameBoard[x][y] ? true : false;
    }
  }

  /** Updates chessboard with [x, y] */
  updateVisited(x, y, gameBoard = this.visited) {
    if (gameBoard[x] !== undefined && gameBoard[x][y] !== undefined) {
      gameBoard[x][y] = 1;
      return true;
    }
    return false;
  }

  /** Resets chessboard */
  reset() {
    this.position = { x: null, y: null };
    this.visited = this.drawBoard();
    this.next = this.nextPossible();
  }

  /**
   * Updates the provided path object
   * @param {Map} path path of nodes visited in form [x1, y1]: "[x2, y2]"
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
