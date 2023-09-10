let boxes=document.querySelectorAll(".box");
let gameInfo=document.querySelector(".game-info");
let newGameBtn=document.querySelector(".btn");
let currentPlayer;
let gameGrid;
let winningPositions=[ [0,1,2],[3,4,5],[6,7,8],[0,3,6],
    [1,4,7],[2,5,8],[0,4,8],[2,4,6] ];
// initialize the game---->
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    // make content of each box empty before starting a new game------>
    boxes.forEach((box,index)=>{ 
    box.innerText="";
    boxes[index].style.pointerEvents="all";
    box.classList=`box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
initGame();
function checkGameOver(){
    let ans="";
    winningPositions.forEach((positions)=>{
    if(gameGrid[positions[0]]!=="" && gameGrid[positions[1]]!=="" && gameGrid[positions[2]]!=="" && 
    gameGrid[positions[0]]===gameGrid[positions[1]] && gameGrid[positions[1]]===gameGrid[positions[2]]){
    // check whether ans is X or O
    if(gameGrid[positions[0]]==='X'){ 
    ans="X";
    }
    else {
    ans="O";
    }
    // disable pointer events
    boxes.forEach((box)=>box.style.pointerEvents="none");
    // now we know winner is X or O
    boxes[positions[0]].classList.add("win");
    boxes[positions[1]].classList.add("win");
    boxes[positions[2]].classList.add("win");
    }});
    if(ans!==""){
    gameInfo.innerText=`Winner Player - ${ans}`
    newGameBtn.classList.add("active");
    return;
    }
    //now we know there is no winner, so lets check for game tie
    let fillcount=0;
    gameGrid.forEach((box)=>{
    if(box!=="") fillcount++;
    });
    if(fillcount===9){
    gameInfo.innerText='Game Tied!';
    newGameBtn.classList.add('active');
    }
}
function swapTurn(){
    if(currentPlayer==='X'){
    currentPlayer="O";
    }
    else{
    currentPlayer="X";
    }
    // update  UI
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
function handleClick(index){
    if(gameGrid[index]===""){
    boxes[index].innerText=currentPlayer;
    gameGrid[index]=currentPlayer;
    boxes[index].style.pointerEvents = "none";
    swapTurn();
    checkGameOver();
    // if game is not over swap the turn of player---------->
    }
}
boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
    handleClick(index)})
    })
newGameBtn.addEventListener('click',initGame);
