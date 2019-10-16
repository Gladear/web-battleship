package controller

import (
	"web-battleship/internal/msg"
)

var games = make(map[string]*Game)

// HandlePlayer adds a player to the game
func HandlePlayer(player Player) error {
	var game *Game

	for {
		message, err := player.GetNextAction()

		if err != nil {
			player.Disconnect(err)
			return err
		}

		action := message.Action

		if action == msg.Disconnect {
			if err = game.handleDisconnect(player); err != nil {
				panic(err)
			}
			break
		}

		if msg.RequireConnected(action) == (game == nil) {
			player.Send(msg.NewError(msg.IncorrectState))
			continue
		}

		switch action {
		case msg.Create:
			game = handleCreate(player)
		case msg.Join:
			game = handleJoin(player, message.Payload)
		case msg.Parameters:
			err = game.handleParameters(player, message.Payload)
		case msg.Ready:
			err = game.handleReady(player, message.Payload)
		case msg.Fire:
			err = game.handleFire(player, message.Payload)
		}

		if err != nil {
			panic(err)
		}
	}

	return nil
}
