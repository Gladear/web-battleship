package controller

import (
	"log"
	"web-battleship/internal/msg"
)

func handleCreate(player Player) *Game {
	game := newGame()

	hash := generateHash()

	games[hash] = game

	log.Println("Game created with ID " + hash)
	player.Send(msg.New(msg.Create, hash))

	return game
}
