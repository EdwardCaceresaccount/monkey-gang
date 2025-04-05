const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,   // Set width to the browser window's width
    height: window.innerHeight, // Set height to the browser window's height
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    parent: 'game-container',   // Optional: If you want to attach it to a specific element
    scale: {
        mode: Phaser.Scale.RESIZE, // Automatically resize the game
    }
};

let player;
let npc;

let bullets = [];

let vx = 0;
let vy = 0;

let nx = 0;
let ny = 0;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('player', 'http://127.0.0.1:8080/src/image.png');
    this.load.image('bullet', 'http://127.0.0.1:8080/src/bullet.png');
    this.load.image('tree', 'http://127.0.0.1:8080/src/tree.png');
}

function create() {
    for(let j = 0; j < 2; j++){
        for(let i = 0; i < 5; i++){
            tree = this.add.image(400,300, 'tree');
            tree.x += (i * 250)
            tree.y += (j * 500)
        }
    }
    player = this.add.image(400, 300, 'player');
    npc = this.add.image(400, 300, 'player');
    npc.x = 500;
    npc.y = 500;
    this.input.keyboard.on('keydown-W', moveUp, this);
    this.input.keyboard.on('keydown-S', moveDown, this);
    this.input.keyboard.on('keydown-A', moveLeft, this);
    this.input.keyboard.on('keydown-D', moveRight, this);
    this.input.keyboard.on('keydown-SPACE', shoot, this);
}



function update() {
    player.x += vx;
    player.y += vy;

    npc.y += ny;
    npc.x += nx

    bullets = bullets.filter(bullet => {
        let bvx = bullet.getData('vx');
        let bvy = bullet.getData('vy');
    
        bullet.x += bvx * 5.0;
        bullet.y += bvy * 5.0;
    
        bullet.setData("lifetime", bullet.getData("lifetime") + 1);
    
        bullet.setData('vx', bvx * 0.99);
        bullet.setData('vy', bvy * 0.99);
    
        // If bullet is too old, destroy it and remove from array
        if (bullet.getData("lifetime") > 120) {
            bullet.destroy(); // remove from scene
            return false;     // remove from bullets array
        }
    
        return true; // keep bullet
    });


    //console.log(typeof(bullet.x));

    vx *= 0.9;
    vy *= 0.9;
    nx *= 0.9;
    ny *= 0.9;
    npcMovement();
}

function shoot() {
    let bullet = this.add.image(400, 300, 'bullet');

    bullet.x = player.x;
    bullet.y = player.y;

    // Calculate the direction vector (cursor - player)
    let dirX = this.input.activePointer.x - player.x;
    let dirY = this.input.activePointer.y - player.y;

    // Normalize the direction vector to make it a unit vector
    let length = Math.sqrt(dirX * dirX + dirY * dirY); // Calculate length
    if (length > 0) {
        dirX /= length;
        dirY /= length;
    }

    bullet.setData('vx', dirX + vx);
    bullet.setData('vy', dirY + vy);
    bullet.setData('lifetime', 0);

    bullets.push(bullet);
}

function moveUp() {
    vy -= 10;
}

function moveDown() {
    vy += 10;
}

function moveLeft() {
    vx -= 10;
}

function moveRight() {
    vx += 10;
}

function npcMovement(){
    function getRandomIntInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let myRandomNumber = getRandomIntInRange(-1, 1);

    nx += myRandomNumber;
    ny += getRandomIntInRange(-1, 1);
    

}