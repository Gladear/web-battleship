package websocket

import (
	"battleship/internal/msg"
	"encoding/json"

	"github.com/gorilla/websocket"
)

type remotePlayer struct {
	conn *websocket.Conn
}

func (player *remotePlayer) Send(msg msg.Message) error {
	return player.conn.WriteJSON(msg)
}

func (player *remotePlayer) GetNextAction() (*msg.Message, error) {
	var message msg.Message
	msgType, data, err := player.conn.ReadMessage()

	// request to close connection
	if msgType == -1 {
		dmsg := msg.New(msg.Disconnect, nil)
		return &dmsg, nil
	}

	if err != nil {
		return nil, err
	}

	if err = json.Unmarshal(data, &message); err != nil {
		return nil, err
	}

	return &message, nil
}

func (player *remotePlayer) Disconnect(reason interface{}) error {
	switch reason.(type) {
	case error:
		player.Send(msg.NewError(reason))
	default:
		player.Send(msg.New(msg.Disconnect, reason))
	}

	return player.conn.Close()
}
