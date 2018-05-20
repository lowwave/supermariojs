import {loadLevel} from './loaders.js'
import {loadMarioSprite, loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer} from './layers.js';
import Compositor from './Compositor.js';


const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function createSpriteLayer (sprites, pos) {
    return function drawSpriteLayer(context) {
        for (let i = 0; i < 20; ++i) {
            sprite.draw('idle', context, pos.x * i * 16, pos.y)
        }
        sprites.draw('idle', context, pos.x, pos.y)
    }
}

Promise.all([
    loadBackgroundSprites(),
    loadMarioSprite(),
    loadLevel('1-1')
])
.then(([marioSprite, backgroundSprites,  level]) => {
    const comp = new Compositor()

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites)
    comp.layers.push(backgroundLayer)

    const pos = {
        x: 0,
        y: 0
    }

    const spriteLayer = createSpriteLayer(marioSprite, pos)
    comp.layers.push(spriteLayer)

    function update() {
        comp.draw(context)
        pos.x += 1
        pos.y += 2 
        requestAnimationFrame(update)
    }

    update()
})