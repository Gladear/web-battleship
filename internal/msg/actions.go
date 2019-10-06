package msg

// Actions of the game
const (
	Create     Action = "create"
	Join       Action = "join"
	Disconnect Action = "disconnect"
	Ack        Action = "ack"
	Error      Action = "error"

	Ready Action = "ready"
	Fire  Action = "fire"
)

// RequireConnected checks if the player must be connected to a battle
// to make some action
func RequireConnected(action Action) bool {
	return action != Create && action != Join
}
