package main

import (
	"web-battleship/internal/web"
	"web-battleship/internal/websocket"
	"log"
	"net/http"
)

func main() {
	// Setup WS endpoint
	websocket.Setup()

	// Setup web server
	web.Setup()

	// Launch server
	log.Println("Launching server on port :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
