package model

import "errors"

// Player represents one player
type Player interface{}

// Battle represents a game of battleship
type Battle struct {
	players []Player
	boards  map[Player]Board
	turn    Player
	Params  Parameters
}

// AddPlayer adds a player to the battle
func (battle *Battle) AddPlayer(player Player) {
	if len(battle.players) >= 2 {
		panic("too many players")
	}

	battle.players = append(battle.players, player)
	battle.boards[player] = Board{}
}

// GetNextPlayer returns the player that will play next to the current one
func (battle *Battle) GetNextPlayer() Player {
	return battle.GetOtherPlayer(battle.turn)
}

// GetOtherPlayer returns the enemy of the player
func (battle *Battle) GetOtherPlayer(player Player) Player {
	if battle.players[0] == player {
		return battle.players[1]
	}

	return battle.players[0]
}

// AddShips adds the ships to the board for the indicated player
func (battle *Battle) AddShips(player Player, ships []Ship) bool {
	if !battle.Params.validateShips(ships) {
		return false
	}

	board := battle.boards[player]
	board.Ships = ships
	return true
}

// CanPlay checks if the player can play
func (battle *Battle) CanPlay(player Player) bool {
	return battle.turn == player
}

// CanFire indicates whether the player can fire a location or not
func (battle *Battle) CanFire(location Location) bool {
	board := battle.boards[battle.turn]
	return !board.isFired(location)
}

// Fire makes the current player fire at a location
func (battle *Battle) Fire(location Location) (affected bool, cast bool, end bool, err error) {
	enemy := battle.GetNextPlayer()
	board := battle.boards[enemy]

	if !board.isFired(location) {
		err = errors.New("Location was already fired at")
		return
	}

	ship := board.get(location)

	if ship == nil {
		return
	}

	affected = true

	if !board.isCast(ship) {
		return
	}

	cast = true
	end = !board.hasRemainingShips()

	battle.turn = battle.GetNextPlayer()

	return
}

// NewBattle instantiate a new game
func NewBattle() Battle {
	return Battle{
		players: make([]Player, 0, 2),
		boards:  make(map[Player]Board),
		turn:    0,
		Params:  generateParameters(),
	}
}
