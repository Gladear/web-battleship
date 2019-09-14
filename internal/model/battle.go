package model

// Turn indicates the player that is currently playing
type Turn uint8

// Battle represents a game of battleship
type Battle struct {
	board *board
	turn  uint8
}
