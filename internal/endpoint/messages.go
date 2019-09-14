package endpoint

type genericMessage struct {
	Action  string      `json:"action"`
	Payload interface{} `json:"payload"`
}
