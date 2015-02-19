var boardArray, playerX, playerO, ties, whosTurn;

function init(){
    var boardArray = [['', '', ''], ['', '', ''], ['', '', '']];
    var playerX = ["X", 0];
    var playerO = ["O", 0];
    var ties = 0;
    var whosTurn = "";
}

function didWin(player){
    var arrLength = boardArray.length;
    
    if(boardArray[0][0] == player && boardArray[1][1] == player && boardArray[2][2] == player ||
       boardArray[0][2] == player && boardArray[1][1] == player && boardArray[2][0] == player){
        return true;
    }
    
    for(var i=0; i<arrLength; i++){
        if(boardArray[i][0] == player && boardArray[i][1] == player && boardArray[i][2] == player ){
            return true;
        }else if(boardArray[0][i] == player && boardArray[1][i] == player && boardArray[2][i] == player ){
            return true;    
        }
    }
    return false;
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
}