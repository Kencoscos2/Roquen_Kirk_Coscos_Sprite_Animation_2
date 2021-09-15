class Background {
    constructor(imagePath, width, height) {
        this.image = new Image();
        this.image.src = imagePath;
        this.image.width = width;
        this.image.height = height;
        this.x1 = 0;
        this.x2 = this.image.width;
        this.minX = -this.image.width;
        this.speed = 1;
    }

    update() {
        this.x1 = this.x1 - this.speed;
        this.x2 = this.x2 - this.speed;

        if (this.x1 < this.minX){
            this.x1 = this.x2 + this.image.width

        }

        if (this.x2 < this.minX){
            this.x2 = this.x1 + this.image.width;

        }

    }

    draw() {
       
    context.drawImage(
           this.image, 
           this.x1, 0, 
           this.image.width, 
           this.image.height);
    context.drawImage(
           this.image, 
           this.x2, 0, 
           this.image.width, 
           this.image.height);
    }
}