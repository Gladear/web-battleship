package endpoint

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}

func handleConnection(resp http.ResponseWriter, req *http.Request) {
	conn, err := upgrader.Upgrade(resp, req, nil)
	if err != nil {
		log.Println("upgrade error: ", err)
		return
	}

	defer conn.Close()

	for {
		var message genericMessage
		messageType, data, err := conn.ReadMessage()

		// request to close connection
		if messageType == -1 {
			log.Println("disconnected")
			break
		}

		if err != nil {
			log.Println("read error: ", err)
			break
		}

		if err = json.Unmarshal(data, &message); err != nil {
			log.Println("unmarshal error: ", err)
			break
		}

		log.Println(message)

		if err = conn.WriteJSON(message); err != nil {
			log.Println("write error: ", err)
			break
		}
	}
}

// Setup configure the websocket endpoint to handle connection requests from the game
func Setup() {
	http.HandleFunc("/endpoint", handleConnection)
}
