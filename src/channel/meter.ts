import { Channels } from "./index.js";
const states = ["0", "1", "3", "5", "7", "9", "b", "d", "e"]

export function setMeter(instance: any, channel: Channels, value: number) {
    const binValue = Number("0x" + (channel - 1) + states[value])
    instance.output.sendMessage([0xd0, binValue])
}

