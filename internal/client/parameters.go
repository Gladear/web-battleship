package client

import "web-battleship/internal/model"

type shipType struct {
	Name   string
	Length int
	Count  int
}

func (shipType shipType) ToModel(battle model.Battle) model.ShipType {
	return model.ShipType{
		Name:   shipType.Name,
		Length: shipType.Length,
	}
}

// The Parameters as received by the client
type Parameters struct {
	Width  int
	Height int
	Ships  []shipType
}

// ToModel converts the client parameters to parameters of the model
func (params Parameters) ToModel(battle model.Battle) model.Parameters {
	shipTypes := make([]model.ShipType, 0, len(params.Ships))

	for _, shipType := range params.Ships {
		for i := 0; i < shipType.Count; i++ {
			shipTypes = append(shipTypes, shipType.ToModel(battle))
		}
	}

	return model.Parameters{
		Width:  params.Width,
		Height: params.Height,
		Ships:  shipTypes,
	}
}
