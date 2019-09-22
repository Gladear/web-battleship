package model

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

// AddShips adds the ships to the board for the indicated player
func (battle *Battle) AddShips(player Player, ships []Ship) bool {
	if !battle.Params.validateShips(ships) {
		return false
	}

	board := battle.boards[player]
	board.Ships = ships
	return true
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
