package model

// Player represents one player
type Player interface{}

// Battle represents a game of battleship
type Battle struct {
	players []Player
	boards  map[Player]*Board
	turn    Player
	Params  Parameters
}

// AddPlayer adds a player to the battle
func (battle *Battle) AddPlayer(player Player) {
	if len(battle.players) >= 2 {
		panic("too many players")
	}

	battle.players = append(battle.players, player)
	battle.boards[player] = &Board{}
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
	if battle.turn == nil {
		return false
	}

	board := battle.boards[battle.turn]
	return !board.isFired(location)
}

// Fire makes the current player fire at a location
func (battle *Battle) Fire(location Location) (affected bool, cast bool, end bool, err error) {
	enemy := battle.GetOtherPlayer(battle.turn)
	board := battle.boards[enemy]

	if err = board.fireAt(location); err != nil {
		return
	}

	battle.turn = enemy

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

	return
}

// Start starts the battle
func (battle *Battle) Start() error {
	battle.turn = battle.players[0]

	for _, board := range battle.boards {
		board.Fired = make([][]bool, battle.Params.Width)

		for i := 0; i < battle.Params.Width; i++ {
			board.Fired[i] = make([]bool, battle.Params.Height)
		}
	}

	return nil
}

// NewBattle instantiate a new game
func NewBattle() Battle {
	return Battle{
		players: make([]Player, 0, 2),
		boards:  make(map[Player]*Board),
		turn:    nil,
		Params:  generateParameters(),
	}
}
