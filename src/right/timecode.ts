import XTouchControl from '../index.js';

export function setTimecodeDisplay(instance: XTouchControl, display: number, character: string, dot: boolean) {
    if (display <= -1 || display >= 12) {
        throw new Error('Display must be between 0 and 11.');
    }

    const charCode = character.charCodeAt(0);
    const last6Bits = (charCode & 0b00111111).toString(2).padStart(6, '0');
    const out = Number('0b0' + (dot ? '1' : '0') + last6Bits);
    const displayId = 0x40 + display;

    instance.sendMIDIMessage([0b10110000, displayId, out]);
}
