window.onload = function()
{
  let canvas = document.createElement('canvas');
  canvas.width = 900;
  canvas.height = 600;
  canvas.style.border = "1px solid grey";
  document.body.appendChild(canvas);

  let ctx = canvas.getContext('2d');
  ctx.fillStyle = "red";
  ctx.fillRect(30, 30, 100, 50);


}
