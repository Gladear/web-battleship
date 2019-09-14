package controller

import "battleship/internal/msg"

var games = make(map[string]Game)

func handleCreate(player Player) *Game {
	game := newGame()
	game.addPlayer(player)

	hash := generateHash()

	games[hash] = game

	player.Send(msg.New(msg.Ack, hash))

	return &game
}

func handleJoin(player Player, hash string) *Game {
	game, exists := games[hash]

	if !exists {
		player.Send(msg.NewError(msg.UnexistingBattle))
		return nil
	}

	player.Send(msg.New(msg.Ack, nil))
	game.addPlayer(player)

	return &game
}

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
			game = handleJoin(player, message.Payload.(string))
		case msg.Ready:
			err = game.handleReady(player, message.Payload.(readyPayload))
		}

		if err != nil {
			panic(err)
		}
	}

	return nil
}
