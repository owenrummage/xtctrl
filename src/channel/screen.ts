import { padString, stringToCharArray } from "../utils.js";
import { Channels } from "./index.js";

export type LineType = "TOP" | "BOTTOM"
enum Lines {
    TOP,
    BOTTOM
}

function setScreen(instance: any, line: number, message: string) {
    const cleanMessage = padString(message)
    // const paddedMessages = messages.map(msg => msg.padEnd(7, ' ').slice(0, 7));
    // const combinedMessage = paddedMessages.join('');
    const messageArray = stringToCharArray(cleanMessage);

    const lineO = line*7

    const header = [0xf0, 0x00, 0x00, 0x66, 0x14, 0x12];
    const footer = [0xf7];
    const fullMessage = [...header, ...[lineO], ...messageArray, ...footer];
    instance.output.sendMessage(fullMessage);
}

export function setScreenChannel(instance: any, channel: Channels, lineType: LineType, message: string){
    const line = Lines[lineType]
    let sChannel = channel - 1

    if(channel <= 0 || channel >= 9){
        throw new Error("Channel must be between 1 and 8. Main channel has no screen.");
    }

    if (line === Lines.BOTTOM) sChannel += 8

    setScreen(instance, sChannel, message)
}

export function setScreens(instance: any, value = ""){
    for (let i = 0; i<16; i++){
        setScreen(instance, i, value)
    }
}

export function setScreensArray(instance: any, array: string[], start = 0){
    let i = start
    for(const item of array){
        setScreen(instance, i, item)
        i++
    }
}