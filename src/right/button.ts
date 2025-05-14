import XTouchControl from '../index.js';
import { ControlMap, ControlType } from './buttonTypes.js';

<<<<<<< HEAD
export type BUTTON_STATE_TYPE = "OFF" | "BLINK" | "SOLID";
=======
export type BUTTON_STATE_TYPE = 'OFF' | 'BLINK' | 'SOLID';

>>>>>>> c4da8e5e00d8b875e6a979c5c29fff4e1449a4fe
enum BUTTON_STATE {
    OFF = 0x00,
    BLINK = 0x01,
    SOLID = 0x02
}

<<<<<<< HEAD
export function setControlButton(instance: any, button: ControlType, stateType: BUTTON_STATE_TYPE) {
    const buttonId = ControlMap[button]
    const state = BUTTON_STATE[stateType];
    instance.output.sendMessage([0b10010000, buttonId, state]);
}
=======
export function setControlButton(instance: XTouchControl, button: ControlType, stateType: BUTTON_STATE_TYPE) {
    const buttonId = ControlMap[button];
    const state = BUTTON_STATE[stateType];
    instance.sendMIDIMessage([0b10010000, buttonId, state]);
}
>>>>>>> c4da8e5e00d8b875e6a979c5c29fff4e1449a4fe
