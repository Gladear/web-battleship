package controller

import (
	"web-battleship/internal/msg"
)

func (game *Game) handleQuit(player Player) error {
	enemy := game.Battle.GetOtherPlayer(player).(Player)

	return enemy.Send(msg.New(msg.Quit, nil))
}
