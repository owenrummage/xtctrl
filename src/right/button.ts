import XTouchControl from '../index.js';
import { ControlMap, ControlType } from './buttonTypes.js';

export function setControlButton(instance: XTouchControl, button: ControlType, on: boolean) {
    const buttonId = ControlMap[button];
    const state = on ? 127 : 0;
    instance.sendMIDIMessage([0b10010000, buttonId, state]);
}
