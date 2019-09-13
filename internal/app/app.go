package app

import (
	"battleship/internal/web"
	"log"
)

// New instantiate the server and handles connections
func New() {
	// Launch web server
	log.Fatal(web.Serve())
}
