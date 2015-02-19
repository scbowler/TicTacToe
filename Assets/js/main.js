var boardArray, playerX, playerO, ties, whosTurn;

function init(){
    boardArray = [['', '', ''], ['', '', ''], ['', '', '']];
    playerX = ["X", 0];
    playerO = ["O", 0];
    ties = 0;
    whosTurn = "";
}


function didWin(player){
    var arrLength = boardArray.length;
    
    if(boardArray[0][0] == player && boardArray[1][1] == player && boardArray[2][2] == player){
        return console.log("\\");
    }
    if(boardArray[0][2] == player && boardArray[1][1] == player && boardArray[2][0] == player){
        return console.log("/");
    }
    
    for(var i=0; i<arrLength; i++){
        if(boardArray[i][0] == player && boardArray[i][1] == player && boardArray[i][2] == player ){
            return console.log("r" + i);
        }else if(boardArray[0][i] == player && boardArray[1][i] == player && boardArray[2][i] == player ){
            return console.log("c" + i);    
        }
    }
    return console.log(false);
}

function updateScore(player){
    
    switch(player){
            case "x":
                playerX[1]++;
                break;
            case "o":
                playerO[1]++;
                break;
            case "t":
                ties++;
                break;
            default:
                alert("There was an error in the updateScore function");
    }
}

