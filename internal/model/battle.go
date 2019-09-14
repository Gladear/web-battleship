package model

// Turn indicates the player that is currently playing
type Turn uint8

// Battle represents a game of battleship
type Battle struct {
	board      Board
	turn       Turn
	parameters Parameters
}

// NewBattle instantiate a new game
func NewBattle() *Battle {
	return &Battle{
		turn:       0,
		parameters: generateParameters(),
	}
}
