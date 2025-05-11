////////////////////////////////////////////////////
// XTouch Control Module
//
// Controls the XTouch MIDI device using the
// Mackie Control protocol.
//
//
// (c) Charmines and Owen Rummage 2025
////////////////////////////////////////////////////
import pkg, { Input as InputType, Output as OutputType } from "midi";
import { EventEmitter } from "events";
import { BUTTON_STATE_TYPE, BUTTON_TYPE, MODE_TYPE, setButton, setFader, setMeter, setPotentiometerLeds, LineType, setScreenChannel, setScreens, setScreensArray } from "./channel/index.js";
import { setControlButton, setTimecodeDisplay, ControlType } from "./right/index.js";
import { startInputListener } from "./input/index.js";
import { Controller, InputClass, OutputClass } from "./nmcontroller.js";
const { Output, Input } = pkg;

export default class XTouchControl extends EventEmitter {
    private output: OutputClass;
    private input: InputClass;
    private port: number = 0;
    private midi: boolean = true;

    constructor(port?: number, controller?: Controller) {
        super();

        // Non MiDi Controller
        if (controller !== undefined) {
            this.midi = false;
            this.output = controller.output;
            this.input = controller.input;
            startInputListener(this)
            return;
        }

        this.output = new Output();
        this.input = new Input();

        if (port !== undefined) {
            // Open the specified port
            this.openPort(port);
        } else {
            // Automatically find and open the X-Touch device
            this.findAndOpenDevice();
        }

        startInputListener(this)
    }

    private openPort(port: number) {
        this.output.openPort(port);
        this.input.openPort(port);
        this.port = port;
        console.log(`Opened X-Touch device on port ${port}: ${this.output.getPortName(port)}`);
    }

    private findAndOpenDevice() {
        let deviceFound = false;

        for (let i = 0; i < this.output.getPortCount(); i++) {
            const outputPortName = this.output.getPortName(i);
            if (outputPortName === "X-Touch") {
                this.output.openPort(i);
                this.port = i;
                console.log(`Opened output device on port ${i}: ${outputPortName}`);
                deviceFound = true;
                break;
            }
        }

        for (let i = 0; i < this.input.getPortCount(); i++) {
            const inputPortName = this.input.getPortName(i);
            if (inputPortName === "X-Touch") {
                this.input.openPort(i);
                this.port = i;
                console.log(`Opened input device on port ${i}: ${inputPortName}`);
                deviceFound = true;
                break;
            }
        }

        if (!deviceFound) {
            console.error("No X-Touch device found.");
        }
    }

    getPort() {
        return `Port ${this.port}: ${this.output.getPortName(this.port)}`;
    }

    channel(channel: number) {
        if (channel < 1 || channel > 9) {
            throw new Error("Channel must be between 1 and 9.");
        }

        return {
            setFader: (value: number) => setFader(this, channel, value),
            setButton: (button: BUTTON_TYPE, state: BUTTON_STATE_TYPE) => setButton(this, channel, button, state),
            setPotentiometerLeds: (modeType: MODE_TYPE, value: number, led: boolean = false) =>
                setPotentiometerLeds(this, channel, modeType, value, led),
            setMeter: (value: number) => setMeter(this, channel, value),
            setScreen: (lineType: LineType, message: string) => setScreenChannel(this, channel, lineType, message),
        };
    }

    screens() {
        return {
            setScreens: (value: string) => setScreens(this, value),
            setScreensArray: (array: string[], start = 0) => setScreensArray(this, array, start),
        }
    }

    right() {
        return {
            setControlButton: (button: ControlType, on: boolean) => setControlButton(this, button, on),
            setTimecodeDisplay: (display: number, character: string, dot: boolean = false) => setTimecodeDisplay(this, display, character, dot)
        }
    }
}