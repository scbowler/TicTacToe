//set all global variable names
var boardArray, playerX, playerO, ties, whosTurn, moves, oTurn, xTurn, boardSquares, gameState;

//function called on page load to initialize all global variables
function init(){
    boardArray = [['', '', ''], ['', '', ''], ['', '', '']]; //two dimensional array that represents the game board
    playerX = ["X", 0];                                      //array to hold info for the 'x' player contains: [player letter, number of wins]
    playerO = ["O", 0];                                      //array to hold info for the 'o' player contains: [player letter, number of wins]
    ties = 0;                                                //variable to hold the number of times there was a tie game
    whosTurn = '';                                          //keeps track of whos turn it is using either 'x' or 'o'
    moves = 0;                                               //number of turns taken for current game
    oTurn = document.getElementById('oCheck');
    xTurn = document.getElementById('xCheck');
    boardSquares = document.querySelectorAll('.squares');
    gameState = "over";
}

function startGame(){
    resetGame();
    gameState = "running";
    
    whosFirst();
    alert(whosTurn + "'s go first!");
}

//function to randomly determin which player will go first / returns nothing
function whosFirst(){
    var num = Math.floor((Math.random() * 2) +1);   //generates a random number between 1 and 2 then assigns the result to 'num'
    
    //if 'num' is equal to 1 'x' is assigned to 'whosTurn' so 'x' will be first 
    if(num === 1){
        whosTurn = playerX[0];
        oTurn.removeAttribute("checked");
        xTurn.setAttribute("checked", true);
    //if 'num' is not qual to 1 'o' is assigned to 'whosTurn' so 'o' will be first
    }else{
        whosTurn = playerO[0];
        xTurn.removeAttribute("checked");
        oTurn.setAttribute("checked", true);
    }
    
}

//this is the main game function that is called on a cell click / returns nothing / takes an html element as a param
function mainGame(ele){
    if(gameState == "over"){
        if(confirm("Game Over:\nWould you like to start a new game?")){
            startGame();
            return;
        }else{
            return;
        }
    }
    
    //if the element already has a 'x' or an 'o' exit the function and do nothing
    if(ele.innerHTML == 'X' || ele.innerHTML == 'O'){
        return; // exits the function
    }
    
    //whos turn equals 'x' or 'o' so it is used to add an 'x' or an 'o' to the board depending whos turn it is
    ele.innerHTML = whosTurn;
    
    //used to update the game board array (boardArray) see function for more detail
    updateArray(ele);
    moves++;
    
    //calls the didWin() function to determine if a win condition exists
    var winner = didWin(whosTurn);
    if(winner){
        gameState = "over";
        if(winner == "tie"){
            alert("It is a tie!");
            updateScore('t');
            return;
        }
        gameWon(winner);
        alert(whosTurn + "'s WON!") //do stuff if somone wins
        updateScore(whosTurn);
        return;
    }
    
    //calls the switchPlayer() function to alternate between 'x' or 'o'
    switchPlayer();
}

//updateArray(ele) takes one param of html element (the one that was clicked on) / returns nothing
function updateArray(ele){
    var eleID = ele.getAttribute("id");         //sets 'eleID' to the id of the clicked on element
    
    switch (eleID) {                            //a switch based on the elements id
            case "r0_c0":                       //the elements id represents a location on the game bored
                boardArray[0][0] = whosTurn;    //the coresponding location in the board array is assigned 
                break;                          //to the current players letter
            case "r0_c1":
                boardArray[0][1] = whosTurn;
                break;
            case "r0_c2":
                boardArray[0][2] = whosTurn;
                break;
            case "r1_c0":
                boardArray[1][0] = whosTurn;
                break;
            case "r1_c1":
                boardArray[1][1] = whosTurn;
                break;
            case "r1_c2":
                boardArray[1][2] = whosTurn;
                break;
            case "r2_c0":
                boardArray[2][0] = whosTurn;
                break;
            case "r2_c1":
                boardArray[2][1] = whosTurn;
                break;
            case "r2_c2":
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
            return "r" + i;
        }else if(boardArray[0][i] == player && boardArray[1][i] == player && boardArray[2][i] == player ){
            return "c" + i;    
        }
    }
    
    if(moves >= 9){
        return "tie";
    }
    return false;
}

function gameWon(line){
    var squareID;
    
    switch (line){
        case "r0":
        case "r1":
        case "r2":
            for(var i=0; i<3; i++){
                squareID = line + "_c" + i;
                document.getElementById(squareID).classList.add("win");
            }
            break;
        case "c0":
        case "c1":
        case "c2":
            for(var i=0; i<3; i++){
                squareID = "r" + i + "_" + line;
                document.getElementById(squareID).classList.add("win");
            }
            break;
        case "\\":
            for(var i=0; i<3; i++){
                squareID = "r" + i + "_c" + i;
                document.getElementById(squareID).classList.add("win");
            }
            break;
        case "/":
            for(var i=2; i>=0; i--){
                squareID = "r" + i + "_c" + ((i-2)*-1);
                document.getElementById(squareID).classList.add("win");
            }
            break;
    }
}

function updateScore(player){
    
    switch(player){
            case "X":
                playerX[1]++;
                document.getElementById('xScore').innerHTML += "l";
                break;
            case "O":
                playerO[1]++;
                document.getElementById('oScore').innerHTML += "l";
                break;
            case "t":
                ties++;
                document.getElementById('tScore').innerHTML += "l";
                break;
            default:
                alert("There was an error in the updateScore function");
    }
}

function switchPlayer(){
    if(whosTurn == 'X'){
        whosTurn = 'O';
        xTurn.removeAttribute("checked");
        oTurn.setAttribute("checked", true);
        return;
    }
    if(whosTurn == 'O'){
        whosTurn = 'X';
        oTurn.removeAttribute("checked");
        xTurn.setAttribute("checked", true);
        return;
    }
    alert("Whos turn is it!?!?!?");
}

function resetGame(){
    boardArray = [['','',''], ['','',''], ['','','']];
    moves = 0;
    
    var i = boardSquares.length;
    while(i--) {
        boardSquares[i].innerHTML = "";
        boardSquares[i].classList.remove('win');
    }
    gameState = "running";
}

function resetAll(){
    resetGame();
    
    playerO[1] = 0;
    document.getElementById('oScore').innerHTML = "";
    playerX[1] = 0;
    document.getElementById('xScore').innerHTML = "";
    ties = 0;
    document.getElementById('tScore').innerHTML = "";
}