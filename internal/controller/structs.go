package controller

import (
	"web-battleship/internal/model"
	"fmt"
)

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

// Orientation is the orientation as received from the client
type Orientation string

// ToModel convets the orientation to the model's position orientation
func (orientation Orientation) ToModel(battle *model.Battle) model.Orientation {
	if orientation == "H" {
		return model.Horizontal
	}

	if orientation == "V" {
		return model.Vertical
	}

	panic(fmt.Sprintf("Received unknown orientation \"%v\"", orientation))
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

// ShipType is the type of the ship as received from the client
type ShipType string

// ToModel converts a client ship type to ship type of the model
func (shipType ShipType) ToModel(battle *model.Battle) *model.ShipType {
	for _, modelType := range battle.Params.Ships {
		if modelType.Name == string(shipType) {
			return &modelType
		}
	}

	panic(fmt.Sprintf("Received unknown ship type \"%v\"", shipType))
}

// Ship is a ship as received from the client
type Ship struct {
	Type     ShipType
	Position Position
}

// ToModel converts a client ship to a ship of the model
func (ship *Ship) ToModel(battle *model.Battle) model.Ship {
	return model.Ship{
		Type:     ship.Type.ToModel(battle),
		Position: ship.Position.ToModel(battle),
	}
}
