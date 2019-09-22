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
		maxX, maxY := pos.X, pos.Y

		if pos.X < 1 || pos.Y < 1 {
			return false
		}

		switch pos.Orientation {
		case Horizontal:
			maxX += ship.Type.Length
		case Vertical:
			maxY += ship.Type.Length
		}

		if maxX > width || maxY > height {
			return false
		}
	}

	return true
}

func getNextPos(x, y int, orientation Orientation) (int, int) {
	if orientation == Horizontal {
		return x + 1, y
	}

	return x, y + 1
}

func (params *Parameters) checkShipsOverlaps(ships []Ship) bool {
	grid := make([][]bool, params.Width)

	for i := 0; i < params.Width; i++ {
		grid[i] = make([]bool, params.Height)
	}

	for _, ship := range ships {
		pos := ship.Position
		length := ship.Type.Length

		x, y := pos.X, pos.Y

		for i := 0; i < length; i++ {
			x, y = getNextPos(x, y, pos.Orientation)

			if grid[x][y] {
				return false
			}

			grid[x][y] = true
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
