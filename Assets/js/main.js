var boardArray, playerX, playerO, ties, whosTurn, moves;

function init(){
    boardArray = [['', '', ''], ['', '', ''], ['', '', '']];
    playerX = ["X", 0];
    playerO = ["O", 0];
    ties = 0;
    whosTurn = "x";
    moves = 0;
}

function mainGame(ele){
    ele.innerHTML = whosTurn;
    
    updateArray(ele);
    
    if(didWin(whosTurn)){
        alert(whosTurn + "'s WON!")
    }
    
    switchPlayer();
}

function updateArray(ele){
    eleID = ele.getAttribute("id");
    
    switch (eleID) {
            case "r1_c1":
                boardArray[0][0] = whosTurn;
                break;
            case "r1_c2":
                boardArray[0][1] = whosTurn;
                break;
            case "r1_c3":
                boardArray[0][2] = whosTurn;
                break;
            case "r2_c1":
                boardArray[1][0] = whosTurn;
                break;
            case "r2_c2":
                boardArray[1][1] = whosTurn;
                break;
            case "r2_c3":
                boardArray[1][2] = whosTurn;
                break;
            case "r3_c1":
                boardArray[2][0] = whosTurn;
                break;
            case "r3_c2":
                boardArray[2][1] = whosTurn;
                break;
            case "r3_c3":
                boardArray[2][2] = whosTurn;
                break;
            default:
                alert("There was a problem with the board array");
                break;
    }
}


function didWin(player){
    var arrLength = boardArray.length;
    
    if(boardArray[0][0] == player && boardArray[1][1] == player && boardArray[2][2] == player){
        return "\\";
    }
    if(boardArray[0][2] == player && boardArray[1][1] == player && boardArray[2][0] == player){
        return "/";
    }
    
    for(var i=0; i<arrLength; i++){
        if(boardArray[i][0] == player && boardArray[i][1] == player && boardArray[i][2] == player ){
            return console.log("r" + i);
        }else if(boardArray[0][i] == player && boardArray[1][i] == player && boardArray[2][i] == player ){
            return "c" + i;    
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

function switchPlayer(){
    if(whosTurn == 'x'){
        whosTurn = 'o';
        return;
    }
    if(whosTurn == 'o'){
        whosTurn = 'x';
        return;
    }
    alert("Whos turn is it!?!?!?");
}