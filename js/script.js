window.onload = function()
{
  let canvasWidth = 900;  //largeur du canvas de contour
  let canvasHeight = 600; // hauteur du canvas de contour
  let blockSize = 30; // taille des blocks du serpent
  let ctx;
  let delay = 100;
  let snakee;
  let applee;
  let widthInBlocks = canvasWidth/blockSize;
  let heightInBlocks = canvasHeight/blockSize;
  init();

  function init()
  {
    let canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "1px solid grey";
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    snakee = new Snake([[6,4], [5,4], [4,4]], "right");
    applee = new Apple([10, 10]);
    refreshCanvas();
  }

    function refreshCanvas()
    {
      snakee.advence();
      if (snakee.checkCollision()) {
        // GAME OVER
      }
      else {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        snakee.draw();
        applee.draw();
        setTimeout(refreshCanvas,delay);
      }

    }

    function drawBlock(ctx, position){
      let x = position[0] * blockSize;
      let y = position[1] * blockSize;
      ctx.fillRect(x, y, blockSize, blockSize)
    }

    function Snake(body, direction){ // constructor du serpent
      this.body = body;
      this.direction = direction;
      this.draw = function(){
        ctx.save();
        ctx.fillStyle = "red";
        for(let i = 0; i < this.body.length; i++){
          drawBlock(ctx, this.body[i]);
        }
        ctx.restore();
      };
      this.advence = function(){  // animation du serpent
        let nextPosition = this.body[0].slice();
        switch (this.direction) {
          case "left":
          nextPosition[0] -= 1;
            break;
          case "right":
          nextPosition[0] += 1;
              break;
          case "down":
          nextPosition[1] += 1;
                break;
          case "up":
          nextPosition[1] -= 1;
                  break;
          default:
            throw("Invalid Direction");
        }
        this.body.unshift(nextPosition);
        this.body.pop();
      };

      this.setDirection = function (newDirection){
        let allowedDirections;
        switch (this.direction) {
          case "left":
          case "right":
          allowedDirections = ["up", "down"];
                break;
          case "down":
          case "up":
        allowedDirections = ["left", "right"];
                break;
              default:
              throw("Invalid Direction");
        }
        if (allowedDirections.indexOf(newDirection) > -1 ) {
          this.direction = newDirection;
        }
      };
      this.checkCollision = () =>{

        let wallCollision = false;
        let snakeCollision = false;
        let head = this.body[0];
        let rest = this.body.slice(1);
        let snakeX = head[0];
        let snakeY = head[1];
        let minX = 0;
        let minY = 0;
        let maxX = widthInBlocks -1;
        let maxY = heightInBlocks -1;
        let isNotBetweenHorizontalWalls = snakeX < minX || snakeX >  maxX;
        let isNotBetweenVerticalWalls = snakeY < minY || snakeY >  maxY;

        if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
          wallCollision = true;
        }
        for(let i in rest){
          if (snakeX === rest[i][0] && snakeY === rest[i][1]){
            snakeCollision = true;
          }
        }
        return wallCollision || snakeCollision;
      };
    }

    function Apple(position){
      this.position = position;
      this.draw = function(){
        ctx.save();
        ctx.fillStyle = "chartreuse";
        ctx.beginPath();
        let radius = blockSize / 2;
        let x = position[0] * blockSize + radius;
        let y = position[1] * blockSize + radius;
        ctx.arc(x, y, radius, 0, Math.PI*2, true);
        ctx.fill();
        ctx.restore();
      };
    }

    document.onkeydown = function handleKeyDown(e){  // fonction couplé d'un évènement pour diriger le serpent
      let key = e.keyCode;
      let newDirection;
      switch(key){
        case 37 :
          newDirection = "left";
          break;
        case 38 :
          newDirection = "up";
          break;
        case 39 :
          newDirection = "right";
          break;
        case 40 :
          newDirection = "down";
          break;
          default:
            return;
      }
      snakee.setDirection(newDirection);
    }


}
