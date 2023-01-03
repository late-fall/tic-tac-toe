
let playerText = document.querySelector('#playerText');
let restartBtn = document.querySelector('#restartBtn');
let boxes = Array.from(document.querySelectorAll('.box'));

const O_txt = "O";
const X_txt = "X";
let currentPlayer = O_txt
let spaces = Array(9).fill(null) //create an array and fill with null

const startGame = () =>{
    boxes.forEach(box => box.addEventListener('click', boxClick))
}

function boxClick(e) {
    const id = e.target.id
    
    if(!spaces[id]){ //while box is not full
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !== false){
            playerText.innerHTML = `Player ${currentPlayer} has Won!`
            let winRow = playerHasWon()
            winRow.map( box => boxes[box].style.backgroundColor='#12343b')
            winRow.map( box => boxes[box].style.color='#c89666')
            boxes.forEach(box => box.removeEventListener('click', boxClick))
            return
        }
        currentPlayer = currentPlayer == X_txt ? O_txt : X_txt //switch between users
        playerText.innerHTML = `Player ${currentPlayer}'s Turn`
        if (spaces.includes(null) == false){
            draw()
        }
    }
}

const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function draw(){
    playerText.innerHTML = `Draw`
    boxes.forEach(box => box.removeEventListener('click', boxClick))
}

function playerHasWon(){
    for (const condition of winCondition){
        let [a,b,c] = condition

        if(spaces[a] && (spaces[a] == spaces[b]) && spaces[a] == spaces[c]){
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)
    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor = ''
        box.style.color = ''
    })
    playerText.innerHTML = "Player O's Turn"
    currentPlayer = O_txt
    boxes.forEach(box => box.addEventListener('click', boxClick))
}

startGame()