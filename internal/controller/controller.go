package controller

import (
	"battleship/internal/model"
	"battleship/internal/msg"
)

var (
	hashes  = make(map[string]*model.Battle)
	players = make(map[*model.Battle][]*Player)
)

func handleCreate(player *Player) *model.Battle {
	battle := model.NewBattle()
	hash := generateHash()

	hashes[hash] = battle

	(*player).Send(msg.New(msg.Ack, hash))

	return battle
}

func handleJoin(player *Player, hash string) *model.Battle {
	battle := hashes[hash]

	if battle == nil {
		(*player).Send(msg.NewError(msg.UnexistingBattle))
	} else {
		(*player).Send(msg.New(msg.Ack, nil))
		players[battle] = append(players[battle], player)
	}

	return battle
}

// HandlePlayer adds a player to the game
func HandlePlayer(player Player) error {
	var battle *model.Battle

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

		if msg.RequireConnected(action) == (battle == nil) {
			player.Send(msg.NewError(msg.IncorrectState))
			continue
		}

		switch action {
		case msg.Create:
			battle = handleCreate(&player)
		case msg.Join:
			battle = handleJoin(&player, message.Payload.(string))
		}
	}

	return nil
}
