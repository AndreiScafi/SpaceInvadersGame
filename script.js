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
canvas.width = 1024;
canvas.height = 576;

// Create a player:
class Player {
    constructor() {

        this.velocity = {
            x: 0,
            y: 0
        }

        //spinning player animation
        this.rotation = 0;

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

        //Rotation function:
        c.save();
        c.translate(
            player.position.x + player.width / 2,
            player.position.y + player.height / 2
        );

        c.rotate(this.rotation);

        //Returning canvas to original position
        c.translate(
            -player.position.x - player.width / 2,
            -player.position.y - player.height / 2
        );

        //Draw function:
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height);

        c.restore()//Rotation function

    }

    //Moving the Player:
    update() {
        //Draw the image only if it has been loaded:
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x;
        }
    }

}

//Creating a Projectile:
class Projectile {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;

        this.radius = 3;
    }

    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = 'red';
        c.fill();
        c.closePath();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

// Create an invader:
class Invader {
    constructor({ position }) {

        this.velocity = {
            x: 0,
            y: 0
        }

        //import image
        const image = new Image();
        image.src = './Assets/invader.png'
        //Loading image
        image.onload = () => {
            const scale = 1;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;

            //Positioning the invader:
            this.position = {
                x: position.x,
                y: position.y
            }
        }


    }

    draw() {

        //Draw function:
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height);


    }
    //Moving the Invader:
    update({ velocity }) {
        //Draw the image only if it has been loaded:
        if (this.image) {
            this.draw();
            this.position.x += velocity.x;
            this.position.y += velocity.y;
        }
    }

}
//Creating a Grid:
class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 3,
            y: 0
        }

        this.invaders = []

        const columns = Math.floor(Math.random() * 10 + 5)//Range of columns
        const rows = Math.floor(Math.random() * 5 + 2)//Range of rows

        this.width = columns * 30;

        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                this.invaders.push(new Invader({
                    position: {
                        x: x * 30,
                        y: y * 30
                    }
                }))
            }
        }
    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.velocity.y = 0;

        if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x;
            this.velocity.y = 30;
        }
    }
}

const player = new Player();
const projectiles = [];
const grids = [];


//Control preset:
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

//Spawn more Grids
let frames = 0;
let randomInterval = Math.floor((Math.random() * 500) + 500);

// Loading the animate:
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'black'; // painting canvas black
    c.fillRect(0, 0, canvas.width, canvas.height) // painting whole canvas black;
    player.update();
    //Projectiles:
    projectiles.forEach((projectile, index) => {
        //Erase projectiles off screen:
        if (projectile.position.y + projectile.radius <= 0) {
            //Flash projectile bug fix
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0)
        } else {
            projectile.update()
        }
    })

    // Invaders Grids:
    grids.forEach(grid => {
        grid.update()
        grid.invaders.forEach((invader) => {
            invader.update({ velocity: grid.velocity });
        })
    })

    //keys response
    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -8;
        player.rotation = -0.15;
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 8;
        player.rotation = 0.15;
    } else {
        player.velocity.x = 0;
        player.rotation = 0;
    }

    //Add more grids of enemies:
    if (frames % randomInterval === 0) {
        grids.push(new Grid());
        randomInterval = Math.floor((Math.random() * 500) + 500);
        frames = 0;
    }

    frames++

}


animate();

//Move the player
addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'a':
            keys.a.pressed = true
            break; a
        case 'd':
            keys.d.pressed = true
            break;
        case ' ':
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x + player.width / 2,
                    y: player.position.y
                },
                velocity: {
                    x: 0,
                    y: -10
                }
            }))
            //console.log(projectiles);
            break;
    }
})

//Reset the keys:
addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'a':
            keys.a.pressed = false
            break;
        case 'd':
            player.velocity.x = 5;
            keys.d.pressed = false
            break;
        case ' ':

            break;
    }
})