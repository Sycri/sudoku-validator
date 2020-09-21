require_relative 'sudoku'

class Validator
  def initialize(puzzle_string)
    @puzzle_string = puzzle_string
  end

  def self.validate(puzzle_string)
    new(puzzle_string).validate
  end

  def validate
    sudoku = Sudoku.from_text(@puzzle_string)

    valid = sudoku.rows.all? { |row| each_digit_occurs_once?(row) } &&
            sudoku.columns.all? { |col| each_digit_occurs_once?(col) } &&
            sudoku.subgroups.all? { |subgroup| each_digit_occurs_once?(subgroup.flatten) }

    output_validation_message(valid, sudoku.complete?)
  end

  private

  def output_validation_message(valid, complete)
    if valid && complete
      'Sudoku ir derīgs.'
    elsif valid
      'Sudoku ir derīgs, bet nepabeigts.'
    else
      'Sudoku ir nederīgs.'
    end
  end

  def each_digit_occurs_once?(arr)
    arr.compact.uniq.length == arr.compact.length
  end
end
