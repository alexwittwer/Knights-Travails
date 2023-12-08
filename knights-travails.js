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

    this.updatedVisited(this.position.x, this.position.y);
  }

  setAt(x, y) {
    if (x < 0 || y < 0 || x > 7 || y > 7) {
      throw new Error("Cannot move to position outside of board");
    }
    this.updatedVisited(x, y);
    this.next = this.nextPossible(x, y);
    this.position = { x, y };
  }

  bfsPath(x, y) {}

  checkValid(x, y) {
    if (x > 7 || y > 7 || x < 0 || y < 0) {
      return false;
    }

    return true;
  }

  nextPossible(x = this.position.x, y = this.position.y) {
    const possibleArray = [
      [x + 1, y + 2],
      [x + 1, y - 2],
      [x - 1, y + 2],
      [x - 1, y - 2],
      [x + 2, y + 1],
      [x + 2, y - 1],
      [x - 2, y + 1],
      [x - 2, y - 1],
    ];

    return possibleArray.filter((pair) => {
      const [x1, y1] = pair;
      return (
        this.checkVisited(x1, y1) === false && this.checkValid(x1, y1) === true
      );
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

  updatedVisited(x, y, gameBoard = this.board.board) {
    if (gameBoard[x] !== undefined && gameBoard[x][y] !== undefined) {
      gameBoard[x][y] = true;
      return true;
    }
    return false;
  }
}

class Node {
  constructor(x = null, y = null) {
    this.x = x;
    this.y = y;
  }
}

const piece = new Knight({ x: 0, y: 0 });
console.log(piece);

// TODO
/*
  generateNextMoves(
    node = new Node(this.position),
    visited = this.visited,
    x = this.position.x,
    y = this.position.y
  ) {
    if (visited === true || this.checkValid(x, y) === false) {
      return null;
    }

    const nextPositions = this.nextPossible(x, y);

    if (nextPositions[0] !== undefined) {
      nextPositions.forEach((position, index) => {
        if (position !== undefined) {
          const [p1, p2] = position;
          const key = `next${index + 1}`;
          this.updatedVisited(p1, p2);
          const newNode = new Node(p1, p2);
          node[`next ${index + 1}`] = newNode;
          this.generateNextMoves(newNode, visited, p1, p2);
        }
      });
    }
    return node;
  }
*/
