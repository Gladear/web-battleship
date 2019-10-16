package controller

import (
	"web-battleship/internal/model"
	"web-battleship/internal/msg"
)

// Game represents a game with two players
type Game struct {
	Battle  model.Battle
	Players []Player
	Ready   []*Player
}

func (game *Game) hasPlayer(player Player) bool {
	for _, it := range game.Players {
		if it == player {
			return true
		}
	}

	return false
}

func (game *Game) addPlayer(player Player) {
	game.Battle.AddPlayer(player)
	game.Players = append(game.Players, player)
}

func (game *Game) sendPlayers(msg msg.Message) {
	for _, player := range game.Players {
		player.Send(msg)
	}
}

func newGame() *Game {
	return &Game{
		Battle:  model.NewBattle(),
		Players: make([]Player, 0, 2),
		Ready:   make([]*Player, 0, 2),
	}
}
