package controller

import (
	"log"
	"web-battleship/internal/msg"
)

func handleCreate(player Player) *Game {
	game := newGame()
	game.addPlayer(player)

	hash := generateHash()

	games[hash] = game

	log.Printf("Game created with ID %v", hash)
	player.Send(msg.New(msg.Create, hash))

	return game
}
