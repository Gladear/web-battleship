package controller

import (
	"fmt"
	"math/rand"
)

func generateHash() string {
	var hash string

	for {
		hash = fmt.Sprintf("%v", rand.Uint64())

		if _, exist := games[hash]; !exist {
			break
		}
	}

	return hash
}
