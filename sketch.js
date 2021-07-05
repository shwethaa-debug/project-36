var database ,dog;
var position
//var form
var feed,add;
var foodobj;
var Feedtime
var Lastfeed
var LastFed
var milk;
//Create variables here

function preload(){
  dogimg = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(700, 500);
  database = firebase.database();
  console.log(database);
 milk = new Food();
  foodObj=new Food();
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg)
  dog.scale=0.2
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition);

  feed = createButton("Feed Drago")
  feed.position(830,65);
  feed.mousePressed(FeedDog)

  addFood = createButton("ADD FOOD")
  addFood.position(950,65);
  addFood.mousePressed(AddFood)

} 

function draw(){
 background(46,139,87);

 foodObj.display()
fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
  LastFed = data.val();
})
 drawSprites();
  
 fill(255,255,254);
 textSize(15);
 text("Last Fed:"+ LastFed+" hr",100,40);

drawSprites();
}
function readPosition(data){
  position = data.val();
  foodObj.updateFoodStock(position)
}



function writePosition(something){
  if(something>0){
    something=something-1
  }
  else{
    something=0
  }
  database.ref('/').set({
    'Food': something
  })

}
function AddFood(){
    position = position+1;
    database.ref('/').update({
    Food:position
}

)
}
function FeedDog(){

dog.addImage(dogimg2)

foodObj.updateFoodStock(foodObj.getFoodStock()-1)
   database.ref('/').update({
   Food:foodObj.getFoodStock(),
   FeedTime:hour ()
 })
}
