# xtctrl
This module allows you to control and [Behringer X-Touch](https://www.behringer.com/product.html?modelCode=0808-AAD) with MIDI using NodeJS


# How it works
```ts
import XTouchController from 'xtctrl';


const controller  = new XTouchController()

// Set fader on channel 7 to 100%
controller.channel(7).setFader(100)
```

## Outputs
-- This only includes left side functions excluding the main flip button --
- [x] Set faders value per channel
- [x] Set LCD
    - [x] Set each screen line per channel
- [x] Set Rec, Solo, Mute, Select buttons per channel
- [x] Set VU Meter per channel
- [x] Set Potentiometer Leds per channel
 
 





 

 
 
 
 