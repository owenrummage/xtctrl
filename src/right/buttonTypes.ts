export enum ControlMap {
  AssignTrack = 0x28,
  AssignSend = 0x29,
  AssignPanSurround = 0x2A,
  AssignPlugin = 0x2B,
  AssignEQ = 0x2C,
  AssignInstrument = 0x2D,

  BankLeft = 0x2E,
  BankRight = 0x2F,
  ChannelLeft = 0x30,
  ChannelRight = 0x31,
  Flip = 0x32,
  Global = 0x33,

  NameValueButton = 0x34,
  SMPTEBeatsButton = 0x35,

  F1 = 0x36,
  F2 = 0x37,
  F3 = 0x38,
  F4 = 0x39,
  F5 = 0x3A,
  F6 = 0x3B,
  F7 = 0x3C,
  F8 = 0x3D,

  MIDITracks = 0x3E,
  Inputs = 0x3F,
  AudioTracks = 0x40,
  AudioInstruments = 0x41,
  Aux = 0x42,
  Busses = 0x43,
  Outputs = 0x44,
  User = 0x45,

  Shift = 0x46,
  Option = 0x47,
  Control = 0x48,
  Alt = 0x49,

  ReadOff = 0x4A,
  Write = 0x4B,
  Trim = 0x4C,
  Touch = 0x4D,
  Latch = 0x4E,
  Group = 0x4F,

  Save = 0x50,
  Undo = 0x51,
  Cancel = 0x52,
  Enter = 0x53,

  Markers = 0x54,
  Nudge = 0x55,
  Cycle = 0x56,
  Drop = 0x57,
  Replace = 0x58,
  Click = 0x59,
  Solo = 0x5A,

  Rewind = 0x5B,
  Forward = 0x5C,
  Stop = 0x5D,
  Play = 0x5E,
  Record = 0x5F,

  Up = 0x60,
  Down = 0x61,
  Left = 0x62,
  Right = 0x63,
  Zoom = 0x64,
  Scrub = 0x65
}

export type ControlType =
  | "AssignTrack"
  | "AssignSend"
  | "AssignPanSurround"
  | "AssignPlugin"
  | "AssignEQ"
  | "AssignInstrument"
  | "BankLeft"
  | "BankRight"
  | "ChannelLeft"
  | "ChannelRight"
  | "Flip"
  | "Global"
  | "NameValueButton"
  | "SMPTEBeatsButton"
  | "F1"
  | "F2"
  | "F3"
  | "F4"
  | "F5"
  | "F6"
  | "F7"
  | "F8"
  | "MIDITracks"
  | "Inputs"
  | "AudioTracks"
  | "AudioInstruments"
  | "Aux"
  | "Busses"
  | "Outputs"
  | "User"
  | "Shift"
  | "Option"
  | "Control"
  | "Alt"
  | "ReadOff"
  | "Write"
  | "Trim"
  | "Touch"
  | "Latch"
  | "Group"
  | "Save"
  | "Undo"
  | "Cancel"
  | "Enter"
  | "Markers"
  | "Nudge"
  | "Cycle"
  | "Drop"
  | "Replace"
  | "Click"
  | "Solo"
  | "Rewind"
  | "Forward"
  | "Stop"
  | "Play"
  | "Record"
  | "Up"
  | "Down"
  | "Left"
  | "Right"
  | "Zoom"
  | "Scrub";