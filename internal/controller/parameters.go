package controller

import (
	"log"
	"encoding/json"
	"web-battleship/internal/client"
	"web-battleship/internal/msg"
)

func (game *Game) handleParameters(player Player, payload json.RawMessage) error {
	var parameters client.Parameters

	if err := json.Unmarshal(payload, &parameters); err != nil {
		return err
	}

	game.Battle.Params = parameters.ToModel(game.Battle)
	log.Printf("Modified parameters: %v", game.Battle.Params)

	player.Send(msg.New(msg.Ack, nil))

	return nil
}
