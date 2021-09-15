let canvas = document.getElementById('canvas')
canvas.width = window.innerWidth * 0.7;
canvas.height = window.innerHeight * 0.9;
let context = canvas.getContext("2d");

const bg = new Background('Sprites/Bg/background.png', canvas.width, canvas.height);
const player = new Player(0, canvas.height*0.67)

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    
    // background
    if (!player.isDead && player.isMoving) {
        bg.update();
    }

    else if (!player.isDead && player.isRight) {
        bg.update();
    }
    else if (!player.isDead && player.isLeft) {
        bg.update();
    }

    bg.draw();

    //player
    if (player.x > (canvas.width*0.5)) {
        player.isDead = true;
        player.update('dead')
        player.draw('dead')
    }

    if (player.isRight && !player.isDead && !player.Punch) {
        player.update('walk')
        player.draw('walk')
    }

    else if (player.isLeft && !player.isDead && !player.Punch){
        player.update('Lwalk')
        player.draw('Lwalk')

    }

    else if (!player.isMoving && !player.isDead && !player.Punch) {
        player.update('idle')
        player.draw('idle')
    }

    else if (!player.isLeft && !player.isRight && !player.isDead && player.isPunch) {
        player.update('punch')
        player.draw('punch')
    }

    requestAnimationFrame(animate);
}

animate()


document.addEventListener('keydown', key_down_listener)
document.addEventListener('keyup', key_up_listener)

function key_down_listener(event) {
    console.log('hold')
    player.move("key_down", event.key);
}

function key_up_listener(event) {
    console.log('release')
    player.move("key_up", event.key)
}