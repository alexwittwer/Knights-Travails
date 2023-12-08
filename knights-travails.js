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
    this.visited = this.checkVisited(this.position.x, this.position.y);
    this.next = this.generateNextMoves();
  }

  setAt(x, y) {
    if (x < 0 || y < 0 || x > 7 || y > 7) {
      throw new Error("Cannot move to posinulltion outside of board");
    }
    this.position = { x, y };
    this.checkVisited(x, y);
  }

  // creates move graph
  generateNextMoves(
    node = new Node(this.position.x, this.position.y),
    x = this.position.x,
    y = this.position.y
  ) {
    if (this.checkVisited(x, y) === false || this.checkValid(x, y) === false) {
      return null;
    }

    const nextPositions = this.nextPossible(x, y);
    return node;

    if (nextPositions) {
      nextPositions.forEach((position, index) => {
        const [p1, p2] = position;
        const key = `next${index}`;
        const newNode = new Node(position);
        node[key] = this.generateNextMoves(newNode, p1, p2);
      });
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
        return true; // Already visited
      } else {
        gameBoard[x][y] = true; // Mark as visited
        return false; // Not visited before
      }
    } else {
      // Handle out-of-bounds access or undefined gameBoard[x]
      return true; // Consider it as visited to avoid potential errors
    }
  }
}

class Node {
  constructor(x = null, y = null, next = null) {
    this.next = null;
    this.position = { x, y };
  }
}

const piece = new Knight({ x: 0, y: 0 });
console.log(piece);

// offsets
// x +- 2 | y +- 1
// x +- 1 | y +- 2
