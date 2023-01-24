/* Code provide by Criss Courses Youtube Channel - https://www.youtube.com/watch?v=MCVU0w73uKI */

/*
01 - Project setup;
02 - Create a player;
03 - Move the player;
04 - Create projectiles;
05 - Create an invader;
06 - Create and move grids of invaders;
07 - Spawn grids at intervals;
08 - Shoot invaders;
09 - Invaders shoot back;
10 - Enemy explosions;
11 - Create background stars;
12 - Lose condition;
13 - Score;
14 - Fixed-width canvas.
*/

// Create a canvas:
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Canvas fills the whole window:
canvas.width = innerWidth;
canvas.height = innerHeight;

// Create a player:
class Player {
    constructor() {

        this.velocity = {
            x: 0,
            y: 0
        }

        //import image
        const image = new Image();
        image.src = './Assets/spaceship.png'
        //Loading image
        image.onload = () => {
            const scale = 0.15;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;

            //Positioning the player:
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }
        }
        
  
    }

    draw() {
        //c.fillStyle = 'red';
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)
        //Draw the image only if it has been loaded:
        if (this.image) {
            c.drawImage(
                this.image, 
                this.position.x, 
                this.position.y, 
                this.width, 
                this.height);
        }
        }

}

const player = new Player();

// Loading the animate:
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'black'; // painting canvas black
    c.fillRect(0,0, canvas.width, canvas.height) // painting whole canvas black;
    player.draw();
}

animate();