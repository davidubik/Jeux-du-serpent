window.onload = function()
{
  let canvas;
  let ctx;
  let delay = 100;
  let xCoord = 0;
  let yCoord = 0;

  function init()
  {
    canvas = document.createElement('canvas');
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
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "red";
      ctx.fillRect(xCoord,yCoord, 100, 50);
      setTimeout(refreshCanvas,delay);
    }

        init();




}
