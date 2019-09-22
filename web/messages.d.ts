type BattleID = string;

type MessageTypes = {
  "create": null,
  "join": BattleID,
}

interface Message<K extends keyof MessageTypes> {
  action: K,
  payload: MessageTypes[K]
}
