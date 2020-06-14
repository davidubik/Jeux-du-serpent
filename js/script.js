window.onload = function()
{
  let canvasWidth = 900;
  let canvasHeight = 600;
  let blockSize = 30;
  let ctx;
  let delay = 100;
  let snakee;

  init();

  function init()
  {
    let canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.border = "1px solid grey";
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    snakee = new Snake([[6,4], [5,4], [4,4]]);
    refreshCanvas();
  }

    function refreshCanvas()
    {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      snakee.advence();
      snakee.draw();
      setTimeout(refreshCanvas,delay);
    }

    function drawBlock(ctx, position){
      let x = position[0] * blockSize;
      let y = position[1] * blockSize;
      ctx.fillRect(x, y, blockSize, blockSize)
    }

    function Snake(body){
      this.body = body;
      this.draw = function(){
        ctx.save();
        ctx.fillStyle = "red";
        for(let i = 0; i < this.body.length; i++){
          drawBlock(ctx, this.body[i]);
        }
        ctx.restore();
      };
      this.advence = function(){
        let nextPosition = this.body[0].slice();
        nextPosition[0] += 1;
        this.body.unshift(nextPosition);
        this.body.pop();
      };
    }




}
