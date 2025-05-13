import { MidiMessage } from 'midi';
import XTouchControl from '../index.js';
import { padString, stringToCharArray } from '../utils.js';
import { Channels } from './index.js';

export type LineType = 'TOP' | 'BOTTOM';
enum Lines {
    TOP,
    BOTTOM
}

function setScreen(instance: XTouchControl, line: number, message: string) {
    const cleanMessage = padString(message);
    // const paddedMessages = messages.map(msg => msg.padEnd(7, ' ').slice(0, 7));
    // const combinedMessage = paddedMessages.join('');
    const messageArray = stringToCharArray(cleanMessage);

    const lineO = line * 7;

    const header = [0xf0, 0x00, 0x00, 0x66, 0x14, 0x12];
    const footer = [0xf7];
    const fullMessage = [...header, ...[lineO], ...messageArray, ...footer];
    instance.sendMIDIMessage(fullMessage as MidiMessage);
}

export function setScreenChannel(instance: XTouchControl, channel: Channels, lineType: LineType, message: string) {
    const line = Lines[lineType];
    let sChannel = channel - 1;

    if (channel <= Channels.One || channel >= Channels.MAIN) {
        throw new Error('Channel must be between 1 and 9.');
    }

    if (line === Lines.BOTTOM) sChannel += 8;

    setScreen(instance, sChannel, message);
}

export function setScreens(instance: XTouchControl, value = '') {
    for (let i = 0; i < 16; i++) {
        setScreen(instance, i, value);
    }
}

export function setScreensArray(instance: XTouchControl, array: string[], start = 0) {
    let i = start;
    for (const item of array) {
        setScreen(instance, i, item);
        i++;
    }
}
