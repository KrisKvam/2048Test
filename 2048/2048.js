var matrixModel;
var size = 5;
var matrixView = document.getElementById('matrix');

InitGame();
PlaceRandom();
PlaceRandom();
ShowMatrix();

function ShowMatrix() {
    matrixView.innerHTML = '';
    for (var rowCounter = 0; rowCounter < matrixModel.rows.length; rowCounter++) {
        var viewRow = matrixView.insertRow();
        var modelRow = matrixModel.rows[rowCounter];
        for (var cellCounter = 0; cellCounter < modelRow.cells.length; cellCounter++) {
            var viewCell = viewRow.insertCell();
            var modelCell = modelRow.cells[cellCounter];
            if (!modelCell.isEmpty) viewCell.innerHTML = modelCell.number;
        }
    }
}

function PlaceRandom() {
    var i1 = Math.floor(Math.random() * matrixModel.rows.length);
    var modelRow = matrixModel.rows[i1];
    var i2 = Math.floor(Math.random() * modelRow.cells.length);
    var modelCell = modelRow.cells[i2];
    var toPlaceNumber = (Math.floor(Math.random() * 2) + 1) * 2;
    if (modelCell.isEmpty) {
        modelCell.number = toPlaceNumber;
        modelCell.isEmpty = false;
    } else PlaceRandom();
    ShowMatrix();
}

function MoveTiles(key) {
    for (var i = 0; i < size; i++) {
        if (key.keyCode == 40) MoveDown();
        else if (key.keyCode == 38) MoveUp();
        else if (key.keyCode == 37) MoveLeft();
        else if (key.keyCode == 39) MoveRight();
        else return;
    }
    PlaceRandom();
}

function Move(rowCounter, cellCounter, targetRow, targetCell) {
    var currentCell = matrixModel.rows[rowCounter].cells[cellCounter];
    var targetCell = matrixModel.rows[targetRow].cells[targetCell];

    if (targetCell.isEmpty) {
        targetCell.number = currentCell.number;
        targetCell.isEmpty = false;
        currentCell.isEmpty = true;
    } else if (targetCell.number == currentCell.number && !targetCell.hasCombined) {
        targetCell.number += currentCell.number;
        currentCell.number = 0;
        currentCell.isEmpty = true;
        targetCell.hasCombined = true;
    }
}

function FinishMove() {
    for (var rowCounter = 0; rowCounter < matrixModel.rows.length; rowCounter++) {
        var viewRow = matrixView.insertRow();
        var modelRow = matrixModel.rows[rowCounter];
        for (var cellCounter = 0; cellCounter < modelRow.cells.length; cellCounter++) {
            var viewCell = viewRow.insertCell();
            var modelCell = modelRow.cells[cellCounter];
            modelCell.hasCombined = false;
            if (modelCell.number == 0) modelCell.isEmpty = true;
        }
    }
}

function MoveUp() {
    for (var rowCounter = 1; rowCounter < matrixModel.rows.length; rowCounter++) {
        for (var cellCounter = 0; cellCounter < matrixModel.rows[0].cells.length; cellCounter++) {
            var targetRow = rowCounter - 1;
            if (targetRow >= 0) Move(rowCounter, cellCounter, targetRow, cellCounter);
        }
    }
    FinishMove();
}

function MoveDown() {
    for (var rowCounter = matrixModel.rows.length - 1; rowCounter >= 0; rowCounter--) {
        for (var cellCounter = 0; cellCounter < matrixModel.rows[0].cells.length; cellCounter++) {
            var targetRow = rowCounter + 1;
            if (targetRow < size) Move(rowCounter, cellCounter, targetRow, cellCounter);
        }
    }
    FinishMove();
}

function MoveLeft() {
    for (var rowCounter = 0; rowCounter < matrixModel.rows.length; rowCounter++) {
        for (var cellCounter = 1; cellCounter < matrixModel.rows[0].cells.length; cellCounter++) {
            var targetCell = cellCounter - 1;
            if (targetCell >= 0) Move(rowCounter, cellCounter, rowCounter, targetCell);
        }
    }
    FinishMove();
}

function MoveRight() {
    for (var rowCounter = 0; rowCounter < matrixModel.rows.length; rowCounter++) {
        for (var cellCounter = matrixModel.rows[0].cells.length - 1; cellCounter >= 0; cellCounter--) {
            var targetCell = cellCounter + 1;
            if (targetCell < size) Move(rowCounter, cellCounter, rowCounter, targetCell);
        }
    }
    FinishMove();
}


function InitGame() {
    matrixModel = {};
    matrixModel.rows = [];
    for (var rowCounter = 0; rowCounter < size; rowCounter++) {
        var newRow = {};
        newRow.cells = [];
        for (var cellCounter = 0; cellCounter < size; cellCounter++) {
            var newCell = {};
            newCell.isEmpty = true;
            newCell.number = 0;
            newCell.hasCombined = false;
            newRow.cells.push(newCell);
        }
        matrixModel.rows.push(newRow);
    }
}



