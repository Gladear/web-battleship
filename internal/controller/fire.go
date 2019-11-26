package controller

import (
	"encoding/json"
	"web-battleship/internal/client"
	"web-battleship/internal/msg"
)

type firePayload struct {
	Location client.Location `json:"location"`
	Affected bool            `json:"affected"`
	Cast     bool            `json:"cast"`
}

// handleFire is called whenever a player shoots at the enemy
func (game *Game) handleFire(player Player, _payload json.RawMessage) error {
	if !game.Battle.CanPlay(player) {
		player.Send(msg.NewError(msg.WrongTurn))
		return nil
	}

	var payload client.Location

	if err := json.Unmarshal(_payload, &payload); err != nil {
		return err
	}

	location := payload.ToModel(game.Battle)

	if !game.Battle.CanFire(player, location) {
		player.Send(msg.NewError(msg.AlreadyFired))
		return nil
	}

	affected, cast, end, err := game.Battle.Fire(location)

	if err != nil {
		panic(err)
	}

	game.sendPlayers(msg.New(msg.Fire, firePayload{
		Location: payload,
		Affected: affected,
		Cast:     cast,
	}))

	if end {
		player.Send(msg.New(msg.End, true))

		enemy := game.Battle.GetOtherPlayer(player).(Player)
		enemy.Send(msg.New(msg.End, false))
	}

	return nil
}
