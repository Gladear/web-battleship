package model

type parameters struct {
	Width, Height int
	NbShips       int
}

type board struct {
	Ships      []*ship
	Parameters parameters
}
