let canvas = document.getElementById('canvas')
canvas.width = window.innerWidth * 0.7;
canvas.height = window.innerHeight * 0.9;
let context = canvas.getContext("2d");

const bg = new Background('Sprites/Bg/background.png', canvas.width, canvas.height);
const player = new Player(0, canvas.height*0.67)

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!player.isDead()) {
        bg.update();
    }
    
    bg.draw();

    if (player.isDead()) {
        player.update('dead')
        player.draw('dead')
    }

    else if (player.isPunching()) {
        player.update('punch')
        player.draw('punch')
    }

    else if (player.isJumping()) {
        player.update('jump')
        player.draw('jump')
    }

    else if (player.isFalling()) {
        player.update('fall')
        player.draw('fall')
    }

    else if (player.isWalking()) {
        player.update('walk')
        player.draw('walk')
    }

    else {
        player.update('idle')
        player.draw('idle')
    }











    // // background
    // if (!player.isDead && player.isMoving) {
    //     bg.update();
    // }

    // bg.draw();

    // // player
    // // if (player.x > (canvas.width*0.5)) {
    // //     player.isDead = true;
    // //     player.update('dead')
    // //     player.draw('dead')
    // // }

    // if (player.isMoving && !player.isDead) {
    //     player.update('walk')
    //     player.draw('walk')
    // }

    // else if (!player.isMoving && !player.isDead) {
    //     player.update('idle')
    //     player.draw('idle')
    // }

    

    requestAnimationFrame(animate);
}

animate()


document.addEventListener('keydown', key_down_listener)
document.addEventListener('keyup', key_up_listener)

function key_down_listener(event) {
    console.log('[hold]')
    player.move("keydown", event.key);
}

function key_up_listener(event) {
    console.log('[release]')
    player.move("keyup", event.key)
}