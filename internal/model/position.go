package model

// Location represents the position of a case on the board
type Location struct {
	X, Y int
}

// Equals checks that two positions are the same
func (location Location) Equals(other Location) bool {
	if location == other {
		return true
	}

	return location.X == other.X &&
		location.Y == other.Y
}

// A Position is the location of the ship on the board,
// as well as its orientation
type Position struct {
	Location    Location
	Orientation Orientation
}

// Equals checks that both positions are equal
func (pos Position) Equals(other Position) bool {
	if pos == other {
		return true
	}

	return pos.Location.Equals(other.Location) &&
		pos.Orientation == other.Orientation
}
