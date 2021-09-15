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

        this.x = posX;
        this.y = posY;

        this.gameFrame = 0;
        this.frameSpeed = 2;

        //this.isMoving = false;
        this.isDead = false;

        this.isLeft = false;
        this.isRight = false;
        this.isPunch = false;

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
            }
        }
    }

    move(keyType, key) {
        if (keyType == "key_down") {
            

            if (key == "ArrowRight" && !this.isDead && this.x < (canvas.width/1.1)) {
                this.x = this.x + this.actions['walk'].speed;
               // this.isMoving = true;
                this.isRight = true;
            }
    
            else if (key == "ArrowLeft" && !this.isDead) {
                this.x = this.x - this.actions['Lwalk'].speed;
                //this.isMoving = true;
                this.isLeft = true;
            }

            else if (key == "ArrowDown" && !this.isDead && !this.isLeft && !this.Right){
                this.isPunch = true;
                this.actions['punch']

            }
        }
        
        else if (keyType == "key_up") {
            //this.isMoving = false;
            this.isPunch = false;
            this.isLeft = false;
            this.isRight = false;
            

            this.actions['idle']
        }

        

    }

    update(action) {
        // check if action exists in JSON
        // if (action in this.actions) {
        //     this.actions[action].frame_counter++;

        //     if (this.actions[action].frame_counter > this.actions[action].frame_limit) {
        //         this.actions[action].frame_counter = 0;
        //     }
        // }

        if (this.gameFrame % this.frameSpeed == 0) {
            if (action == "walk") {
                this.actions[action].frame_counter++;
    
                if (this.actions[action].frame_counter > 9) {
                    this.actions[action].frame_counter = 0;
                }
            }

            else if (action == "Lwalk") {
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

            else if (action == "punch") {
                this.actions[action].frame_counter++;

                if (this.actions[action].frame_counter > 9) {
                    this.actions[action].frame_counter = 0;
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