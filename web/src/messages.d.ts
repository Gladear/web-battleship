// "parameters"
interface ShipParameters {
  name: string,
  length: number,
  count: number,
}

interface GameParameters {
  width: number,
  height: number,
  ships: ShipParameters[],
}

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

interface FireMessage {
  location: Location,
  affected: boolean,
  cast: boolean,
  end: boolean,
}

interface SentMessages {
  "create": null,
  "parameters": GameParameters,
  "join": BattleID,
  "ready": Ship[],
  "fire": Location,
  "disconnect": null,
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
  "create": string,
  "parameters": GameParameters,
  "start": null,
  "fire": FireMessage,
  "disconnect": null,
}
