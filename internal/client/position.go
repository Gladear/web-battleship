package client

import "web-battleship/internal/model"

// Column is the X position as received from the client
type Column string

// ToModel converts the colmun to the model X position
func (col Column) ToModel(battle *model.Battle) int {
	return int(col[0]) - int('a') + 1
}

// Row is the Y position as received from the client
type Row int

// ToModel converts the row to the model Y position
func (row Row) ToModel(battle *model.Battle) int {
	return int(row)
}

// Position is a position as received from the client
type Position struct {
	X           Column
	Y           Row
	Orientation Orientation
}

// ToModel converts a client position to a position of the model
func (position *Position) ToModel(battle *model.Battle) model.Position {
	return model.Position{
		X:           position.X.ToModel(battle),
		Y:           position.Y.ToModel(battle),
		Orientation: position.Orientation.ToModel(battle),
	}
}
