/**
 * Created by REN on 2016/9/15.
 */

(function () {

    function Block2048() {
        this._htmlNode = document.createElement("div");
        this._number = Math.random() < 0.7 ? 2 : 4;
        this._row;
        this._col;
        this.setColors();
    }

    //设置颜色文字;
    Block2048.prototype.setColors = function () {
        this.htmlNode.style.background = this.colorArr[Math.log(this.number) / Math.log(2)];
        this.number > 4 && (this.htmlNode.style.color = "white") &&
        this.number > 100 && (this.htmlNode.style.fontSize = "40px") &&
        this.number > 1000 && (this.htmlNode.style.fontSize = "30px");
        this.htmlNode.innerHTML = this.number;
    };

    //翻倍
    Block2048.prototype.double = function () {
        this.number <<= 1;
        this.setColors();
    };

    //移除该元素
    Block2048.prototype.removeThisNode = function () {
        this.htmlNode.parentNode.removeChild(this.htmlNode);
    };

    //设置位置
    Block2048.prototype.setPosition = function (row, col) {
        this.row = row;
        this.col = col;
        this.htmlNode.style.left = 10 + 90 * this.col + "px";
        this.htmlNode.style.top = 10 + 90 * this.row + "px";
    };


    //对应数字颜色数组
    Block2048.prototype.colorArr = ["", "#eee3da", "#ede0c8", "#f2b179", "#f59563", "#f67c5f", "#f65e3b",
        "#edcf72", "#edcc61", "#9c0", "#33b5e5", "#09c", "#a6c", "#93c"];

    //set、get方法
    Object.defineProperty(Block2048.prototype, "htmlNode", {
        get: function () {
            return this._htmlNode;
        }
    });

    Object.defineProperty(Block2048.prototype, "number", {
        set: function (value) {
            this._number = value;
        },
        get: function () {
            return this._number;
        }
    });

    Object.defineProperty(Block2048.prototype, "row", {
        set: function (value) {
            this._row = value;
        },
        get: function () {
            return this._row
        }
    });

    Object.defineProperty(Block2048.prototype, "col", {
        set: function (value) {
            this._col = value;
        },
        get: function () {
            return this._col;
        }
    });


    window.Block2048 = Block2048;

})();