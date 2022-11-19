/**
* @title Snake Game
* @description Traditional Snake Game where you try to collect the yellow blocks without leaving the map or hitting yourself. Use WASD or Arrow keys to move.
* @tags [games]
* @weight 1
*/
import { Interactive, getScriptName } from '../../index.js';
/**
 * dp is the size of the squares of the snake. THE WIDTH AND HEIGHT OF
 * THE INTERACTIVE MUST BE MULTIPLES OF DP
 */
let dp = 40;
let horizontal = true;
let vertical = false;
let direction = 'r';
let score = 0;
let interval = 0;
let snake = [];
let point;
let interactive = new Interactive(getScriptName());
interactive.height = 360;
interactive.border = true;
let background = interactive.rectangle(0, 0, interactive.width, interactive.height);
background.style.fill = '#92cf55';
let scoreLabel = interactive.text(10, 25, "Score: ");
scoreLabel.root.setAttribute('font-weight', 'bold');
scoreLabel.root.setAttribute('font-size', '20');
let pointsLabel = interactive.text(80, 27, score.toString());
pointsLabel.root.setAttribute('font-size', '20');
pointsLabel.root.setAttribute('font-weight', 'bold');
let gameOverText = interactive.text(interactive.width / 2 - 140, interactive.height / 2, "Game Over");
gameOverText.root.setAttribute('font-size', '50');
gameOverText.root.setAttribute('font-weight', 'bold');
gameOverText.style.fill = 'red';
let restartButton = interactive.button(interactive.width / 2 - 50, interactive.height / 2 + 50, "Restart");
restartButton.onclick = function (event) {
    startGame();
};
/**
 * hooking up the keys(WASD or arrow keys) to the game
 */
window.onkeydown = function (event) {
    if (event.keyCode === 87 || event.keyCode === 38 || event.keyCode === 83 || event.keyCode === 40) {
        if (!vertical) {
            if (event.keyCode === 87 || event.keyCode === 38) {
                direction = 'u';
            }
            else if (event.keyCode === 83 || event.keyCode === 40) {
                direction = 'd';
            }
        }
        vertical = true;
        horizontal = false;
    }
    if (event.keyCode === 68 || event.keyCode === 39 || event.keyCode === 65 || event.keyCode === 37) {
        if (!horizontal) {
            if (event.keyCode === 68 || event.keyCode === 39) {
                direction = 'r';
            }
            else if (event.keyCode === 65 || event.keyCode === 37) {
                direction = 'l';
            }
        }
        vertical = false;
        horizontal = true;
    }
};
startScreen();
/**
 * HELPER METHODS BELOW ----------------------------------------------------------------------------------------------
 */
/**
 * Returns a random int beween min and max
 * The maximum is exclusive and the minimum is inclusive
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
/**
 * sets up the start screen
 */
function startScreen() {
    gameOverText.contents = "Snake";
    gameOverText.x = interactive.width / 2 - gameOverText.getBoundingBox().width / 2;
    restartButton.label.contents = "Start";
    gameOverText.root.removeAttribute('visibility');
    restartButton.root.removeAttribute('visibility');
}
/**
 * starts the game of snake
 */
function startGame() {
    while (snake.length > 0) {
        interactive.root.getElementById(snake[0].id).remove();
        snake.shift();
    }
    snake.push(interactive.rectangle(0, 0, dp, dp));
    snake.push(interactive.rectangle(dp, 0, dp, dp));
    snake.push(interactive.rectangle(dp * 2, 0, dp, dp));
    snake[0].style.fill = 'blue';
    snake[0].style.stroke = 'black';
    snake[1].style.fill = 'white';
    snake[1].style.stroke = 'black';
    snake[2].style.fill = 'red';
    snake[2].style.stroke = 'black';
    pointsLabel.style.fill = 'black';
    scoreLabel.style.fill = 'black';
    point = interactive.rectangle(400, dp, dp, dp);
    point.style.fill = '#ffd000';
    point.style.stroke = 'black';
    point.style.strokeWidth = 5;
    background.style.fill = '#92cf55';
    gameOverText.root.setAttribute('visibility', 'hidden');
    restartButton.root.setAttribute('visibility', 'hidden');
    score = 0;
    pointsLabel.contents = score.toString();
    direction = 'r';
    horizontal = true;
    vertical = false;
    interval = startTimer(progressGame);
}
/**
 * Returns true if the passed in x,y coordinate is out of bounds of the interactive
 * @param x x coordinate of point to check
 * @param y y coordinate of point to check
 */
