package app

import (
	"battleship/internal/endpoint"
	"battleship/internal/web"
	"log"
	"net/http"
)

// Run instantiate the server and handles connections
func Run() {
	// Setup WS endpoint
	endpoint.Setup()

	// Setup web server
	web.Setup()

	// Launch server
	log.Println("Launching server on port :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
