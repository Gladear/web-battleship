package msg

// Action is an action to be done by the client or the server
type Action string

// A Message is an action made by the player,
// associated with a payload that type depends on the action
type Message struct {
	Action  Action      `json:"action"`
	Payload interface{} `json:"payload"`
}

// New creates a message
func New(action Action, payload interface{}) Message {
	return Message{action, payload}
}

// NewError creates an error message
func NewError(reason interface{}) Message {
	return Message{Error, reason}
}
