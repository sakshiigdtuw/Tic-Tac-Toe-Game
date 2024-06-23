//javascript//
let boxes = document.querySelectorAll(".box")
let resetbtn = document.querySelector("#resetbtn")
let newGamebtn = document.querySelector("#newbtn")
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")

let turnO =true; //playerX , playerY
let count = 0    //to track draw

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];




boxes.forEach((box) => {
    box.addEventListener("click",() =>{
        
        if(turnO) {
            box.innerText="O";
            turnO = false;
        } else {
            box.innerText="X"
            turnO = true
        }
        box.disabled = true
        count++

        let isWinner = checkwinner();
        if(count === 9 && !isWinner) {
            gameDraw()
        }
    });
});

const gameDraw = () => {
    msg.innerText=`Game was a Draw`
    msgContainer.classList.remove("hide")
    disableBoxes()
}

//clear all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true
    }
}

//start game again 
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false
        box.innerText=""
    }
}

const resetgame =() =>{
    turnO=true
    count=0
    enableBoxes()
    msgContainer.classList.add("hide")
}

const showWinner=(winner) => {
    msg.innerText = `Congratulations to winner ${winner} `
    msgContainer.classList.remove("hide")
    disableBoxes()
}
const checkwinner = ()=>{
    for(let pattern of winPatterns) {
        let pos1Val =  boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val =  boxes[pattern[2]].innerText

        if(pos1Val != "" && pos2Val !="" && pos3Val !="") {
            if (pos1Val ===pos2Val && pos2Val===pos3Val) {
                
                showWinner(pos1Val)
            } 
        }
    }
}

newGamebtn.addEventListener("click",resetgame)
resetbtn.addEventListener("click",resetgame);
