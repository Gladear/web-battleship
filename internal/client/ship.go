package client

import (
	"fmt"
	"web-battleship/internal/model"
)

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
