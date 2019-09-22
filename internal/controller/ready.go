package controller

import (
	"battleship/internal/model"
	"battleship/internal/msg"
)

// readyPayload is the payload for the ready action
type readyPayload []Ship

func (payload readyPayload) ToModel(battle *model.Battle) []model.Ship {
	ships := make([]model.Ship, 0, len(payload))

	for _, ship := range payload {
		ships = append(ships, ship.ToModel(battle))
	}

	return ships
}

// handleReady puts the player in ready state
// If all players are ready, the game is started
func (game *Game) handleReady(player Player, payload readyPayload) error {
	ships := payload.ToModel(&game.Battle)

	if !game.Battle.AddShips(player, ships) {
		return player.Send(msg.NewError(msg.WrongPlacement))
	}

	player.Send(msg.New(msg.Ack, nil))

	game.Ready++

	return nil
}
