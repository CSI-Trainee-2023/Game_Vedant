const canvas= document.querySelector('canvas')
const c= canvas.getContext('2d')

canvas.width=innerWidth
canvas.height=innerHeight
let score = 0;
const highScoreFromLocalStorage = localStorage.getItem('highScore');
let highScore = highScoreFromLocalStorage ? parseInt(highScoreFromLocalStorage) : 0;

// Class for player as spaceship

class Player{
    constructor(){
   
    this.velocity={
        x:0,
        y:0
    }
    const image=new Image()
    image.src='./Images/Spaceshipmain.png'
    // image.onload=()=>{
    this.image=image
    this.width=image.width*0.4
    this.height=image.height*0.4
    this.position={
        x:580,
        y:470
}
}
draw(){
    // if(this.image)
    c.drawImage(this.image, this.position.x, this.position.y, this.width,this.height)
}
update(){
    // if(this.image){
    // c.clearRect(0,0, canvas.width, canvas.height)
    this.draw()
    this.position.x+= this.velocity.x   
}}

class Projectile{
    constructor({position,velocity}){
    this.position=position
    this.velocity=velocity 
    this.radius=3
    }
    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y,this.radius,0,Math.PI*2)
        c.fillStyle='white'
        c.fill()
        c.closePath
    }
    update(){
        this.draw()
        this.position.x+= this.velocity.x
        this.position.y+= this.velocity.y
    }
}

class InvaderProjectile {
    constructor({position,velocity}){
        this.position=position
        this.velocity=velocity

        this.width=3
        this.height=10
    }
    draw() {
        c.fillStyle='white'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }

    update(){
        this.draw()
        this.position.x +=this.velocity.x
        this.position.y +=this.velocity.y
    }
}

class Invader{
    constructor({position}){
   
    this.velocity={
        x:5,
        y:0
    }
    const image=new Image()
    image.src='./Images/invader.png'
    image.onload=()=>{
    this.image=image
    this.width=image.width*0.15
    this.height=image.height*0.15
    this.position={
        x:position.x,
        y:position.y+50
     
}}
}
draw(){
    if(this.image){
    c.drawImage(this.image, this.position.x, this.position.y, this.width,this.height)
}}
update({velocity}){
    if(this.image){
    this.draw()
    this.position.x+=velocity.x 
    this.position.y+=velocity.y 
}}
shoot(invaderProjectiles){
    invaderProjectiles.push(
        new InvaderProjectile({
        position:{
            x:this.position.x,
            y:this.position.y
        },
        velocity:{
            x:0,
            y:5
        }

    }))

}

}
class Grid{
    constructor(){
        this.position={
            x:0,
            y:0
        }
        this.velocity={
            x:6,
            y:0
        }
        this.invaders=[]
        const columns=Math.floor(Math.random()*10+5)
        this.width=columns*35

        for(let i=0;i<columns;i++){
            for(let j=0;j<5;j++){
        this.invaders.push(
        new Invader({
        position:{
        x:i*35,
        y:j*30
    }
    })
    )
        }}
        console.log(this.invaders)
    }
    update(){
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        this.velocity.y=0
        if(this.position.x+this.width>=canvas.width){
            this.velocity.x=-this.velocity.x
            this.velocity.y=30
        }
        if(this.position.x<=0){
            this.velocity.x=-this.velocity.x
            this.velocity.y=30
        }
    }
}

const player= new Player()
const projectiles=[]
const grids=[new Grid()]
const invaderProjectiles=[]

let frames=0
let randomInterval=Math.floor(Math.random()*500+500)
function animate(){
   requestAnimationFrame(animate)
   c.fillStyle='black'
   c.fillRect(0,0, canvas.width, canvas.height)
   player.update()
        c.font="30px Arial";
        c.fillStyle="white";
        c.fillText("Score:",(canvas.width)-200,40) 
        console.log(score);
        c.fillText(score,(canvas.width)-110,40) 
        highScore = Math.max(score,highScore);
        localStorage.setItem('highScore', highScore)
        c.fillText("Higest Score:",70,40) 
        console.log(score);
        c.fillText(highScore,260,40) 

        

   invaderProjectiles.forEach((invaderProjectile) =>{
    invaderProjectile.update()

   })
   projectiles.forEach(projectile =>{
    projectile.update()
   })
//    grids.forEach((grid)=>{
//    grid.invaders.forEach(inv =>{
//     if (inv.position.y >  canvas.height - 100){
//         console.log("Game Over")
//         grid.invader = [];
//     }
//    });  
// });
   grids.forEach((grid)=>{
    
    grid.update()
    grid.invaders.forEach((invader,i)=>{
        invader.update({velocity:grid.velocity})
        projectiles.forEach((projectile,j)=>{
           if(projectile.position.y- projectile.radius<=invader.position.y+invader.height && projectile.position.x+projectile.radius>=invader.position.x&& projectile.position.x-projectile.radius<=invader.position.x+invader.width&&projectile.position.y+projectile.radius>=invader.position.y){
            setTimeout(()=>{
                const invaderFound= grid.invaders.find(
                    (invader2)=>invader2===invader
                )
                const projectileFound= projectiles.find(
                    (projectile2)=>projectile2===projectile
                )
                //remove invader and projectile
                if(invaderFound&&projectileFound)
                score += 10;
                grid.invaders.splice(i,1)
                projectiles.splice(j, 1)
                if(grid.invaders.length>0){
                    const firstInvader=grid.invaders[0]
                    const lastInvader=grid.invaders[grid.invaders.length-1]

                    grid.width=lastInvader.position.x-firstInvader.position.x+lastInvader.width
                    grid.position.x=firstInvader.position.x
                }else{
                    grids.splice(gridIndex,1)
                }
            },0)
           }
        })
    })
   })
     if(frames%randomInterval==0){
        grids.push(new Grid)
        randomInterval=Math.floor(Math.random()*500+500)
        frames=0
    }
   frames++
}
   


animate()
addEventListener('keydown',(event)=>{
    
switch(event.key){
    case'a':
    if(player.position.x>=0){
    player.velocity.x=-10}
    else 
    player.velocity.x=0
    break
    case'd':
    if(player.position.x+player.width<=canvas.width){
    player.velocity.x=10}
    else
    player.velocity.x=0
    break
    case' ':
    projectiles.push(new Projectile({
        position:{
            x:player.position.x+player.width/ 2,
            y:player.position.y
        },
        velocity:{
            x:0,
            y:-6
        }  
    }))
    break
}})
addEventListener('keyup',(event)=>{
    switch(event.key){
        case'a':
        
        player.velocity.x=0
        break
        case'd':
        player.velocity.x=0
        break
        case' ':
        
        break
    }
})
