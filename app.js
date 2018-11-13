let canvas;
let canvasContext;
let ballX = 50;
let ballSpeedX = 10;
let ballY = 50;
let ballSpeedY = 4;

let player1Score = 0;
let player2Score = 0;

let paddle1Y = 250;
let paddle2Y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

calculateMousePos = evt => {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = evt.clientX - rect.left - root.scrollLeft;
  let mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
};

window.onload = function() {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  const framesPerSecond = 30;
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);

  canvas.addEventListener("mousemove", function(evt) {
    let mousePos = calculateMousePos(evt);
    paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;
  });
};

ballReset = () => {
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
};

computerMovement = () => {
  let paddle2YCenter = paddle2Y + PADDLE_HEIGHT / 2;

  if (paddle2Y < ballY) {
    paddle2Y += 6;
  } else {
    paddle2Y -= 6;
  }
};

moveEverything = () => {
  computerMovement();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
    } else {
      ballReset();
      player2Score++;
    }
  } else if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
    } else {
      ballReset();
      player1Score++;
    }
  }

  if (ballY >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  } else if (ballY <= 0) {
    ballSpeedY = -ballSpeedY;
  }
};

drawEverything = () => {
  // next line black out the screen
  colorRect(0, 0, canvas.width, canvas.height, "black");

  // this is left player paddle
  colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");

  // this is computer player paddle
  colorRect(
    canvas.width - PADDLE_THICKNESS,
    paddle2Y,
    PADDLE_THICKNESS,
    PADDLE_HEIGHT,
    "white"
  );

  // next line draws the ball
  colorCircle(ballX, ballY, 10, "white");

  canvasContext.fillText(player1Score, 100, 100);
  canvasContext.fillText(player2Score, canvas.width - 100, 100);
};

colorCircle = (centerX, centerY, radius, drawColor) => {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
};

colorRect = (leftX, topY, width, height, drawColor) => {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
};
