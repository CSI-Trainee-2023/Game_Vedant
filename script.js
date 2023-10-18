const canvas= document.querySelector('canvas')
const c= canvas.getContext('2d')

canvas.width=innerWidth
canvas.height=innerHeight

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
    c.clearRect(0,0, canvas.width, canvas.height)
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
        c.fillStyle='red '
        c.fill()
        c.closePath
    }
    update(){
        this.draw()
        this.position.x+= this.velocity.x
        this.position.y+= this.velocity.y
    }
}

class Invader{
    constructor(){
   
    this.velocity={
        x:0,
        y:0
    }
    const image=new Image()
    image.src='./Images/invader.png'
    image.onload=()=>{
    this.image=image
    this.width=image.width*0.3
    this.height=image.height*0.3
    this.position={
        x:0,
        y:0  
    //  }; this.draw();
}}
}
draw(){
    if(this.image){
    c.drawImage(this.image, this.position.x, this.position.y, this.width,this.height)
    console.log("Invader")
    c.drawImage(this.image, 20, this.position.y, this.width,this.height)
}}
update(){
    if(this.image){
    
    this.draw()
    this.position.x+= this.velocity.x 
      
}}}

const player= new Player()
const projectiles=[]
const invader=new Invader()



function animate(){
   requestAnimationFrame(animate)
   c.fillStyle='grey'
   c.fillRect(0,0, canvas.width, canvas.height)
   player.update()
   invader.update()
   
  
projectiles.forEach(projectile =>{
    projectile.update()
   })
//    grids.forEach(grid=>{
//     grid.update()
//     grid.invaders.forEach(invader=>{
//         invader.update()
//     })
//    })
// }
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
