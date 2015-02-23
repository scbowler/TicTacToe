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

//function to start a new game / called from the start button click
function startGame(){
    //resets came incase it wasnt already done
    resetGame();
    //changes game state to running
    gameState = "running";
    
    //randomly chooses who goes first
    whosFirst();
    //alert who gets to go first
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
    //if the game has been won this prevents additional clicks on the board
    if(gameState == "over"){
        //asks if you'd like to start a new game or not
        if(confirm("Game Over:\nWould you like to start a new game?")){
            startGame();        //if yes starts a new game
            return;
        }else{
            return;             //if no exits function and nothing happens
        }
    }
    
    //if the element already has a 'X' or an 'O' exit the function and do nothing
    if(ele.innerHTML == 'X' || ele.innerHTML == 'O'){
        return; // exits the function
    }
    
    //whos turn equals 'X' or 'O' so it is used to add an 'X' or an 'O' to the board depending whos turn it is
    ele.innerHTML = whosTurn;
    
    //used to update the game board array (boardArray) see function for more detail
    updateArray(ele);
    //increments the moves variable to keep track of the number of moves taken this game
    moves++;
    
    //calls the didWin() function to determine if a win condition exists
    var winner = didWin(whosTurn);  //check for a winner and store in winner variable
    if(winner){                     //if a winner exists do the following..
        gameState = "over";
        if(winner == "tie"){
            alert("It is a tie!");  //if its a tie updates the score for ties
            updateScore('t');
            return;
        }
        gameWon(winner);
        alert(whosTurn + "'s WIN!") //do stuff if someone wins
        updateScore(whosTurn);      //updates the score based on who one
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

//function to check if a win has occured / returns false for no win / returns the location of a win if present
function didWin(player){
    //asign the length of the boardArray to a variable
    var arrLength = boardArray.length;
    
    //checks for a diagnol win / top-left to bottom-right
    if(boardArray[0][0] == player && boardArray[1][1] == player && boardArray[2][2] == player){
        return "\\";
    }
    //checks for the oposite diagnol win / top-right to bottom-left
    if(boardArray[0][2] == player && boardArray[1][1] == player && boardArray[2][0] == player){
        return "/";
    }
    
    //checks for the other six win conditions either vertical or horizontal
    for(var i=0; i<arrLength; i++){
        if(boardArray[i][0] == player && boardArray[i][1] == player && boardArray[i][2] == player ){
            return "r" + i;
        }else if(boardArray[0][i] == player && boardArray[1][i] == player && boardArray[2][i] == player ){
            return "c" + i;    
        }
    }
    
    //if no win conditions exist and 9 turns have been taken then it is a tie
    if(moves >= 9){
        return "tie";
    }
    //returns false if no win condition or no tie
    return false;
}

//this function is called win someone has won to change the winning line so it stands out 
//returns nothing / takes the win location from the didWin() function as a param
function gameWon(line){
    //creates a variable to hold an ID corrisponding to the winning line
    var squareID;
    
    switch (line){
        case "r0":      //if a win occured in a row
        case "r1":      //cycle through all 3 elements and add
        case "r2":      //the win class to each
            for(var i=0; i<3; i++){
                squareID = line + "_c" + i;
                document.getElementById(squareID).classList.add("win");
            }
            break;
        case "c0":      //if a win occured in a col
        case "c1":      //cycle through all 3 elements annd add
        case "c2":      //the win class to each
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

//function to update the players score and the scoreboard
function updateScore(player){
    
    //switch to determine which players score to update
    switch(player){
            case "X":
                playerX[1]++;                                           //increment the numerical score in the players array
                document.getElementById('xScore').innerHTML += "l";     //updates the scoreboard by adding an 'l' to emulate hash marks
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

//alternates turns between each player
function switchPlayer(){
    //if its x's turn switch to o's turn and update the turn indicater (the checkboxes)
    if(whosTurn == 'X'){
        whosTurn = 'O';
        xTurn.removeAttribute("checked");
        oTurn.setAttribute("checked", true);
        return;
    }
    //if its o's turn switch to x's turn and update the turn indicater (the checkboxes)
    if(whosTurn == 'O'){
        whosTurn = 'X';
        oTurn.removeAttribute("checked");
        xTurn.setAttribute("checked", true);
        return;
    }
    alert("Whos turn is it!?!?!?"); //if there is an error with this function this alert will show
}

//this function resets the game but not the players win counts
function resetGame(){
    //resets the boardArray
    boardArray = [['','',''], ['','',''], ['','','']];
    //resets the move counter
    moves = 0;
    
    var i = boardSquares.length;
    while(i--) {
        boardSquares[i].innerHTML = "";             //removes all the x's and o's from the game board
        boardSquares[i].classList.remove('win');    //removes the win class from any squares that may have it
    }
    gameState = "running";                          //sets the game state to running so a new game may begin
}

//this function resets everything including the players win counts
function resetAll(){
    //call the resetGame() function to reset the majority of things
    resetGame();
    
    //below resets the players numerical scores and the scoreboard
    playerO[1] = 0;
    document.getElementById('oScore').innerHTML = "";
    playerX[1] = 0;
    document.getElementById('xScore').innerHTML = "";
    ties = 0;
    document.getElementById('tScore').innerHTML = "";
}