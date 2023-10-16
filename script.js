const canvas = document.getElementById("canvas1");
const ctx= canvas.getContent("2d");

canvas.width=600;
canvas.height=600;

const background = new Image();
background.src="backgroungOfGame.webp"

function canvas1()
{
    ctx.drawImage(background,0,0,canvas.width, canvas.height);
}
setInterval(game, 1000 / 60);
