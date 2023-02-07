var defaultBoard = [
    // A        B           C
    2, 5, 0,    9, 3, 0,    6, 0, 7,
    6, 0, 8,    0, 5, 1,    0, 0, 2,
    0, 3, 9,    0, 0, 0,    0, 5, 8,
    // D        E           F
    3, 2, 7,    5, 6, 0,    0, 0, 4,
    0, 8, 0,    0, 4, 3,    0, 0, 9,
    5, 0, 4,    1, 8, 7,    0, 6, 0,
    // G        H           I
    8, 0, 0,    4, 0, 6,    7, 0, 5,
    9, 0, 0,    0, 7, 2,    4, 0, 0,
    4, 0, 2,    0, 1, 5,    0, 9, 0
]

function draw() {
    var evenSquares = [
        // Sqaure B
        3,  4,  5,
        12, 13, 14,
        21, 22, 23,
        
        // Square D
        27, 28, 29,
        36, 37, 38,
        45, 46, 47,

        // Square F
        33, 34, 35,
        42, 43, 44,
        51, 52, 53,

        // Square H
        57, 58, 59,
        66, 67, 68,
        75, 76, 77
    ];
    
    var board = document.getElementById("puzzle");
    var sqaures = 81;

    for (var ix=0; ix < sqaures; ix++) {
        var input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("min", "1");
        input.setAttribute("max", "9");
        input.classList.add("odd_color");

        if (defaultBoard[ix] != 0) {
            input.value = defaultBoard[ix];
            input.classList.add("generated_color")
        }

        for (var jx=0; jx < evenSquares.length; jx++) {
            if (ix == evenSquares[jx]) {
                console.log(`ix: ${ix} jx: ${jx} es: ${evenSquares[jx]}`)
                input.classList.remove("odd_color")
            }
        }

        board.appendChild(input);
    }
}

function clearBoard() {
    var allInputs = document.querySelectorAll("input");

    allInputs.forEach((input) => {
        input.value = "";
    });
}

var solvingBoard = defaultBoard;
function getCurrentBoard() {
    var allInputs = document.querySelectorAll("input")

    for (var ix=0; ix < allInputs.length; ix++) {
        solvingBoard[ix] = parseInt(allInputs[ix].value, 10);
    }
}

function writeNewBoard(value, color) {
    var allInputs = document.querySelectorAll("input");

    for (var ix=0; ix < allInputs.length; ix++) {
        if (defaultBoard[ix] != 0) {
            allInputs[ix].value = value[ix];
            if (color) {            
                allInputs[ix].classList.add("generated_color")
            }
        }
    }
}

function newBoard() {
    writeNewBoard(defaultBoard, true)
}

function isPossible(index, value) {
    var row = Math.floor(index / 9);
    var col = index % 9;
    
    for (var ix=0; ix < 9; ix++) {
        if (defaultBoard[ix * 9 + col] == value) {
            return false;
        }
    }

    
    for (var jx=0; jx < 9; jx++) {
        if (defaultBoard[row * 9 + jx] == value) {
            return false;
        }
    }

    var hrow = Math.floor(row / 3) * 3;
    var hcol = Math.floor(col / 3) * 3;

    for (var kx = hrow; kx < hrow + 3; kx++) {
        for (var lx = hcol; lx < hcol +3; lx++) {
            if (defaultBoard[kx * 9 + lx] == value) {
                return false;
            }
        }
    }

    return true;
}

function getPossible(index) {
    var possible = [];
    for (var ix=1; ix <= 9; ix++) {
        if (isPossible(index, ix)) {
            possible.push(ix)
        }
    }

    return possible
}

function saveBoard() {
    getCurrentBoard();
}

function resetBoard() {
    clearBoard();
    solvingBoard = defaultBoard;
}

function trySolve() {
    var numberOfBacktracks = 0;
    var time = Date.now();

    function solve(index) {
        while (index < solvingBoard.length && solvingBoard[index]) {
            index++;
        }
    
        if (index >= solvingBoard.length) {
            return true;
        }
    
        var entries = getPossible(index);
        for (var jx=0; jx < entries.length; jx++) {
            solvingBoard[index] = entries[jx];
            if (solve(index+1)) {
                return true;
            }
        }
        solvingBoard[index] = 0;
        numberOfBacktracks++;
        return false;
    }

    if (solve(0)) {
        writeNewBoard(solvingBoard, false)
    } else {
        alert("failed to solve sudoku!");
        return;
    }
    
    document.getElementById("time").innerHTML = `Time Elapsed: ${Date.now() - time}ms`
    document.getElementById("backtracks").innerHTML = `Backtracks: ${numberOfBacktracks}`
}