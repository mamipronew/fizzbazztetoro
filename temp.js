//作りかけ
let lineCount = [];
function checkLine() {
  for (let y = 0; y < gameObj.gritTate; y++) {
    //横の列一列を調べるループだから。ここでフラグを建てる
    let flag = true;
      for (let x = 0; x < gameObj.gritYoko; x++) {
        //一列に一個でも空きがあったら
        if(fieldArray[y][x] == 0)
        {
        flag = false;
        //falseにしてこのループを抜ける
        
        break;

      }

lineCount.push(y);
     
    
      }
      if (flag) {
        console.log(lineCount);
        copyArray = fieldArray;
        console.log(copyArray);
          for (let nx = 0; nx < gameObj.gritYoko; nx++) {
            
            fieldArray[y][nx] = 0;
        }

        for (let ny = y; 1 > ny; ny--) {
          for (let nx = 0; nx < gameObj.gritYoko; nx++) {
            
            fieldArray[ny][nx] = copyArray[ny - 1][nx];
           
        }
          
        }
        for (let nx = 0; nx < gameObj.gritYoko; nx++) {
            
          fieldArray[0][nx] = 0;
         
      }
        
      }
      
       
     }
  
  
}



      
copyArray = fieldArray.concat();
checkLine();


console.log(copyArray);
　　　　lineDelCopy(tempY);
tempY = 0;

let tempY = 0;
function checkLine(){
  
  
 
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

function lineDelCopy(tempY){
  if(tempY == 0) return;


fieldArray[tempY][0] = 0;
  fieldArray[tempY][1] = 0;
  fieldArray[tempY][2] = 0;
  fieldArray[tempY][3] = 0;
  fieldArray[tempY][4] = 0;

  for (let ny = 1; ny < tempY; ny++) {
    for (let nx = 0; nx < gameObj.gritYoko; nx++) {
      fieldArray[ny][nx] = copyArray[ny -1][nx];
      fieldArray[0][nx] = 0;
    }
    
  }

  tempY = 0;






  
}
    
