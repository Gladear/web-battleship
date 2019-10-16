package controller

import (
	"log"
	"web-battleship/internal/msg"
)

func (game *Game) handleDisconnect(player Player) error {
	if !game.hasPlayer(player) {
		return nil
	}

	enemy := game.Battle.GetOtherPlayer(player).(Player)

	for hash, value := range games {
		if value == game {
			delete(games, hash)
			log.Println("Delete game with ID " + hash)
		}
	}

	return enemy.Send(msg.New(msg.Disconnect, nil))
}
