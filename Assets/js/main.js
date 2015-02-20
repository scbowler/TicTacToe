//set all global variable names
var boardArray, playerX, playerO, ties, whosTurn, moves;

//function called on page load to initialize all global variables
function init(){
    boardArray = [['', '', ''], ['', '', ''], ['', '', '']]; //two dimensional array that represents the game board
    playerX = ["X", 0];                                      //array to hold info for the 'x' player contains: [player letter, number of wins]
    playerO = ["O", 0];                                      //array to hold info for the 'o' player contains: [player letter, number of wins]
    ties = 0;                                                //variable to hold the number of times there was a tie game
    whosTurn = 'x';                                          //keeps track of whos turn it is using either 'x' or 'o'
    moves = 0;                                               //number of turns taken for current game
}

//function to determin which player will go first / returns nothing
function whosFirst(){
    var num = Math.floor((Math.random() * 2) +1);
    
    if(num === 1){
        whosTurn = playerX[0];
    }else{
        whosTurn = playerO[0];
    }
    
}

function mainGame(ele){
    if(ele.innerHTML == 'x' || ele.innerHTML == 'o'){
        return;
    }
    
    ele.innerHTML = whosTurn;
    
    updateArray(ele);
    
    if(didWin(whosTurn)){
        alert(whosTurn + "'s WON!")
        return;
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