import { MidiCallback, MidiMessage } from 'midi';
import XTouchController from './src/index';
import { Controller, InputType, OutputType } from './src/nmcontroller';

// class MyController implements Controller {
//     output: OutputType = {
//         closePort: function (): void {
//             throw new Error('Function not implemented.');
//         },
//         getPortCount: function (): number {
//             throw new Error('Function not implemented.');
//         },
//         getPortName: function (port: number): string {
//             throw new Error('Function not implemented.');
//         },
//         openPort: function (port: number): void {
//             throw new Error('Function not implemented.');
//         },
//         openVirtualPort: function (port: string): void {
//             throw new Error('Function not implemented.');
//         },
//         send: function (message: MidiMessage): void {
//             throw new Error('Function not implemented.');
//         },
//         sendMessage: function (message: MidiMessage): void {
//             console.log("NM SM:", message)
//         }
//     };
//     input: InputType = {
//         closePort: function (): void {
//             throw new Error('Function not implemented.');
//         },
//         getPortCount: function (): number {
//             throw new Error('Function not implemented.');
//         },
//         getPortName: function (port: number): string {
//             throw new Error('Function not implemented.');
//         },
//         ignoreTypes: function (sysex: boolean, timing: boolean, activeSensing: boolean): void {
//             throw new Error('Function not implemented.');
//         },
//         openPort: function (port: number): void {
//             throw new Error('Function not implemented.');
//         },
//         openVirtualPort: function (port: string): void {
//             throw new Error('Function not implemented.');
//         },
//         on: function (_event: 'message', callback: MidiCallback) {
//             setInterval(() => {
//                 callback(1, [144, 78, 127])
//             }, 1000)
//         }
//     };
// }

const controller = new XTouchController()//0, new MyController);


let page = 0;

controller.right().setControlButton("F2", true)
controller.right().setTimecodeDisplay(10, "I")

// controller.on("message", (data) => {
//     console.log("MIDI message received:", data); 

//        // Fader Bank left
//         if(data.message[0] == 144 && data.message[1] == 46 && data.message[2] == 127){
//             console.log(`Page down: ${page}`)
//             page--;
//             setPages()   

//         // Fader Bank right
//         }else if(data.message[0] == 144 && data.message[1] == 47 && data.message[2] == 127){
//             console.log(`Page up: ${page}`)
//             page++;
//             setPages()
//         }
// });

controller.on("keyDown", (key) => {
    console.log(`Key down: ${key.action} - ${key.state}`);
    if (key.action == "BankLeft") {
        console.log(`Page down: ${page}`)
        page--;
        setPages()
    } else if (key.action == "BankRight") {
        console.log(`Page up: ${page}`)
        page++;
        setPages()
    }
})

controller.on("keyUp", (key) => {
    console.log(`Key up: ${key.action} - ${key.state}`);

})

controller.on("encoderRight", (key) => {
    console.log(`E Right: ${key}`);
})

controller.on("encoderLeft", (key) => {
    console.log(`E left: ${key}`);

})

controller.on("encoderMove", (key) => {
    console.log(`E move: ${key[0]} - ${key[1]}`);

})

let globalState = {}

controller.on("channelAction", (messsage) => {
    console.log(`Channel Action: ${messsage.state} - ${messsage.action} - ${messsage.channel + 1}`);

    if (messsage.action == "record" && messsage.state == "keyDown") {
        globalState[`${messsage.action}${messsage.channel}`] = !globalState[`${messsage.action}${messsage.channel}`];
        controller.channel(messsage.channel + 1).setButton("REC", globalState[`${messsage.action}${messsage.channel}`] ? "BLINK" : "OFF");
    }
})

controller.on("fade", (key) => {
    console.log(`Fade: ${key[0]} - ${key[1]}`);
})

function setPages() {
    for (let i = 1; i < 9; i++) {
        controller.channel(i).setScreen("TOP", `${page == 0 ? "Out" : "In"}: ${i} `);
        controller.channel(i).setScreen("BOTTOM", `${page == 0 ? "Discord" : "Spotify"} `);
    }
}

// while (true) {
//     for (let i = 0; i < 127; i++) {
//         controller.channel(3).setFader(i);
//         await new Promise(resolve => setTimeout(resolve, 10));
//     }
// }


// Keep the process alive
setInterval(() => { }, 1000);


setPages()
