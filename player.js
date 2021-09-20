class Player {
    constructor(posX, posY) {
        this.spritesheet_walk = new Image();
        this.spritesheet_walk.src = "Sprites/player/png/2run/run.png";

        this.spritesheet_Lwalk = new Image();
        this.spritesheet_Lwalk.src = "Sprites/player/png/2run/fliprun.png";

        this.spritesheet_dead = new Image();
        this.spritesheet_dead.src = "Sprites/player/png/3dead/dead.png";

        this.spritesheet_idle = new Image();
        this.spritesheet_idle.src = "Sprites/player/png/1idle/idle.png";

        this.spritesheet_punch = new Image();
        this.spritesheet_punch.src = "Sprites/player/png/attack/punch.png";

        this.spritesheet_jump = new Image();
        this.spritesheet_jump.src = "Sprites/player/png/4jump/jump.png";

        this.spritesheet_fall = new Image();
        this.spritesheet_fall.src = "Sprites/player/png/glide/fall.png";

        this.x = posX;
        this.y = posY;
        this.imageWidth = canvas.width * 0.08
        this.imageHeight = canvas.height * 0.2

        this.gameFrame = 0;
        this.frameSpeed = 2;

        this.movement = {
            LEFT : false,
            RIGHT : false,
            JUMP : false,
            FALL : false,
            PUNCH : false
        }

        this.keyCodes = {
            UP : "ArrowUp",
            LEFT : "ArrowLeft",
            RIGHT : "ArrowRight",
            DOWN : "ArrowDown"
        }

        this.actions = {
            'walk' : {
                'spritesheet' : this.spritesheet_walk,
                'frame_counter' : 0,
                'spriteWidth' : 367,
                'speed' : 5,
                'frame_limit' : 8
            },

            'Lwalk' : {
                'spritesheet' : this.spritesheet_Lwalk,
                'frame_counter' : 0,
                'spriteWidth' : 365,
                'speed' : 5,
                'frame_limit' : 8
            },
            
            'idle' : {
                'spritesheet' : this.spritesheet_idle,
                'frame_counter' : 0,
                'spriteWidth' : 234,
                'frame_limit' : 8
            },

            'dead' : {
                'spritesheet' : this.spritesheet_dead,
                'frame_counter' : 0,
                'spriteWidth' : 485,

            },

            'punch' : {
                'spritesheet' : this.spritesheet_punch,
                'frame_counter' : 0,
                'spriteWidth' : 537,
                'speed' : 5,
            },

            'jump' : {
                'spritesheet' : this.spritesheet_jump,
                'frame_counter' : 0,
                'spriteWidth' : 364,
                'jump_limit' : 100,
                'position' : 0
            },

            'fall' : {
                'spritesheet' : this.spritesheet_fall,
                'frame_counter' : 0,
                'spriteWidth' : 445,
                'fall_limit' : 0,
                'position' : 100 
            }
        }
    }

    move(keyType, key) {
        console.log(key)

        // when player holds the key
        if (keyType == "keydown") {
            if (key == this.keyCodes.RIGHT) {
                this.movement.RIGHT = true;
            }

            if (key == this.keyCodes.LEFT) {
                this.movement.LEFT = true;  
            }

            if (key == this.keyCodes.UP) {
                this.movement.JUMP = true
                this.keyCodes.UP = false;
                return this.keyCodes.UP = true;
            }

            if (key == 'z') {
                this.movement.PUNCH = true
            }
        }

        // when the player releases the key
        if (keyType == "keyup") {
            if (key == this.keyCodes.RIGHT) {
                this.movement.RIGHT = false;
            }

            if (key == this.keyCodes.LEFT) {
                this.movement.LEFT = false
            }
        }
    }

    isWalking() {
        if (this.movement.RIGHT || this.movement.LEFT) {
            return true;
        }

        else {
            return false;
        }
    }

    isDead() {
        if (this.x + this.imageWidth >= canvas.width) {
            return true
        }

        else {
            return false
        }
    }

    isPunching() {
        // return this.movement.PUNCH

        if (this.movement.PUNCH) {
            return true
        }

        else {
            return false
        }
    }

    isJumping() {
        return this.movement.JUMP
        
    }

    isFalling() {
        return this.movement.FALL
    }

    update(action) {
        if (this.gameFrame % this.frameSpeed == 0) {
            // movements
            if (!this.isDead()) {
                if (this.movement.RIGHT ) {
                    this.x = this.x + this.actions.walk.speed
                }
    
                else if (this.movement.LEFT) {
                    this.x = this.x - this.actions['walk'].speed
                }
    
                if (this.movement.JUMP) {
                    this.y = this.y - 10
                    this.actions.jump.position = this.actions.jump.position + 10;
                    
                    if (this.actions.jump.position >= this.actions.jump.jump_limit) {
                        this.actions.jump.position = 0;
                        this.movement.JUMP = false;
                        this.movement.FALL = true;
                    }
                    
                
                }
                

                else if (this.movement.FALL) {
                    this.y = this.y + 10
                    this.actions.fall.position = this.actions.fall.position - 10
                    
                    if (this.actions.fall.position <= this.actions.fall.fall_limit) {
                        this.actions.fall.position = 100;
                        this.movement.FALL = false;
                    }
                }
            }

            if (action == "walk") {
                this.actions[action].frame_counter++;
    
                if (this.actions[action].frame_counter > 9) {
                    this.actions[action].frame_counter = 0;
                }
            }
    
            else if (action == "idle") {
                this.actions[action].frame_counter++;
    
                if (this.actions[action].frame_counter > 9) {
                    this.actions[action].frame_counter = 0;
                }
            }

            else if (action == "dead") {
                this.actions[action].frame_counter++;

                if (this.actions[action].frame_counter > 9) {
                    this.actions[action].frame_counter = 9;
                }
            }

            else if (action == 'punch') {
                this.actions.punch.frame_counter++;

                if (this.actions.punch.frame_counter > 9) {
                    this.actions.punch.frame_counter = 0;
                    this.movement.PUNCH = false
                }
            }

            else if (action == 'jump') {
                this.actions.jump.frame_counter++;

                if (this.actions.jump.frame_counter > 9) {
                    this.actions.jump.frame_counter = 0;
                }
            }

            else if (action == "fall") {
                this.actions.fall.frame_counter++;

                if (this.actions.fall.frame_counter > 9) {
                    this.actions.fall.frame_counter = 0;
                }
            }
        }

        this.gameFrame++;
    }

    draw(action) {
        // drawImage(image object, x-coord, y-coord, width, height)
        // context.drawImage(this.actions[action].spritesheet, this.x, this.y, canvas.width, canvas.height*0.2)

        context.drawImage(
            this.actions[action].spritesheet, 
            this.actions[action].frame_counter*this.actions[action].spriteWidth, 
            0, 
            this.actions[action].spriteWidth, 
            this.actions[action].spritesheet.height, 
            this.x, 
            this.y, 
            canvas.width*0.08, 
            canvas.height*0.2
        )
    }
}