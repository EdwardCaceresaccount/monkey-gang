const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let player;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('player', 'https://phaser.io/images/docs/phaser3-logo.png');
}

function create() {
    player = this.add.image(400, 300, 'player');
    this.input.keyboard.on('keydown-W', moveUp, this);
    this.input.keyboard.on('keydown-S', moveDown, this);
    this.input.keyboard.on('keydown-A', moveLeft, this);
    this.input.keyboard.on('keydown-D', moveRight, this);
}

function update() {}

function moveUp() {
    player.y -= 10;
}

function moveDown() {
    player.y += 10;
}

function moveLeft() {
    player.x -= 10;
}

function moveRight() {
    player.x += 10;
}
