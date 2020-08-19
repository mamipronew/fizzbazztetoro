'use strict';
var canvas = document.getElementById("myCanvas");
canvas.width = 500;		//canvasの横幅（よこはば）
canvas.height = 480;	//canvasの縦幅（たてはば）
var ctx = canvas.getContext("2d");

const gameObj = {
 itemWidth: 30,
  score:0,
  gritYoko: 5,
  gritTate: 8

};

const MaxY = gameObj.gritTate - 1;
let moveX = 2;
let moveY = 0;

let screenWidth = gameObj.gritYoko * gameObj.itemWidth;
let screenHeight = gameObj.gritTate * gameObj.itemWidth;
let itemArry = [...Array(99).keys()] ;//配列を作る

//fieldArrayは動かないけど消去される。tblArrayは動くけど消去されない。
//　tblArray→fieldArrayにする

let fieldArray = [...Array(gameObj.gritTate).keys()];
for (let index = 0; index < fieldArray.length; index++) {
  fieldArray[index] = new Array(gameObj.gritYoko).fill(0);
  
}
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

  

  }

  drawAll(num) ;

}
let tempY = 0;

function checkLine(){
   copyArray = JSON.parse(JSON.stringify(fieldArray));
   console.log(fieldArray + "5checkライン");
  for (let ny = 0; ny < 8; ny++) {
      if (fieldArray[ny][0] != 0 &&
        fieldArray[ny][1] != 0 &&
        fieldArray[ny][2] != 0 &&
        fieldArray[ny][3] != 0 &&
        fieldArray[ny][4] != 0 
     
        ){ tempY = ny;
          break; }
  }
  
      }



        function lineDelCopy(tempY) {
          if(tempY == 0) return;
          
         console.log (fieldArray + "らいんでる");
        
        fieldArray[tempY][0] = 0;
          fieldArray[tempY][1] = 0;
          fieldArray[tempY][2] = 0;
          fieldArray[tempY][3] = 0;
          fieldArray[tempY][4] = 0;
        
          for (let ny = 1; ny < tempY + 1; ny++) {
            for (let nx = 0; nx < gameObj.gritYoko; nx++) {
            
              fieldArray[ny][nx] = copyArray[ny -1][nx];
              fieldArray[0][nx] = 0;
            }
            
          }
          scoreChecker(5);
          
        }

//作りかけ
function lineDelCopy2(num,x,y){
  copyArray = JSON.parse(JSON.stringify(fieldArray));
  
 
  /*
  100で割った余り

  1の時左下一個 1消す yからy+1にコピー
  3の時左一個　1消す  y-1からyにコピー
  4の時左下から二個 2消す y-1からy+1にコピー
  11の時左から二個 2消す　y-2からyにコピー
  12の時3個　3消す。y -2からコピー

  左　まず配列にして、四桁あったら→
[0]と[1]を数字に戻す

  11の時左下一個
  13の時左一個
  24の時左下から二個
  31の時左から二個
  42の時3個

  
  */

  if(num % 100 == 1){

    for (let ny = 0; ny < y-2 ; ny++) {
      if(!copyArray[y][x-1])continue;
      fieldArray[y + 1][x-1] = copyArray[y][x-1];

      fieldArray[y + 1][x-1]=0;
    }

  }

  if(num % 100 == 3){

    for (let ny = 0; ny < y-1 ; ny++) {
      if(!copyArray[y -1][x-1])continue;
      fieldArray[y][x-1] = copyArray[y -1][x-1];

      fieldArray[y][x-1] =0;
    }

  }



}


       


function deleteChecker(x,y ,num) {
  if (num % 15 == 0) {
    checkFizzBuzz(x, y);
    
  } else if(num % 5 == 0)
    { 
      console.log(fieldArray + "5の入り口");
      checkLine();
      console.log(x + y + num + tempY);
      lineDelCopy(tempY);
      tempY = 0;

      
}
 
  else if (num % 3 == 0 && y != 7) {
    console.log(x + y + num);
    (fieldArray + "3の入り口");
    check3(x);

  }

  
}

function check3(x){
  let score3 = 0;

  for (let ny = 0; ny < gameObj.gritTate; ny++) {
    if(fieldArray[ny][x] != 0){ score3 ++;}
    fieldArray[ny][x] = 0;
   
    
  }
 if (score3 == 1) {
   score3 = 0;
 }
 console.log(fieldArray + "check３");
 scoreChecker(score3);

}
function checkFizzBuzz(x,y){
  if(y = gameObj.gritTate -1){
console.log("下はないよラッキー！");
  }
  else{
    console.log("下もcheckするよ！");
  }

}




function scoreChecker(num) {
  switch (num) {
    case 1:
      gameObj.score += 100;
      
      break;
    case 2:
      gameObj.score += 300;
      
      break;
    case 3:
      gameObj.score += 700;
      break;

    case 4:
      gameObj.score += 1500;
      break;

    case 5:
      gameObj.score += 3000;
      break;
    case 6:
      gameObj.score += 5000;
      break;
    case 7:
      gameObj.score += 10000;
      break;

 
  }
  console.log(gameObj.score);
}



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

 