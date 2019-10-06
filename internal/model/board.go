package model

// The Board represents the grid of the game
type Board struct {
	Ships []Ship
	Fired [][]bool
}

func (board Board) get(location Location) *Ship {
	for _, ship := range board.Ships {
		if ship.MatchLocation(location) {
			return &ship
		}
	}

	return nil
}

func (board Board) isFired(location Location) bool {
	return board.Fired[location.X][location.Y]
}

func (board Board) isCast(ship *Ship) bool {
	pos := ship.Position
	length := ship.Type.Length

	for i := 0; i < length; i++ {
		if !board.isFired(pos.Location) {
			return false
		}

		pos = pos.Next()
	}

	return true
}

func (board Board) hasRemainingShips() bool {
	for _, ship := range board.Ships {
		if !board.isCast(&ship) {
			return true
		}
	}

	return false
}
