package msg

// Actions of the game
const (
	Create     Action = "create"
	Join       Action = "join"
	Disconnect Action = "disconnect"
	Ack        Action = "ack"
	Error      Action = "error"

	Parameters Action = "parameters"
	Ready      Action = "ready"
	Start      Action = "start"
	Fire       Action = "fire"
	Quit       Action = "quit"
)

// RequireConnected checks if the player must be connected to a battle
// to make some action
func RequireConnected(action Action) bool {
	return action != Create && action != Join
}
