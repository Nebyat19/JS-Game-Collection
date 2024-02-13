let playerText = document.getElementById('playerText')
let winnerText= document.getElementById('winnerText')
let restartBtn = document.getElementById('restartBtn')
let options=document.getElementById('options')
let singlePlayerBtn = document.getElementById('singlePlayerBtn');
let multiPlayerBtn = document.getElementById('multiPlayerBtn');
singlePlayerBtn.addEventListener('click',()=>{
    startSinglePlayerGame();options.style.display='none';
}
 );
 multiPlayerBtn.addEventListener('click',()=>{ 
    boxes.forEach(box => box.removeEventListener('click', boxClickedSinglePlayer));
    boxes.forEach(box => box.addEventListener('click', boxClicked));
    
    options.style.display='none';});
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
    
}

function boxClicked(e) {
    options.style.display='none';
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){
            if (playerHasWon() === 'draw') {
                playerText.innerHTML = 'It\'s a draw!';
                winnerText.innerHTML = 'It\'s a draw!';
            } else {
            playerText.innerHTML = `${currentPlayer} has won!`
            winnerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            document.getElementById('gameover').classList.add('show');
            return 0
            }
            document.getElementById('gameover').classList.add('show');
            return 0;
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
       return 1;
    }
    return 1;
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }

    // Check for a draw (no winner)
    if (spaces.every(space => space !== null)) {
        return 'draw';
    }
    return false
}

restartBtn.addEventListener('click', restart)

function restart() {
     boxes.forEach(box => box.removeEventListener('click', boxClicked));
     boxes.forEach(box => box.removeEventListener('click',  boxClickedSinglePlayer));
    document.getElementById('gameover').classList.remove('show');
    options.style.display='block';
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })

    playerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = X_TEXT
}
function startSinglePlayerGame() {
    // Remove the event listeners from boxes to disable human input
    boxes.forEach(box => box.addEventListener('click',  boxClickedSinglePlayer));
     
 }
 function boxClickedSinglePlayer (e) {
    
   if(boxClicked(e)!==1) return;
    setTimeout(computerMove, 500); // Delay of 1000 milliseconds (1 second)
 }
function computerMove() {

    const computerMove = getBestMove();
    if (computerMove !== null) {
        spaces[computerMove] = currentPlayer;
        
                boxes[computerMove].innerText = currentPlayer; 

        // Check for win or draw and update the game state if necessary
        if(playerHasWon() !==false){
            if (playerHasWon() === 'draw') {
                playerText.innerHTML = 'It\'s a draw!';
                winnerText.innerHTML = 'It\'s a draw!';
            } else {
            playerText.innerHTML = `${currentPlayer} has won!`
            winnerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            document.getElementById('gameover').classList.add('show');
            return
            }
            document.getElementById('gameover').classList.add('show');
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }
}
function sleep(){
alert('sleep')
}
function getBestMove() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // Check if the computer can win in the next move
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (spaces[a] === currentPlayer && spaces[b] === currentPlayer && spaces[c] === null) {
            return c;
        }
        if (spaces[a] === currentPlayer && spaces[c] === currentPlayer && spaces[b] === null) {
            return b;
        }
        if (spaces[b] === currentPlayer && spaces[c] === currentPlayer && spaces[a] === null) {
            return a;
        }
    }

    // Check if the opponent can win in the next move and block them
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (spaces[a] !== null && spaces[b] !== null && spaces[a] !== currentPlayer && spaces[a] === spaces[b] && spaces[c] === null) {
            return c;
        }
        if (spaces[a] !== null && spaces[c] !== null && spaces[a] !== currentPlayer && spaces[a] === spaces[c] && spaces[b] === null) {
            return b;
        }
        if (spaces[b] !== null && spaces[c] !== null && spaces[b] !== currentPlayer && spaces[b] === spaces[c] && spaces[a] === null) {
            return a;
        }
    }

    // Choose a random empty box if no winning moves or blocks are available
    const emptyBoxes = spaces.reduce((acc, currentValue, index) => {
        if (currentValue === null) {
            acc.push(index);
        }
        return acc;
    }, []);

    if (emptyBoxes.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        return emptyBoxes[randomIndex];
    }

    return null; // No available moves (draw condition)
}
startGame()