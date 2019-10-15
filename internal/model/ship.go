package model

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

// MatchLocation checks if a case of the ship is at a location
func (ship Ship) MatchLocation(location Location) bool {
	pos := ship.Position
	loc := pos.Location

	if pos.Orientation == Horizontal {
		return location.Y == loc.Y &&
			location.X >= loc.X &&
			location.X < loc.X+ship.Type.Length
	}

	return location.X == loc.X &&
		location.Y >= loc.Y &&
		location.Y < loc.Y+ship.Type.Length
}
