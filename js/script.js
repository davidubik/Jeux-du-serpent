window.onload = function()
{
  let canvas;
  let ctx;
  let delay = 1000;

  function init()
  {
    canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 600;
    canvas.style.border = "1px solid grey";
    document.body.appendChild(canvas);
  }

  function refreshCanvas()
  {
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "red";
    ctx.fillRect(30, 30, 100, 50);
  }

    init();
    refreshCanvas();



}
