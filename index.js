'use strict';
var canvas = document.getElementById("myCanvas");
canvas.width = 640;		//canvasの横幅（よこはば）
canvas.height = 480;	//canvasの縦幅（たてはば）
var ctx = canvas.getContext("2d");

const gameObj = {
  itemsMap: new Map(),
  itemWidth: 30,

  
  
  gritYoko: 5,
  gritTate: 8,
  


};
const MaxY = gameObj.gritTate - 1;
let moveX = 2;
let moveY = 0;

let screenWidth = gameObj.gritYoko * gameObj.itemWidth;
let screenHeight = gameObj.gritTate * gameObj.itemWidth;
let itemArry = [...Array(99).keys()] ;//配列を作る

//fieldArrayは動かないけど消去される。tblArrayは動くけど消去されない。
//　tblArray→fieldArrayにする

let fieldArray = [
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0]
];

let copyArray = [];

let tblArray = [...Array(gameObj.gritTate).keys()];
for (let index = 0; index < tblArray.length; index++) {
  tblArray[index] = new Array(gameObj.gritYoko).fill(0);
  
}


function drawBlock(x, y, num) {

  let blockSize = gameObj.itemWidth;
  let px = x * blockSize;
       let py = y * blockSize;
          ctx.fillStyle = "#A22";
        ctx.fillRect(px, py, blockSize, blockSize);
        ctx.strokeStyle = "black";
        ctx.strokeRect(px, py, blockSize, blockSize); 
        ctx.fillStyle = "white";
        ctx.fillText(num, px + blockSize /2, py + blockSize/2, blockSize, blockSize);
       

}


tblArray[0][0] = 1;
let num = selectNum();
drawAll(num);


function drawAll(num) {
 
  ctx.clearRect(0, 0, screenWidth, screenHeight);
  for (let y = 0; y < gameObj.gritTate ; y++) {
    for (let x = 0; x < gameObj.gritYoko; x++) {


      if (tblArray[y][x] == 1) {
        drawBlock(moveX + x, moveY + y , num) ;

             }
      
    }
    
  }

  for (let y = 0; y < gameObj.gritTate ; y++) {
    for (let x = 0; x < gameObj.gritYoko; x++) {

     //もし動かないならそこの配列の数字を表示する（別な関数でfieldArrayに数字を入れる）
      if (fieldArray[y][x] !== 0) {
        num = fieldArray[y][x];
        drawBlock(x, y , num) ;

             }
      
    }
    
  }




}

document.onkeydown = function(e)
{



  switch (e.keyCode) {
    case 37: //左
     if(checkMove(-1, 0)){
      moveX --;
     }
      
      
      
      break;
    
      case 38: //上
      if (checkMove(0, -1)) {
        moveY --;
      }
      
    
      
      break;
      case 39: //右
      if (checkMove(1, 0)) {
        moveX ++;
      }
      
      
      break;
      case 40: //下
      if (checkMove(0, 1)) {
        moveY ++;
        checkBottom();

      }
   
      
      
      break;
      case 32: //スペース

      break;
  

  }

 

  drawAll(num) ;

 
 
}


   

  
  






function deleteChecker(x,y ,num) {
  if (num % 15 == 0) {
    
    console.log("FizzBUZZ！");
  } else if(num % 5 == 0)
    { 





      
}
 
  else if (num % 3 == 0 && y != 7) {
    fieldArray[0][x] =0;
    fieldArray[1][x] =0;
    fieldArray[2][x] =0;
    fieldArray[3][x] =0;
    fieldArray[4][x] =0;
    fieldArray[5][x] =0;
    fieldArray[6][x] =0;
    fieldArray[7][x] =0;
  
    
  }

  
}


  //作りかけ
//x, yの動きの幅を引数に取るのでmx,my
function checkMove(mx, my) {
  for (let y = 0; y < gameObj.gritTate ; y++) {
    for (let x = 0; x < gameObj.gritYoko; x++) {

let nx = 0;
let ny = 0;
      if (tblArray[y][x] == 1) {
        nx = moveX + mx +x;
        ny = moveY + my +y;
        
        if(
          nx < 0 ||
            ny < 0 ||
            nx > gameObj.gritYoko -1 ||
            ny > gameObj.gritTate -1 ||
            fieldArray[ny][nx] 
            
            ){
        return false;
        }

             }
      
    }


}
return true;
}

function selectNum() {

  let num = itemArry[0] + 1;
  itemArry.shift();
  return num;
    
  }





  function checkBottom() {
    for (let y = 0; y < gameObj.gritTate ; y++) {
      for (let x = 0; x < gameObj.gritYoko; x++) {
        let nx = 0;
let ny = 0;
        if (tblArray[y][x] == 1) {
          nx = moveX + x;
          ny = moveY + y;


          if(ny >= gameObj.gritTate -1 || fieldArray[ny + 1][nx]){
            
            fieldArray[ny][nx] = num;

            deleteChecker(nx,ny,num);

        

            
            
            num = selectNum();
           ;
          moveX = 2;
          moveY = 0;
            drawAll(num) ;
          
          }
  


        }
 
        
        
      }
  
  
  }
    
  }