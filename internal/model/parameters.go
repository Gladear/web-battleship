package model

// The Parameters permit to configure the game
type Parameters struct {
	Width, Height int
	Ships         []ShipType
}

func (params *Parameters) validateShips(ships []Ship) bool {
	return params.checkShipTypes(ships) &&
		params.fitShips(ships) &&
		params.checkShipsOverlaps(ships)
}

func (params *Parameters) checkShipTypes(ships []Ship) bool {
	if len(params.Ships) != len(ships) {
		return false
	}

	types := make([]ShipType, len(params.Ships))
	copy(types, params.Ships)

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
		loc := pos.Location
		maxX, maxY := loc.X, loc.Y

		if loc.X < 0 || loc.Y < 0 {
			return false
		}

		switch pos.Orientation {
		case Horizontal:
			maxX += ship.Type.Length
		case Vertical:
			maxY += ship.Type.Length
		}

		if maxX >= width || maxY >= height {
			return false
		}
	}

	return true
}

func (params *Parameters) checkShipsOverlaps(ships []Ship) bool {
	grid := make([][]bool, params.Width)

	for i := 0; i < params.Width; i++ {
		grid[i] = make([]bool, params.Height)
	}

	for _, ship := range ships {
		pos := ship.Position
		length := ship.Type.Length

		for i := 0; i < length; i++ {
			if grid[pos.Location.X][pos.Location.Y] {
				return false
			}

			grid[pos.Location.X][pos.Location.Y] = true

			pos = pos.Next()
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
			ShipType{"Battleship", 4},
			ShipType{"Cruiser", 3},
			ShipType{"Cruiser", 3},
			ShipType{"Submarine", 3},
			ShipType{"Patrol Boat", 2},
			ShipType{"Patrol Boat", 2},
			ShipType{"Patrol Boat", 2},
		},
	}
}
