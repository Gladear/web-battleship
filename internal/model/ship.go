package model

type orientation int

const (
	// Horizontal tells that the ship is positionned horizontally
	horizontal orientation = iota
	// Vertical tells that the ship is positionned vertically
	vertical
)

type position struct {
	X           int
	Y           rune
	Orientation orientation
}

type shipType struct {
	Name   string
	Length int
}

type ship struct {
	Type     *shipType
	Position position
}
