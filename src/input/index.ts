import { ControlMap } from "../right/index.js";
import { Events } from "./events.js";

export function startInputListener(instance: any) {
    // Listen for MIDI input messages and emit events
    instance.input.on("message", (deltaTime: number, message: number[]) => {
        instance.emit("message", { deltaTime, message });

        const eventsMessage = message.join(",")
        // console.log("Input event:", eventsMessage)

        if (message[0] === 144 && (message[1] in ControlMap)) {
            // Button Event for Right Side
            const button = ControlMap[message[1]]
            let action = "None"
            if (message[2] === 127) {
                action = "keyDown"
            } else if (message[2] === 0) {
                action = "keyUp"
            } else {
                action = "button_" + message[2]
            }

            instance.emit(action, {
                state: action,
                action: button
            })
        } else if (message[0] == 144) {
            let actionType = "";
            if (message[1] >= 0 && message[1] <= 7) {
                actionType = "record";
            } else if (message[1] >= 8 && message[1] <= 15) {
                actionType = "solo";
            } else if (message[1] >= 16 && message[1] <= 23) {
                actionType = "mute";
            } else if (message[1] >= 24 && message[1] <= 31) {
                actionType = "select";
            } else if (message[1] >= 32 && message[1] <= 39) {
                actionType = "potentiometer"
            }

            const channel = message[1] % 8
            const state = message[2] === 127 ? "keyDown" : "keyUp"

            instance.emit("channelAction", { state, action: actionType, channel });
        } else if (eventsMessage in Events) { // Mapped Events
            const event = Events[eventsMessage];
            instance.emit(...event)
        } else if (message[0] === 176) { // Encoder Moving
            const channel = message[1] - 15
            const secondDigit = (message[2] >> 6) & 1;
            const dir = (secondDigit === 1) ? "left" : "right"

            instance.emit("encoderMove", { channel, direction: dir })
        } else if ((224 <= message[0]) && (message[0] <= 232)) { // Fader Moving
            const channel = message[0] - 223
            const value = message[2]

            instance.emit("fade", { channel, value })
        } else {
            console.log("Input event not implemented:", message)
        }
    });
}