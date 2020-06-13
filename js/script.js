window.onload = function()
{
  let canvasWidth = 900;
  let canvasHeight = 600;
  let blockSize = 30;
  let ctx;
  let delay = 100;
  let xCoord = 0;
  let yCoord = 0;

  function init()
  {
    let canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 600;
    canvas.style.border = "1px solid grey";
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    refreshCanvas();
  }

    function refreshCanvas()
    {
      xCoord += 2;
      yCoord += 2;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      ctx.fillStyle = "red";
      ctx.fillRect(xCoord,yCoord, 100, 50);
      setTimeout(refreshCanvas,delay);
    }

        init();

        function Snake(body)
        {
          this.body = body;
          this.draw = function()
          {

          };
        }




}
