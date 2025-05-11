# Non-Midi Controllers
You can add non-midi controllers to this library with a custom class. This can be useful for making something like a websocket connection to 1 or multiple wireless/non-wireless controllers or for just testing the module. See the example code below to implement. 

The main functions are the output sendMessage and the input on. These are what actually interface with the module by default.
The module does have support for autoselecting a single xtouch or manually selecting a midi port. These selections will use the other functions.

```ts
import { MidiCallback, MidiMessage } from 'midi';
import XTouchController from './src/index';
import { Controller, InputType, OutputType } from './src/nmcontroller';

class MyController implements Controller {
    output: OutputType = {
        closePort: function (): void {
            throw new Error('Function not implemented.');
        },
        getPortCount: function (): number {
            throw new Error('Function not implemented.');
        },
        getPortName: function (port: number): string {
            throw new Error('Function not implemented.');
        },
        openPort: function (port: number): void {
            throw new Error('Function not implemented.');
        },
        openVirtualPort: function (port: string): void {
            throw new Error('Function not implemented.');
        },
        send: function (message: MidiMessage): void {
            throw new Error('Function not implemented.');
        },
        sendMessage: function (message: MidiMessage): void {
            console.log("NM SM:", message)
        }
    };
    input: InputType = {
        closePort: function (): void {
            throw new Error('Function not implemented.');
        },
        getPortCount: function (): number {
            throw new Error('Function not implemented.');
        },
        getPortName: function (port: number): string {
            throw new Error('Function not implemented.');
        },
        ignoreTypes: function (sysex: boolean, timing: boolean, activeSensing: boolean): void {
            throw new Error('Function not implemented.');
        },
        openPort: function (port: number): void {
            throw new Error('Function not implemented.');
        },
        openVirtualPort: function (port: string): void {
            throw new Error('Function not implemented.');
        },
        on: function (_event: 'message', callback: MidiCallback) {
            setInterval(() => {
                callback(1, [1, 2, 3])
            }, 1000)
        }
    };
}

const controller = new XTouchController(0, new MyController);
```