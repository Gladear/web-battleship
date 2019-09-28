// "join"
type BattleID = string;

// "ready"
interface Position {
  x: number;
  y: number;
  orientation: 'H' | 'V';
}

type ShipType = string;

interface Ship {
  position: Position,
  type: ShipType,
}

type MessageTypes = {
  "create": null,
  "join": BattleID,
  "ready": Ship[],
}

interface Message<K extends keyof MessageTypes> {
  action: K,
  payload: MessageTypes[K]
}
