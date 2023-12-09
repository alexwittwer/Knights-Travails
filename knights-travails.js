class Chessboard {
  constructor() {
    this.board = this.drawBoard();
  }

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

    this.updateVisited(this.position.x, this.position.y);
  }

  setAt(x, y) {
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

  knightsPath([x1, y1], [x2, y2]) {
    if (!this.checkValid(x2, y2))
      throw new Error("Cannot path to invalid parameters");
    // reset board first
    this.reset();
    this.setAt(x1, y1);
    const path = {}; // init a path
    const q = [];

    let nextMoves = this.nextPossible();
    nextMoves.forEach((item) => {
      const key = `[${item[0]}, ${item[1]}]`;
      path[key] = `[${x1}, ${y1}]`;
      q.push(item);
    });

    while (q.length > 0) {
      const [a, b] = q.shift();
      if (a === x2 && b === y2) {
        const finalPath = [];
        let current = `[${x2}, ${y2}]`;

        while (path[current]) {
          finalPath.unshift(current);
          current = path[current];
        }

        finalPath.unshift(`[${x1}, ${y1}]`);
        return "Path found:" + finalPath.join(" -> ");
      } else if (this.checkValid(a, b) && !this.checkVisited(a, b)) {
        this.setAt(a, b);
        let nextMoves = this.nextPossible();
        nextMoves.forEach((item) => {
          const key = `[${item[0]}, ${item[1]}]`;
          path[key] = `[${a}, ${b}]`;
          q.push(item);
        });
      }
    }
  }

  checkValid(x, y) {
    if (x > 7 || y > 7 || x < 0 || y < 0) {
      return false;
    }

    return true;
  }

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

  checkVisited(x, y, gameBoard = this.board.board) {
    if (gameBoard[x] !== undefined && gameBoard[x][y] !== undefined) {
      if (gameBoard[x][y]) {
        return true;
      } else {
        return false;
      }
    }
  }

  updateVisited(x, y, gameBoard = this.board.board) {
    if (gameBoard[x] !== undefined && gameBoard[x][y] !== undefined) {
      gameBoard[x][y] = true;
      return true;
    }
    return false;
  }
  reset() {
    this.position = { x: 0, y: 0 };
    this.board = new Chessboard();
    this.next = this.nextPossible();
  }
}

const knight = new Knight({ x: 0, y: 0 });
