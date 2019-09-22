package controller

import (
	"web-battleship/internal/model"
)

// Game represents a game with two players
type Game struct {
	Players []Player
	Battle  model.Battle
	Ready   uint8
}

func (game *Game) addPlayer(player Player) {
	game.Battle.AddPlayer(player)
	game.Players = append(game.Players, player)
}

func newGame() Game {
	return Game{
		Players: make([]Player, 0, 2),
		Battle:  model.NewBattle(),
		Ready:   0,
	}
}
