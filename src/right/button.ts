import { ControlMap, ControlType } from "./buttonTypes.js";

export function setControlButton(instance: any, button: ControlType, on: boolean) {
    const buttonId = ControlMap[button]
    const state = on ? 127 : 0
    instance.output.sendMessage([0b10010000, buttonId, state]);
}