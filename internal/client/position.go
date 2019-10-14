package client

import "web-battleship/internal/model"

// Column is the X position as received from the client
type Column string

// ToModel converts the colmun to the model X position
func (col Column) ToModel(battle model.Battle) int {
	return int(col[0]) - int('a') + 1
}

// Row is the Y position as received from the client
type Row int

// ToModel converts the row to the model Y position
func (row Row) ToModel(battle model.Battle) int {
	return int(row)
}

// Location is the representation of a case as received from the client
type Location struct {
	X Column
	Y Row
}

// ToModel converts a client position to a position of the model
func (location *Location) ToModel(battle model.Battle) model.Location {
	return model.Location{
		X: location.X.ToModel(battle),
		Y: location.Y.ToModel(battle),
	}
}

// Position is the position of a ship as received from the client
type Position struct {
	X Column
	Y Row
	Orientation Orientation
}

// ToModel converts a client ship's position to a position of the model
func (position *Position) ToModel(battle model.Battle) model.Position {
	return model.Position{
		Location: model.Location{
			X: position.X.ToModel(battle),
			Y: position.Y.ToModel(battle),
		},
		Orientation: position.Orientation.ToModel(battle),
	}
}
