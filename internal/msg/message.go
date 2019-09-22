package msg

import "encoding/json"

// Action is an action to be done by the client or the server
type Action string

// A Message is an action made by the player,
// associated with a payload that type depends on the action
type Message struct {
	Action  Action          `json:"action"`
	Payload json.RawMessage `json:"payload"`
}

// New creates a message
func New(action Action, payload interface{}) Message {
	msg, err := json.Marshal(payload)
	if err != nil {
		panic(err)
	}

	return Message{action, msg}
}

// NewError creates an error message
func NewError(reason interface{}) Message {
	msg, err := json.Marshal(reason)
	if err != nil {
		panic(err)
	}

	return Message{Error, msg}
}
