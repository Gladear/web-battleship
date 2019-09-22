package controller

import "web-battleship/internal/msg"

// A Player is an entity that plays the game
// It can send and is sent messages
type Player interface {
	// Send sends a message to the player
	Send(msg msg.Message) error

	// GetNextAction retrieves next message sent by the user
	GetNextAction() (*msg.Message, error)

	// Disconnect make the player leave the game
	Disconnect(reason interface{}) error
}
