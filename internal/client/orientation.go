package client

import (
	"fmt"
	"web-battleship/internal/model"
)

// Orientation is the orientation as received from the client
type Orientation string

// ToModel convets the orientation to the model's position orientation
func (orientation Orientation) ToModel(battle model.Battle) model.Orientation {
	if orientation == "H" {
		return model.Horizontal
	}

	if orientation == "V" {
		return model.Vertical
	}

	panic(fmt.Sprintf("Received unknown orientation \"%v\"", orientation))
}
