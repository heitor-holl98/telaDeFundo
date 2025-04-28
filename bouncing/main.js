// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

function Ball(x,y,velx,vely,color,size){

  this.x=x;
  this.y=y;
  this.velx=velx;
  this.vely=vely;
  this.color=color;
  this.size=size;
}

Ball.prototype.draw =function(){
  ctx.beginPath();
  ctx.fillStyle=this.color;
  ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
  ctx.fill();
}

Ball.prototype.update = function(){
  if((this.x+this.size)>=width){
    this.velx=-this.velx;
    this.color = randomRGB();
  }
  if((this.x+this.size)<=0){
    this.velx=-this.velx;
    this.color = randomRGB();
  }
  if((this.y+this.size)>=height){
    this.vely=-this.vely;
    this.color = randomRGB();
  }
  if((this.y+this.size)<=0){
    this.vely=-this.vely;
    this.color = randomRGB();
  }
  this.x=this.x+this.velx;
  this.y=this.y+this.vely;
}

let balls=[];
while(balls.length<25){
  let size = random(10,20);
  let color = randomRGB();

  let ball = new Ball(
    random(size,width-size),
    random(size,height-size),
    random(-20,20),
    random(-20,20),
    color,
    size=200
    
  );
  balls.push(ball);
}
/*
balls.forEach(element => {
  element.draw();
});
*/
function loop(){
  ctx.fillStyle = 'rgba(0,0,0,0.0.25)';
  ctx.fillRect(0,0,width,height);

  balls.forEach(ball=>{
    ball.update();
    ball.draw();
  })
  requestAnimationFrame(loop);
}