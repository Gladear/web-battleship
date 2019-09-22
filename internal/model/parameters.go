package model

// The Parameters permit to configure the game
type Parameters struct {
	Width, Height int
	Ships         []ShipType
}

func (params *Parameters) validateShips(ships []Ship) bool {
	return params.checkShipTypes(ships) &&
		params.fitShips(ships)
}

func (params *Parameters) checkShipTypes(ships []Ship) bool {
	types := make([]ShipType, len(params.Ships))
	copy(types, params.Ships)

	if len(types) != len(ships) {
		return false
	}

	for _, ship := range ships {
		for i, shipType := range types {
			if shipType.Equals(*ship.Type) {
				// Remove type
				types[i] = types[len(types)-1]
				types = types[:len(types)-1]

				// Process next ship
				break
			}
		}
	}

	return len(types) == 0
}

func (params *Parameters) fitShips(ships []Ship) bool {
	width, height := params.Width, params.Height

	for _, ship := range ships {
		pos := ship.Position
		maxX, maxY := pos.X, pos.Y

		if pos.X < 1 || pos.Y < 1 {
			return false
		}

		switch pos.Orientation {
		case Horizontal:
			maxX += ship.Type.Length
		case Vertical:
			maxY += ship.Type.Length
		default:
			panic("unknown orientation")
		}

		if maxX > width || maxY > height {
			return false
		}
	}

	return true
}

func generateParameters() Parameters {
	return Parameters{
		Width:  10,
		Height: 10,
		Ships: []ShipType{
			ShipType{"Carrier", 5},
			ShipType{"Battleship", 4},
			ShipType{"Cruiser", 3},
			ShipType{"Submarine", 3},
			ShipType{"Patrol Boat", 2},
		},
	}
}
