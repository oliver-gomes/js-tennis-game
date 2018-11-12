let canvas;
let canvasContext;
let ballX = 0;
let ballSpeedX = 15;

window.onload = function() {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  const framesPerSecond = 30;
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);
};

moveEverything = () => {
  ballX = ballX + ballSpeedX;
  if (ballX >= canvas.width) {
    ballSpeedX = -ballSpeedX;
  } else if (ballX <= 0) {
    ballSpeedX = -ballSpeedX;
  }
};

drawEverything = () => {
  // next line black out the screen
  colorRect(0, 0, canvas.width, canvas.height, "black");

  // this is left player paddle
  colorRect(0, 210, 10, 100, "white");

  // next line draws the ball
  canvasContext.fillStyle = "red";
  canvasContext.beginPath();
  canvasContext.arc(ballX, 100, 10, 0, Math.PI * 2, true);
  canvasContext.fill();
};

colorRect = (leftX, topY, width, height, drawColor) => {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
};
