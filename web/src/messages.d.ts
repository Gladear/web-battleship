// "join"
type BattleID = string;

// "ready"
interface Position {
  x: string,
  y: number,
  orientation: 'H' | 'V',
}

type ShipType = string;

interface Ship {
  position: Position,
  type: ShipType,
}

// "fire"
interface Location {
  x: string,
  y: number,
}

interface FireResponse {
  affected: boolean,
  cast: boolean,
  end: boolean,
}

interface SentMessages {
  "create": null,
  "join": BattleID,
  "ready": Ship[],
  "fire": Location,
}

type CustomError =
  'unexisting_battle'
  | 'incorrect_state'
  | 'bad_placement'
  | 'wrong_turn'
  | 'already_fired';

interface ReceivedMessages {
  "ack": null,
  "error": CustomError,
  "fire": FireResponse,
}
