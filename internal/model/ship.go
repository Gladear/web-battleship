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
	X           int
	Y           rune
	Orientation Orientation
}

// ShipType is the model of the ship
// It contains its length and its name
type ShipType struct {
	Name   string
	Length int
}

// A Ship represents a ship on the board
type Ship struct {
	Type     *ShipType
	Position Position
}