function positionIsOutOfBounds(x, y) {
    if ((x > interactive.width - dp || x < 0) || (y > interactive.height - dp || y < 0)) {
        gameOver();
        return true;
    }
    return false;
}
/**
 * moves the snake in the direction d
 */
function moveSnake(d) {
    let head = snake[snake.length - 1];
    let tail = snake[0];
    if (d == 'u') { //38
        if (positionIsOutOfBounds(head.x, head.y - dp))
            return;
        snake.push(interactive.rectangle(head.x, head.y - dp, dp, dp));
    }
    else if (d == 'd') { //40
        if (positionIsOutOfBounds(head.x, head.y + dp))
            return;
        snake.push(interactive.rectangle(head.x, head.y + dp, dp, dp));
    }
    else if (d == 'r') { //39
        if (positionIsOutOfBounds(head.x + dp, head.y))
            return;
        snake.push(interactive.rectangle(head.x + dp, head.y, dp, dp));
    }
    else if (d == 'l') { //37
        if (positionIsOutOfBounds(head.x - dp, head.y))
            return;
        snake.push(interactive.rectangle(head.x - dp, head.y, dp, dp));
    }
    snake.shift();
    snake[0].style.stroke = 'black';
    snake[snake.length - 1].style.stroke = 'black';
    interactive.root.getElementById(tail.id).remove();
}
/**
 * Rounds n to a multiple of the value of the dp variable
 * @param n number to round
 */
function roundToDp(n) {
    let ret = Math.ceil(n / 10) * 10;
    if (ret % dp != 0) {
        if (getRandomInt(0, 2) == 0) {
            while (ret % dp != 0)
                ret += 10;
        }
        else {
            while (ret % dp != 0)
                ret -= 10;
        }
    }
    return ret;
}
/**
 * called when the snake hits a point
 */
function gotPoint() {
    score += 10;
    pointsLabel.contents = score.toString();
    let newX = roundToDp(getRandomInt(0 + dp, interactive.width - dp));
    let newY = roundToDp(getRandomInt(0 + dp, interactive.height - dp));
    point.x = newX;
    point.y = newY;
    let tail = snake[0];
    if (direction == 'd') {
        snake.splice(0, 0, interactive.rectangle(tail.x, tail.y - dp, dp, dp));
    }
    else if (direction == 'u') {
        snake.splice(0, 0, interactive.rectangle(tail.x, tail.y + dp, dp, dp));
    }
    else if (direction == 'l') {
        snake.splice(0, 0, interactive.rectangle(tail.x + dp, tail.y, dp, dp));
    }
    else if (direction == 'r') {
        snake.splice(0, 0, interactive.rectangle(tail.x - dp, tail.y, dp, dp));
    }
    snake[0].style.fill = 'blue';
}
/**
 * checks if the snake is hitting itself
 */
function checkForCollision() {
    let i;
    let head = snake[snake.length - 1];
    for (i = 0; i < snake.length - 1; i++) {
        if (snake[i].x == head.x && snake[i].y == head.y) {
            gameOver();
        }
    }
}
/**
 * the player has lost the game
 */
function gameOver() {
    snake[0].style.fill = 'blue';
    snake[1].style.fill = 'white';
    interactive.root.getElementById(point.id).remove();
    clearInterval(interval);
    gameOverText.contents = "Game Over";
    gameOverText.x = interactive.width / 2 - gameOverText.getBoundingBox().width / 2;
    restartButton.label.contents = "Restart";
    background.style.fill = 'black';
    scoreLabel.style.fill = 'green';
    pointsLabel.style.fill = 'green';
    gameOverText.root.removeAttribute('visibility');
    restartButton.root.removeAttribute('visibility');
    //bring text to the front of everything else
    interactive.root.getElementById(gameOverText.id).remove();
    interactive.appendChild(gameOverText);
    interactive.root.getElementById(scoreLabel.id).remove();
    interactive.appendChild(scoreLabel);
    interactive.root.getElementById(pointsLabel.id).remove();
    interactive.appendChild(pointsLabel);
}
/**
 * Calls fn every 250 seconds and returns the id of the interval.
 * @param fn function to call every 250 milliseconds
 */
function startTimer(fn) {
    return window.setInterval(fn, 250);
}
/**
 * called every frame of the game to move the snake and update accordingly
 */
function progressGame() {
    moveSnake(direction);
    let head = snake[snake.length - 1];
    head.style.fill = 'red';
    snake[snake.length - 2].style.fill = 'white';
    snake[0].style.fill = 'blue';
    snake[1].style.fill = 'white';
    if (head.x == point.x && head.y == point.y) {
        gotPoint();
    }
    checkForCollision();
}
//# sourceMappingURL=snake-game.js.map