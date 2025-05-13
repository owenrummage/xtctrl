import { MidiMessage } from 'midi';
import XTouchControl from '../index.js';
import { Channels } from './index.js';
const states = ['0', '1', '3', '5', '7', '9', 'b', 'd', 'e'];

export function setMeter(instance: XTouchControl, channel: Channels, value: number) {
    const binValue = Number('0x' + (channel - 1).toString() + states[value]);
    instance.sendMIDIMessage([0xd0, binValue] as unknown as MidiMessage);
}
