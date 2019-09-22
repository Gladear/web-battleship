package model

// The Orientation represents whether the ship
// is placed horizontally or vertically
type Orientation int

// The orientation of a ship
const (
	Horizontal Orientation = iota
	Vertical
)

// A Position is the location of the ship on the board,
// as well as its orientation
type Position struct {
	X, Y        int
	Orientation Orientation
}

// Equals checks that both positions are equal
func (pos Position) Equals(other Position) bool {
	if pos == other {
		return true
	}

	return pos.X == other.X &&
		pos.Y == other.Y &&
		pos.Orientation == other.Orientation
}

// ShipType is the model of the ship
// It contains its length and its name
type ShipType struct {
	Name   string
	Length int
}

// Equals checks that both types are equal
func (shipType ShipType) Equals(other ShipType) bool {
	if shipType == other {
		return true
	}

	return shipType.Name == other.Name &&
		shipType.Length == other.Length
}

// A Ship represents a ship on the board
type Ship struct {
	Type     *ShipType
	Position Position
}

// Equals check that both ship are equal
func (ship Ship) Equals(other Ship) bool {
	if ship == other {
		return true
	}

	return ship.Type.Equals(*other.Type) &&
		ship.Position.Equals(other.Position)
}
