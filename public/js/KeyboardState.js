const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor() {
        // holds the current state of a given key
        this.keyStates = new Map();

        // holds the callback function for a key code
        this.keyMap = new Map();
    }

    addMapping(keyCode, callback) {
        this.keyMap.set(keyCode, callback);
    }

    handleEvent(event) {
        const {keyCode} = event;

        if (!this.keyMap.has(keyCode)) {
            // did not have mapped
            return false;
        }

        event.preventDefault();

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        if(this.keyStates.get(keyCode) === keyState) {
            return;
        }

        this.keyStates.set(keyCode, keyState);
        console.log(this.keyStates);

        this.keyMap.get(keyCode)(keyState);
    }

    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            });  
        });
    }
}