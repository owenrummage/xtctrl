import { Input as MidiInputClass, MidiCallback, MidiMessage, Output, Output as MidiOutputClass } from "midi"

// This is the types and functions for using a non-midi controller such as a websocket server with midi on the other end

// This type allows for both midi and non-midi controllers to coexist
type SendMessageFunction = (message: MidiMessage) => void
export interface OutputType {
    closePort: () => void
    getPortCount: () => number
    getPortName: (port: number) => string
    openPort: (port: number) => void
    openVirtualPort: (port: string) => void
    send: SendMessageFunction
    sendMessage: SendMessageFunction
}
export interface InputType {
    closePort: () => void
    getPortCount: () => number
    getPortName: (port: number) => string
    ignoreTypes: (sysex: boolean, timing: boolean, activeSensing: boolean) => void;
    openPort: (port: number) => void
    openVirtualPort: (port: string) => void
    on: (event: "message", callback: MidiCallback) => any
}

export class OutputClass extends MidiOutputClass implements OutputType { }

export class InputClass extends MidiInputClass implements InputType { }

export interface Controller {
    output: OutputType
    input: InputType
}

export class OutputNM extends Output {
    sendMessage: SendMessageFunction;

    constructor(smf: SendMessageFunction) {
        super()
        this.sendMessage = smf
    }
}