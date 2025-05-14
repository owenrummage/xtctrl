import { ControlMap, ControlType } from "./buttonTypes.js";

export type BUTTON_STATE_TYPE = "OFF" | "BLINK" | "SOLID";
enum BUTTON_STATE {
    OFF = 0x00,
    BLINK = 0x01,
    SOLID = 0x02
}

export function setControlButton(instance: any, button: ControlType, stateType: BUTTON_STATE_TYPE) {
    const buttonId = ControlMap[button]
    const state = BUTTON_STATE[stateType];
    instance.output.sendMessage([0b10010000, buttonId, state]);
}