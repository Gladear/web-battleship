package model

// The Orientation represents whether the ship
// is placed horizontally or vertically
type Orientation int

// The orientation of a ship
const (
	Horizontal Orientation = iota
	Vertical
)
