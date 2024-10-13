
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
    x: 50,
    y: canvas.height / 2,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0,
};

let arrows = [];
let targets = [];

function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function createTarget() {
    let target = {
        x: canvas.width - 100,
        y: Math.random() * (canvas.height - 50),
        width: 50,
        height: 50,
    };
    targets.push(target);
}

function drawTargets() {
    ctx.fillStyle = 'green';
    targets.forEach(target => {
        ctx.fillRect(target.x, target.y, target.width, target.height);
    });
}

function movePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

function shootArrow() {
    let arrow = {
        x: player.x + player.width,
        y: player.y + player.height / 2,
        width: 20,
        height: 5,
        speed: 10
    };
    arrows.push(arrow);
}

function drawArrows() {
    ctx.fillStyle = 'black';
    arrows.forEach((arrow, index) => {
        arrow.x += arrow.speed;
        ctx.fillRect(arrow.x, arrow.y, arrow.width, arrow.height);
        if (arrow.x > canvas.width) arrows.splice(index, 1);
    });
}

function checkCollision() {
    arrows.forEach((arrow, arrowIndex) => {
        targets.forEach((target, targetIndex) => {
            if (arrow.x < target.x + target.width &&
                arrow.x + arrow.width > target.x &&
                arrow.y < target.y + target.height &&
                arrow.y + arrow.height > target.y) {
                    arrows.splice(arrowIndex, 1);
                    targets.splice(targetIndex, 1);
                    createTarget();
            }
        });
    });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawPlayer();
    drawArrows();
    drawTargets();
    movePlayer();
    checkCollision();

    requestAnimationFrame(update);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w') {
        player.dy = -player.speed;
    }
    if (e.key === 'ArrowDown' || e.key === 's') {
        player.dy = player.speed;
    }
    if (e.key === ' ') {
        shootArrow();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w' ||
        e.key === 'ArrowDown' || e.key === 's') {
        player.dy = 0;
    }
});

createTarget();
update();
