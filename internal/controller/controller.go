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
	battle := &model.Battle{}
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
		}

		action := message.Action

		switch action {
		case msg.Disconnect:
			break
		case msg.Create:
			if battle != nil {
				player.Send(msg.NewError(msg.AlreadyConnected))
			} else {
				battle = handleCreate(&player)
			}
		case msg.Join:
			if battle != nil {
				player.Send(msg.NewError(msg.AlreadyConnected))
			} else {
				battle = handleJoin(&player, message.Payload.(string))
			}
		}
	}
}
