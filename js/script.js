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
    snakee = new Snake([[6,4], [5,4], [4,4], [3,4], [2,4]], "right");
    applee = new Apple([10, 10]);
    refreshCanvas();
  }

    function refreshCanvas()
    {
      snakee.advence();
      if (snakee.checkCollision()) {
        gameOver();

      }
      else {
        if (snakee.isEatingApple(applee)) { // SI LE SERPENT A MANGER LA POMME
            snakee.ateApple = true;
            do
            {
                applee.setNewPosition(); // DONNE LUI UNE NOUVELLE POSITION
            }
             while (applee.isOnSnake(snakee)); // VÉRIFIE SI APPLEE EST SUR LE SERPENT SI LA POMME EST SUR LE SERPENT ON LUI REODNNE UNE NOUVELLE POSITION TANT QUE CELLE CI SE TROUVE SUR LE SERPENT

        }
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        snakee.draw();
        applee.draw();
        setTimeout(refreshCanvas,delay);
      }

    }

    function gameOver(){ // FONCTION QUI INDIQUE "Game Over".
      ctx.save();
      ctx.fillText("GAME OVER", 5, 15);
      ctx.fillText("Appuyer sur la touche Espace pour rejouer", 5, 30)
      ctx.restore();
    }

    function restart(){
      snakee = new Snake([[6,4], [5,4], [4,4], [3,4], [2,4]], "right");
      applee = new Apple([10, 10]);
      refreshCanvas();
    }

    function drawBlock(ctx, position){
      let x = position[0] * blockSize;
      let y = position[1] * blockSize;
      ctx.fillRect(x, y, blockSize, blockSize)
    }

    function Snake(body, direction){ // constructor du serpent
      this.body = body;
      this.direction = direction;
      this.ateApple = false;
      this.draw = function(){
        ctx.save();
        ctx.fillStyle = "red";
        for(let i = 0; i < this.body.length; i++){
          drawBlock(ctx, this.body[i]);
        }
        ctx.restore();
      };
      this.advence = function(){  // Method pour l'animation du serpent
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
        if(!this.ateApple) // SI LE ateApple EST DIFFÉRENT (!)
        this.body.pop();
        else
        this.ateApple = false;
      };

      this.setDirection = function (newDirection){ //Method pour diriger le serpent
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
      this.checkCollision = () =>{ // Method pour que le serpent se cogne contre un mur et ne sorte pas de Canvas

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
      this.isEatingApple = (appleToEat) =>
      {
        let head = this.body[0];
        if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1]) {
          return true;
        }
        else {
          return false;
        }
      };
    }

    function Apple(position){ // FONCTION CONSTRUCTEUR DE LA POMME
      this.position = position;
      this.draw = function(){
        ctx.save();
        ctx.fillStyle = "chartreuse";
        ctx.beginPath();
        let radius = blockSize / 2;
        let x = this.position[0] * blockSize + radius;
        let y = this.position[1] * blockSize + radius;
        ctx.arc(x, y, radius, 0, Math.PI*2, true);
        ctx.fill();
        ctx.restore();
      };
      this.setNewPosition = () =>{ // METHOD POUR QUE LA POMME CHANGE DE POSITION QUAND ELLE À ÉTÉ MANGER PAR LER SERPENT
        let newX = Math.round(Math.random() * (widthInBlocks -1));
        let newY = Math.round(Math.random() * (heightInBlocks -1));
        this.position =[newX, newY];
      };
      this.isOnSnake = (snakeToCheck) =>{ // METHOD QUI PERMET D'ÉVITER QUE LE POMME APPARAISSE SUR LE SERPENT

        let isOnSnake = false;
        for(let i in snakeToCheck.body) // LA BOUCLE PASSE SUR TOUTE LA LONGUEUR DU CORPS DU SERPENT
          {
            if (this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]){ // ON FÉRIFIE QUE LA POMME NE SE TROUVE PAS SUR LE X OU SUR LE Y
               isOnSnake = true;
            }
          }
        return isOnSnake;
      };
    }

    document.onkeydown = function handleKeyDown(e){  //Method couplé d'un évènement pour diriger le serpent
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
          case 32 :
          restart()
          return;
          default:
            return;
      }
      snakee.setDirection(newDirection);
    }


}
