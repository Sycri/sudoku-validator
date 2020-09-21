class Sudoku
  attr_reader :grid

  alias rows grid

  def initialize(grid)
    @grid = grid
  end

  def self.from_text(text)
    new(parse_text(text))
  end

  def self.parse_text(text)
    text.scan(/[0-9]/).map(&:to_i).map { |i| i.zero? ? nil : i }.each_slice(9).to_a
  end

  def complete?
    rows.all? { |row| row.none?(&:nil?) }
  end

  def columns
    grid.transpose
  end

  def subgroups
    @subgroups ||= begin
      grid.map { |line| line.each_slice(3).to_a }
          .each_slice(3)
          .map { |(a, b, c)| a.zip(b, c) }
          .flatten(1)
    end
  end
end
