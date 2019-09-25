package controller

import (
	"encoding/json"
	"web-battleship/internal/client"
	"web-battleship/internal/model"
	"web-battleship/internal/msg"
)

// readyPayload is the payload for the ready action
type readyPayload []client.Ship

func (payload readyPayload) ToModel(battle *model.Battle) []model.Ship {
	ships := make([]model.Ship, 0, len(payload))

	for _, ship := range payload {
		ships = append(ships, ship.ToModel(battle))
	}

	return ships
}

// handleReady puts the player in ready state
// If all players are ready, the game is started
func (game *Game) handleReady(player Player, _payload json.RawMessage) error {
	var payload readyPayload

	if err := json.Unmarshal(_payload, &payload); err != nil {
		return err
	}

	ships := payload.ToModel(&game.Battle)

	if !game.Battle.AddShips(player, ships) {
		return player.Send(msg.NewError(msg.BadPlacement))
	}

	player.Send(msg.New(msg.Ack, nil))

	game.Ready++

	return nil
}
