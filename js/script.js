window.onload = () =>
{
  const canvasWidth = 900;  //largeur du canvas de contour
  const canvasHeight = 600; // hauteur du canvas de contour
  const blockSize = 30; // taille des blocks du serpent
  const widthInBlocks = canvasWidth/blockSize;
  const heightInBlocks = canvasHeight/blockSize;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  let delay = 100;
  let snakee;
  let applee;
  let score;
  let timeout;

 

  const init = () =>
  {
    // const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "30px solid grey";
    canvas.style.margin = "50px auto";
    canvas.style.display = "block";
    canvas.style.backgroundColor = "#ddd";
    document.body.appendChild(canvas);
    // ctx = canvas.getContext('2d');
    snakee = new Snake([[6,4], [5,4], [4,4], [3,4], [2,4]], "right");
    applee = new Apple([10, 10]);
    score = 0;
    refreshCanvas();
  }

    const launch = () =>{
      snakee = new Snake([[6,4],[5,4], [4,4], [3,4],[2,4]], "right");
      applee = new Apple([[10,10]]);
      score = 0;
      clearTimeout(timeout);
      delay = 100;
      refreshCanvas();
    }
    

    function refreshCanvas(){
      snakee.advence();
      if (snakee.checkCollision()) {
        gameOver();

      }
      else {
        if (snakee.isEatingApple(applee)) { // SI LE SERPENT A MANGER LA POMME
            score++;
            snakee.ateApple = true;
            do
            {
                applee.setNewPosition(); // DONNE LUI UNE NOUVELLE POSITION
            } while (applee.isOnSnake(snakee)); // VÉRIFIE SI APPLEE EST SUR LE SERPENT SI LA POMME EST SUR LE SERPENT ON LUI REODNNE UNE NOUVELLE POSITION TANT QUE CELLE CI SE TROUVE SUR LE SERPENT

            if(score % 5 == 0){
              speedUp();
            }

        }
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawScore();
        snakee.draw();
        applee.draw();
        timeout = setTimeout(refreshCanvas,delay);
      }

    }

   const speedUp = () => {
      delay /= 2;
    } 

    const gameOver = () =>{ // FONCTION QUI INDIQUE "Game Over".
      ctx.save();
      ctx.font = "bold 70px sans-serif";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3; // petit beug sur le contour du M à partir de 4px
      ctx.strokeText("GAME OVER", centerX, centerY - 180);
      ctx.fillText("GAME OVER", centerX, centerY - 180);
      ctx.font = "bold 30px sans-serif";
      ctx.strokeText("Appuyer sur la touche Espace pour rejouer", centerX, centerY - 120);
      ctx.fillText("Appuyer sur la touche Espace pour rejouer", centerX, centerY - 120);
      ctx.restore();
    }

    const restart = () =>{
      snakee = new Snake([[6,4], [5,4], [4,4], [3,4], [2,4]], "right");
      applee = new Apple([10, 10]);
      score = 0;
      clearTimeout(timeout);
      refreshCanvas();
    }

    const drawScore = () => {
      ctx.save();
      ctx.font = "bold 200px sans-serif";
      ctx.fillStyle = "gray";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(score.toString(), centerX, centerY);
      ctx.restore();
    }

    const drawBlock = (ctx, position) =>{
      const x = position[0] * blockSize;
      const y = position[1] * blockSize;
      ctx.fillRect(x, y, blockSize, blockSize)
    }

// constructor du serpent
    class Snake{

      constructor(body, direction){

      this.body = body;
      this.direction = direction;
      this.ateApple = false;
      }

         draw(){
            ctx.save();
            ctx.fillStyle = "red";
            for(let i = 0; i < this.body.length; i++){
              drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
          };
        advence(){  // Method pour l'animation du serpent
          const nextPosition = this.body[0].slice();
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

        setDirection(newDirection){ //Method pour diriger le serpent
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
        checkCollision() { // Method pour que le serpent se cogne contre un mur et ne sorte pas de Canvas

          let wallCollision = false;
          let snakeCollision = false;
          const head = this.body[0];
          const rest = this.body.slice(1);
          const snakeX = head[0];
          const snakeY = head[1];
          const minX = 0;
          const minY = 0;
          const maxX = widthInBlocks -1;
          const maxY = heightInBlocks -1;
          const isNotBetweenHorizontalWalls = snakeX < minX || snakeX >  maxX;
          const isNotBetweenVerticalWalls = snakeY < minY || snakeY >  maxY;

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
        isEatingApple(appconstoEat) 
        {
          const head = this.body[0];
          if (head[0] === appconstoEat.position[0] && head[1] === appconstoEat.position[1]) {
            return true;
          }
          else {
            return false;
          }
        };
    } 
 

    // FONCTION CONSTRUCTEUR DE LA POMME
    class Apple{
      constructor(position){
        this.position = position;
      }

      draw(){
        const radius = blockSize / 2;
        const x = this.position[0] * blockSize + radius;
        const y = this.position[1] * blockSize + radius;
        ctx.save();
        ctx.fillStyle = "chartreuse";
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2, true);
        ctx.fill();
        ctx.restore();
      };
      setNewPosition(){ // METHOD POUR QUE LA POMME CHANGE DE POSITION QUAND ELLE À ÉTÉ MANGER PAR LER SERPENT
        const newX = Math.round(Math.random() * (widthInBlocks -1));
        const newY = Math.round(Math.random() * (heightInBlocks -1));
        this.position =[newX, newY];
      };
      isOnSnake(snakeToCheck){ // METHOD QUI PERMET D'ÉVITER QUE LE POMME APPARAISSE SUR LE SERPENT

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


   
    document.onkeydown = (e) =>{  //Method couplé d'un évènement pour diriger le serpent
      const key = e.keyCode;
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
    init();

}
