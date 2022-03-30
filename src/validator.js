class Validator {
  static validate(sudoku) {
    const validator = new Validator

    return validator.validate(sudoku)
  }

  // Rows start from 0 not 1, up to 8
  getRow(arr, row) {
    return arr.slice(9 * row, 9 * (row + 1))
  }

  // Columns start from 0 not 1, up to 8
  getCol(arr, col) {
    return arr.filter((_, index) => (index - col) % 9 == 0)
  }

  // Squares start from 0 not 1, up to 8
  // From left to right, top to bottom
  // Start values of a square from top-left side
  getSquare(arr, squarePos) {
    // In 1-dimensional array:
    // A square in the next row from the start of the previous row is 27 values away
    // Next column at the start of a row is 3 values away
    squarePos = Math.floor(squarePos / 3) * 27 + (squarePos % 3) * 3
    let square = []

    // In the array the next row is 9 values away
    for (let i = 0, j; i < 27; i += 9) {
      for (j = 0; j < 3; ++j) {
        square.push(arr[squarePos + i + j])
      }
    }
    console.log(square)
    return square
  }

  // Convert string to a 1-dimensional number array
	fromString(sudoku) {
		return sudoku.split(/\D+/, 81).map(Number)
	}

  filterZeroesFromArray(arr) {
    return arr.filter((value) => value != 0)
  }

	uniqueValuesInArray(arr) {
		return new Set(arr).size == arr.length
	}

  isComplete(arr) {
    return arr.some((value) => value == 0) == false
  }

  validate(sudoku) {
    // Your code here
  }
}

module.exports = Validator
