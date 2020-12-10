

//P1 and P2
const Player1 = 'x'
const Player2='circle'


// Winning Combinations on Grid
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// Getting Element data cell
const cellElements= document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement= document.getElementById('winningMessage')


const restartButton = document.getElementById( 'restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn


restartButton.addEventListener('click', startGame)

// Start Game
startGame()
function startGame() {
circleTurn= false
    cellElements.forEach(cell => {
        cell.classList.remove(Player1)

        cell.classList.remove(Player2)

        // Prevents from placing input twice
        cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, {once: true})
})
setBoardHoverClass()
winningMessageElement.classList.remove('show')
}

// If x or O matches/ draws any combination 
function handleClick(e) {
    const cell = e.target
    const currentClass=  circleTurn ? Player2 : Player1
    placeMark(cell, currentClass)
    if (checkWin(currentClass)){
endGame(false)

// if draw, end game
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}
function endGame(draw){
    if (draw){
winningMessageTextElement.innerText= 'Draw!'
    } 
    else 
    
    //If X or O wins declare a winner
    {
        winningMessageTextElement.innerText= `${circleTurn ? "O's" :
        "X' s"} Wins!`
    }
    winningMessageElement.classList.add( 'show')
}

function isDraw() {
    return  [...cellElements].every(cell => { 
        return cell.classList.contains(Player1) || 
            cell.classList.contains(Player2)
    })
}
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
// Swap function between players
function swapTurns() {
    circleTurn= !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(Player1)
    board.classList.remove(Player2) 
if( circleTurn) {
    board.classList.add(Player2)
}else{
    board.classList.add(Player1)
}
}
// Check if any combination meets requirements
function checkWin(currentClass) {
   return WINNING_COMBINATIONS.some(combination=> {
        return combination.every(index=> {
        return cellElements[index].classList.contains(currentClass)
        })
    })
}