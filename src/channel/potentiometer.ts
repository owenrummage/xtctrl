import { getLastFourBitsFromNumber } from "../utils.js";
import { Channels } from "./index.js";

const midiChannel = 0b10110000;

export type MODE_TYPE = "SINGLE_DOT" | "SIDED_DOTS" | "FADE_UP" | "EXPAND"

export enum MODE {
    SINGLE_DOT = "00",
    SIDED_DOTS = "01",
    FADE_UP = "10",
    EXPAND = "11"
}

export function setPotentiometerLeds(instance: any, channel: Channels, modeType: MODE_TYPE, value: number, led: boolean) {
    if (channel <= 1 || channel >= 8) {
        throw new Error("Channel must be between 1 and 8. Main channel has no buttons.");
    }

    const state = getLastFourBitsFromNumber(value)
    const mode = MODE[modeType];

    const buttonOut = 0x30 + channel - 1 // Get the button, add the channel number, subtract 1 to line up channels

    const binValue = Number("0b0" + (led ? "1" : "0") + mode + state)

    instance.output.sendMessage([midiChannel, buttonOut, binValue])
}