package websocket

import (
	"web-battleship/internal/controller"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var (
	upgrader = websocket.Upgrader{}
)

func handleConnection(resp http.ResponseWriter, req *http.Request) {
	conn, err := upgrader.Upgrade(resp, req, nil)
	if err != nil {
		panic(err)
	}

	if err = controller.HandlePlayer(&remotePlayer{conn}); err != nil {
		log.Panicln(err)
	}
}

// Setup configure the websocket endpoint to handle connection requests from the game
func Setup() {
	http.HandleFunc("/endpoint", handleConnection)
}
