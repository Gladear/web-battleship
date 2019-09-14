package msg

// Received actions
const (
	Create     Action = "create"
	Join       Action = "join"
	Disconnect Action = "disconnect"

	Ready Action = "ready"
)

// RequireConnected checks if the player must be connected to a battle
// to make some action
func RequireConnected(action Action) bool {
	return action != Create && action != Join
}
