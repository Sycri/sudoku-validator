class Validator {
  static validate(sudoku) {
    const validator = new Validator

    return validator.validate(sudoku)
  }

  // Rows start from 0 not 1, up to 8
  getRow(arr, row) {
    return arr[row]
  }

  // Columns start from 0 not 1, up to 8
  getCol(arr, col) {
    return arr.map((value) => value[col])
  }

  // Square rows and columns start from 0 not 1, up to 2
  // From left to right, top to bottom
  // Start values of a square from top-left side
  getSquare(arr, row, col) {
    // In 2-dimensional array:
    // A new square is available 3 rows or columns away in the array 
    row *= 3
    col *= 3
    let square = []

    for (let i = 0, j; i < 3; ++i) {
      for (j = 0; j < 3; ++j) {
        square.push(arr[row + i][col + j])
      }
    }
    return square
  }

  // Convert string to a 2-dimensional number array
  fromString(sudoku) {
    let arr = sudoku.split(/\D+/, 81).map(Number)
    let matrix = []

    while (arr.length != 0) {
      matrix.push(arr.splice(0, 9))
    }

    return matrix
  }

  // Zeroes represent empty space, so they should be removed from an array for unique value checks
  filterZeroesFromArray(arr) {
    return arr.filter((value) => value != 0)
  }

  uniqueValuesInArray(arr) {
    return new Set(arr).size == arr.length
  }

  isComplete(arr) {
    return arr.flat().some((value) => value == 0) == false
  }

  checkAllRows(arr) {
    for (let i = 0; i < 9; ++i) {
      let row = this.getRow(arr, i)
      row = this.filterZeroesFromArray(row)

      if (!this.uniqueValuesInArray(row))
        return false
    }
    return true
  }

  checkAllColumns(arr) {
    for (let i = 0; i < 9; ++i) {
      let col = this.getCol(arr, i)
      col = this.filterZeroesFromArray(col)

      if (!this.uniqueValuesInArray(col))
        return false
    }
    return true
  }

  checkAllSquares(arr) {
    for (let i = 0, j; i < 3; ++i) {
      for (j = 0; j < 3; ++j) {
        let square = this.getSquare(arr, i, j)
        square = this.filterZeroesFromArray(square)

        if (!this.uniqueValuesInArray(square))
          return false
      }
    }
    return true
  }

  validate(sudoku) {
    let arr = this.fromString(sudoku)

    if (!this.checkAllRows(arr) || !this.checkAllColumns(arr) || !this.checkAllSquares(arr))
      return "Sudoku is invalid."

    if (this.isComplete(arr))
      return "Sudoku is valid."
    else
      return "Sudoku is valid but incomplete."
  }
}

module.exports = Validator
