package client

import "web-battleship/internal/model"

// ShipParameter is the parameters of a ship as communicated with the client
type ShipParameter struct {
	Name   string `json:"name"`
	Length int    `json:"length"`
	Count  int    `json:"count"`
}

// ToModel converts the ship parameter to one understood by the model
func (shipType ShipParameter) ToModel(battle model.Battle) model.ShipType {
	return model.ShipType{
		Name:   shipType.Name,
		Length: shipType.Length,
	}
}

// The Parameters as received by the client
type Parameters struct {
	Width  int
	Height int
	Ships  []ShipParameter
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
