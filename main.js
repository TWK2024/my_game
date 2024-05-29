const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let player = { x: 50, y: 50, width: 50, height: 50, color: 'blue' };
let obstacles = [
    { x: 200, y: 200, width: 50, height: 50, color: 'red' },
    { x: 400, y: 400, width: 50, height: 50, color: 'red' }
];
let goal = { x: 700, y: 500, width: 50, height: 50, color: 'green' };
let score = 0;

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function drawGoal() {
    ctx.fillStyle = goal.color;
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
}

function checkCollisions() {
    obstacles.forEach(obstacle => {
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
                alert('Collision!');
                resetPlayer();
        }
    });
}

function checkGoal() {
    if (player.x < goal.x + goal.width &&
        player.x + player.width > goal.x &&
        player.y < goal.y + goal.height &&
        player.y + player.height > goal.y) {
            score++;
            alert('You reached the goal! Score: ' + score);
            resetPlayer();
    }
}

function resetPlayer() {
    player.x = 50;
    player.y = 50;
}

document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            player.y -= 10;
            break;
        case 'ArrowDown':
            player.y += 10;
            break;
        case 'ArrowLeft':
            player.x -= 10;
            break;
        case 'ArrowRight':
            player.x += 10;
            break;
    }
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
    drawGoal();
    checkCollisions();
    checkGoal();
    requestAnimationFrame(gameLoop);
}

gameLoop();
