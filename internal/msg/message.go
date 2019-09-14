package msg

// A Message is an action made by the player,
// associated with a payload that type depends on the action
type Message struct {
	// Action is the action to be done
	Action string

	// Payload is the data associated with the action
	Payload interface{}
}

// New creates a message
func New(action string, payload interface{}) Message {
	return Message{action, payload}
}

// NewError creates an error message
func NewError(reason interface{}) Message {
	return Message{Error, reason}
}
