import XTouchControl from '../index.js';
import { Channels } from './index.js';

const midiChannel = 0b10010000;

export type BUTTON_TYPE = 'REC' | 'SOLO' | 'MUTE' | 'SEL';
export type BUTTON_STATE_TYPE = 'OFF' | 'BLINK' | 'SOLID';

enum BUTTON {
    REC = 0,
    SOLO = 8,
    MUTE = 16,
    SEL = 24
}

enum BUTTON_STATE {
    OFF = 0x00,
    BLINK = 0x01,
    SOLID = 0x02
}

export function setButton(instance: XTouchControl, channel: Channels, buttonType: BUTTON_TYPE, stateType: BUTTON_STATE_TYPE) {
    if (channel < Channels.One || channel > Channels.Eight) {
        throw new Error('Channel must be between 1 and 8. Main channel has no buttons.');
    }

    const button = BUTTON[buttonType];
    const state = BUTTON_STATE[stateType];

    const buttonOut = button + channel - 1; // Get the button, add the channel number, subtract 1 to line up channels

    instance.sendMIDIMessage([midiChannel, buttonOut, state]);
}
