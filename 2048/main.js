/**
 * Created by REN on 2016/9/15.
 */

(function () {

    var container = document.querySelector("#container");
    var btn = document.querySelector("#btn");
    var blocksArr = [];

    //开始游戏
    function startGame() {
        blocksArr = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        container.innerHTML = "";
        setBlock();
        setBlock();
    }

    //判断当前能否向某一个方向移动
    function canMove(deriction) {
        var rotateArr;
        deriction == "down" && (rotateArr = rotateMatrix(3, blocksArr));
        deriction == "right" && (rotateArr = rotateMatrix(2, blocksArr));
        deriction == "up" && (rotateArr = rotateMatrix(1, blocksArr));
        deriction == "left" && (rotateArr = blocksArr);
        for (var row = 0; row < 4; row++) {
            for (var col = 1; col < 4; col++) {
                if (rotateArr[row][col] != 0) {
                    if (rotateArr[row][col - 1] == 0 || rotateArr[row][col - 1].number == rotateArr[row][col].number)
                        return true;
                }
            }
        }
        return false;
    }

    //逆时针旋转数组，方便判断能否移动
    function rotateMatrix(times, arr) {
        var tempArr = [];
        if (times % 4 == 0) return arr;
        for (var i = 0, iLen = arr.length; i < iLen; i++) {
            var _arr = [];
            for (var j = 0, jLen = arr[i].length; j < jLen; j++) {
                _arr.push(arr[j][iLen - 1 - i]);
            }
            tempArr.push(_arr);
        }
        return arguments.callee(times % 4 - 1, tempArr);
    }


    //判断游戏是否结束
    function isGameOver() {
        !(getVacancy() || canMove("left") || canMove("right") || canMove("up") ||
        canMove("down")) && (alert("游戏结束！"));
    }

    //在空位置中生成随机坐标,填入方块  coordinate：坐标
    function setBlock() {
        var tempArr = getVacancy();
        if (tempArr) {
            var coordinate = tempArr[Math.floor(Math.random() * tempArr.length)];
            var block = new Block2048();
            blocksArr[coordinate.row][coordinate.col] = block;
            block.setPosition(coordinate.row, coordinate.col);
            container.appendChild(block.htmlNode);
        }
    }

    //获取所有空位，并记录
    function getVacancy() {
        var tempArr = [];
        for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++) {
                if (blocksArr[row][col]) continue;
                tempArr.push({row: row, col: col});
            }
        }
        if (tempArr.length == 0) return false;
        return tempArr;
    }

    function goLeft() {
        if (canMove("left")) {
            for (var row = 0; row < 4; row++) {
                for (var col = 0; col < 3; col++) {
                    if (blocksArr[row][col]) {                           //判断此位置是否有元素
                        var block = blocksArr[row][col]; //此位置有元素并记下
                        for (var nextCol = col + 1; nextCol < 4; nextCol++) {           //从该标记元素向右循环查找其他元素
                            if (blocksArr[row][nextCol]) {
                                var nextBlock = blocksArr[row][nextCol];
                                if (nextBlock.number == block.number) {
                                    nextBlock.removeThisNode();
                                    blocksArr[row][nextCol] = 0;
                                    block.double();
                                }
                                break;
                            }
                        }
                    }
                }
            }
            syncLeft();
            setTimeout(function () {
                setBlock();
                isGameOver();
            }, 100);
        }
    }

    function goRight() {
        if (canMove("right")) {
            for (var row = 0; row < 4; row++) {
                for (var col = 3; col > 0; col--) {
                    if (blocksArr[row][col]) {                           //判断此位置是否有元素
                        var block = blocksArr[row][col]; //此位置有元素并记下
                        for (var preCol = col - 1; preCol >= 0; preCol--) {           //从该标记元素向右循环查找其他元素
                            if (blocksArr[row][preCol]) {
                                var preBlock = blocksArr[row][preCol];
                                if (preBlock.number == block.number) {
                                    preBlock.removeThisNode();
                                    blocksArr[row][preCol] = 0;
                                    block.double();
                                }
                                break;
                            }
                        }
                    }
                }
            }
            syncRight();
            setTimeout(function () {
                setBlock();
                isGameOver();
            }, 100);
        }
    }


    function goUp() {
        if (canMove("up")) {
            for (var col = 0; col < 4; col++) {
                for (var row = 0; row < 3; row++) {
                    if (blocksArr[row][col]) {
                        for (var nextRow = row + 1; nextRow < 4; nextRow++) {
                            if (blocksArr[nextRow][col]) {
                                if (blocksArr[row][col].number == blocksArr[nextRow][col].number) {
                                    blocksArr[nextRow][col].removeThisNode();
                                    blocksArr[nextRow][col] = 0;
                                    blocksArr[row][col].double();
                                }
                                break;
                            }
                        }
                    }
                }
            }
            syncUp();
            setTimeout(function () {
                setBlock();
                isGameOver();
            }, 100);
        }
    }

    function goDown() {
        if (canMove("down")) {
            for (var col = 0; col < 4; col++) {
                for (var row = 3; row > 0; row--) {
                    if (blocksArr[row][col]) {
                        for (var preRow = row - 1; preRow >= 0; preRow--) {
                            if (blocksArr[preRow][col]) {
                                if (blocksArr[row][col].number == blocksArr[preRow][col].number) {
                                    blocksArr[preRow][col].removeThisNode();
                                    blocksArr[preRow][col] = 0;
                                    blocksArr[row][col].double();
                                }
                                break;
                            }
                        }
                    }
                }
            }
            syncDown();
            setTimeout(function () {
                setBlock();
                isGameOver();
            }, 100);
        }
    }


    function syncLeft() {
        for (var row = 0; row < 4; row++) {
            for (var col = 1; col < 4; col++) {
                if (blocksArr[row][col]) {
                    var pre = col;
                    for (var preCol = col - 1; preCol >= 0; preCol--) {
                        if (blocksArr[row][preCol] == 0) pre = preCol;
                    }
                    if (pre == col) continue;
                    blocksArr[row][col].setPosition(row, pre);
                    blocksArr[row][pre] = blocksArr[row][col];
                    blocksArr[row][col] = 0;
                }
            }
        }
    }

    function syncRight() {
        for (var row = 0; row < 4; row++) {
            for (var col = 2; col >= 0; col--) {
                if (blocksArr[row][col]) {
                    var next = col;
                    for (var nextCol = col + 1; nextCol < 4; nextCol++) {
                        if (blocksArr[row][nextCol] == 0) next = nextCol;
                    }
                    if (next == col) continue;
                    blocksArr[row][col].setPosition(row, next);
                    blocksArr[row][next] = blocksArr[row][col];
                    blocksArr[row][col] = 0;
                }
            }
        }
    }

    function syncUp() {
        for (var col = 0; col < 4; col++) {
            for (var row = 1; row < 4; row++) {
                if (blocksArr[row][col]) {
                    var pre = row;
                    for (var preRow = row - 1; preRow >= 0; preRow--) {
                        if (blocksArr[preRow][col] == 0) pre = preRow;
                    }
                    if (pre == row) continue;
                    blocksArr[row][col].setPosition(pre, col);
                    blocksArr[pre][col] = blocksArr[row][col];
                    blocksArr[row][col] = 0;
                }
            }
        }
    }

    function syncDown() {
        for (var col = 0; col < 4; col++) {
            for (var row = 2; row >= 0; row--) {
                if (blocksArr[row][col]) {
                    var next = row;
                    for (var nextRow = row + 1; nextRow < 4; nextRow++) {
                        if (blocksArr[nextRow][col] == 0) next = nextRow;
                    }
                    if (next == row) continue;
                    blocksArr[row][col].setPosition(next, col);
                    blocksArr[next][col] = blocksArr[row][col];
                    blocksArr[row][col] = 0;
                }
            }
        }
    }


    startGame();
    document.onkeydown = function (e) {
        e.code == "ArrowLeft" && goLeft();
        e.code == "ArrowRight" && goRight();
        e.code == "ArrowUp" && goUp();
        e.code == "ArrowDown" && goDown();
    }

    btn.onclick = startGame;


})();