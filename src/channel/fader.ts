import XTouchControl from '../index.js';
import { convert_to_14_bit_integer } from '../utils.js';
import { Channels } from './index.js';

export async function setFader(instance: XTouchControl, channel: Channels, value: number) {
    if (value < 0 || value > 127) {
        throw new Error('Value must be between 0 and 127.');
    }

    const pb = await convert_to_14_bit_integer(value);

    instance.sendMIDIMessage([223 + channel, pb[0], pb[1]]);
    console.log(`Set fader on channel ${channel.toString()} to value ${value.toString()}`);
}
