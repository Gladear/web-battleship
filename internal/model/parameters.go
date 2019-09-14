package model

// The Parameters permit to configure the game
type Parameters struct {
	Width, Height int
	Ships         []ShipType
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
