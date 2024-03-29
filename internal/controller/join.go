package controller

import (
	"log"
	"encoding/json"
	"web-battleship/internal/client"
	"web-battleship/internal/msg"
)

func handleJoin(player Player, payload json.RawMessage) *Game {
	var hash string

	if err := json.Unmarshal(payload, &hash); err != nil {
		panic(err)
	}

	game, exists := games[hash]

	if !exists {
		player.Send(msg.NewError(msg.UnexistingBattle))
		return nil
	}

	log.Println("A player joined game with ID " + hash)
	ships := make([]client.ShipParameter, 0)

	for _, shipType := range game.Battle.Params.Ships {
		found := false

		for index, ship := range ships {
			if shipType.Name == ship.Name {
				found = true

				ships[index].Count++

				break
			}
		}

		if !found {
			ships = append(ships, client.ShipParameter{
				Name:   shipType.Name,
				Length: shipType.Length,
				Count:  1,
			})
		}
	}

	player.Send(msg.New(msg.Join, client.Parameters{
		Width:  game.Battle.Params.Width,
		Height: game.Battle.Params.Height,
		Ships:  ships,
	}))

	game.addPlayer(player)

	return game
}
