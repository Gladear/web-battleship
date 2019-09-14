package controller

import (
	"battleship/internal/model"
	"battleship/internal/msg"
)

// Game represents a game with two players
type Game struct {
	players []Player
	Battle  model.Battle
	ready   uint8
}

func (game *Game) addPlayer(player Player) {
	game.Battle.AddPlayer(player)
	game.players = append(game.players, player)
}

type readyPayload struct {
	Ships []model.Ship
}

func (game *Game) handleReady(player Player, payload readyPayload) error {
	if !game.Battle.AddShips(player, payload.Ships) {
		return player.Send(msg.NewError(msg.WrongPlacement))
	}

	game.ready++

	return nil
}

func newGame() Game {
	return Game{
		players: make([]Player, 0, 2),
		Battle:  model.NewBattle(),
		ready:   0,
	}
}
